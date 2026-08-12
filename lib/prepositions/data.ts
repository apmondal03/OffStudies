import type { PrepositionEntry } from "@/types/preposition";

function slugify(phrase: string): string {
  return phrase.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * 95 entries: 25 core prepositions (each with several usage senses spanning
 * time/place/movement/manner) plus 70 dependent-preposition collocations
 * (adjective + preposition, noun + preposition). All explanations and
 * examples are written originally for this product. Verb + preposition
 * combinations are intentionally excluded — see Phrasal Verbs.
 */
const RAW: Omit<PrepositionEntry, "id" | "slug">[] = [
  // ============ CORE PREPOSITIONS ============
  { phrase: "in", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used with months, years, seasons, and longer time periods.", examples: ["I was born in July.", "We met in 2019.", "It's cold in winter."] },
    { id: "s2", usage: "place", explanation: "Used for enclosed or bounded spaces, and cities/countries.", examples: ["The keys are in the drawer.", "She lives in Tokyo.", "We waited in the car."] },
    { id: "s3", usage: "other", explanation: "Used in many fixed expressions describing states or conditions.", examples: ["They're in love.", "He's in trouble.", "We're in a hurry."] },
  ]},
  { phrase: "on", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used with days and specific dates.", examples: ["The meeting is on Monday.", "Her birthday is on March 3rd.", "See you on the weekend."] },
    { id: "s2", usage: "place", explanation: "Used for surfaces and things that are touching a surface.", examples: ["The book is on the table.", "There's a picture on the wall.", "Sit on the sofa."] },
    { id: "s3", usage: "other", explanation: "Used in expressions about media, devices, and ongoing states.", examples: ["I heard it on the radio.", "She's on the phone.", "The lights are on."] },
  ]},
  { phrase: "at", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used with clock times and specific points in time.", examples: ["We start at 9am.", "Call me at noon.", "He woke up at midnight."] },
    { id: "s2", usage: "place", explanation: "Used for specific points or locations, often smaller/precise ones.", examples: ["Meet me at the entrance.", "She's at school.", "Turn left at the corner."] },
    { id: "s3", usage: "other", explanation: "Used in fixed expressions about ability, state, or targets.", examples: ["He's good at chess.", "The building is at risk.", "She looked at him."] },
  ]},
  { phrase: "by", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used to mean 'no later than' a deadline.", examples: ["Finish the report by Friday.", "Please arrive by 6pm."] },
    { id: "s2", usage: "place", explanation: "Used to mean 'next to' or 'near'.", examples: ["She sat by the window.", "There's a café by the station."] },
    { id: "s3", usage: "manner", explanation: "Used for method or means of doing something.", examples: ["We traveled by train.", "He fixed it by hand.", "Pay by card."] },
    { id: "s4", usage: "other", explanation: "Used to show who performed an action (passive voice).", examples: ["The novel was written by a famous author.", "The bridge was designed by engineers."] },
  ]},
  { phrase: "with", type: "core", senses: [
    { id: "s1", usage: "other", explanation: "Used to show accompaniment — being together with someone.", examples: ["I went with my sister.", "She lives with her parents."] },
    { id: "s2", usage: "manner", explanation: "Used for the instrument or tool used to do something.", examples: ["Cut it with scissors.", "She wrote with a pencil."] },
    { id: "s3", usage: "other", explanation: "Used to describe a manner, quality, or characteristic.", examples: ["He spoke with confidence.", "A woman with red hair walked in."] },
  ]},
  { phrase: "for", type: "core", senses: [
    { id: "s1", usage: "other", explanation: "Used to show purpose or intended use.", examples: ["This knife is for cutting bread.", "We're saving for a house."] },
    { id: "s2", usage: "time", explanation: "Used with a length or duration of time.", examples: ["I've lived here for five years.", "Wait for a moment."] },
    { id: "s3", usage: "other", explanation: "Used to show who something is intended for, or in exchange for.", examples: ["This gift is for you.", "I paid $20 for the ticket."] },
  ]},
  { phrase: "from", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used to show origin or starting point.", examples: ["She's from Brazil.", "The train leaves from platform 3."] },
    { id: "s2", usage: "time", explanation: "Used to mark the beginning of a time period.", examples: ["We're open from 9 to 5.", "The offer starts from Monday."] },
    { id: "s3", usage: "other", explanation: "Used to show source, material, or cause.", examples: ["The table is made from oak.", "She's tired from the trip."] },
  ]},
  { phrase: "to", type: "core", senses: [
    { id: "s1", usage: "movement", explanation: "Used to show direction or destination.", examples: ["We're driving to the coast.", "He went to the store."] },
    { id: "s2", usage: "other", explanation: "Used to show the recipient of something.", examples: ["Give the book to me.", "She sent a letter to her friend."] },
    { id: "s3", usage: "time", explanation: "Used to show an end point in time or range.", examples: ["The store is open from 9 to 6.", "It's ten to three."] },
  ]},
  { phrase: "of", type: "core", senses: [
    { id: "s1", usage: "other", explanation: "Used to show possession, relationship, or a part of something.", examples: ["The capital of France is Paris.", "A friend of mine is visiting."] },
    { id: "s2", usage: "other", explanation: "Used to show what something is made of, or contains.", examples: ["The ring is made of gold.", "A cup of coffee, please."] },
  ]},
  { phrase: "about", type: "core", senses: [
    { id: "s1", usage: "other", explanation: "Used to show the topic or subject of something.", examples: ["The movie is about a detective.", "We talked about the plan."] },
    { id: "s2", usage: "other", explanation: "Used to mean approximately.", examples: ["There were about 50 people there.", "It costs about $10."] },
  ]},
  { phrase: "over", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used to mean above, or covering something.", examples: ["A lamp hung over the table.", "She put a blanket over him."] },
    { id: "s2", usage: "movement", explanation: "Used for movement across or above something.", examples: ["The cat jumped over the fence.", "We flew over the mountains."] },
    { id: "s3", usage: "other", explanation: "Used for duration, or to mean 'more than'.", examples: ["We talked over dinner.", "Over 100 people applied."] },
  ]},
  { phrase: "under", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used to mean below or beneath something.", examples: ["The cat is under the bed.", "We sheltered under a tree."] },
    { id: "s2", usage: "other", explanation: "Used to mean less than a number or age.", examples: ["Tickets are free for under 12s.", "The cost was under $50."] },
    { id: "s3", usage: "other", explanation: "Used to show something is being affected by or subject to a process.", examples: ["The building is under construction.", "The case is under review."] },
  ]},
  { phrase: "between", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used for a position with exactly two things or points on either side.", examples: ["The house is between the bakery and the bank.", "She sat between her parents."] },
    { id: "s2", usage: "time", explanation: "Used for a range with two time points as limits.", examples: ["The store is open between 9 and 6.", "Call me between 2 and 3."] },
  ]},
  { phrase: "among", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used for a position within a group of three or more.", examples: ["She felt at home among friends.", "The keys are somewhere among these papers."] },
  ]},
  { phrase: "through", type: "core", senses: [
    { id: "s1", usage: "movement", explanation: "Used for movement entering one side and exiting another.", examples: ["We drove through the tunnel.", "Light comes through the window."] },
    { id: "s2", usage: "time", explanation: "Used to mean from the beginning to the end of a period.", examples: ["She worked through the night.", "We got through the winter."] },
    { id: "s3", usage: "manner", explanation: "Used to show the means by which something happens.", examples: ["He succeeded through hard work.", "We solved it through discussion."] },
  ]},
  { phrase: "during", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used to show that something happens within a period, not for how long.", examples: ["She fell asleep during the movie.", "It rained during the night."] },
  ]},
  { phrase: "since", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used to mark the starting point of an ongoing period, up to now.", examples: ["I've been here since 2018.", "We haven't spoken since Monday."] },
  ]},
  { phrase: "until", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used to mark the point when something stops or ends.", examples: ["We waited until midnight.", "The offer runs until Friday."] },
  ]},
  { phrase: "before", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used to show that something happens earlier than another time or event.", examples: ["Finish your homework before dinner.", "We arrived before the show started."] },
    { id: "s2", usage: "place", explanation: "Used to mean in front of, often in formal contexts.", examples: ["He stood before the judge.", "The path lay before them."] },
  ]},
  { phrase: "after", type: "core", senses: [
    { id: "s1", usage: "time", explanation: "Used to show that something happens later than another time or event.", examples: ["We'll leave after lunch.", "She called after the meeting."] },
  ]},
  { phrase: "behind", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used to mean at the back of something.", examples: ["The car is parked behind the building.", "He hid behind the door."] },
    { id: "s2", usage: "other", explanation: "Used to mean late relative to a schedule.", examples: ["We're behind schedule.", "She fell behind in her studies."] },
  ]},
  { phrase: "in front of", type: "core", senses: [
    { id: "s1", usage: "place", explanation: "Used to mean at the front, facing something.", examples: ["They parked in front of the house.", "Don't say that in front of the kids."] },
  ]},
  { phrase: "into", type: "core", senses: [
    { id: "s1", usage: "movement", explanation: "Used for movement from outside to inside a place.", examples: ["She walked into the room.", "He jumped into the pool."] },
    { id: "s2", usage: "other", explanation: "Used to show a change from one state or form to another.", examples: ["Water turns into ice.", "Translate it into French."] },
  ]},
  { phrase: "out of", type: "core", senses: [
    { id: "s1", usage: "movement", explanation: "Used for movement from inside to outside a place.", examples: ["He walked out of the room.", "She took the keys out of her bag."] },
    { id: "s2", usage: "other", explanation: "Used to show a lack of something, or origin/material.", examples: ["We're out of milk.", "The bowl is made out of clay."] },
  ]},
  { phrase: "off", type: "core", senses: [
    { id: "s1", usage: "movement", explanation: "Used for movement away from a surface or vehicle.", examples: ["Get off the bus at the next stop.", "The picture fell off the wall."] },
    { id: "s2", usage: "other", explanation: "Used to describe a reduction or discount, or something not working.", examples: ["Everything is 20% off today.", "Turn the lights off."] },
  ]},

  // ============ ADJECTIVE + PREPOSITION ============
  { phrase: "afraid of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling fear about something.", examples: ["She's afraid of spiders.", "He's not afraid of hard work."] },
  ]},
  { phrase: "angry with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling anger toward a person (use 'about' for a situation).", examples: ["I'm angry with him for lying.", "She was angry with herself."] },
  ]},
  { phrase: "ashamed of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling embarrassment or guilt about something.", examples: ["He's ashamed of his behavior.", "Don't be ashamed of asking for help."] },
  ]},
  { phrase: "aware of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Knowing about or noticing something.", examples: ["Are you aware of the risks?", "She wasn't aware of the deadline."] },
  ]},
  { phrase: "bad at", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Not skilled at doing something.", examples: ["I'm bad at remembering names.", "He's bad at cooking."] },
  ]},
  { phrase: "bored with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "No longer interested in something.", examples: ["She's bored with her job.", "I got bored with the routine."] },
  ]},
  { phrase: "capable of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Having the ability to do something.", examples: ["She's capable of running a marathon.", "He's capable of much more than this."] },
  ]},
  { phrase: "certain about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Confident and sure about something.", examples: ["I'm not certain about the details.", "Are you certain about this decision?"] },
  ]},
  { phrase: "concerned about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Worried about something.", examples: ["We're concerned about the delay.", "She's concerned about his health."] },
  ]},
  { phrase: "confident about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling sure and positive about something.", examples: ["I'm confident about the results.", "He's confident about his chances."] },
  ]},
  { phrase: "curious about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Wanting to know more about something.", examples: ["She's curious about other cultures.", "I'm curious about how it works."] },
  ]},
  { phrase: "different from", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Not the same as something else.", examples: ["This version is different from the last one.", "Her approach is different from mine."] },
  ]},
  { phrase: "excited about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling enthusiasm about something.", examples: ["We're excited about the trip.", "She's excited about the new job."] },
  ]},
  { phrase: "familiar with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Knowing something well from experience.", examples: ["Are you familiar with this software?", "I'm familiar with the area."] },
  ]},
  { phrase: "famous for", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Well known because of something.", examples: ["The city is famous for its architecture.", "She's famous for her novels."] },
  ]},
  { phrase: "fond of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Liking someone or something, often over time.", examples: ["He's very fond of his grandchildren.", "I'm fond of this old jacket."] },
  ]},
  { phrase: "good at", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Skilled at doing something.", examples: ["She's good at math.", "He's good at fixing things."] },
  ]},
  { phrase: "grateful for", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling thankful for something.", examples: ["I'm grateful for your help.", "We're grateful for the opportunity."] },
  ]},
  { phrase: "guilty of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Having done something wrong.", examples: ["He was found guilty of the crime.", "She felt guilty of neglecting her friends."] },
  ]},
  { phrase: "happy with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Satisfied or pleased with something.", examples: ["I'm happy with the results.", "Are you happy with your new phone?"] },
  ]},
  { phrase: "honest about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Telling the truth about something.", examples: ["Please be honest about how you feel.", "He was honest about the mistake."] },
  ]},
  { phrase: "interested in", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Having curiosity or attraction toward something.", examples: ["She's interested in astronomy.", "Are you interested in joining us?"] },
  ]},
  { phrase: "jealous of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling envy toward someone or something.", examples: ["He's jealous of his brother's success.", "Try not to be jealous of others."] },
  ]},
  { phrase: "keen on", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Enthusiastic about something (mainly British English).", examples: ["She's really keen on hiking.", "I'm not keen on the idea."] },
  ]},
  { phrase: "kind to", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Treating someone with kindness.", examples: ["Always be kind to strangers.", "She was very kind to us during the trip."] },
  ]},
  { phrase: "married to", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Being someone's spouse.", examples: ["She's married to a doctor.", "He's been married to her for ten years."] },
  ]},
  { phrase: "nervous about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling anxious about something.", examples: ["I'm nervous about the interview.", "She's nervous about flying."] },
  ]},
  { phrase: "pleased with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Satisfied or happy with something.", examples: ["The teacher was pleased with the class.", "I'm pleased with how it turned out."] },
  ]},
  { phrase: "proud of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling pleased and satisfied about an achievement.", examples: ["We're so proud of you.", "She's proud of her work."] },
  ]},
  { phrase: "ready for", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Prepared for something.", examples: ["Are you ready for the exam?", "We're ready for the trip."] },
  ]},
  { phrase: "responsible for", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "In charge of, or accountable for, something.", examples: ["She's responsible for the budget.", "Who's responsible for this mess?"] },
  ]},
  { phrase: "satisfied with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Content or pleased with something.", examples: ["We're satisfied with the service.", "He's rarely satisfied with his own work."] },
  ]},
  { phrase: "scared of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling fear about something.", examples: ["My son is scared of the dark.", "She's scared of making mistakes."] },
  ]},
  { phrase: "similar to", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Almost the same as something else.", examples: ["This is similar to what we discussed.", "Her style is similar to her sister's."] },
  ]},
  { phrase: "sorry for", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling regret about something you did, or sympathy for someone.", examples: ["I'm sorry for the delay.", "I feel sorry for him."] },
  ]},
  { phrase: "successful in", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Achieving a good result in something.", examples: ["She's been successful in her career.", "They were successful in raising funds."] },
  ]},
  { phrase: "suitable for", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Appropriate or right for a purpose.", examples: ["This movie isn't suitable for kids.", "The role is suitable for a graduate."] },
  ]},
  { phrase: "sure of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Confident and certain about something.", examples: ["I'm not sure of the answer.", "She's sure of herself."] },
  ]},
  { phrase: "surprised at", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling surprise because of something.", examples: ["I was surprised at how fast it went.", "She's surprised at the reaction."] },
  ]},
  { phrase: "tired of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "No longer wanting to continue with something; fed up.", examples: ["I'm tired of waiting.", "He's tired of the same routine."] },
  ]},
  { phrase: "upset about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling unhappy or troubled about something.", examples: ["She's upset about the news.", "He was upset about losing the match."] },
  ]},
  { phrase: "worried about", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Feeling concern or anxiety about something.", examples: ["I'm worried about the exam.", "They're worried about the weather."] },
  ]},
  { phrase: "full of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Containing a lot of something.", examples: ["The room was full of people.", "She's full of energy today."] },
  ]},
  { phrase: "popular with", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Liked by a particular group of people.", examples: ["The café is popular with students.", "He's popular with his colleagues."] },
  ]},
  { phrase: "rich in", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Having a large amount of something.", examples: ["Oranges are rich in vitamin C.", "The region is rich in history."] },
  ]},
  { phrase: "short of", type: "adjective-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Not having enough of something.", examples: ["We're short of time.", "The team is short of players."] },
  ]},

  // ============ NOUN + PREPOSITION ============
  { phrase: "access to", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The ability to use, enter, or reach something.", examples: ["Students have access to the library.", "We need access to the files."] },
  ]},
  { phrase: "advantage of", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A benefit or favorable factor related to something.", examples: ["One advantage of remote work is flexibility.", "She took advantage of the offer."] },
  ]},
  { phrase: "answer to", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A response or solution to a question or problem.", examples: ["I don't know the answer to that.", "There's no easy answer to this issue."] },
  ]},
  { phrase: "attitude towards", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The way someone thinks or feels about something.", examples: ["His attitude towards work has changed.", "She has a positive attitude towards challenges."] },
  ]},
  { phrase: "belief in", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Trust or confidence in the truth or existence of something.", examples: ["She has a strong belief in hard work.", "His belief in the plan never wavered."] },
  ]},
  { phrase: "cause of", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The reason something happens.", examples: ["The cause of the delay is unclear.", "Stress was the main cause of his illness."] },
  ]},
  { phrase: "chance of", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The possibility or likelihood of something happening.", examples: ["There's a good chance of rain.", "What's the chance of success?"] },
  ]},
  { phrase: "connection between", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A link or relationship between two things.", examples: ["Is there a connection between diet and sleep?", "They found a connection between the two cases."] },
  ]},
  { phrase: "cure for", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Something that solves a problem or treats an illness.", examples: ["Scientists are searching for a cure for the disease.", "Exercise isn't a cure for everything."] },
  ]},
  { phrase: "demand for", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The desire or need for something, especially in a market.", examples: ["There's high demand for electric cars.", "Demand for the product grew quickly."] },
  ]},
  { phrase: "difference between", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "How two things are not the same.", examples: ["What's the difference between these two options?", "There's a big difference between theory and practice."] },
  ]},
  { phrase: "difficulty with", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Trouble or a problem dealing with something.", examples: ["She had difficulty with the assignment.", "I'm having difficulty with this software."] },
  ]},
  { phrase: "effect on", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The result or influence something has.", examples: ["The medicine had little effect on the pain.", "Social media has an effect on attention spans."] },
  ]},
  { phrase: "example of", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A specific instance that shows or illustrates something.", examples: ["This is a good example of teamwork.", "Can you give an example of that?"] },
  ]},
  { phrase: "increase in", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A rise in the amount or level of something.", examples: ["There's been an increase in prices.", "We saw a big increase in sales."] },
  ]},
  { phrase: "interest in", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Curiosity or attraction toward something.", examples: ["Her interest in art started young.", "There's growing interest in the topic."] },
  ]},
  { phrase: "lack of", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The absence or shortage of something.", examples: ["The project failed due to a lack of funding.", "There's a lack of clear communication."] },
  ]},
  { phrase: "need for", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A requirement or necessity for something.", examples: ["There's an urgent need for volunteers.", "She explained the need for change."] },
  ]},
  { phrase: "opportunity for", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A chance to do or achieve something.", examples: ["This role is a great opportunity for growth.", "There's an opportunity for improvement here."] },
  ]},
  { phrase: "problem with", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A difficulty or issue related to something.", examples: ["There's a problem with the printer.", "What's the problem with this plan?"] },
  ]},
  { phrase: "reaction to", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A response caused by something.", examples: ["Her reaction to the news surprised everyone.", "He had a bad reaction to the medicine."] },
  ]},
  { phrase: "reason for", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The cause or explanation for something.", examples: ["What's the reason for the delay?", "There's no reason for concern."] },
  ]},
  { phrase: "relationship between", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "The way two things or people are connected.", examples: ["The relationship between the two countries improved.", "There's a clear relationship between sleep and mood."] },
  ]},
  { phrase: "respect for", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "Admiration or high regard for someone or something.", examples: ["She has great respect for her teachers.", "He showed respect for the local customs."] },
  ]},
  { phrase: "solution to", type: "noun-preposition", senses: [
    { id: "s1", usage: "other", explanation: "A way of solving a problem.", examples: ["We found a solution to the issue.", "There's no simple solution to this."] },
  ]},
];

export const PREPOSITIONS: PrepositionEntry[] = RAW.map((entry) => {
  const slug = slugify(entry.phrase);
  return { ...entry, id: slug, slug };
});

export const PREPOSITIONS_BY_SLUG: Record<string, PrepositionEntry> = Object.fromEntries(
  PREPOSITIONS.map((p) => [p.slug, p])
);
