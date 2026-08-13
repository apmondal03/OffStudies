"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

interface LetterTraceCanvasProps {
  letter: string;
  onComplete: () => void;
  strokeColor?: string;
}

const CANVAS_SIZE = 300;
const GRID_COLS = 20;
const GRID_ROWS = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_COLS;
const LETTER_ALPHA_THRESHOLD = 60; // 0-255, how "inked" a cell must be to count as part of the glyph
const COMPLETE_THRESHOLD = 0.55; // fraction of glyph cells that must be traced
const BRUSH_WIDTH = 22;

/** Renders the glyph off-screen at full opacity and classifies which grid
 *  cells contain meaningful ink, so tracing progress can be measured
 *  without expensive per-pixel checks on every pointer move. */
function classifyLetterCells(letter: string): boolean[] {
  const offscreen = document.createElement("canvas");
  offscreen.width = CANVAS_SIZE;
  offscreen.height = CANVAS_SIZE;
  const ctx = offscreen.getContext("2d");
  if (!ctx) return new Array(GRID_COLS * GRID_ROWS).fill(false);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillStyle = "#000000";
  ctx.font = `bold ${CANVAS_SIZE * 0.8}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(letter, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + CANVAS_SIZE * 0.05);

  const { data } = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const cells: boolean[] = new Array(GRID_COLS * GRID_ROWS).fill(false);

  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const px = Math.floor(col * CELL_SIZE + CELL_SIZE / 2);
      const py = Math.floor(row * CELL_SIZE + CELL_SIZE / 2);
      const alphaIndex = (py * CANVAS_SIZE + px) * 4 + 3;
      const alpha = data[alphaIndex] ?? 0;
      cells[row * GRID_COLS + col] = alpha > LETTER_ALPHA_THRESHOLD;
    }
  }
  return cells;
}

export function LetterTraceCanvas({ letter, onComplete, strokeColor = "#ff6b6b" }: LetterTraceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterCellsRef = useRef<boolean[]>([]);
  const touchedCellsRef = useRef<boolean[]>([]);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const completedRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const drawGuide = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "rgba(43, 37, 64, 0.12)";
    ctx.font = `bold ${CANVAS_SIZE * 0.8}px Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + CANVAS_SIZE * 0.05);
  }, [letter]);

  const reset = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    letterCellsRef.current = classifyLetterCells(letter);
    touchedCellsRef.current = new Array(GRID_COLS * GRID_ROWS).fill(false);
    completedRef.current = false;
    setProgress(0);
    setCompleted(false);
    drawGuide(ctx);
  }, [letter, drawGuide]);

  useEffect(() => {
    reset();
  }, [reset]);

  function getCanvasPoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_SIZE / rect.width;
    const scaleY = CANVAS_SIZE / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function markTouched(x: number, y: number) {
    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    if (col < 0 || col >= GRID_COLS || row < 0 || row >= GRID_ROWS) return;
    touchedCellsRef.current[row * GRID_COLS + col] = true;
  }

  function updateProgress() {
    const letterCells = letterCellsRef.current;
    const touched = touchedCellsRef.current;
    const total = letterCells.filter(Boolean).length || 1;
    const done = letterCells.reduce((sum, isLetter, i) => sum + (isLetter && touched[i] ? 1 : 0), 0);
    const pct = done / total;
    setProgress(pct);
    if (pct >= COMPLETE_THRESHOLD && !completedRef.current) {
      completedRef.current = true;
      setCompleted(true);
      onComplete();
    }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const point = getCanvasPoint(e);
    lastPointRef.current = point;
    if (point) markTouched(point.x, point.y);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const point = getCanvasPoint(e);
    if (!ctx || !point) return;

    const last = lastPointRef.current ?? point;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = BRUSH_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();

    markTouched(point.x, point.y);
    markTouched(last.x, last.y);
    lastPointRef.current = point;
    updateProgress();
  }

  function handlePointerUp() {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="touch-none rounded-3xl bg-white shadow-md"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE, maxWidth: "80vw", maxHeight: "80vw" }}
          aria-label={`Trace the letter ${letter}`}
          role="img"
        />
        {completed && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl bg-white/70">
            <span className="animate-kids-pop text-6xl">🎉</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex w-full max-w-[300px] items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{ width: `${Math.min(100, Math.round(progress * 100))}%`, backgroundColor: strokeColor }}
          />
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Clear and try again"
          className="rounded-full bg-white p-2.5 shadow-sm text-[var(--kids-ink-muted)] hover:text-[var(--kids-ink)]"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {completed && (
        <p className="kids-display mt-3 text-lg font-bold text-[var(--kids-accent)]">Great job! ⭐</p>
      )}
    </div>
  );
}
