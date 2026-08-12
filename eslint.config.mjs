import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Plain Node CLI scripts (data import/build) — not part of the app
    // bundle, so require() and Node-style module patterns are expected.
    files: ["scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    rules: {
      // This rule flags the standard "hydrate client state from
      // localStorage/matchMedia after mount" pattern used deliberately
      // throughout this app (localStorage isn't available during SSR, so
      // reading it in a mount effect is the correct, hydration-safe
      // approach, not an anti-pattern to refactor away).
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
