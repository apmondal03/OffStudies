import type { PhrasalVerbEntry } from "@/types/phrasalVerb";

function slugify(phrase: string): string {
  return phrase.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * ~135 of the most commonly used English phrasal verbs. All meanings,
 * simple definitions, examples, and synonyms here are written originally
 * for this product — not sourced from, or checked against, any
 * proprietary dictionary. Coverage is chosen for everyday usefulness
 * (conversation, work, daily life), not to match any specific published
 * reference work.
 */
const RAW: Omit<PhrasalVerbEntry, "id" | "slug">[] = [
  { phrase: "give up", baseVerb: "give", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop trying to do something.", simpleDefinition: "To quit trying.", examples: ["Don't give up — you're almost fluent.", "He gave up after the third failed attempt."], synonyms: ["quit", "abandon"] },
    { id: "s2", meaning: "To stop a habit permanently.", simpleDefinition: "To quit a habit.", examples: ["She gave up sugar last year.", "I'm trying to give up biting my nails."], synonyms: ["quit", "renounce"] },
  ]},
  { phrase: "look after", baseVerb: "look", particles: ["after"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To take care of someone or something.", simpleDefinition: "To take care of.", examples: ["Can you look after my dog this weekend?", "She looks after her grandmother every evening."], synonyms: ["care for", "mind"] },
  ]},
  { phrase: "look for", baseVerb: "look", particles: ["for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To search for something or someone.", simpleDefinition: "To search for.", examples: ["I'm looking for my keys.", "We're looking for a new apartment."], synonyms: ["search for", "seek"] },
  ]},
  { phrase: "look forward to", baseVerb: "look", particles: ["forward", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To feel happy and excited about something that will happen.", simpleDefinition: "To be excited about something coming up.", examples: ["I'm looking forward to the weekend.", "We look forward to hearing from you."], synonyms: ["anticipate"] },
  ]},
  { phrase: "look into", baseVerb: "look", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To investigate or examine something.", simpleDefinition: "To investigate.", examples: ["The police are looking into the incident.", "I'll look into flight prices tonight."], synonyms: ["investigate", "examine"] },
  ]},
  { phrase: "look up", baseVerb: "look", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To search for information in a reference source.", simpleDefinition: "To search for info (in a dictionary, online, etc.).", examples: ["Look up the word if you're not sure.", "I looked it up online."], synonyms: ["search"] },
  ]},
  { phrase: "look up to", baseVerb: "look", particles: ["up", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To admire and respect someone.", simpleDefinition: "To admire someone.", examples: ["She's always looked up to her older sister.", "Young players look up to him as a role model."], synonyms: ["admire", "respect"] },
  ]},
  { phrase: "look down on", baseVerb: "look", particles: ["down", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To think you are better than someone; to regard someone as inferior.", simpleDefinition: "To feel superior to someone.", examples: ["He looks down on people who didn't go to college.", "Try not to look down on others' choices."], synonyms: ["disdain", "belittle"] },
  ]},
  { phrase: "look out", baseVerb: "look", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "Used to warn someone of danger; to be careful.", simpleDefinition: "Watch out! / Be careful.", examples: ["Look out! That car isn't stopping.", "Look out for icy patches on the road."], synonyms: ["watch out"] },
  ]},
  { phrase: "turn on", baseVerb: "turn", particles: ["on"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To make a device or light start working.", simpleDefinition: "To switch something on.", examples: ["Turn on the lights, please.", "Can you turn the TV on?"], synonyms: ["switch on", "activate"] },
  ]},
  { phrase: "turn off", baseVerb: "turn", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To make a device or light stop working.", simpleDefinition: "To switch something off.", examples: ["Turn off the stove before you leave.", "I turned it off to save the battery."], synonyms: ["switch off", "shut off"] },
  ]},
  { phrase: "turn up", baseVerb: "turn", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To arrive somewhere, often unexpectedly or late.", simpleDefinition: "To show up.", examples: ["He turned up an hour late.", "Guess who turned up at the party!"], synonyms: ["show up", "appear"] },
    { id: "s2", meaning: "To increase the volume or level of something.", simpleDefinition: "To make something louder or stronger.", examples: ["Can you turn up the music?", "Turn the heat up a little."], synonyms: ["raise"] },
  ]},
  { phrase: "turn down", baseVerb: "turn", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To refuse an offer, request, or invitation.", simpleDefinition: "To say no to an offer.", examples: ["She turned down the promotion.", "I hate turning people down."], synonyms: ["refuse", "reject", "decline"] },
    { id: "s2", meaning: "To decrease the volume or level of something.", simpleDefinition: "To make something quieter or weaker.", examples: ["Turn down the music, it's late.", "He turned the heat down to save money."], synonyms: ["lower"] },
  ]},
  { phrase: "turn into", baseVerb: "turn", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become something different.", simpleDefinition: "To become something else.", examples: ["The caterpillar turned into a butterfly.", "A small argument turned into a big fight."], synonyms: ["become", "transform into"] },
  ]},
  { phrase: "turn out", baseVerb: "turn", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To be revealed as true, or to end up a particular way.", simpleDefinition: "To end up being true, or to end a certain way.", examples: ["It turned out she was right all along.", "The party turned out great."], synonyms: ["end up"] },
  ]},
  { phrase: "put off", baseVerb: "put", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To delay something until later.", simpleDefinition: "To postpone.", examples: ["Stop putting off the appointment.", "We put the trip off until spring."], synonyms: ["postpone", "delay"] },
  ]},
  { phrase: "put up with", baseVerb: "put", particles: ["up", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To tolerate something unpleasant without complaining.", simpleDefinition: "To tolerate.", examples: ["I can't put up with the noise anymore.", "She puts up with a lot at that job."], synonyms: ["tolerate", "endure"] },
  ]},
  { phrase: "put on", baseVerb: "put", particles: ["on"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To place clothing or an accessory on your body.", simpleDefinition: "To wear something (the act of putting it on).", examples: ["Put on your coat, it's cold.", "She put her glasses on."], synonyms: ["wear"] },
  ]},
  { phrase: "put away", baseVerb: "put", particles: ["away"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To store something in its proper place.", simpleDefinition: "To store something neatly.", examples: ["Put your toys away, please.", "I put away the groceries."], synonyms: ["store"] },
  ]},
  { phrase: "put out", baseVerb: "put", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop something from burning.", simpleDefinition: "To extinguish.", examples: ["Firefighters put out the blaze quickly.", "Please put out your cigarette."], synonyms: ["extinguish"] },
  ]},
  { phrase: "put together", baseVerb: "put", particles: ["together"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To assemble the parts of something.", simpleDefinition: "To assemble.", examples: ["It took an hour to put the shelf together.", "She put together a great presentation."], synonyms: ["assemble", "construct"] },
  ]},
  { phrase: "put back", baseVerb: "put", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To return something to where it was.", simpleDefinition: "To return something to its place.", examples: ["Put the milk back in the fridge.", "He put the book back on the shelf."], synonyms: ["replace"] },
  ]},
  { phrase: "run into", baseVerb: "run", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To meet someone by chance.", simpleDefinition: "To meet someone by accident.", examples: ["I ran into an old friend downtown.", "You'll never guess who I ran into."], synonyms: ["bump into"] },
  ]},
  { phrase: "run out of", baseVerb: "run", particles: ["out", "of"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To have none of something left.", simpleDefinition: "To use all of something up.", examples: ["We ran out of milk this morning.", "I'm running out of time."], synonyms: ["exhaust the supply of"] },
  ]},
  { phrase: "run away", baseVerb: "run", particles: ["away"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To leave a place suddenly, especially to escape.", simpleDefinition: "To flee.", examples: ["The dog ran away from the fireworks.", "She ran away from home at sixteen."], synonyms: ["flee", "escape"] },
  ]},
  { phrase: "come across", baseVerb: "come", particles: ["across"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To find something or meet someone by chance.", simpleDefinition: "To find by chance.", examples: ["I came across an old photo of us.", "She came across a great deal online."], synonyms: ["stumble upon"] },
  ]},
  { phrase: "come up with", baseVerb: "come", particles: ["up", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To think of an idea or plan.", simpleDefinition: "To think of something new.", examples: ["We need to come up with a better plan.", "She came up with a clever solution."], synonyms: ["devise", "invent"] },
  ]},
  { phrase: "come back", baseVerb: "come", particles: ["back"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To return to a place.", simpleDefinition: "To return.", examples: ["He came back from vacation yesterday.", "Come back soon!"], synonyms: ["return"] },
  ]},
  { phrase: "come out", baseVerb: "come", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To be officially released to the public.", simpleDefinition: "To be released (a movie, album, book).", examples: ["The new album comes out Friday.", "When does the sequel come out?"], synonyms: ["be released"] },
    { id: "s2", meaning: "To become known, especially something that was hidden.", simpleDefinition: "To become known.", examples: ["The truth finally came out.", "It came out that he'd known all along."], synonyms: ["emerge", "surface"] },
  ]},
  { phrase: "come over", baseVerb: "come", particles: ["over"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To visit someone's home.", simpleDefinition: "To visit (someone's place).", examples: ["Do you want to come over tonight?", "A few friends came over for dinner."], synonyms: ["visit"] },
  ]},
  { phrase: "break down", baseVerb: "break", particles: ["down"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop working (a machine or vehicle).", simpleDefinition: "To stop working (for machines).", examples: ["The car broke down on the highway.", "Our printer keeps breaking down."], synonyms: ["malfunction"] },
    { id: "s2", meaning: "To lose emotional control, often crying.", simpleDefinition: "To become very upset suddenly.", examples: ["She broke down in tears at the news.", "He broke down after the long week."], synonyms: ["fall apart emotionally"] },
  ]},
  { phrase: "break up", baseVerb: "break", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To end a romantic relationship.", simpleDefinition: "To end a relationship.", examples: ["They broke up last month.", "It's hard to break up with someone kindly."], synonyms: ["split up"] },
  ]},
  { phrase: "bring up", baseVerb: "bring", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To mention a topic in conversation.", simpleDefinition: "To mention a topic.", examples: ["I didn't want to bring up money.", "She brought up an interesting point."], synonyms: ["mention", "raise"] },
    { id: "s2", meaning: "To raise a child.", simpleDefinition: "To raise a child.", examples: ["He was brought up by his grandparents.", "They're bringing up three kids in the city."], synonyms: ["raise"] },
  ]},
  { phrase: "bring about", baseVerb: "bring", particles: ["about"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To cause something to happen.", simpleDefinition: "To cause something.", examples: ["The policy brought about real change.", "What brought about this decision?"], synonyms: ["cause", "trigger"] },
  ]},
  { phrase: "call off", baseVerb: "call", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To cancel a planned event.", simpleDefinition: "To cancel.", examples: ["They called off the wedding.", "The game was called off due to rain."], synonyms: ["cancel"] },
  ]},
  { phrase: "carry on", baseVerb: "carry", particles: ["on"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue doing something.", simpleDefinition: "To continue.", examples: ["Please carry on, I didn't mean to interrupt.", "We carried on working despite the noise."], synonyms: ["continue"] },
  ]},
  { phrase: "carry out", baseVerb: "carry", particles: ["out"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To perform or complete a task or plan.", simpleDefinition: "To perform or complete.", examples: ["The team carried out the experiment carefully.", "Researchers carried out a large survey."], synonyms: ["execute", "perform"] },
  ]},
  { phrase: "check in", baseVerb: "check", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To register your arrival at a hotel or airport.", simpleDefinition: "To register on arrival.", examples: ["We checked in at 3pm.", "You can check in online now."], synonyms: ["register"] },
  ]},
  { phrase: "check out", baseVerb: "check", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To formally leave a hotel, settling your bill.", simpleDefinition: "To leave a hotel officially.", examples: ["Checkout is at 11am.", "We checked out early to catch our flight."], synonyms: [] },
    { id: "s2", meaning: "To look at or examine something new.", simpleDefinition: "To take a look at something.", examples: ["Check out this new restaurant.", "You should check out her new book."], synonyms: ["examine"] },
  ]},
  { phrase: "cut down on", baseVerb: "cut", particles: ["down", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To reduce the amount of something you do or use.", simpleDefinition: "To reduce.", examples: ["I'm cutting down on sugar.", "We need to cut down on spending."], synonyms: ["reduce"] },
  ]},
  { phrase: "deal with", baseVerb: "deal", particles: ["with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To handle or take action on a problem or situation.", simpleDefinition: "To handle a problem.", examples: ["I'll deal with it tomorrow.", "She deals with customer complaints all day."], synonyms: ["handle", "address"] },
  ]},
  { phrase: "drop off", baseVerb: "drop", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To fall asleep, often unintentionally.", simpleDefinition: "To fall asleep.", examples: ["He dropped off during the movie.", "I keep dropping off on the train."], synonyms: ["doze off"] },
    { id: "s2", meaning: "To deliver someone or something to a place.", simpleDefinition: "To deliver / drop someone at a place.", examples: ["Can you drop me off at the station?", "I dropped the package off this morning."], synonyms: ["deliver"] },
  ]},
  { phrase: "end up", baseVerb: "end", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To eventually be in a particular place or situation.", simpleDefinition: "To eventually be somewhere or in some state.", examples: ["We ended up staying home.", "He ended up loving the city."], synonyms: ["wind up"] },
  ]},
  { phrase: "fall apart", baseVerb: "fall", particles: ["apart"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To break into pieces.", simpleDefinition: "To break into pieces.", examples: ["The old chair fell apart.", "My shoes are falling apart."], synonyms: ["disintegrate"] },
    { id: "s2", meaning: "To become extremely upset or unable to cope.", simpleDefinition: "To become extremely upset.", examples: ["She fell apart after the loss.", "He tried not to fall apart in front of them."], synonyms: ["break down"] },
  ]},
  { phrase: "figure out", baseVerb: "figure", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To understand or solve something through thought.", simpleDefinition: "To understand or solve.", examples: ["I finally figured out the problem.", "Can you figure out what this means?"], synonyms: ["work out", "solve"] },
  ]},
  { phrase: "find out", baseVerb: "find", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To discover a piece of information.", simpleDefinition: "To discover.", examples: ["I just found out the news.", "Let me find out for you."], synonyms: ["discover", "learn"] },
  ]},
  { phrase: "get along", baseVerb: "get", particles: ["along"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To have a friendly relationship with someone.", simpleDefinition: "To have a good relationship.", examples: ["They get along really well.", "Do you and your sister get along?"], synonyms: ["get on (with)"] },
  ]},
  { phrase: "get away", baseVerb: "get", particles: ["away"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To leave or escape a place.", simpleDefinition: "To escape.", examples: ["We need to get away for the weekend.", "The thief got away."], synonyms: ["escape"] },
  ]},
  { phrase: "get back", baseVerb: "get", particles: ["back"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To return to a place.", simpleDefinition: "To return.", examples: ["What time did you get back?", "I'll get back to you tomorrow."], synonyms: ["return"] },
  ]},
  { phrase: "get by", baseVerb: "get", particles: ["by"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To manage to survive or cope with limited resources.", simpleDefinition: "To manage with what you have.", examples: ["We get by on a tight budget.", "My French is good enough to get by."], synonyms: ["manage", "cope"] },
  ]},
  { phrase: "get over", baseVerb: "get", particles: ["over"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To recover from something difficult.", simpleDefinition: "To recover from something.", examples: ["It took months to get over the flu.", "She's still getting over the breakup."], synonyms: ["recover from"] },
  ]},
  { phrase: "get through", baseVerb: "get", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To complete or survive a difficult period or task.", simpleDefinition: "To complete or survive something hard.", examples: ["We'll get through this together.", "I need to get through this pile of emails."], synonyms: ["survive", "complete"] },
  ]},
  { phrase: "give away", baseVerb: "give", particles: ["away"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To give something to someone for free.", simpleDefinition: "To give for free.", examples: ["They're giving away free samples.", "I gave away my old clothes."], synonyms: ["donate"] },
    { id: "s2", meaning: "To accidentally reveal a secret.", simpleDefinition: "To accidentally reveal a secret.", examples: ["Don't give away the ending!", "His smile gave away the surprise."], synonyms: ["reveal", "let slip"] },
  ]},
  { phrase: "give back", baseVerb: "give", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To return something you borrowed.", simpleDefinition: "To return something.", examples: ["Can you give back my book?", "She gave the money back."], synonyms: ["return"] },
  ]},
  { phrase: "give in", baseVerb: "give", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop resisting and accept something.", simpleDefinition: "To surrender.", examples: ["He finally gave in and apologized.", "Don't give in to pressure."], synonyms: ["surrender", "yield"] },
  ]},
  { phrase: "give out", baseVerb: "give", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To distribute something to a group of people.", simpleDefinition: "To distribute.", examples: ["Volunteers gave out water at the race.", "She gave out flyers downtown."], synonyms: ["hand out", "distribute"] },
    { id: "s2", meaning: "To stop working, often due to exhaustion or wear.", simpleDefinition: "To stop working/functioning.", examples: ["My legs gave out after the marathon.", "The old engine finally gave out."], synonyms: ["fail"] },
  ]},
  { phrase: "go ahead", baseVerb: "go", particles: ["ahead"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To proceed with a plan or action.", simpleDefinition: "To proceed.", examples: ["Go ahead, I'm listening.", "They decided to go ahead with the wedding."], synonyms: ["proceed"] },
  ]},
  { phrase: "go on", baseVerb: "go", particles: ["on"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue.", simpleDefinition: "To continue.", examples: ["Please go on with your story.", "The meeting went on for hours."], synonyms: ["continue"] },
    { id: "s2", meaning: "To happen.", simpleDefinition: "To happen.", examples: ["What's going on out there?", "A lot has been going on lately."], synonyms: ["occur", "happen"] },
  ]},
  { phrase: "grow up", baseVerb: "grow", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To become an adult; to mature.", simpleDefinition: "To become an adult.", examples: ["She grew up in a small town.", "It's time to grow up and take responsibility."], synonyms: ["mature"] },
  ]},
  { phrase: "hand in", baseVerb: "hand", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To submit something, like homework or a report.", simpleDefinition: "To submit.", examples: ["Hand in your essays by Friday.", "I forgot to hand in my form."], synonyms: ["submit"] },
  ]},
  { phrase: "hand out", baseVerb: "hand", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To distribute something to people.", simpleDefinition: "To distribute.", examples: ["The teacher handed out the tests.", "They were handing out samples at the mall."], synonyms: ["distribute", "give out"] },
  ]},
  { phrase: "hang on", baseVerb: "hang", particles: ["on"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To wait a moment.", simpleDefinition: "To wait.", examples: ["Hang on, I'll be right there.", "Can you hang on a second?"], synonyms: ["wait", "hold on"] },
  ]},
  { phrase: "hang out", baseVerb: "hang", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To spend relaxed time with someone.", simpleDefinition: "To spend time together casually.", examples: ["We hung out at the park all afternoon.", "Want to hang out this weekend?"], synonyms: ["spend time"] },
  ]},
  { phrase: "hold on", baseVerb: "hold", particles: ["on"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To wait.", simpleDefinition: "To wait.", examples: ["Hold on, let me check.", "Please hold on for a moment."], synonyms: ["wait"] },
    { id: "s2", meaning: "To grip something tightly.", simpleDefinition: "To grip tightly.", examples: ["Hold on to the railing.", "She held on with both hands."], synonyms: ["grip"] },
  ]},
  { phrase: "keep up with", baseVerb: "keep", particles: ["up", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stay at the same pace or level as someone or something.", simpleDefinition: "To stay at the same pace.", examples: ["It's hard to keep up with the news.", "He walked fast and I struggled to keep up with him."], synonyms: ["stay abreast of"] },
  ]},
  { phrase: "let down", baseVerb: "let", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To disappoint someone by failing to do what was expected.", simpleDefinition: "To disappoint.", examples: ["I don't want to let the team down.", "He felt let down by the news."], synonyms: ["disappoint", "fail"] },
  ]},
  { phrase: "make up", baseVerb: "make", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To invent a story, excuse, or explanation.", simpleDefinition: "To invent (a story or excuse).", examples: ["He made up an excuse for being late.", "That story sounds made up."], synonyms: ["invent", "fabricate"] },
    { id: "s2", meaning: "To become friendly again after an argument.", simpleDefinition: "To become friends again after a fight.", examples: ["They argued but made up quickly.", "It's time to make up with your brother."], synonyms: ["reconcile"] },
  ]},
  { phrase: "make up for", baseVerb: "make", particles: ["up", "for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To compensate for something bad or missing.", simpleDefinition: "To compensate for.", examples: ["He bought flowers to make up for forgetting.", "Nothing can make up for lost time."], synonyms: ["compensate for"] },
  ]},
  { phrase: "move in", baseVerb: "move", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To start living in a new home.", simpleDefinition: "To start living somewhere.", examples: ["We're moving in next week.", "They moved in together last year."], synonyms: [] },
  ]},
  { phrase: "move out", baseVerb: "move", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To leave a home permanently.", simpleDefinition: "To leave a home for good.", examples: ["She moved out of her parents' house at 22.", "We're moving out at the end of the month."], synonyms: [] },
  ]},
  { phrase: "pass away", baseVerb: "pass", particles: ["away"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To die (a gentler, more indirect way of saying it).", simpleDefinition: "To die (a polite way to say it).", examples: ["Her grandfather passed away last spring.", "I'm sorry to hear he passed away."], synonyms: ["die"] },
  ]},
  { phrase: "pay off", baseVerb: "pay", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To result in success after effort or risk.", simpleDefinition: "To be worth the effort in the end.", examples: ["All that studying finally paid off.", "Their hard work paid off."], synonyms: ["be worthwhile"] },
    { id: "s2", meaning: "To pay a debt in full.", simpleDefinition: "To fully repay a debt.", examples: ["We paid off the loan early.", "It took ten years to pay off the house."], synonyms: ["repay"] },
  ]},
  { phrase: "pick up", baseVerb: "pick", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To lift something up.", simpleDefinition: "To lift.", examples: ["Pick up your toys.", "She picked up the phone."], synonyms: ["lift"] },
    { id: "s2", meaning: "To collect someone in a vehicle.", simpleDefinition: "To collect someone by car.", examples: ["I'll pick you up at 7.", "Can you pick up the kids from school?"], synonyms: ["collect"] },
    { id: "s3", meaning: "To learn something casually, without formal study.", simpleDefinition: "To learn casually.", examples: ["She picked up Spanish while traveling.", "I picked up a few tips from watching him."], synonyms: ["learn informally"] },
  ]},
  { phrase: "point out", baseVerb: "point", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To indicate or mention a specific fact.", simpleDefinition: "To indicate or mention.", examples: ["She pointed out a mistake in the report.", "Let me point out something important."], synonyms: ["indicate", "note"] },
  ]},
  { phrase: "set up", baseVerb: "set", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To establish something, like a business or system.", simpleDefinition: "To establish.", examples: ["They set up a small business.", "I need to set up my new laptop."], synonyms: ["establish"] },
    { id: "s2", meaning: "To arrange something in advance.", simpleDefinition: "To arrange in advance.", examples: ["Can you set up a meeting for Friday?", "We set everything up before the guests arrived."], synonyms: ["arrange"] },
  ]},
  { phrase: "show up", baseVerb: "show", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To arrive somewhere, sometimes unexpectedly or late.", simpleDefinition: "To arrive.", examples: ["He showed up an hour late.", "Only a few people showed up."], synonyms: ["turn up", "arrive"] },
  ]},
  { phrase: "sort out", baseVerb: "sort", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To organize something or resolve a problem.", simpleDefinition: "To organize or resolve.", examples: ["I need to sort out my finances.", "We sorted the issue out quickly."], synonyms: ["resolve", "organize"] },
  ]},
  { phrase: "speak up", baseVerb: "speak", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To talk more loudly, or to say what you think openly.", simpleDefinition: "To speak louder, or voice your opinion.", examples: ["Could you speak up? I can't hear you.", "It's important to speak up about issues that matter."], synonyms: ["raise your voice"] },
  ]},
  { phrase: "stand for", baseVerb: "stand", particles: ["for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To represent or symbolize something.", simpleDefinition: "To represent.", examples: ["What does 'CEO' stand for?", "The dove stands for peace."], synonyms: ["represent", "symbolize"] },
    { id: "s2", meaning: "To tolerate something, usually used negatively.", simpleDefinition: "To tolerate (often 'won't stand for').", examples: ["I won't stand for that kind of behavior.", "She refuses to stand for rudeness."], synonyms: ["tolerate"] },
  ]},
  { phrase: "stand out", baseVerb: "stand", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To be noticeably different or better than others.", simpleDefinition: "To be noticeably different or better.", examples: ["Her resume really stands out.", "He stood out from the other candidates."], synonyms: ["be conspicuous"] },
  ]},
  { phrase: "stand up for", baseVerb: "stand", particles: ["up", "for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To defend or support someone or something.", simpleDefinition: "To defend.", examples: ["She always stands up for her friends.", "It's important to stand up for what's right."], synonyms: ["defend", "support"] },
  ]},
  { phrase: "take after", baseVerb: "take", particles: ["after"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To resemble an older family member in appearance or character.", simpleDefinition: "To resemble a family member.", examples: ["She takes after her mother.", "He really takes after his dad."], synonyms: ["resemble"] },
  ]},
  { phrase: "take off", baseVerb: "take", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To remove clothing.", simpleDefinition: "To remove clothing.", examples: ["Take off your shoes at the door.", "He took his jacket off."], synonyms: ["remove"] },
    { id: "s2", meaning: "For a plane to leave the ground; or for something to suddenly become successful.", simpleDefinition: "For a plane to depart, or for something to suddenly succeed.", examples: ["The plane takes off at noon.", "Her career really took off last year."], synonyms: [] },
  ]},
  { phrase: "take over", baseVerb: "take", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To assume control of something.", simpleDefinition: "To take control.", examples: ["She took over the project halfway through.", "The company was taken over by a rival."], synonyms: ["assume control"] },
  ]},
  { phrase: "take up", baseVerb: "take", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To start a new hobby or activity.", simpleDefinition: "To start a new hobby.", examples: ["He took up painting last year.", "I'm thinking of taking up yoga."], synonyms: ["start"] },
    { id: "s2", meaning: "To occupy time or space.", simpleDefinition: "To occupy time or space.", examples: ["This desk takes up too much room.", "The meeting took up my whole morning."], synonyms: ["occupy"] },
  ]},
  { phrase: "think over", baseVerb: "think", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To consider something carefully before deciding.", simpleDefinition: "To consider carefully.", examples: ["Take some time to think it over.", "I need to think this over before answering."], synonyms: ["consider"] },
  ]},
  { phrase: "throw away", baseVerb: "throw", particles: ["away"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To discard something you don't want.", simpleDefinition: "To discard.", examples: ["Throw away the old newspapers.", "Don't throw that away, I need it."], synonyms: ["discard", "toss"] },
  ]},
  { phrase: "try on", baseVerb: "try", particles: ["on"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To put on clothing to see if it fits or suits you.", simpleDefinition: "To wear clothing to test the fit.", examples: ["Try on the shoes before you buy them.", "She tried on five dresses."], synonyms: [] },
  ]},
  { phrase: "wake up", baseVerb: "wake", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop sleeping.", simpleDefinition: "To stop sleeping.", examples: ["I woke up at six today.", "Try not to wake the baby up."], synonyms: [] },
  ]},
  { phrase: "warm up", baseVerb: "warm", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To prepare your body before exercise, or to become warmer.", simpleDefinition: "To prepare before exercise, or become warmer.", examples: ["Always warm up before running.", "The soup is warming up on the stove."], synonyms: [] },
  ]},
  { phrase: "wear out", baseVerb: "wear", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become damaged or thin from repeated use.", simpleDefinition: "To become worn from use.", examples: ["These shoes are wearing out.", "The constant travel wore him out."], synonyms: ["exhaust"] },
  ]},
  { phrase: "work out", baseVerb: "work", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To exercise.", simpleDefinition: "To exercise.", examples: ["I work out three times a week.", "She works out at the gym every morning."], synonyms: ["exercise"] },
    { id: "s2", meaning: "To figure out or solve something.", simpleDefinition: "To figure out.", examples: ["Can you work out this math problem?", "We worked out a solution together."], synonyms: ["figure out", "solve"] },
    { id: "s3", meaning: "To end well or successfully.", simpleDefinition: "To end well.", examples: ["I hope things work out for you.", "It all worked out in the end."], synonyms: ["succeed"] },
  ]},
  { phrase: "write down", baseVerb: "write", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To record something in writing.", simpleDefinition: "To record in writing.", examples: ["Write down your address here.", "I wrote down everything she said."], synonyms: ["record", "note down"] },
  ]},
  { phrase: "catch up", baseVerb: "catch", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To reach the same level or progress as others.", simpleDefinition: "To reach the same level as others.", examples: ["I need to catch up on my reading.", "Let's catch up over coffee soon."], synonyms: [] },
  ]},
  { phrase: "come along", baseVerb: "come", particles: ["along"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To accompany someone, or to progress well.", simpleDefinition: "To join someone, or to be progressing.", examples: ["Do you want to come along?", "The project is coming along nicely."], synonyms: [] },
  ]},
  { phrase: "count on", baseVerb: "count", particles: ["on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To rely on someone or something.", simpleDefinition: "To rely on.", examples: ["You can always count on her.", "We're counting on good weather."], synonyms: ["rely on", "depend on"] },
  ]},
  { phrase: "cut off", baseVerb: "cut", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To disconnect a supply of something.", simpleDefinition: "To disconnect a supply.", examples: ["The power was cut off during the storm.", "They cut off his internet access."], synonyms: ["disconnect"] },
    { id: "s2", meaning: "To interrupt someone who is speaking.", simpleDefinition: "To interrupt someone speaking.", examples: ["Sorry to cut you off, but I have a question.", "She kept getting cut off mid-sentence."], synonyms: ["interrupt"] },
  ]},
  { phrase: "drop by", baseVerb: "drop", particles: ["by"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To visit briefly, often without planning ahead.", simpleDefinition: "To visit briefly, unplanned.", examples: ["Feel free to drop by anytime.", "A neighbor dropped by this morning."], synonyms: ["stop by"] },
  ]},
  { phrase: "fall behind", baseVerb: "fall", particles: ["behind"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To fail to keep up with progress, a schedule, or payments.", simpleDefinition: "To fail to keep up.", examples: ["He fell behind on his rent.", "Don't let yourself fall behind in class."], synonyms: ["lag behind"] },
  ]},
  { phrase: "fall for", baseVerb: "fall", particles: ["for"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To be deceived by a trick or lie.", simpleDefinition: "To be fooled by something.", examples: ["I can't believe I fell for that.", "Don't fall for scam emails."], synonyms: ["be fooled by"] },
    { id: "s2", meaning: "To fall in love with someone.", simpleDefinition: "To fall in love with someone.", examples: ["He fell for her the moment they met.", "They fell for each other quickly."], synonyms: ["fall in love with"] },
  ]},
  { phrase: "get on", baseVerb: "get", particles: ["on"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To board a vehicle.", simpleDefinition: "To board a vehicle.", examples: ["We got on the bus at the corner.", "Get on the train before the doors close."], synonyms: ["board"] },
    { id: "s2", meaning: "To have a good relationship with someone (mainly British English).", simpleDefinition: "To have a good relationship with someone.", examples: ["How do you get on with your roommate?", "They get on really well."], synonyms: ["get along"] },
  ]},
  { phrase: "get out", baseVerb: "get", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To leave a place.", simpleDefinition: "To leave.", examples: ["Get out before it's too late.", "We got out of the meeting early."], synonyms: ["leave"] },
    { id: "s2", meaning: "For information to become known.", simpleDefinition: "For news to become known.", examples: ["Word got out about the merger.", "Somehow the news got out early."], synonyms: ["become known"] },
  ]},
  { phrase: "give up on", baseVerb: "give", particles: ["up", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop believing that someone or something will improve.", simpleDefinition: "To stop believing something will get better.", examples: ["Don't give up on him yet.", "She never gave up on her dream."], synonyms: ["abandon hope in"] },
  ]},
  { phrase: "go back", baseVerb: "go", particles: ["back"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To return to a place or a previous state.", simpleDefinition: "To return.", examples: ["I need to go back for my phone.", "Let's go back to what you said earlier."], synonyms: ["return"] },
  ]},
  { phrase: "go off", baseVerb: "go", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To explode, or make a sudden loud noise, or start ringing.", simpleDefinition: "To explode or start making noise suddenly.", examples: ["The alarm went off at 6am.", "Fireworks went off across the city."], synonyms: [] },
    { id: "s2", meaning: "For food to spoil.", simpleDefinition: "For food to go bad.", examples: ["The milk has gone off.", "Eat the leftovers before they go off."], synonyms: ["spoil"] },
  ]},
  { phrase: "go over", baseVerb: "go", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To review something carefully.", simpleDefinition: "To review carefully.", examples: ["Let's go over the numbers again.", "I went over my notes before the exam."], synonyms: ["review"] },
  ]},
  { phrase: "hold back", baseVerb: "hold", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To restrain yourself or something else.", simpleDefinition: "To restrain.", examples: ["She held back her tears.", "Don't hold back — tell me what you really think."], synonyms: ["restrain", "withhold"] },
  ]},
  { phrase: "keep on", baseVerb: "keep", particles: ["on"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue doing something, often persistently.", simpleDefinition: "To keep doing something.", examples: ["He kept on talking despite the interruptions.", "Just keep on going, you're almost there."], synonyms: ["continue"] },
  ]},
  { phrase: "lay off", baseVerb: "lay", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To dismiss employees, usually due to lack of work or money.", simpleDefinition: "To dismiss employees due to lack of work.", examples: ["The company laid off 200 workers.", "She was laid off last month."], synonyms: ["dismiss"] },
  ]},
  { phrase: "leave out", baseVerb: "leave", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To not include something or someone.", simpleDefinition: "To not include.", examples: ["You left out an important detail.", "Don't leave anyone out of the invitation."], synonyms: ["omit", "exclude"] },
  ]},
  { phrase: "log in", baseVerb: "log", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To access an online account or system.", simpleDefinition: "To sign in to an account.", examples: ["Log in with your email and password.", "I can't log in to my account."], synonyms: ["sign in"] },
  ]},
  { phrase: "log out", baseVerb: "log", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To exit an online account or system.", simpleDefinition: "To sign out of an account.", examples: ["Remember to log out on shared computers.", "I got logged out automatically."], synonyms: ["sign out"] },
  ]},
  { phrase: "mess up", baseVerb: "mess", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To make a mistake or ruin something.", simpleDefinition: "To make a mistake, or ruin something.", examples: ["I messed up the presentation.", "Sorry, I think I messed things up."], synonyms: ["botch", "ruin"] },
  ]},
  { phrase: "miss out on", baseVerb: "miss", particles: ["out", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To fail to take advantage of an opportunity.", simpleDefinition: "To fail to take an opportunity.", examples: ["Don't miss out on the early bird discount.", "He missed out on the trip."], synonyms: [] },
  ]},
  { phrase: "own up", baseVerb: "own", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To admit that you did something wrong.", simpleDefinition: "To admit fault.", examples: ["He finally owned up to the mistake.", "It's better to own up than to lie."], synonyms: ["confess", "admit"] },
  ]},
  { phrase: "pass out", baseVerb: "pass", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To lose consciousness.", simpleDefinition: "To faint.", examples: ["He passed out from the heat.", "She nearly passed out at the sight of blood."], synonyms: ["faint"] },
  ]},
  { phrase: "pull over", baseVerb: "pull", particles: ["over"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop a vehicle at the side of the road.", simpleDefinition: "To stop a car at the roadside.", examples: ["The officer told us to pull over.", "I pulled over to check the map."], synonyms: [] },
  ]},
  { phrase: "rule out", baseVerb: "rule", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To eliminate something as a possibility.", simpleDefinition: "To eliminate as a possibility.", examples: ["Doctors ruled out anything serious.", "We can't rule out bad weather."], synonyms: ["eliminate", "exclude"] },
  ]},
  { phrase: "save up", baseVerb: "save", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To gradually accumulate money for something.", simpleDefinition: "To gradually save money.", examples: ["We're saving up for a house.", "I saved up for months to buy this."], synonyms: [] },
  ]},
  { phrase: "settle down", baseVerb: "settle", particles: ["down"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To become calm.", simpleDefinition: "To become calm.", examples: ["The class settled down after the bell.", "Settle down, everyone."], synonyms: ["calm down"] },
    { id: "s2", meaning: "To start living a stable, quiet life, often in one place.", simpleDefinition: "To start a stable, settled life.", examples: ["They settled down after years of traveling.", "He wants to settle down and start a family."], synonyms: [] },
  ]},
  { phrase: "shut down", baseVerb: "shut", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stop operating, especially a machine, business, or system.", simpleDefinition: "To stop operating.", examples: ["The factory shut down last year.", "Shut down your computer before you leave."], synonyms: ["close down"] },
  ]},
  { phrase: "sign up", baseVerb: "sign", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To register for something.", simpleDefinition: "To register.", examples: ["I signed up for a cooking class.", "You can sign up online."], synonyms: ["register", "enroll"] },
  ]},
  { phrase: "slow down", baseVerb: "slow", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To reduce speed or pace.", simpleDefinition: "To reduce speed.", examples: ["Slow down, you're driving too fast.", "He needs to slow down and rest."], synonyms: [] },
  ]},
  { phrase: "start over", baseVerb: "start", particles: ["over"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To begin again from the beginning.", simpleDefinition: "To begin again.", examples: ["The file got corrupted, so I had to start over.", "Sometimes it's best to start over."], synonyms: ["begin again"] },
  ]},
  { phrase: "stay up", baseVerb: "stay", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To remain awake later than usual.", simpleDefinition: "To stay awake late.", examples: ["We stayed up talking all night.", "Try not to stay up too late."], synonyms: [] },
  ]},
  { phrase: "step down", baseVerb: "step", particles: ["down"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To resign from a position, especially one of authority.", simpleDefinition: "To resign.", examples: ["The CEO stepped down last month.", "She decided to step down from her role."], synonyms: ["resign"] },
  ]},
  { phrase: "sum up", baseVerb: "sum", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To summarize the main points of something.", simpleDefinition: "To summarize.", examples: ["To sum up, we need more time.", "Let me sum up what we discussed."], synonyms: ["summarize"] },
  ]},
  { phrase: "take back", baseVerb: "take", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To retract something you said.", simpleDefinition: "To retract a statement.", examples: ["I take back what I said earlier.", "You can't take back cruel words."], synonyms: ["retract"] },
    { id: "s2", meaning: "To return an item to a store.", simpleDefinition: "To return an item to a shop.", examples: ["I need to take this back to the store.", "She took the sweater back for a refund."], synonyms: ["return"] },
  ]},
  { phrase: "tear down", baseVerb: "tear", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To demolish a building or structure.", simpleDefinition: "To demolish.", examples: ["They tore down the old stadium.", "The house was torn down last year."], synonyms: ["demolish"] },
  ]},
  { phrase: "tidy up", baseVerb: "tidy", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To clean and organize a space.", simpleDefinition: "To clean and organize.", examples: ["Let's tidy up before guests arrive.", "I tidied up my desk today."], synonyms: ["clean up"] },
  ]},
  { phrase: "tie up", baseVerb: "tie", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To secure something with rope or string.", simpleDefinition: "To secure with rope/string.", examples: ["He tied up the boat at the dock.", "She tied up the boxes for recycling."], synonyms: [] },
    { id: "s2", meaning: "To keep someone busy so they're unavailable.", simpleDefinition: "To keep someone busy/unavailable.", examples: ["I'm tied up in meetings all day.", "Sorry, I was tied up at work."], synonyms: ["occupy"] },
  ]},
  { phrase: "top up", baseVerb: "top", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To add more of something to fill it up (e.g. money on a phone, a drink).", simpleDefinition: "To add more to fill something up.", examples: ["I need to top up my phone credit.", "Let me top up your coffee."], synonyms: ["refill"] },
  ]},
  { phrase: "touch on", baseVerb: "touch", particles: ["on"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To mention something briefly.", simpleDefinition: "To mention briefly.", examples: ["The report touches on several issues.", "We only touched on that topic today."], synonyms: ["mention briefly"] },
  ]},
  { phrase: "use up", baseVerb: "use", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To consume something completely.", simpleDefinition: "To consume completely.", examples: ["We used up all the paint.", "Don't use up all the hot water."], synonyms: ["consume", "exhaust"] },
  ]},
  { phrase: "wear off", baseVerb: "wear", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "For an effect or feeling to gradually disappear.", simpleDefinition: "To gradually disappear (an effect).", examples: ["The painkillers are wearing off.", "The novelty wore off after a week."], synonyms: ["fade"] },
  ]},
  { phrase: "work on", baseVerb: "work", particles: ["on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To spend effort trying to improve or complete something.", simpleDefinition: "To spend effort improving something.", examples: ["I'm working on my pronunciation.", "She's working on a new novel."], synonyms: [] },
  ]},
  { phrase: "write off", baseVerb: "write", particles: ["off"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To officially cancel a debt as unpayable.", simpleDefinition: "To cancel a debt.", examples: ["The bank wrote off the loan.", "The company wrote off the unpaid invoice."], synonyms: [] },
    { id: "s2", meaning: "To consider something or someone a failure and dismiss it.", simpleDefinition: "To dismiss as a failure.", examples: ["Don't write off the idea just yet.", "Critics wrote the film off early on."], synonyms: ["dismiss"] },
  ]},

  // --- Extended set: broader C2-level coverage, added to round out the
  // most common verb+particle families (get, go, come, take, put, make,
  // break, bring, call, etc.) beyond the initial starter list above. ---

  { phrase: "get up", baseVerb: "get", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To rise from bed or from a sitting/lying position.", simpleDefinition: "To get out of bed or stand up.", examples: ["I get up at six every morning.", "He got up to answer the door."], synonyms: ["rise"] },
  ]},
  { phrase: "get down", baseVerb: "get", particles: ["down"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To lower yourself physically, or to start focusing seriously on something.", simpleDefinition: "To crouch down, or to start focusing seriously.", examples: ["Get down, they'll see you!", "Let's get down to business."], synonyms: [] },
  ]},
  { phrase: "get in", baseVerb: "get", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To enter a place or vehicle, or to arrive.", simpleDefinition: "To enter, or arrive.", examples: ["What time does the flight get in?", "Get in, I'll drive you."], synonyms: ["arrive", "enter"] },
  ]},
  { phrase: "get into", baseVerb: "get", particles: ["into"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To become interested or involved in something.", simpleDefinition: "To become interested in something.", examples: ["She really got into hiking last summer.", "I'm getting into jazz lately."], synonyms: ["take up"] },
  ]},
  { phrase: "get off", baseVerb: "get", particles: ["off"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To leave a vehicle, or to leave work at the end of a shift.", simpleDefinition: "To leave a vehicle, or finish work.", examples: ["Get off at the next stop.", "I get off work at five."], synonyms: [] },
  ]},
  { phrase: "get around", baseVerb: "get", particles: ["around"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To travel from place to place, or for news to spread.", simpleDefinition: "To travel around, or for news to spread.", examples: ["It's easy to get around the city by bike.", "News of the merger got around fast."], synonyms: [] },
  ]},
  { phrase: "get around to", baseVerb: "get", particles: ["around", "to"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To eventually find time to do something you've been delaying.", simpleDefinition: "To finally find time to do something.", examples: ["I never got around to calling him back.", "She'll get around to it eventually."], synonyms: [] },
  ]},
  { phrase: "get away with", baseVerb: "get", particles: ["away", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To do something wrong without being caught or punished.", simpleDefinition: "To avoid punishment for something wrong.", examples: ["He got away with cheating on the test.", "You won't get away with this."], synonyms: [] },
  ]},
  { phrase: "get back at", baseVerb: "get", particles: ["back", "at"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To take revenge on someone.", simpleDefinition: "To get revenge on someone.", examples: ["She just wants to get back at him.", "Don't do it to get back at her."], synonyms: ["retaliate against"] },
  ]},
  { phrase: "get back to", baseVerb: "get", particles: ["back", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To contact someone again, usually with an answer.", simpleDefinition: "To reply to someone later.", examples: ["I'll get back to you by Friday.", "She never got back to me."], synonyms: [] },
  ]},
  { phrase: "get on with", baseVerb: "get", particles: ["on", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue doing something, especially after a delay.", simpleDefinition: "To continue with a task.", examples: ["Let's get on with the meeting.", "I need to get on with my work."], synonyms: ["proceed with"] },
  ]},
  { phrase: "get round to", baseVerb: "get", particles: ["round", "to"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To eventually do something after putting it off (mainly British English).", simpleDefinition: "To finally get to doing something.", examples: ["I'll get round to it this weekend.", "He never gets round to fixing things."], synonyms: [] },
  ]},
  { phrase: "get through to", baseVerb: "get", particles: ["through", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To succeed in making someone understand, or to reach someone by phone.", simpleDefinition: "To make someone understand, or reach them by phone.", examples: ["I finally got through to him about the risks.", "I couldn't get through to the office all morning."], synonyms: [] },
  ]},
  { phrase: "get ahead", baseVerb: "get", particles: ["ahead"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To make progress, especially in a career.", simpleDefinition: "To succeed and progress, especially at work.", examples: ["She works hard to get ahead at the firm.", "It's competitive if you want to get ahead here."], synonyms: ["advance", "progress"] },
  ]},
  { phrase: "get in touch", baseVerb: "get", particles: ["in", "touch"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To contact someone.", simpleDefinition: "To contact someone.", examples: ["Please get in touch if you have questions.", "I got in touch with an old classmate."], synonyms: ["reach out"] },
  ]},
  { phrase: "get rid of", baseVerb: "get", particles: ["rid", "of"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To eliminate or dispose of something unwanted.", simpleDefinition: "To throw away or eliminate something.", examples: ["I need to get rid of these old clothes.", "We finally got rid of the mice."], synonyms: ["dispose of", "eliminate"] },
  ]},
  { phrase: "get together", baseVerb: "get", particles: ["together"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To meet socially with other people.", simpleDefinition: "To meet up with people.", examples: ["Let's get together for coffee soon.", "The old team got together last weekend."], synonyms: ["meet up"] },
  ]},
  { phrase: "go about", baseVerb: "go", particles: ["about"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To begin or continue doing something, especially a task.", simpleDefinition: "To approach or begin doing a task.", examples: ["How do you go about learning a new skill?", "She went about her work quietly."], synonyms: ["approach"] },
  ]},
  { phrase: "go after", baseVerb: "go", particles: ["after"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To pursue someone or something.", simpleDefinition: "To pursue.", examples: ["He decided to go after his dream job.", "The dog went after the ball."], synonyms: ["pursue", "chase"] },
  ]},
  { phrase: "go against", baseVerb: "go", particles: ["against"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To oppose or conflict with something, like a rule or belief.", simpleDefinition: "To oppose or conflict with.", examples: ["That goes against everything we agreed on.", "It goes against my principles."], synonyms: ["oppose", "conflict with"] },
  ]},
  { phrase: "go around", baseVerb: "go", particles: ["around"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To be enough for everyone, or to circulate.", simpleDefinition: "To be enough for everyone, or to spread around.", examples: ["Is there enough food to go around?", "There's a rumor going around the office."], synonyms: [] },
  ]},
  { phrase: "go by", baseVerb: "go", particles: ["by"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "For time to pass.", simpleDefinition: "For time to pass.", examples: ["The years went by quickly.", "Not a day goes by that I don't think of it."], synonyms: ["pass"] },
  ]},
  { phrase: "go down", baseVerb: "go", particles: ["down"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To decrease, or for something to happen or be received a certain way.", simpleDefinition: "To decrease, or happen (informal).", examples: ["Prices went down last month.", "That joke didn't go down well."], synonyms: [] },
  ]},
  { phrase: "go for", baseVerb: "go", particles: ["for"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To choose or pursue something, or to attack.", simpleDefinition: "To choose, or attack.", examples: ["I'll go for the salad, thanks.", "The dog went for the mailman."], synonyms: ["choose", "attack"] },
  ]},
  { phrase: "go through", baseVerb: "go", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To experience something difficult, or to examine something carefully.", simpleDefinition: "To experience something hard, or examine carefully.", examples: ["She's going through a tough time.", "Let's go through the contract together."], synonyms: ["experience", "review"] },
  ]},
  { phrase: "go through with", baseVerb: "go", particles: ["through", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To complete a plan despite difficulty or doubt.", simpleDefinition: "To complete a plan despite doubts.", examples: ["I'm not sure I can go through with it.", "They went through with the wedding despite the storm."], synonyms: [] },
  ]},
  { phrase: "go under", baseVerb: "go", particles: ["under"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "For a business to fail financially.", simpleDefinition: "For a business to fail.", examples: ["The restaurant went under after a year.", "Many shops went under during the recession."], synonyms: ["fail", "collapse"] },
  ]},
  { phrase: "go without", baseVerb: "go", particles: ["without"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To manage without having something.", simpleDefinition: "To manage without something.", examples: ["We had to go without heating for a week.", "She'd rather go without than compromise."], synonyms: [] },
  ]},
  { phrase: "go back on", baseVerb: "go", particles: ["back", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To break a promise or agreement.", simpleDefinition: "To break a promise.", examples: ["He went back on his word.", "You can't go back on the deal now."], synonyms: [] },
  ]},
  { phrase: "go along with", baseVerb: "go", particles: ["along", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To agree to support a plan or decision, often reluctantly.", simpleDefinition: "To agree to support a plan.", examples: ["I'll go along with whatever the group decides.", "She went along with the idea to avoid conflict."], synonyms: ["support", "agree to"] },
  ]},
  { phrase: "go beyond", baseVerb: "go", particles: ["beyond"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To exceed a limit or expectation.", simpleDefinition: "To exceed a limit.", examples: ["Her dedication goes beyond what's expected.", "This goes beyond a simple misunderstanding."], synonyms: ["exceed"] },
  ]},
  { phrase: "go easy on", baseVerb: "go", particles: ["easy", "on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To treat someone gently, or to use less of something.", simpleDefinition: "To be gentle with someone, or use less of something.", examples: ["Go easy on him, he's new.", "Go easy on the salt."], synonyms: [] },
  ]},
  { phrase: "go up", baseVerb: "go", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To increase in amount, price, or level.", simpleDefinition: "To increase.", examples: ["Prices went up again this year.", "The temperature went up quickly."], synonyms: ["rise", "increase"] },
  ]},
  { phrase: "come about", baseVerb: "come", particles: ["about"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To happen; to occur, often unexpectedly.", simpleDefinition: "To happen.", examples: ["How did this situation come about?", "The change came about gradually."], synonyms: ["occur", "arise"] },
  ]},
  { phrase: "come across as", baseVerb: "come", particles: ["across", "as"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To give a particular impression to others.", simpleDefinition: "To seem a certain way to others.", examples: ["He comes across as very confident.", "Try not to come across as rude."], synonyms: ["seem", "appear"] },
  ]},
  { phrase: "come apart", baseVerb: "come", particles: ["apart"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To break into separate pieces.", simpleDefinition: "To break apart.", examples: ["The old book came apart in my hands.", "The toy came apart after a week."], synonyms: ["fall apart"] },
  ]},
  { phrase: "come around", baseVerb: "come", particles: ["around"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To change your opinion to agree with someone, or to regain consciousness.", simpleDefinition: "To change your mind, or wake up after fainting.", examples: ["He finally came around to my idea.", "She came around a few minutes after fainting."], synonyms: [] },
  ]},
  { phrase: "come between", baseVerb: "come", particles: ["between"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To disrupt the relationship between two people.", simpleDefinition: "To disrupt a relationship between people.", examples: ["Don't let money come between you two.", "Nothing will come between us."], synonyms: [] },
  ]},
  { phrase: "come by", baseVerb: "come", particles: ["by"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To obtain something, often with difficulty.", simpleDefinition: "To obtain something.", examples: ["Good jobs are hard to come by these days.", "How did you come by this information?"], synonyms: ["obtain", "acquire"] },
  ]},
  { phrase: "come down to", baseVerb: "come", particles: ["down", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To have something as the essential point or deciding factor.", simpleDefinition: "To have something as the main point.", examples: ["It all comes down to trust.", "It comes down to how much time you have."], synonyms: [] },
  ]},
  { phrase: "come down with", baseVerb: "come", particles: ["down", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become ill with something.", simpleDefinition: "To get sick with an illness.", examples: ["I think I'm coming down with a cold.", "She came down with the flu last week."], synonyms: [] },
  ]},
  { phrase: "come forward", baseVerb: "come", particles: ["forward"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To offer information or help, especially to authorities.", simpleDefinition: "To offer information, especially to the police.", examples: ["A witness came forward with new details.", "Please come forward if you saw anything."], synonyms: [] },
  ]},
  { phrase: "come into", baseVerb: "come", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To inherit money or property, or to acquire.", simpleDefinition: "To inherit or acquire something.", examples: ["She came into a small fortune.", "He came into some land from his uncle."], synonyms: ["inherit"] },
  ]},
  { phrase: "come off", baseVerb: "come", particles: ["off"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To detach from something, or for a plan to succeed.", simpleDefinition: "To detach, or (of a plan) succeed.", examples: ["The button came off my shirt.", "The plan came off exactly as hoped."], synonyms: [] },
  ]},
  { phrase: "come through", baseVerb: "come", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To survive a difficult situation, or to do what was promised.", simpleDefinition: "To survive something hard, or deliver on a promise.", examples: ["We came through the crisis together.", "He came through for us when we needed him."], synonyms: [] },
  ]},
  { phrase: "come to", baseVerb: "come", particles: ["to"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To regain consciousness, or to total an amount.", simpleDefinition: "To wake up after fainting, or to add up to a total.", examples: ["She slowly came to after the accident.", "The bill came to $50."], synonyms: [] },
  ]},
  { phrase: "come under", baseVerb: "come", particles: ["under"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To be subject to something, like criticism or control.", simpleDefinition: "To become subject to something (e.g. criticism).", examples: ["The policy came under heavy criticism.", "The region came under new management."], synonyms: [] },
  ]},
  { phrase: "come up", baseVerb: "come", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To arise or be mentioned, or to approach in time.", simpleDefinition: "To arise, or be mentioned in conversation.", examples: ["Something came up at work.", "Her name came up in the meeting."], synonyms: ["arise"] },
  ]},
  { phrase: "come up against", baseVerb: "come", particles: ["up", "against"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To be faced with an obstacle or opponent.", simpleDefinition: "To face a difficulty or opponent.", examples: ["We came up against a lot of resistance.", "The team came up against a strong rival."], synonyms: ["encounter"] },
  ]},
  { phrase: "take aback", baseVerb: "take", particles: ["aback"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To surprise or shock someone (usually passive: 'be taken aback').", simpleDefinition: "To surprise someone.", examples: ["I was taken aback by his response.", "She was taken aback by the sudden question."], synonyms: ["surprise", "startle"] },
  ]},
  { phrase: "take apart", baseVerb: "take", particles: ["apart"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To disassemble something into its parts.", simpleDefinition: "To disassemble.", examples: ["He took the engine apart to clean it.", "She took apart the old radio."], synonyms: ["disassemble"] },
  ]},
  { phrase: "take away", baseVerb: "take", particles: ["away"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To remove something, or to conclude something from an experience.", simpleDefinition: "To remove, or to learn a lesson from something.", examples: ["They took away his license.", "What did you take away from the workshop?"], synonyms: ["remove"] },
  ]},
  { phrase: "take down", baseVerb: "take", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To write information down, or to remove/dismantle something.", simpleDefinition: "To write down, or remove/dismantle something.", examples: ["Let me take down your number.", "They took down the old fence."], synonyms: ["note", "dismantle"] },
  ]},
  { phrase: "take in", baseVerb: "take", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To understand or absorb information, or to let someone stay with you.", simpleDefinition: "To understand fully, or to shelter someone.", examples: ["There was a lot of information to take in.", "They took in a stray cat."], synonyms: ["absorb", "shelter"] },
  ]},
  { phrase: "take on", baseVerb: "take", particles: ["on"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To accept a responsibility or challenge, or to hire someone.", simpleDefinition: "To accept a task, or to hire.", examples: ["She took on extra responsibilities.", "The company is taking on new staff."], synonyms: ["accept", "hire"] },
  ]},
  { phrase: "take out", baseVerb: "take", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To remove something from a place, or to take someone on a date/outing.", simpleDefinition: "To remove, or take someone out socially.", examples: ["Take the trash out, please.", "He took her out for dinner."], synonyms: ["remove"] },
  ]},
  { phrase: "take out on", baseVerb: "take", particles: ["out", "on"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To direct your bad mood or anger toward someone unfairly.", simpleDefinition: "To unfairly direct anger at someone.", examples: ["Don't take it out on me, it's not my fault.", "He took his frustration out on his team."], synonyms: [] },
  ]},
  { phrase: "take to", baseVerb: "take", particles: ["to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To start liking someone or something quickly, or to begin doing something as a habit.", simpleDefinition: "To quickly start liking something, or start doing it as a habit.", examples: ["She took to her new job right away.", "He's taken to jogging every morning."], synonyms: [] },
  ]},
  { phrase: "take upon", baseVerb: "take", particles: ["upon"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To accept a responsibility yourself, often without being asked (usually 'take it upon yourself').", simpleDefinition: "To accept a responsibility without being asked.", examples: ["She took it upon herself to organize the event.", "He took it upon himself to apologize for the team."], synonyms: [] },
  ]},
  { phrase: "put across", baseVerb: "put", particles: ["across"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To communicate an idea clearly so others understand it.", simpleDefinition: "To communicate an idea clearly.", examples: ["She put her argument across convincingly.", "He struggled to put his point across."], synonyms: ["convey"] },
  ]},
  { phrase: "put aside", baseVerb: "put", particles: ["aside"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To save something for later, or to set aside a disagreement.", simpleDefinition: "To save for later, or set a disagreement aside.", examples: ["I put some money aside each month.", "Let's put our differences aside for now."], synonyms: ["set aside"] },
  ]},
  { phrase: "put down", baseVerb: "put", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To place something down, or to criticize someone to make them feel small.", simpleDefinition: "To place down, or criticize someone unkindly.", examples: ["Put the phone down and listen.", "He's always putting his coworkers down."], synonyms: ["criticize", "belittle"] },
  ]},
  { phrase: "put down to", baseVerb: "put", particles: ["down", "to"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To attribute something to a particular cause.", simpleDefinition: "To attribute something to a cause.", examples: ["I put my success down to hard work.", "She put his mood down to stress."], synonyms: ["attribute to"] },
  ]},
  { phrase: "put forward", baseVerb: "put", particles: ["forward"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To suggest or propose an idea for consideration.", simpleDefinition: "To propose an idea.", examples: ["She put forward a new proposal.", "Several names were put forward for the role."], synonyms: ["propose", "suggest"] },
  ]},
  { phrase: "put in", baseVerb: "put", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To invest time or effort, or to submit a request/application.", simpleDefinition: "To invest effort, or submit a request.", examples: ["She put in a lot of extra hours.", "He put in a request for vacation."], synonyms: [] },
  ]},
  { phrase: "put through", baseVerb: "put", particles: ["through"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To connect someone by phone, or to make someone experience something difficult.", simpleDefinition: "To connect by phone, or make someone go through something hard.", examples: ["Can you put me through to sales?", "She put her family through a lot that year."], synonyms: [] },
  ]},
  { phrase: "put up", baseVerb: "put", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To erect or display something, or to provide temporary lodging for someone.", simpleDefinition: "To put something up (a sign, a tent), or host someone overnight.", examples: ["They put up a new fence.", "Can you put me up for the night?"], synonyms: [] },
  ]},
  { phrase: "make for", baseVerb: "make", particles: ["for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To head toward a place, or to result in something.", simpleDefinition: "To head toward, or result in.", examples: ["We made for the exit as soon as the alarm sounded.", "Good communication makes for a healthy relationship."], synonyms: [] },
  ]},
  { phrase: "make of", baseVerb: "make", particles: ["of"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To interpret or form an opinion about something (usually 'what do you make of...').", simpleDefinition: "To interpret or form an opinion of something.", examples: ["What do you make of the new policy?", "I don't know what to make of his silence."], synonyms: ["interpret"] },
  ]},
  { phrase: "make off with", baseVerb: "make", particles: ["off", "with"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To steal something and leave quickly.", simpleDefinition: "To steal and run off.", examples: ["The thief made off with her purse.", "They made off with thousands in cash."], synonyms: ["steal"] },
  ]},
  { phrase: "make out", baseVerb: "make", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To manage to see, hear, or understand something with difficulty.", simpleDefinition: "To manage to see, hear, or understand with difficulty.", examples: ["I could barely make out his handwriting.", "It was hard to make out what she was saying."], synonyms: ["discern"] },
  ]},
  { phrase: "make over", baseVerb: "make", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To change the appearance of someone or something significantly.", simpleDefinition: "To transform the appearance of something.", examples: ["They made over the whole kitchen.", "She got made over for the photoshoot."], synonyms: ["transform"] },
  ]},
  { phrase: "make do", baseVerb: "make", particles: ["do"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To manage with what's available, even if it isn't ideal.", simpleDefinition: "To manage with what you have.", examples: ["We'll have to make do with what's in the fridge.", "They made do without a car for a year."], synonyms: ["get by"] },
  ]},
  { phrase: "break away", baseVerb: "break", particles: ["away"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To escape or separate from a group or situation.", simpleDefinition: "To escape or separate from a group.", examples: ["The runner broke away from the pack.", "She broke away from her family's traditions."], synonyms: ["escape", "separate"] },
  ]},
  { phrase: "break even", baseVerb: "break", particles: ["even"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To make neither a profit nor a loss.", simpleDefinition: "To have income equal expenses (no profit, no loss).", examples: ["The business finally broke even this year.", "We just need to break even on this project."], synonyms: [] },
  ]},
  { phrase: "break in", baseVerb: "break", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To enter a building illegally by force, or to interrupt.", simpleDefinition: "To enter illegally by force, or interrupt.", examples: ["Someone broke in last night.", "Sorry to break in, but there's a call for you."], synonyms: ["burglarize"] },
  ]},
  { phrase: "break into", baseVerb: "break", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To enter a place illegally by force, or to suddenly start doing something.", simpleDefinition: "To enter illegally, or suddenly start doing something.", examples: ["Thieves broke into the store overnight.", "She broke into a smile."], synonyms: [] },
  ]},
  { phrase: "break off", baseVerb: "break", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To end something suddenly, like a relationship or conversation.", simpleDefinition: "To suddenly end something.", examples: ["They broke off the engagement.", "He broke off mid-sentence."], synonyms: ["end abruptly"] },
  ]},
  { phrase: "break out", baseVerb: "break", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "For something bad to start suddenly (fire, war, disease), or to escape from confinement.", simpleDefinition: "For something bad to start suddenly, or to escape.", examples: ["A fire broke out downtown.", "Prisoners broke out last night."], synonyms: ["erupt", "escape"] },
  ]},
  { phrase: "break through", baseVerb: "break", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To overcome an obstacle and achieve success.", simpleDefinition: "To overcome an obstacle successfully.", examples: ["Researchers broke through a major barrier.", "She finally broke through in her career."], synonyms: [] },
  ]},
  { phrase: "bring back", baseVerb: "bring", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To return with something, or to reintroduce something, or to trigger a memory.", simpleDefinition: "To return with something, reintroduce it, or remind someone of the past.", examples: ["Can you bring back some milk?", "That song brings back memories."], synonyms: [] },
  ]},
  { phrase: "bring down", baseVerb: "bring", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To cause someone or something to fail or fall, or to reduce a level.", simpleDefinition: "To cause to fail, or reduce something.", examples: ["The scandal brought down the government.", "This should bring your fever down."], synonyms: ["reduce", "topple"] },
  ]},
  { phrase: "bring forward", baseVerb: "bring", particles: ["forward"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To move an event to an earlier time, or to present something for discussion.", simpleDefinition: "To move something earlier, or present it for discussion.", examples: ["We brought the meeting forward to Monday.", "She brought forward a new proposal."], synonyms: [] },
  ]},
  { phrase: "bring in", baseVerb: "bring", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To introduce something new, or to earn income.", simpleDefinition: "To introduce something new, or to earn money.", examples: ["They brought in new regulations.", "The business brings in steady revenue."], synonyms: ["introduce", "earn"] },
  ]},
  { phrase: "bring off", baseVerb: "bring", particles: ["off"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To succeed at something difficult.", simpleDefinition: "To successfully achieve something difficult.", examples: ["They somehow brought off a stunning victory.", "It was a difficult plan, but she brought it off."], synonyms: ["pull off"] },
  ]},
  { phrase: "bring on", baseVerb: "bring", particles: ["on"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To cause something, especially a symptom or problem.", simpleDefinition: "To cause something, especially a health issue.", examples: ["Stress can bring on headaches.", "What brought this on?"], synonyms: ["cause", "trigger"] },
  ]},
  { phrase: "bring out", baseVerb: "bring", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To release a product, or to make a quality more noticeable.", simpleDefinition: "To release something, or highlight a quality.", examples: ["They're bringing out a new phone model.", "That color brings out your eyes."], synonyms: ["release", "highlight"] },
  ]},
  { phrase: "bring together", baseVerb: "bring", particles: ["together"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To unite people or things.", simpleDefinition: "To unite people or things.", examples: ["The project brought together experts from many fields.", "Tragedy brought the community together."], synonyms: ["unite"] },
  ]},
  { phrase: "call back", baseVerb: "call", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To return a phone call.", simpleDefinition: "To return a phone call.", examples: ["I'll call you back in ten minutes.", "She never called back."], synonyms: [] },
  ]},
  { phrase: "call for", baseVerb: "call", particles: ["for"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To publicly demand or require something.", simpleDefinition: "To publicly demand something.", examples: ["Protesters called for change.", "This situation calls for patience."], synonyms: ["demand", "require"] },
  ]},
  { phrase: "call in", baseVerb: "call", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To request the help of a professional or specialist, or to phone in to report absence.", simpleDefinition: "To request expert help, or phone in sick.", examples: ["They called in a specialist.", "He called in sick today."], synonyms: [] },
  ]},
  { phrase: "call on", baseVerb: "call", particles: ["on"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To formally ask someone to do something, or to visit someone briefly.", simpleDefinition: "To formally ask someone, or visit them briefly.", examples: ["The teacher called on a student to answer.", "We called on our neighbors yesterday."], synonyms: [] },
  ]},
  { phrase: "call out", baseVerb: "call", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To shout something, or to publicly criticize someone for wrongdoing.", simpleDefinition: "To shout out, or publicly criticize someone.", examples: ["He called out her name across the street.", "She called out the company for false advertising."], synonyms: [] },
  ]},
  { phrase: "call up", baseVerb: "call", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To phone someone, or to summon someone for military service.", simpleDefinition: "To phone someone, or summon for military duty.", examples: ["I'll call up the restaurant to book a table.", "He was called up to serve."], synonyms: [] },
  ]},
  { phrase: "carry away", baseVerb: "carry", particles: ["away"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To become extremely excited or emotional (usually passive: 'get carried away').", simpleDefinition: "To become overly excited (usually 'get carried away').", examples: ["Sorry, I got carried away with the planning.", "Don't get carried away, it's just an idea."], synonyms: [] },
  ]},
  { phrase: "carry off", baseVerb: "carry", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To successfully accomplish something difficult or risky.", simpleDefinition: "To successfully pull off something difficult.", examples: ["She carried off the performance perfectly.", "It was a bold look, but he carried it off."], synonyms: ["pull off"] },
  ]},
  { phrase: "carry over", baseVerb: "carry", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue or transfer to a later time or different situation.", simpleDefinition: "To continue or transfer to later.", examples: ["Unused vacation days carry over to next year.", "The habit carried over from her old job."], synonyms: ["transfer"] },
  ]},
  { phrase: "check off", baseVerb: "check", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To mark an item on a list as completed.", simpleDefinition: "To mark an item as done.", examples: ["She checked off each task as she finished it.", "I checked everything off my list."], synonyms: ["tick off"] },
  ]},
  { phrase: "check up on", baseVerb: "check", particles: ["up", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To make sure someone or something is okay by looking or asking.", simpleDefinition: "To make sure someone/something is okay.", examples: ["I'm just checking up on you.", "The nurse checks up on patients regularly."], synonyms: [] },
  ]},
  { phrase: "cut across", baseVerb: "cut", particles: ["across"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To affect or apply to multiple groups or categories.", simpleDefinition: "To affect multiple groups at once.", examples: ["This issue cuts across political lines.", "The problem cuts across all departments."], synonyms: [] },
  ]},
  { phrase: "cut back", baseVerb: "cut", particles: ["back"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To reduce spending or consumption of something.", simpleDefinition: "To reduce spending or use of something.", examples: ["We need to cut back on eating out.", "The company cut back on staff."], synonyms: ["reduce", "cut down"] },
  ]},
  { phrase: "cut in", baseVerb: "cut", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To interrupt, or to move a vehicle suddenly in front of another.", simpleDefinition: "To interrupt, or suddenly move in front of a vehicle.", examples: ["Sorry to cut in, but that's not correct.", "The car cut in right in front of us."], synonyms: ["interrupt"] },
  ]},
  { phrase: "cut out", baseVerb: "cut", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To stop doing something, especially something bad, or to remove something.", simpleDefinition: "To stop doing something, or remove it.", examples: ["You need to cut out the junk food.", "Cut it out, that's not funny."], synonyms: ["quit", "remove"] },
  ]},
  { phrase: "cut through", baseVerb: "cut", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To take a shorter path, or to get straight to the important point.", simpleDefinition: "To take a shortcut, or get straight to the point.", examples: ["We cut through the park to save time.", "Let's cut through the small talk."], synonyms: [] },
  ]},
  { phrase: "cut up", baseVerb: "cut", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To cut something into smaller pieces.", simpleDefinition: "To cut into small pieces.", examples: ["Cut up the vegetables for the soup.", "She cut the paper up into strips."], synonyms: [] },
  ]},
  { phrase: "fall back", baseVerb: "fall", particles: ["back"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To retreat, or to move to a later position.", simpleDefinition: "To retreat.", examples: ["The troops fell back under pressure.", "We fell back to our original plan."], synonyms: ["retreat"] },
  ]},
  { phrase: "fall back on", baseVerb: "fall", particles: ["back", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To rely on something as a backup when other options fail.", simpleDefinition: "To rely on something as a backup plan.", examples: ["It's good to have savings to fall back on.", "She fell back on her teaching degree."], synonyms: ["rely on"] },
  ]},
  { phrase: "fall down", baseVerb: "fall", particles: ["down"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To physically drop to the ground, or (of a plan) to fail at a specific point.", simpleDefinition: "To drop to the ground, or fail at a certain point.", examples: ["He fell down on the ice.", "That's where the plan falls down."], synonyms: [] },
  ]},
  { phrase: "fall in", baseVerb: "fall", particles: ["in"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To collapse inward, or (military) to line up in formation.", simpleDefinition: "To collapse inward, or line up in formation.", examples: ["The roof fell in during the storm.", "The soldiers fell in immediately."], synonyms: [] },
  ]},
  { phrase: "fall in love", baseVerb: "fall", particles: ["in", "love"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To begin to feel romantic love for someone.", simpleDefinition: "To begin loving someone romantically.", examples: ["They fell in love in college.", "I fell in love with the city instantly."], synonyms: [] },
  ]},
  { phrase: "fall off", baseVerb: "fall", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To drop from a surface, or to decrease.", simpleDefinition: "To drop off, or decrease.", examples: ["The picture fell off the wall.", "Sales fell off in the winter."], synonyms: ["decline"] },
  ]},
  { phrase: "fall out", baseVerb: "fall", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To have an argument that damages a relationship.", simpleDefinition: "To argue and damage a relationship.", examples: ["The two friends fell out over money.", "They fell out years ago and never spoke again."], synonyms: ["quarrel"] },
  ]},
  { phrase: "fall through", baseVerb: "fall", particles: ["through"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "For a plan to fail to happen.", simpleDefinition: "For a plan to fail.", examples: ["Our vacation plans fell through.", "The deal fell through at the last minute."], synonyms: ["collapse"] },
  ]},
  { phrase: "hold off", baseVerb: "hold", particles: ["off"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To delay doing something, or to keep something at a distance.", simpleDefinition: "To delay, or keep something away.", examples: ["Let's hold off on the decision until Monday.", "They held off the attackers."], synonyms: ["delay", "postpone"] },
  ]},
  { phrase: "hold onto", baseVerb: "hold", particles: ["onto"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To keep something, or to grip something firmly.", simpleDefinition: "To keep something, or grip it tightly.", examples: ["Hold onto your ticket.", "She held onto the railing."], synonyms: ["keep", "grip"] },
  ]},
  { phrase: "hold out", baseVerb: "hold", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue resisting or surviving under difficult conditions.", simpleDefinition: "To keep resisting or surviving.", examples: ["The team held out until reinforcements arrived.", "Our supplies held out for a week."], synonyms: ["persist"] },
  ]},
  { phrase: "hold up", baseVerb: "hold", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To delay something, or to remain strong/valid under pressure.", simpleDefinition: "To delay something, or stay strong under pressure.", examples: ["Sorry, traffic held me up.", "Her argument didn't hold up in court."], synonyms: ["delay"] },
  ]},
  { phrase: "keep at", baseVerb: "keep", particles: ["at"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To continue trying at something difficult.", simpleDefinition: "To keep trying at something hard.", examples: ["Keep at it, you're improving.", "She kept at her studies despite the setbacks."], synonyms: ["persist"] },
  ]},
  { phrase: "keep away", baseVerb: "keep", particles: ["away"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stay at a distance from something, or to prevent someone from approaching.", simpleDefinition: "To stay away, or keep someone away.", examples: ["Keep away from the edge.", "They kept the press away from the family."], synonyms: [] },
  ]},
  { phrase: "keep back", baseVerb: "keep", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To withhold something, or to stay at a distance.", simpleDefinition: "To withhold something, or stay back.", examples: ["She kept back some information.", "Please keep back from the stage."], synonyms: ["withhold"] },
  ]},
  { phrase: "keep down", baseVerb: "keep", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To control or limit something, like costs or noise.", simpleDefinition: "To control or limit something.", examples: ["We're trying to keep costs down.", "Keep it down, people are sleeping."], synonyms: ["limit", "control"] },
  ]},
  { phrase: "keep from", baseVerb: "keep", particles: ["from"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To prevent yourself or someone from doing something.", simpleDefinition: "To prevent (yourself or someone) from doing something.", examples: ["I couldn't keep from laughing.", "They kept the news from her for weeks."], synonyms: ["prevent"] },
  ]},
  { phrase: "keep off", baseVerb: "keep", particles: ["off"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stay away from something, or to avoid a topic.", simpleDefinition: "To stay away from something.", examples: ["Keep off the grass.", "Let's keep off that subject at dinner."], synonyms: ["avoid"] },
  ]},
  { phrase: "keep to", baseVerb: "keep", particles: ["to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To stick to a plan, schedule, or topic.", simpleDefinition: "To stick to a plan or topic.", examples: ["Let's keep to the schedule.", "Please keep to the point."], synonyms: ["stick to"] },
  ]},
  { phrase: "keep up", baseVerb: "keep", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To maintain a pace or standard, or to continue an activity.", simpleDefinition: "To maintain a pace, or keep doing something.", examples: ["Keep up the good work.", "It's hard to keep up when you're this tired."], synonyms: ["maintain"] },
  ]},
  { phrase: "pick at", baseVerb: "pick", particles: ["at"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To eat food in small amounts without much appetite, or to pull at something repeatedly.", simpleDefinition: "To eat a little without appetite, or fidget with something.", examples: ["She just picked at her salad.", "Stop picking at the scab."], synonyms: [] },
  ]},
  { phrase: "pick off", baseVerb: "pick", particles: ["off"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To target and eliminate individuals one at a time.", simpleDefinition: "To target and remove individuals one by one.", examples: ["The sniper picked off targets one by one.", "Predators pick off the weakest in the herd."], synonyms: [] },
  ]},
  { phrase: "pick on", baseVerb: "pick", particles: ["on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To repeatedly criticize or bully someone.", simpleDefinition: "To bully or repeatedly criticize someone.", examples: ["Stop picking on your little brother.", "She felt picked on at work."], synonyms: ["bully", "tease"] },
  ]},
  { phrase: "pick out", baseVerb: "pick", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To select something from a group, or to identify something visually.", simpleDefinition: "To select, or to spot/identify something.", examples: ["He picked out a tie for the interview.", "I picked her out in the crowd."], synonyms: ["select", "identify"] },
  ]},
  { phrase: "pick up on", baseVerb: "pick", particles: ["up", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To notice something subtle.", simpleDefinition: "To notice something subtle.", examples: ["She picked up on his sarcasm.", "I picked up on some tension in the room."], synonyms: ["notice", "detect"] },
  ]},
  { phrase: "run after", baseVerb: "run", particles: ["after"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To chase someone or something.", simpleDefinition: "To chase.", examples: ["The dog ran after the car.", "She ran after the bus but missed it."], synonyms: ["chase"] },
  ]},
  { phrase: "run down", baseVerb: "run", particles: ["down"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To criticize someone harshly, or for a battery/supply to gradually lose power.", simpleDefinition: "To criticize harshly, or (of a battery) to lose power.", examples: ["He's always running down his coworkers.", "My phone battery ran down fast."], synonyms: ["criticize"] },
  ]},
  { phrase: "run off", baseVerb: "run", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To leave suddenly, often to escape.", simpleDefinition: "To leave suddenly.", examples: ["He ran off before I could say goodbye.", "The kids ran off to play."], synonyms: ["flee"] },
  ]},
  { phrase: "run over", baseVerb: "run", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To hit someone or something with a vehicle, or to review something quickly.", simpleDefinition: "To hit with a vehicle, or quickly review something.", examples: ["Careful, don't run over the cat.", "Let's run over the plan once more."], synonyms: [] },
  ]},
  { phrase: "run through", baseVerb: "run", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To review or rehearse something quickly.", simpleDefinition: "To quickly review or rehearse.", examples: ["Let's run through the presentation once more.", "She ran through her notes before the exam."], synonyms: ["rehearse", "review"] },
  ]},
  { phrase: "run up", baseVerb: "run", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To accumulate a debt or bill quickly.", simpleDefinition: "To accumulate a debt quickly.", examples: ["He ran up a huge credit card bill.", "They ran up quite a tab at the bar."], synonyms: ["accumulate"] },
  ]},
  { phrase: "set about", baseVerb: "set", particles: ["about"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To begin doing a task with purpose.", simpleDefinition: "To begin a task purposefully.", examples: ["She set about redecorating the house.", "They set about solving the problem immediately."], synonyms: ["begin", "start"] },
  ]},
  { phrase: "set apart", baseVerb: "set", particles: ["apart"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To make something distinct or different from others.", simpleDefinition: "To make something distinct from others.", examples: ["Her creativity sets her apart.", "This feature sets the product apart from competitors."], synonyms: ["distinguish"] },
  ]},
  { phrase: "set aside", baseVerb: "set", particles: ["aside"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To save something for later use, or to disregard something temporarily.", simpleDefinition: "To save for later, or temporarily disregard.", examples: ["I set aside some savings each month.", "Let's set aside our disagreement for now."], synonyms: ["reserve"] },
  ]},
  { phrase: "set back", baseVerb: "set", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To delay progress, or (informal) to cost a certain amount.", simpleDefinition: "To delay progress, or cost money.", examples: ["The storm set back construction by weeks.", "The repairs set us back $500."], synonyms: ["delay"] },
  ]},
  { phrase: "set forth", baseVerb: "set", particles: ["forth"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To present or state something formally, or to begin a journey.", simpleDefinition: "To formally present something, or start a journey.", examples: ["The report sets forth clear recommendations.", "They set forth at dawn."], synonyms: ["state", "present"] },
  ]},
  { phrase: "set in", baseVerb: "set", particles: ["in"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "For something unwelcome to begin and seem likely to continue.", simpleDefinition: "For something unpleasant to begin and settle in.", examples: ["Winter set in early this year.", "Panic began to set in."], synonyms: [] },
  ]},
  { phrase: "set out", baseVerb: "set", particles: ["out"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To begin a journey, or to begin with a particular goal in mind.", simpleDefinition: "To start a journey, or start with a clear goal.", examples: ["They set out at sunrise.", "She set out to prove them wrong."], synonyms: ["depart", "embark"] },
  ]},
  { phrase: "stand by", baseVerb: "stand", particles: ["by"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To support someone loyally, or to be ready and waiting.", simpleDefinition: "To support someone, or be ready and waiting.", examples: ["I'll stand by you no matter what.", "Emergency crews are standing by."], synonyms: ["support"] },
  ]},
  { phrase: "stand down", baseVerb: "stand", particles: ["down"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To resign from a position, or to stop being on alert.", simpleDefinition: "To resign, or stop being on alert.", examples: ["The minister stood down after the scandal.", "Troops were told to stand down."], synonyms: ["resign", "step down"] },
  ]},
  { phrase: "stand in for", baseVerb: "stand", particles: ["in", "for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To temporarily take someone's place or role.", simpleDefinition: "To temporarily take someone's place.", examples: ["She stood in for the manager while he was away.", "Can you stand in for me tomorrow?"], synonyms: ["substitute for"] },
  ]},
  { phrase: "step aside", baseVerb: "step", particles: ["aside"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To resign or give up a position, or to physically move out of the way.", simpleDefinition: "To resign a position, or move out of the way.", examples: ["He stepped aside to let someone new lead.", "Please step aside so others can pass."], synonyms: [] },
  ]},
  { phrase: "step back", baseVerb: "step", particles: ["back"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To pause and consider a situation from a distance.", simpleDefinition: "To pause and look at a situation objectively.", examples: ["Let's step back and think about this.", "She stepped back from the project to reassess."], synonyms: ["reflect"] },
  ]},
  { phrase: "step in", baseVerb: "step", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To get involved in a situation, often to help.", simpleDefinition: "To get involved, often to help.", examples: ["A coworker stepped in to help.", "The manager had to step in and mediate."], synonyms: ["intervene"] },
  ]},
  { phrase: "step up", baseVerb: "step", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To increase effort or take on more responsibility.", simpleDefinition: "To increase effort or take charge.", examples: ["The team really stepped up in the final round.", "We need to step up production."], synonyms: ["increase"] },
  ]},

  // --- Third set: coverage cross-checked against an independently compiled
  // study list, adding entries not yet represented above. All definitions
  // and examples here are original, written for this product. ---

  { phrase: "abide by", baseVerb: "abide", particles: ["by"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To obey or follow a rule, law, or decision.", simpleDefinition: "To obey a rule or decision.", examples: ["All employees must abide by the safety rules.", "She agreed to abide by the judge's ruling."], synonyms: ["comply with", "follow"] },
  ]},
  { phrase: "account for", baseVerb: "account", particles: ["for"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To explain the reason or cause of something.", simpleDefinition: "To explain the reason for something.", examples: ["Can you account for the missing money?", "Nothing can account for his behavior."], synonyms: ["explain"] },
    { id: "s2", meaning: "To form a particular amount or part of a total.", simpleDefinition: "To make up a part of a total.", examples: ["Rent accounts for half our monthly budget.", "Exports account for a third of the economy."], synonyms: [] },
  ]},
  { phrase: "act on", baseVerb: "act", particles: ["on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To take action because of information or advice received.", simpleDefinition: "To take action based on advice or information.", examples: ["We acted on the consultant's recommendation.", "She acted on a hunch."], synonyms: [] },
  ]},
  { phrase: "act out", baseVerb: "act", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To perform something through actions rather than words, or to misbehave as an expression of difficult feelings.", simpleDefinition: "To perform through actions, or to misbehave.", examples: ["He acted out the scene for the class.", "The child was acting out after the move."], synonyms: [] },
  ]},
  { phrase: "act up", baseVerb: "act", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To behave badly, or to function abnormally (for a device or body part).", simpleDefinition: "To misbehave, or malfunction.", examples: ["My laptop has been acting up all morning.", "The kids were acting up at the party."], synonyms: ["malfunction", "misbehave"] },
  ]},
  { phrase: "add up", baseVerb: "add", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To make logical sense.", simpleDefinition: "To make sense.", examples: ["His explanation simply doesn't add up.", "Something about her story doesn't add up."], synonyms: ["make sense"] },
    { id: "s2", meaning: "To calculate a total.", simpleDefinition: "To calculate a total.", examples: ["Add up the receipts for the report.", "I added up the costs before deciding."], synonyms: ["total"] },
  ]},
  { phrase: "advise against", baseVerb: "advise", particles: ["against"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To recommend that someone not do something.", simpleDefinition: "To recommend against doing something.", examples: ["The doctor advised me against heavy exercise.", "Lawyers advised against signing right away."], synonyms: [] },
  ]},
  { phrase: "agree with", baseVerb: "agree", particles: ["with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To share the same opinion as someone.", simpleDefinition: "To share the same opinion.", examples: ["I agree with your proposed approach.", "Do you agree with the decision?"], synonyms: [] },
    { id: "s2", meaning: "To suit someone physically, usually about food (often negative).", simpleDefinition: "To suit someone's body (usually about food).", examples: ["Spicy food doesn't agree with me.", "The new medication seems to agree with her."], synonyms: [] },
  ]},
  { phrase: "aim at", baseVerb: "aim", particles: ["at"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To direct something toward a target, or to intend to achieve something.", simpleDefinition: "To direct toward a target, or intend to achieve.", examples: ["The campaign aims at reducing waste.", "He aimed the remark at his rival."], synonyms: ["target"] },
  ]},
  { phrase: "allow for", baseVerb: "allow", particles: ["for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To include something as a possibility when planning or calculating.", simpleDefinition: "To include something when planning.", examples: ["Leave early to allow for traffic.", "The budget allows for unexpected costs."], synonyms: [] },
  ]},
  { phrase: "appeal to", baseVerb: "appeal", particles: ["to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To attract or interest someone.", simpleDefinition: "To attract or interest someone.", examples: ["The flexible schedule appeals to many applicants.", "This design should appeal to younger buyers."], synonyms: ["attract"] },
    { id: "s2", meaning: "To make a formal, often urgent request, sometimes to a higher authority.", simpleDefinition: "To make an urgent or formal request.", examples: ["She appealed to the judge for leniency.", "He appealed to their sense of fairness."], synonyms: [] },
  ]},
  { phrase: "apply for", baseVerb: "apply", particles: ["for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To formally request something, like a job or a document.", simpleDefinition: "To formally request something.", examples: ["She applied for the manager position.", "You'll need to apply for a visa."], synonyms: [] },
  ]},
  { phrase: "ask out", baseVerb: "ask", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To invite someone on a date.", simpleDefinition: "To invite someone on a date.", examples: ["He finally asked her out.", "She was too nervous to ask him out."], synonyms: [] },
  ]},
  { phrase: "attend to", baseVerb: "attend", particles: ["to"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To deal with or take care of something.", simpleDefinition: "To deal with or take care of.", examples: ["I have some business to attend to.", "The nurse attended to the patient immediately."], synonyms: ["deal with", "handle"] },
  ]},
  { phrase: "avail yourself of", baseVerb: "avail", particles: ["of"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To take advantage of an opportunity or resource.", simpleDefinition: "To take advantage of an opportunity.", examples: ["Guests may avail themselves of the hotel gym.", "You should avail yourself of the free training."], synonyms: [] },
  ]},
  { phrase: "back away", baseVerb: "back", particles: ["away"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To move backward, often to retreat from something.", simpleDefinition: "To move backward, retreat.", examples: ["He backed away slowly from the dog.", "She backed away from the confrontation."], synonyms: ["retreat"] },
  ]},
  { phrase: "back down", baseVerb: "back", particles: ["down"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To withdraw from a position or argument.", simpleDefinition: "To withdraw from an argument or position.", examples: ["He refused to back down.", "The company backed down after public pressure."], synonyms: ["concede"] },
  ]},
  { phrase: "back out of", baseVerb: "back", particles: ["out", "of"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To withdraw from a commitment or agreement.", simpleDefinition: "To withdraw from a commitment.", examples: ["She backed out of the deal at the last minute.", "You can't back out of the contract now."], synonyms: ["withdraw from"] },
  ]},
  { phrase: "back up", baseVerb: "back", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To support someone, or to support a claim with evidence.", simpleDefinition: "To support someone or a claim.", examples: ["My colleagues backed me up in the meeting.", "Can you back up that statement with data?"], synonyms: ["support"] },
    { id: "s2", meaning: "To make a copy of computer data for safekeeping.", simpleDefinition: "To make a copy of data.", examples: ["Always back up your files.", "I backed up my photos to the cloud."], synonyms: [] },
  ]},
  { phrase: "bail out", baseVerb: "bail", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To rescue someone or something from a difficult situation, often financially.", simpleDefinition: "To rescue from a difficult situation, often financially.", examples: ["The government bailed out the bank.", "His parents bailed him out again."], synonyms: ["rescue"] },
    { id: "s2", meaning: "To abandon a difficult situation or commitment.", simpleDefinition: "To quit or abandon a difficult situation.", examples: ["He bailed out of the project halfway through.", "Don't bail out on us now."], synonyms: [] },
  ]},
  { phrase: "bank on", baseVerb: "bank", particles: ["on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To rely on something happening.", simpleDefinition: "To rely on something happening.", examples: ["Don't bank on getting a refund.", "We're banking on good weather for the trip."], synonyms: ["count on"] },
  ]},
  { phrase: "bargain for", baseVerb: "bargain", particles: ["for"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To expect or anticipate something, often used negatively.", simpleDefinition: "To expect something (often 'more than I bargained for').", examples: ["That was more than I bargained for.", "He didn't bargain for so much traffic."], synonyms: ["expect", "anticipate"] },
  ]},
  { phrase: "barge in", baseVerb: "barge", particles: ["in"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To enter a place or conversation rudely and abruptly.", simpleDefinition: "To enter rudely or interrupt abruptly.", examples: ["He barged in without knocking.", "Sorry to barge in, but this is urgent."], synonyms: ["interrupt"] },
  ]},
  { phrase: "bear on", baseVerb: "bear", particles: ["on"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To be relevant to a matter.", simpleDefinition: "To be relevant to something.", examples: ["This evidence bears on the case directly.", "Her experience bears on the decision."], synonyms: ["relate to"] },
  ]},
  { phrase: "bear with", baseVerb: "bear", particles: ["with"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To be patient with someone, especially during a delay.", simpleDefinition: "To be patient with someone.", examples: ["Please bear with me while I check.", "Bear with us during the renovation."], synonyms: ["be patient with"] },
  ]},
  { phrase: "beef up", baseVerb: "beef", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To strengthen or reinforce something.", simpleDefinition: "To strengthen or reinforce.", examples: ["They beefed up security after the incident.", "We need to beef up our marketing plan."], synonyms: ["strengthen", "reinforce"] },
  ]},
  { phrase: "belt out", baseVerb: "belt", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To sing or perform something loudly and forcefully.", simpleDefinition: "To sing loudly.", examples: ["She belted out the chorus.", "He was belting out old songs at karaoke."], synonyms: [] },
  ]},
  { phrase: "block off", baseVerb: "block", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To close an area so people or vehicles can't pass through.", simpleDefinition: "To close off an area.", examples: ["Police blocked off the street.", "We blocked off the room for renovations."], synonyms: [] },
  ]},
  { phrase: "boil down to", baseVerb: "boil", particles: ["down", "to"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To be the essential point when everything else is set aside.", simpleDefinition: "To be the essential point.", examples: ["It all boils down to trust.", "The issue boils down to cost."], synonyms: ["come down to"] },
  ]},
  { phrase: "boot up", baseVerb: "boot", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To start a computer.", simpleDefinition: "To start a computer.", examples: ["It takes a minute to boot up.", "Boot up the laptop before the meeting."], synonyms: ["start up"] },
  ]},
  { phrase: "bounce back", baseVerb: "bounce", particles: ["back"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To recover quickly after a setback.", simpleDefinition: "To recover quickly.", examples: ["The team bounced back after a rough start.", "She bounced back from the illness fast."], synonyms: ["recover"] },
  ]},
  { phrase: "branch out", baseVerb: "branch", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To expand into new areas or activities.", simpleDefinition: "To expand into new areas.", examples: ["The company is branching out into software.", "She branched out into painting after retirement."], synonyms: ["expand", "diversify"] },
  ]},
  { phrase: "break out of", baseVerb: "break", particles: ["out", "of"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To escape from confinement or a limiting pattern.", simpleDefinition: "To escape confinement or a limiting habit.", examples: ["He broke out of prison.", "She's trying to break out of her old routine."], synonyms: ["escape"] },
  ]},
  { phrase: "brush up on", baseVerb: "brush", particles: ["up", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To refresh your knowledge or skill in something.", simpleDefinition: "To refresh your skill or knowledge.", examples: ["I need to brush up on my Spanish.", "She's brushing up on the rules before the exam."], synonyms: ["refresh"] },
  ]},
  { phrase: "bump into", baseVerb: "bump", particles: ["into"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To meet someone by chance.", simpleDefinition: "To meet by chance.", examples: ["I bumped into an old friend today.", "We bumped into each other at the store."], synonyms: ["run into"] },
  ]},
  { phrase: "burn out", baseVerb: "burn", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To become exhausted from prolonged stress or overwork.", simpleDefinition: "To become exhausted from overwork.", examples: ["He burned out after years of overtime.", "Many nurses burned out during the pandemic."], synonyms: ["exhaust"] },
  ]},
  { phrase: "butt in", baseVerb: "butt", particles: ["in"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To interrupt rudely or interfere in a conversation.", simpleDefinition: "To interrupt rudely.", examples: ["Sorry to butt in, but that's incorrect.", "He always butts in when I'm talking."], synonyms: ["interrupt"] },
  ]},
  { phrase: "butt out", baseVerb: "butt", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To stop interfering in something that isn't your business.", simpleDefinition: "To stop interfering (often as a command).", examples: ["Just butt out, it's not your problem.", "She told him to butt out of her affairs."], synonyms: [] },
  ]},
  { phrase: "calm down", baseVerb: "calm", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become or make someone less upset or angry.", simpleDefinition: "To become or make calmer.", examples: ["Calm down, everything's fine.", "She calmed the crowd down."], synonyms: [] },
  ]},
  { phrase: "care for", baseVerb: "care", particles: ["for"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To look after someone, especially due to illness or age.", simpleDefinition: "To look after someone.", examples: ["She cares for her elderly father.", "Nurses care for patients around the clock."], synonyms: ["look after"] },
    { id: "s2", meaning: "To like something (often in questions or negatives).", simpleDefinition: "To like something.", examples: ["Would you care for some tea?", "He doesn't care for loud music."], synonyms: [] },
  ]},
  { phrase: "catch on to", baseVerb: "catch", particles: ["on", "to"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To begin to understand or notice something.", simpleDefinition: "To begin to understand or notice.", examples: ["It took her a while to catch on to the joke.", "He caught on to the trick quickly."], synonyms: ["realize"] },
  ]},
  { phrase: "catch up on", baseVerb: "catch", particles: ["up", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To do something you've fallen behind on.", simpleDefinition: "To do something you've fallen behind on.", examples: ["I need to catch up on sleep.", "Let's catch up on emails first."], synonyms: [] },
  ]},
  { phrase: "catch up to", baseVerb: "catch", particles: ["up", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To reach the same level or position as someone ahead of you.", simpleDefinition: "To reach the same level as someone ahead.", examples: ["Rivals are catching up to the market leader.", "He ran faster to catch up to her."], synonyms: [] },
  ]},
  { phrase: "catch up with", baseVerb: "catch", particles: ["up", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To reach the same level of progress as someone else.", simpleDefinition: "To reach the same level as someone.", examples: ["It took a year to catch up with the rest of the class.", "Technology is catching up with demand."], synonyms: [] },
    { id: "s2", meaning: "To meet socially with someone after a period apart.", simpleDefinition: "To meet up with someone after a while.", examples: ["We caught up with old friends this weekend.", "Let's catch up with each other soon."], synonyms: ["meet up with"] },
  ]},
  { phrase: "check in with", baseVerb: "check", particles: ["in", "with"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To contact someone briefly to see how they are or share an update.", simpleDefinition: "To contact someone briefly for an update.", examples: ["I check in with my team every morning.", "She checked in with her parents after landing."], synonyms: [] },
  ]},
  { phrase: "cheer on", baseVerb: "cheer", particles: ["on"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To encourage and support someone enthusiastically, especially in a competition.", simpleDefinition: "To enthusiastically encourage someone.", examples: ["The crowd cheered on the runners.", "We cheered her on from the sidelines."], synonyms: ["encourage"] },
  ]},
  { phrase: "cheer up", baseVerb: "cheer", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become or make someone happier.", simpleDefinition: "To become or make happier.", examples: ["Cheer up, it's not that bad.", "The good news cheered her up."], synonyms: [] },
  ]},
  { phrase: "chew out", baseVerb: "chew", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To scold someone severely.", simpleDefinition: "To scold someone severely.", examples: ["The coach chewed out the team after the loss.", "He got chewed out by his boss."], synonyms: ["scold", "reprimand"] },
  ]},
  { phrase: "clam up", baseVerb: "clam", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To suddenly stop talking, especially out of nervousness.", simpleDefinition: "To suddenly become silent.", examples: ["He clammed up when asked about it.", "She clams up in front of strangers."], synonyms: [] },
  ]},
  { phrase: "clamp down on", baseVerb: "clamp", particles: ["down", "on"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To take strict action to stop or control something.", simpleDefinition: "To take strict action against something.", examples: ["The city clamped down on illegal parking.", "Authorities clamped down on the protests."], synonyms: ["crack down on"] },
  ]},
  { phrase: "clear out", baseVerb: "clear", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To remove unwanted items from a place, or to leave a place quickly.", simpleDefinition: "To remove unwanted items, or leave quickly.", examples: ["We cleared out the garage over the weekend.", "Everyone cleared out before the storm."], synonyms: [] },
  ]},
  { phrase: "comb through", baseVerb: "comb", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To search through something thoroughly.", simpleDefinition: "To search thoroughly.", examples: ["Investigators combed through the records.", "She combed through the report for errors."], synonyms: ["search thoroughly"] },
  ]},
  { phrase: "come around to", baseVerb: "come", particles: ["around", "to"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To eventually accept or agree with an idea after resisting it.", simpleDefinition: "To eventually accept an idea.", examples: ["He finally came around to the plan.", "She came around to my point of view."], synonyms: [] },
  ]},
  { phrase: "come out with", baseVerb: "come", particles: ["out", "with"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To say something suddenly or unexpectedly, or to release a new product.", simpleDefinition: "To suddenly say something, or release a product.", examples: ["She came out with a surprising confession.", "They're coming out with a new model next month."], synonyms: [] },
  ]},
  { phrase: "cool down", baseVerb: "cool", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become calmer, or to become less hot.", simpleDefinition: "To become calmer, or less hot.", examples: ["Let him cool down before you talk to him.", "The soup needs to cool down first."], synonyms: [] },
  ]},
  { phrase: "cross out", baseVerb: "cross", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To draw a line through text to cancel or remove it.", simpleDefinition: "To draw a line through text to cancel it.", examples: ["Cross out any mistakes.", "He crossed his name out on the old list."], synonyms: ["strike out"] },
  ]},
  { phrase: "dawn on", baseVerb: "dawn", particles: ["on"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To become suddenly clear or realized (used impersonally: 'it dawned on me').", simpleDefinition: "To suddenly realize something.", examples: ["It suddenly dawned on me what she meant.", "The truth finally dawned on him."], synonyms: ["occur to"] },
  ]},
  { phrase: "depend on", baseVerb: "depend", particles: ["on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To rely on someone or something, or to be determined by something.", simpleDefinition: "To rely on, or be determined by.", examples: ["Kids depend on their parents for support.", "It depends on the weather."], synonyms: ["rely on"] },
  ]},
  { phrase: "die down", baseVerb: "die", particles: ["down"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To gradually become less intense.", simpleDefinition: "To gradually become less intense.", examples: ["The applause died down after a minute.", "The controversy eventually died down."], synonyms: ["subside"] },
  ]},
  { phrase: "dip into", baseVerb: "dip", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To use part of your savings, or to read or engage with part of something briefly.", simpleDefinition: "To use part of savings, or briefly try part of something.", examples: ["We had to dip into our savings.", "I've only dipped into the book so far."], synonyms: [] },
  ]},
  { phrase: "dish out", baseVerb: "dish", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To distribute something generously, often food, criticism, or punishment.", simpleDefinition: "To distribute generously (food, criticism, etc.).", examples: ["She dished out advice to everyone.", "He can dish it out but can't take it."], synonyms: ["hand out"] },
  ]},
  { phrase: "do without", baseVerb: "do", particles: ["without"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To manage without having something.", simpleDefinition: "To manage without something.", examples: ["We'll have to do without a car this month.", "I can't do without my morning coffee."], synonyms: ["go without"] },
  ]},
  { phrase: "drag on", baseVerb: "drag", particles: ["on"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To continue for longer than expected, tediously.", simpleDefinition: "To continue for too long, tediously.", examples: ["The meeting dragged on for hours.", "The negotiations have dragged on for months."], synonyms: [] },
  ]},
  { phrase: "draw out", baseVerb: "draw", particles: ["out"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To make something last longer than necessary, or to encourage someone to talk or express themselves.", simpleDefinition: "To make something last longer, or encourage someone to open up.", examples: ["The ceremony was drawn out unnecessarily.", "The teacher gently drew out the shy student."], synonyms: [] },
  ]},
  { phrase: "draw up", baseVerb: "draw", particles: ["up"], separable: true, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To prepare a document or plan formally.", simpleDefinition: "To prepare a document or plan.", examples: ["The lawyer drew up the contract.", "We drew up a list of priorities."], synonyms: ["prepare"] },
  ]},
  { phrase: "dress up", baseVerb: "dress", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To wear formal or special clothing, or to wear a costume.", simpleDefinition: "To wear formal clothes or a costume.", examples: ["We dressed up for the wedding.", "The kids dressed up for Halloween."], synonyms: [] },
  ]},
  { phrase: "drift off", baseVerb: "drift", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To fall asleep gradually, or to gradually stop paying attention.", simpleDefinition: "To gradually fall asleep or stop paying attention.", examples: ["I drifted off during the movie.", "Her mind drifted off during the lecture."], synonyms: ["doze off"] },
  ]},
  { phrase: "drop in", baseVerb: "drop", particles: ["in"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To visit briefly and often unexpectedly.", simpleDefinition: "To visit briefly, unannounced.", examples: ["Feel free to drop in whenever.", "A neighbor dropped in this morning."], synonyms: ["drop by"] },
  ]},
  { phrase: "drop out", baseVerb: "drop", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To quit school, a course, or a competition before finishing.", simpleDefinition: "To quit before finishing (school, a race, etc.).", examples: ["He dropped out of college.", "Two runners dropped out of the race."], synonyms: [] },
  ]},
  { phrase: "ease off", baseVerb: "ease", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To gradually reduce in intensity or effort.", simpleDefinition: "To gradually reduce intensity or effort.", examples: ["The rain eased off by noon.", "You should ease off the gas pedal."], synonyms: ["let up"] },
  ]},
  { phrase: "egg on", baseVerb: "egg", particles: ["on"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To encourage someone to do something, often risky or unwise.", simpleDefinition: "To encourage someone to do something risky.", examples: ["His friends egged him on to try it.", "She was egged on by the crowd."], synonyms: ["incite"] },
  ]},
  { phrase: "even out", baseVerb: "even", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become or make more level, balanced, or consistent.", simpleDefinition: "To become or make more even/balanced.", examples: ["Prices should even out over time.", "Try to even out the paint layer."], synonyms: ["level out"] },
  ]},
  { phrase: "fill in", baseVerb: "fill", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To complete a form by writing information, or to substitute for someone temporarily.", simpleDefinition: "To complete a form, or substitute for someone.", examples: ["Fill in your name and address.", "She filled in for the manager while he was sick."], synonyms: [] },
  ]},
  { phrase: "fill out", baseVerb: "fill", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To complete a form (more common in American English).", simpleDefinition: "To complete a form.", examples: ["Please fill out this application.", "He filled out the survey online."], synonyms: ["fill in"] },
  ]},
  { phrase: "flip out", baseVerb: "flip", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To become very upset, angry, or excited suddenly.", simpleDefinition: "To suddenly become very upset or excited.", examples: ["She flipped out when she heard the news.", "He'll flip out if you touch his stuff."], synonyms: ["freak out"] },
  ]},
  { phrase: "flip through", baseVerb: "flip", particles: ["through"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To look through pages quickly without reading in detail.", simpleDefinition: "To quickly look through pages.", examples: ["She flipped through the magazine.", "I flipped through his notes before class."], synonyms: ["skim through"] },
  ]},
  { phrase: "focus on", baseVerb: "focus", particles: ["on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To concentrate attention or effort on something.", simpleDefinition: "To concentrate on something.", examples: ["Let's focus on the main issue.", "She's focusing on her recovery."], synonyms: ["concentrate on"] },
  ]},
  { phrase: "freshen up", baseVerb: "freshen", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To wash and tidy yourself, or to make something look newer.", simpleDefinition: "To wash/tidy yourself, or make something look newer.", examples: ["I'll freshen up before dinner.", "A coat of paint will freshen up the room."], synonyms: [] },
  ]},
  { phrase: "frown on", baseVerb: "frown", particles: ["on"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To disapprove of something.", simpleDefinition: "To disapprove of something.", examples: ["Smoking is frowned on here.", "The teacher frowns on lateness."], synonyms: ["disapprove of"] },
  ]},
  { phrase: "get at", baseVerb: "get", particles: ["at"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To imply or mean something indirectly, or to reach/access something.", simpleDefinition: "To imply something, or to reach/access something.", examples: ["What are you getting at?", "The files are hard to get at."], synonyms: ["imply"] },
  ]},
  { phrase: "get off lightly", baseVerb: "get", particles: ["off"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To receive a lighter punishment or consequence than expected.", simpleDefinition: "To get a lighter punishment than expected.", examples: ["He got off lightly with just a warning.", "Considering what happened, we got off lightly."], synonyms: [] },
  ]},
  { phrase: "get out of", baseVerb: "get", particles: ["out", "of"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To avoid or escape an obligation or unpleasant situation.", simpleDefinition: "To avoid an obligation.", examples: ["He got out of doing the dishes.", "Is there any way to get out of this meeting?"], synonyms: ["avoid"] },
  ]},
  { phrase: "gloss over", baseVerb: "gloss", particles: ["over"], separable: false, transitive: true, formality: "formal", senses: [
    { id: "s1", meaning: "To avoid discussing something properly, especially a problem, to make it seem less serious.", simpleDefinition: "To avoid discussing a problem properly.", examples: ["The report glosses over the real issues.", "He glossed over his mistakes."], synonyms: ["downplay"] },
  ]},
  { phrase: "grind away at", baseVerb: "grind", particles: ["away", "at"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To work hard and steadily at something tedious or difficult.", simpleDefinition: "To work hard and steadily at something tedious.", examples: ["She's been grinding away at her thesis for months.", "He kept grinding away at the problem."], synonyms: [] },
  ]},
  { phrase: "grow out of", baseVerb: "grow", particles: ["out", "of"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To become too old or mature for something, or to develop from something.", simpleDefinition: "To become too old for something, or develop from it.", examples: ["He'll grow out of that habit.", "The idea grew out of a casual conversation."], synonyms: [] },
  ]},
  { phrase: "hang up", baseVerb: "hang", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To end a phone call.", simpleDefinition: "To end a phone call.", examples: ["She hung up before I could explain.", "Don't hang up on me!"], synonyms: [] },
  ]},
  { phrase: "hash out", baseVerb: "hash", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To discuss something thoroughly in order to reach an agreement.", simpleDefinition: "To discuss thoroughly to reach an agreement.", examples: ["They hashed out the details over lunch.", "We need to hash this out before the deadline."], synonyms: [] },
  ]},
  { phrase: "hit it off", baseVerb: "hit", particles: ["it", "off"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To quickly form a good relationship with someone.", simpleDefinition: "To quickly get along well with someone.", examples: ["We hit it off right away.", "She and my sister really hit it off."], synonyms: [] },
  ]},
  { phrase: "hit on", baseVerb: "hit", particles: ["on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To flirt with someone, or to suddenly think of a good idea.", simpleDefinition: "To flirt with someone, or suddenly think of a good idea.", examples: ["Someone hit on her at the bar.", "She hit on a great solution."], synonyms: [] },
  ]},
  { phrase: "hone in on", baseVerb: "hone", particles: ["in", "on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To focus closely on something specific.", simpleDefinition: "To focus closely on something.", examples: ["Let's hone in on the main problem.", "The interview honed in on his leadership style."], synonyms: ["focus on"] },
  ]},
  { phrase: "horse around", baseVerb: "horse", particles: ["around"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To play roughly or noisily.", simpleDefinition: "To play roughly or noisily.", examples: ["Stop horsing around and get to work.", "The kids were horsing around in the pool."], synonyms: [] },
  ]},
  { phrase: "hurry up", baseVerb: "hurry", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To do something more quickly.", simpleDefinition: "To do something more quickly.", examples: ["Hurry up, we're going to be late.", "She hurried up to catch the bus."], synonyms: [] },
  ]},
  { phrase: "iron out", baseVerb: "iron", particles: ["out"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To resolve difficulties or work out the details of something.", simpleDefinition: "To resolve difficulties or details.", examples: ["We still need to iron out a few issues.", "They ironed out their differences."], synonyms: ["resolve"] },
  ]},
  { phrase: "join in", baseVerb: "join", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To participate in an activity along with others.", simpleDefinition: "To participate with others.", examples: ["Everyone joined in the singing.", "Come join in, the more the merrier."], synonyms: ["participate"] },
  ]},
  { phrase: "jot down", baseVerb: "jot", particles: ["down"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To write something quickly, usually a brief note.", simpleDefinition: "To quickly write a note.", examples: ["Let me jot down your number.", "She jotted down a few ideas."], synonyms: ["note down"] },
  ]},
  { phrase: "jump in", baseVerb: "jump", particles: ["in"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To join in an activity or conversation eagerly, sometimes abruptly.", simpleDefinition: "To eagerly join an activity or conversation.", examples: ["Feel free to jump in anytime.", "He jumped in without waiting to be asked."], synonyms: [] },
  ]},
  { phrase: "kick off", baseVerb: "kick", particles: ["off"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To begin or start something, especially an event.", simpleDefinition: "To begin something, especially an event.", examples: ["The festival kicks off on Friday.", "Let's kick off the meeting with introductions."], synonyms: ["start", "launch"] },
  ]},
  { phrase: "lash out", baseVerb: "lash", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To suddenly criticize or attack someone verbally or physically, often out of anger.", simpleDefinition: "To suddenly attack or criticize angrily.", examples: ["He lashed out at his critics.", "She lashed out after being provoked."], synonyms: [] },
  ]},
  { phrase: "leave behind", baseVerb: "leave", particles: ["behind"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To not take something with you, or to progress faster than others, leaving them behind.", simpleDefinition: "To not take something along, or outpace others.", examples: ["I left my umbrella behind.", "New technology is leaving some workers behind."], synonyms: [] },
  ]},
  { phrase: "lighten up", baseVerb: "lighten", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To relax and be less serious.", simpleDefinition: "To relax and be less serious.", examples: ["Lighten up, it's just a joke.", "He needs to lighten up a bit."], synonyms: ["relax"] },
  ]},
  { phrase: "load up on", baseVerb: "load", particles: ["up", "on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To acquire or consume a large quantity of something.", simpleDefinition: "To get a large quantity of something.", examples: ["We loaded up on snacks for the trip.", "She loaded up on vitamins before winter."], synonyms: ["stock up on"] },
  ]},
  { phrase: "lock up", baseVerb: "lock", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To secure a place by locking it, or to put someone in prison.", simpleDefinition: "To secure by locking, or imprison someone.", examples: ["Remember to lock up before you leave.", "He was locked up for years."], synonyms: [] },
  ]},
  { phrase: "look ahead", baseVerb: "look", particles: ["ahead"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To think about or plan for the future.", simpleDefinition: "To think about or plan for the future.", examples: ["It's time to look ahead to next year.", "We need to look ahead and prepare."], synonyms: [] },
  ]},
  { phrase: "look on", baseVerb: "look", particles: ["on"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To watch something happening without taking part.", simpleDefinition: "To watch without participating.", examples: ["The crowd looked on in silence.", "She looked on as they argued."], synonyms: ["watch"] },
  ]},
  { phrase: "look over", baseVerb: "look", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To examine something quickly, especially to check it.", simpleDefinition: "To quickly examine or check something.", examples: ["Can you look over my essay?", "The doctor looked her over."], synonyms: ["examine", "review"] },
  ]},
  { phrase: "loosen up", baseVerb: "loosen", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To relax and become less tense or formal.", simpleDefinition: "To relax and become less tense.", examples: ["A few jokes helped loosen up the room.", "He loosened up after a drink."], synonyms: ["relax"] },
  ]},
  { phrase: "luck out", baseVerb: "luck", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To be lucky in a particular situation.", simpleDefinition: "To be lucky in a situation.", examples: ["We lucked out with the weather.", "I really lucked out getting this apartment."], synonyms: ["get lucky"] },
  ]},
  { phrase: "make fun of", baseVerb: "make", particles: ["fun", "of"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To mock or tease someone.", simpleDefinition: "To mock or tease someone.", examples: ["Kids can be cruel and make fun of each other.", "Don't make fun of his accent."], synonyms: ["mock", "tease"] },
  ]},
  { phrase: "make up to", baseVerb: "make", particles: ["up", "to"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To try to compensate someone for something, or to try to gain someone's favor.", simpleDefinition: "To compensate someone, or try to win their favor.", examples: ["I'll make it up to you, I promise.", "He tried to make up to his boss after the mistake."], synonyms: [] },
  ]},
  { phrase: "max out", baseVerb: "max", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To use something to its full limit, especially a credit card.", simpleDefinition: "To use something to its full limit.", examples: ["He maxed out his credit card.", "We're maxed out on storage space."], synonyms: [] },
  ]},
  { phrase: "mix up", baseVerb: "mix", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To confuse two or more things, or to combine ingredients.", simpleDefinition: "To confuse things, or combine ingredients.", examples: ["I always mix up their names.", "Mix up the batter until smooth."], synonyms: ["confuse"] },
  ]},
  { phrase: "mope around", baseVerb: "mope", particles: ["around"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To move about in a sad, listless, self-pitying way.", simpleDefinition: "To move about sadly and without energy.", examples: ["Stop moping around and do something.", "He's been moping around since the breakup."], synonyms: [] },
  ]},
  { phrase: "mouth off", baseVerb: "mouth", particles: ["off"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To talk disrespectfully, boastfully, or without thinking.", simpleDefinition: "To talk disrespectfully or boastfully.", examples: ["He's always mouthing off about something.", "Don't mouth off to your teacher."], synonyms: [] },
  ]},
  { phrase: "muddle through", baseVerb: "muddle", particles: ["through"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To manage to complete something despite confusion or a lack of preparation.", simpleDefinition: "To manage to get through something despite confusion.", examples: ["We muddled through without a proper plan.", "Somehow they muddled through the crisis."], synonyms: [] },
  ]},
  { phrase: "mull over", baseVerb: "mull", particles: ["over"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To think about something carefully for a while.", simpleDefinition: "To think about carefully.", examples: ["I need some time to mull it over.", "She mulled over the offer for a week."], synonyms: ["consider", "think over"] },
  ]},
  { phrase: "nail down", baseVerb: "nail", particles: ["down"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To determine or specify something precisely.", simpleDefinition: "To determine something precisely.", examples: ["We still need to nail down a date.", "It's hard to nail down exactly what went wrong."], synonyms: ["pin down"] },
  ]},
  { phrase: "nod off", baseVerb: "nod", particles: ["off"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To fall asleep unintentionally, especially while sitting.", simpleDefinition: "To unintentionally fall asleep.", examples: ["He nodded off during the film.", "I keep nodding off at my desk."], synonyms: ["doze off"] },
  ]},
  { phrase: "note down", baseVerb: "note", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To write something down for future reference.", simpleDefinition: "To write something down for reference.", examples: ["I noted down the address.", "She noted down a few key points."], synonyms: ["jot down"] },
  ]},
  { phrase: "open up", baseVerb: "open", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To begin talking honestly about your feelings.", simpleDefinition: "To start talking honestly about feelings.", examples: ["It took time for him to open up.", "She finally opened up about her worries."], synonyms: [] },
    { id: "s2", meaning: "For new opportunities or possibilities to arise.", simpleDefinition: "For new opportunities to arise.", examples: ["New markets are opening up abroad.", "This role opens up a lot of possibilities."], synonyms: ["arise"] },
  ]},
  { phrase: "opt in", baseVerb: "opt", particles: ["in"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To choose to participate in something.", simpleDefinition: "To choose to participate.", examples: ["Users must opt in to receive emails.", "You can opt in at any time."], synonyms: [] },
  ]},
  { phrase: "opt out", baseVerb: "opt", particles: ["out"], separable: false, transitive: false, formality: "formal", senses: [
    { id: "s1", meaning: "To choose not to participate in something.", simpleDefinition: "To choose not to participate.", examples: ["You can opt out anytime.", "She opted out of the program."], synonyms: [] },
  ]},
  { phrase: "pan out", baseVerb: "pan", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To develop or turn out successfully.", simpleDefinition: "To turn out successfully.", examples: ["The plan didn't pan out as hoped.", "Let's see how things pan out."], synonyms: ["work out"] },
  ]},
  { phrase: "pay back", baseVerb: "pay", particles: ["back"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To return money that you owe, or to take revenge on someone.", simpleDefinition: "To repay money owed, or get revenge.", examples: ["I'll pay you back next week.", "She wanted to pay him back for the insult."], synonyms: ["repay"] },
  ]},
  { phrase: "perk up", baseVerb: "perk", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To become or make more lively, cheerful, or energetic.", simpleDefinition: "To become or make more lively.", examples: ["She perked up after some coffee.", "The good news perked everyone up."], synonyms: [] },
  ]},
  { phrase: "pile up", baseVerb: "pile", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To accumulate, especially into a growing pile.", simpleDefinition: "To accumulate into a pile.", examples: ["The dishes are piling up.", "Debts piled up over the years."], synonyms: ["accumulate"] },
  ]},
  { phrase: "play down", baseVerb: "play", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To make something seem less important than it is.", simpleDefinition: "To make something seem less important.", examples: ["Officials played down the risks.", "She played down her role in the project."], synonyms: ["downplay", "minimize"] },
  ]},
  { phrase: "pull off", baseVerb: "pull", particles: ["off"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To succeed at something difficult.", simpleDefinition: "To succeed at something difficult.", examples: ["They pulled off an amazing win.", "I don't know how she pulled it off."], synonyms: ["accomplish", "achieve"] },
  ]},
  { phrase: "rack up", baseVerb: "rack", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To accumulate a large amount of something, like points, debt, or wins.", simpleDefinition: "To accumulate a large amount of something.", examples: ["He racked up a huge phone bill.", "The team racked up ten straight wins."], synonyms: ["accumulate"] },
  ]},
  { phrase: "ramble on", baseVerb: "ramble", particles: ["on"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To talk for too long about unimportant or unclear things.", simpleDefinition: "To talk for too long about unimportant things.", examples: ["He rambled on about his weekend.", "Sorry, I tend to ramble on."], synonyms: ["go on"] },
  ]},
  { phrase: "rely on", baseVerb: "rely", particles: ["on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To depend on and trust someone or something.", simpleDefinition: "To depend on and trust.", examples: ["You can rely on her to be honest.", "We rely on public transport here."], synonyms: ["depend on", "count on"] },
  ]},
  { phrase: "rip off", baseVerb: "rip", particles: ["off"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To cheat someone, especially financially.", simpleDefinition: "To cheat someone financially.", examples: ["That taxi driver ripped me off.", "Customers felt ripped off by the price."], synonyms: ["cheat", "swindle"] },
  ]},
  { phrase: "rub off on", baseVerb: "rub", particles: ["off", "on"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "For a quality or habit to influence someone through close contact.", simpleDefinition: "For a quality to influence someone through contact.", examples: ["Her enthusiasm rubbed off on the team.", "I hope his good habits rub off on me."], synonyms: [] },
  ]},
  { phrase: "settle in", baseVerb: "settle", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To become comfortable in a new home, job, or situation.", simpleDefinition: "To become comfortable in a new place or situation.", examples: ["It took a while to settle in at the new office.", "How are you settling in?"], synonyms: [] },
  ]},
  { phrase: "shake off", baseVerb: "shake", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To get rid of something unwanted, like an illness, feeling, or pursuer.", simpleDefinition: "To get rid of something unwanted.", examples: ["I can't shake off this cold.", "She shook off her nerves before the interview."], synonyms: [] },
  ]},
  { phrase: "shop around", baseVerb: "shop", particles: ["around"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To compare prices and options before making a purchase.", simpleDefinition: "To compare options before buying.", examples: ["It pays to shop around for insurance.", "We shopped around before choosing a mortgage."], synonyms: [] },
  ]},
  { phrase: "show off", baseVerb: "show", particles: ["off"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To display your abilities or possessions to impress others.", simpleDefinition: "To display abilities to impress others.", examples: ["He loves showing off his new car.", "Stop showing off and just answer the question."], synonyms: ["boast"] },
  ]},
  { phrase: "shrug off", baseVerb: "shrug", particles: ["off"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To treat something as unimportant and not worry about it.", simpleDefinition: "To treat something as unimportant.", examples: ["She shrugged off the criticism.", "He shrugged off the injury and kept playing."], synonyms: ["dismiss", "brush off"] },
  ]},
  { phrase: "shut up", baseVerb: "shut", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To stop talking (blunt, often considered rude).", simpleDefinition: "To stop talking (blunt/rude).", examples: ["Just shut up and listen.", "He told them to shut up."], synonyms: [] },
  ]},
  { phrase: "sift through", baseVerb: "sift", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To examine something carefully to find what's useful or important.", simpleDefinition: "To carefully examine to find what's useful.", examples: ["She sifted through the applications.", "We sifted through years of records."], synonyms: [] },
  ]},
  { phrase: "sink in", baseVerb: "sink", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To be fully understood or realized, usually after some delay.", simpleDefinition: "To be fully understood after a delay.", examples: ["The news hadn't sunk in yet.", "It took a while for the loss to sink in."], synonyms: [] },
  ]},
  { phrase: "sit down", baseVerb: "sit", particles: ["down"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To move into a seated position.", simpleDefinition: "To take a seat.", examples: ["Please sit down and relax.", "She sat down at the table."], synonyms: [] },
  ]},
  { phrase: "sit in on", baseVerb: "sit", particles: ["in", "on"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To attend a meeting or class as an observer, not a participant.", simpleDefinition: "To attend as an observer.", examples: ["I sat in on the interview for training.", "Feel free to sit in on the lecture."], synonyms: [] },
  ]},
  { phrase: "skim through", baseVerb: "skim", particles: ["through"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To read something quickly without focusing on detail.", simpleDefinition: "To read quickly without much detail.", examples: ["I only had time to skim through the report.", "She skimmed through the chapter before class."], synonyms: ["skim"] },
  ]},
  { phrase: "slip into", baseVerb: "slip", particles: ["into"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To put on clothing quickly and easily, or to gradually enter a state or habit.", simpleDefinition: "To quickly put on clothing, or gradually fall into a state.", examples: ["She slipped into her shoes.", "He slipped into a bad habit."], synonyms: [] },
  ]},
  { phrase: "slip up", baseVerb: "slip", particles: ["up"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To make a small mistake.", simpleDefinition: "To make a small mistake.", examples: ["I slipped up on the last question.", "Everyone slips up occasionally."], synonyms: ["make a mistake"] },
  ]},
  { phrase: "stand up", baseVerb: "stand", particles: ["up"], separable: false, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To rise to a standing position.", simpleDefinition: "To rise to your feet.", examples: ["Everyone stood up when she entered.", "He stood up to stretch."], synonyms: [] },
    { id: "s2", meaning: "To fail to keep an appointment or date with someone.", simpleDefinition: "To fail to show up for a date/appointment.", examples: ["He stood her up on their first date.", "I hate being stood up."], synonyms: [] },
  ]},
  { phrase: "stick around", baseVerb: "stick", particles: ["around"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To stay in a place rather than leaving.", simpleDefinition: "To stay rather than leave.", examples: ["Stick around, the best part is coming up.", "He stuck around to help clean up."], synonyms: ["stay"] },
  ]},
  { phrase: "talk down", baseVerb: "talk", particles: ["down"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To persuade someone to become calmer, or to guide someone verbally through a difficult task.", simpleDefinition: "To calm someone down through talking, or guide them verbally.", examples: ["The negotiator talked him down.", "Air traffic control talked the pilot down."], synonyms: [] },
  ]},
  { phrase: "talk up", baseVerb: "talk", particles: ["up"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To promote something enthusiastically, sometimes exaggerating.", simpleDefinition: "To promote something enthusiastically.", examples: ["He talked up the new restaurant to everyone.", "The trailer talked up the movie a lot."], synonyms: ["promote", "hype"] },
  ]},
  { phrase: "tune out", baseVerb: "tune", particles: ["out"], separable: true, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To stop paying attention to something.", simpleDefinition: "To stop paying attention.", examples: ["I tend to tune out during long meetings.", "He tuned out the noise and focused."], synonyms: [] },
  ]},
  { phrase: "turn around", baseVerb: "turn", particles: ["around"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To reverse direction, or to physically face the other way.", simpleDefinition: "To reverse direction or face the other way.", examples: ["Turn around and look at this.", "The car turned around at the dead end."], synonyms: [] },
    { id: "s2", meaning: "To improve a bad situation significantly.", simpleDefinition: "To improve a bad situation.", examples: ["The new manager turned the business around.", "It took a year to turn things around."], synonyms: [] },
  ]},
  { phrase: "turn in", baseVerb: "turn", particles: ["in"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To submit something, like an assignment.", simpleDefinition: "To submit something.", examples: ["Turn in your homework by Friday.", "She turned in her resignation."], synonyms: ["hand in", "submit"] },
    { id: "s2", meaning: "To go to bed (informal).", simpleDefinition: "To go to bed.", examples: ["I'm going to turn in early tonight.", "We turned in around midnight."], synonyms: [] },
  ]},
  { phrase: "walk out", baseVerb: "walk", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To leave abruptly, often in protest, or to end a relationship suddenly.", simpleDefinition: "To leave abruptly, often in protest.", examples: ["He walked out of the meeting in anger.", "She walked out on their marriage."], synonyms: [] },
  ]},
  { phrase: "wander off", baseVerb: "wander", particles: ["off"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To move away from a place without a clear purpose, often getting lost.", simpleDefinition: "To move away aimlessly, often getting lost.", examples: ["The toddler wandered off in the store.", "Don't let the dog wander off."], synonyms: [] },
  ]},
  { phrase: "wash up", baseVerb: "wash", particles: ["up"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To wash the dishes, or to wash your hands and face.", simpleDefinition: "To wash dishes, or wash your hands/face.", examples: ["I'll wash up after dinner.", "Go wash up before you eat."], synonyms: [] },
  ]},
  { phrase: "wiggle out of", baseVerb: "wiggle", particles: ["out", "of"], separable: false, transitive: true, formality: "informal", senses: [
    { id: "s1", meaning: "To avoid an unwanted responsibility or situation, often cleverly.", simpleDefinition: "To cleverly avoid a responsibility.", examples: ["He tried to wiggle out of the presentation.", "You can't wiggle out of this one."], synonyms: [] },
  ]},
  { phrase: "wrap up", baseVerb: "wrap", particles: ["up"], separable: true, transitive: true, formality: "neutral", senses: [
    { id: "s1", meaning: "To finish or conclude something.", simpleDefinition: "To finish something.", examples: ["Let's wrap up the meeting.", "We wrapped up the project on time."], synonyms: ["finish", "conclude"] },
    { id: "s2", meaning: "To dress warmly.", simpleDefinition: "To dress warmly.", examples: ["Wrap up, it's freezing outside.", "She wrapped up in a thick coat."], synonyms: [] },
  ]},
  { phrase: "yammer on", baseVerb: "yammer", particles: ["on"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To talk continuously in an annoying way.", simpleDefinition: "To talk continuously in an annoying way.", examples: ["He yammered on about the same complaint.", "She yammered on for twenty minutes."], synonyms: ["ramble on"] },
  ]},
  { phrase: "zone out", baseVerb: "zone", particles: ["out"], separable: false, transitive: false, formality: "informal", senses: [
    { id: "s1", meaning: "To stop paying attention for a short time.", simpleDefinition: "To stop paying attention briefly.", examples: ["I zoned out during the lecture.", "He zones out when he's tired."], synonyms: ["tune out"] },
  ]},
  { phrase: "zoom in", baseVerb: "zoom", particles: ["in"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To make an image appear closer, or to focus in on detail.", simpleDefinition: "To make an image closer, or focus on detail.", examples: ["Zoom in so we can read the sign.", "The camera zoomed in on her face."], synonyms: [] },
  ]},
  { phrase: "zoom out", baseVerb: "zoom", particles: ["out"], separable: false, transitive: false, formality: "neutral", senses: [
    { id: "s1", meaning: "To make an image appear farther away, or to consider a broader view.", simpleDefinition: "To make an image farther away, or consider the bigger picture.", examples: ["Zoom out to see the whole picture.", "Let's zoom out and think about the long term."], synonyms: [] },
  ]},
];

export const PHRASAL_VERBS: PhrasalVerbEntry[] = RAW.map((entry) => {
  const slug = slugify(entry.phrase);
  return { ...entry, id: slug, slug };
});

export const PHRASAL_VERBS_BY_SLUG: Record<string, PhrasalVerbEntry> = Object.fromEntries(
  PHRASAL_VERBS.map((e) => [e.slug, e])
);
