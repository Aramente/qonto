Error: Could not parse CSS stylesheet
    at exports.createStylesheet (/usr/local/lib/node_modules/defuddle-cli/node_modules/jsdom/lib/jsdom/living/helpers/stylesheets.js:37:21)
    at HTMLStyleElementImpl._updateAStyleBlock (/usr/local/lib/node_modules/defuddle-cli/node_modules/jsdom/lib/jsdom/living/nodes/HTMLStyleElement-impl.js:68:5)
    at HTMLStyleElementImpl._poppedOffStackOfOpenElements (/usr/local/lib/node_modules/defuddle-cli/node_modules/jsdom/lib/jsdom/living/nodes/HTMLStyleElement-impl.js:42:10)
    at JSDOMParse5Adapter.onItemPop (/usr/local/lib/node_modules/defuddle-cli/node_modules/jsdom/lib/jsdom/browser/parser/html.js:175:43)
    at Parser.onItemPop (/usr/local/lib/node_modules/defuddle-cli/node_modules/parse5/dist/cjs/parser/index.js:176:90)
    at OpenElementStack.pop (/usr/local/lib/node_modules/defuddle-cli/node_modules/parse5/dist/cjs/parser/open-element-stack.js:83:22)
    at endTagInText (/usr/local/lib/node_modules/defuddle-cli/node_modules/parse5/dist/cjs/parser/index.js:2353:20)
    at Parser._endTagOutsideForeignContent (/usr/local/lib/node_modules/defuddle-cli/node_modules/parse5/dist/cjs/parser/index.js:992:17)
    at Parser.onEndTag (/usr/local/lib/node_modules/defuddle-cli/node_modules/parse5/dist/cjs/parser/index.js:957:18)
    at Tokenizer.emitCurrentTagToken (/usr/local/lib/node_modules/defuddle-cli/node_modules/parse5/dist/cjs/tokenizer/index.js:385:26) 
/* Add attribute characters = # where # is the max amount of characters per line */
[characters="10"] { max-width: 10ch; }
[characters="11"] { max-width: 11ch; }
[characters="12"] { max-width: 12ch; }
[characters="13"] { max-width: 13ch; }
[characters="14"] { max-width: 14ch; }
[characters="15"] { max-width: 15ch; }
[characters="16"] { max-width: 16ch; }
[characters="17"] { max-width: 17ch; }
[characters="18"] { max-width: 18ch; }
[characters="19"] { max-width: 19ch; }
[characters="20"] { max-width: 20ch; }
[characters="21"] { max-width: 21ch; }
[characters="22"] { max-width: 22ch; }
[characters="23"] { max-width: 23ch; }
[characters="24"] { max-width: 24ch; }
[characters="25"] { max-width: 25ch; }
[characters="26"] { max-width: 26ch; }
[characters="27"] { max-width: 27ch; }
[characters="28"] { max-width: 28ch; }
[characters="29"] { max-width: 29ch; }
[characters="30"] { max-width: 30ch; }
[characters="31"] { max-width: 31ch; }
[characters="32"] { max-width: 32ch; }
[characters="33"] { max-width: 33ch; }
[characters="34"] { max-width: 34ch; }
[characters="35"] { max-width: 35ch; }
[characters="36"] { max-width: 36ch; }
[characters="37"] { max-width: 37ch; }
[characters="38"] { max-width: 38ch; }
[characters="39"] { max-width: 39ch; }
[characters="40"] { max-width: 40ch; }
[characters="41"] { max-width: 41ch; }
[characters="42"] { max-width: 42ch; }
[characters="43"] { max-width: 43ch; }
[characters="44"] { max-width: 44ch; }
[characters="45"] { max-width: 45ch; }
[characters="46"] { max-width: 46ch; }
[characters="47"] { max-width: 47ch; }
[characters="48"] { max-width: 48ch; }
[characters="49"] { max-width: 49ch; }
[characters="50"] { max-width: 50ch; }
[characters="51"] { max-width: 51ch; }
[characters="52"] { max-width: 52ch; }
[characters="53"] { max-width: 53ch; }
[characters="54"] { max-width: 54ch; }
[characters="55"] { max-width: 55ch; }
[characters="56"] { max-width: 56ch; }
[characters="57"] { max-width: 57ch; }
[characters="58"] { max-width: 58ch; }
[characters="59"] { max-width: 59ch; }
[characters="60"] { max-width: 60ch; }

/* Add attribute margin = [size] where [size] is the amount of bottom-margin */
[margin="none"] { margin-bottom: 0!important; }
[margin="xsmall"] { margin-bottom: var(--margin--xsmall)!important; }
[margin="small"] { margin-bottom: var(--margin--small)!important; }
[margin="medium"] { margin-bottom: var(--margin--medium)!important; }
[margin="large"] { margin-bottom: var(--margin--large)!important; }
[margin="xlarge"] { margin-bottom: var(--margin--xlarge)!important; }

/* Font weights */
[weight="400"] { font-weight: 400; }
[weight="500"] { font-weight: 500; }
[weight="600"] { font-weight: 600; }

/* Line Height */
[lineheight=".9"] { line-height: .9; }
[lineheight="1"] { line-height: 1; }
[lineheight="1.1"] { line-height: 1.1; }
[lineheight="1.2"] { line-height: 1.2; }
[lineheight="1.3"] { line-height: 1.3; }
[lineheight="1.4"] { line-height: 1.4; }
[lineheight="1.5"] { line-height: 1.5; }

/* Overflow */
[overflow="hidden"] { overflow: hidden; }
[overflow="clip"] { overflow: clip; }
[overflow="visible"] { overflow: visible; }

/* Ellipsis */
[lines="7"] {
	display: -webkit-box;
	-webkit-line-clamp: 7;
	-webkit-box-orient: vertical;
	max-height: 9.4em;
	overflow: hidden;
}

[lines="6"] {
	display: -webkit-box;
	-webkit-line-clamp: 6;
	-webkit-box-orient: vertical;
	max-height: 8em;
	overflow: hidden;
}

[lines="5"] {
	display: -webkit-box;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
	max-height: 6.4em;
	overflow: hidden;
}

[lines="4"] {
	display: -webkit-box;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	max-height: 5.2em;
	overflow: hidden;
}

[lines="3"] {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	max-height: 4em;
	overflow: hidden;
}

[lines="2"] {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	max-height: 2.6em;
	overflow: hidden;
}

[lines="1"] {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	max-height: 1.3em;
	overflow: hidden;
}

/* Decoration */
[decoration="line"] { text-decoration: line-through; }
[decoration="underline"] { text-decoration: underline; }
[decoration="overline"] { text-decoration: overline; }

/* Wrap */
[text-wrap="pretty"]  { text-wrap: pretty; }
[text-wrap="balance"] { text-wrap: balance; }
[text-wrap="wrap"]    { text-wrap: wrap; }
[text-wrap="nowrap"]  { text-wrap: nowrap; }

/* Background gradients */
[gradient="lime-100" i] { background: var(--gradient-lime-100);}
[gradient="lime-50" i] { background: var(--gradient-lime-50);}
[gradient="yellow-100" i] { background: var(--gradient-yellow-100);}
[gradient="yellow-50" i] { background: var(--gradient-yellow-50);}
[gradient="pink-100" i] { background: var(--gradient-pink-100);}
[gradient="pink-50" i] { background: var(--gradient-pink-50);}
[gradient="purple-100" i] { background: var(--gradient-purple-100);}
[gradient="purple-50" i] { background: var(--gradient-purple-50);}
[gradient="blue-100" i] { background: var(--gradient-blue-100);}
[gradient="blue-50" i] { background: var(--gradient-blue-50);}
[gradient="teal-100" i] { background: var(--gradient-teal-100);}
[gradient="teal-50" i] { background: var(--gradient-teal-50);}
[gradient="green-100" i] { background: var(--gradient-green-100);}
[gradient="green-50" i] { background: var(--gradient-green-50);}

/* Text gradients */
[txt-gradient] { 
	position: relative;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}

[txt-gradient="green" i] {
	--step-1: #00A3A3;
	--step-2: #33b88c;
	--step-3: #a9eba9;
	background-image: linear-gradient(100deg, var(--step-1), var(--step-2), var(--step-3), var(--step-2), var(--step-1));
  background-size: 200% 100%;
}

[txt-gradient="blue" i] {
	--step-1: var(--color--blue-800);
	--step-2: var(--color--blue-400);
	--step-3: var(--color--turquoise-400);
	background-image: linear-gradient(100deg, var(--step-1), var(--step-2), var(--step-3), var(--step-2), var(--step-1));
	background-size: 200% 100%;
}

[txt-gradient="purple" i] {
	--step-1: #7070FF;
	--step-2: #AD67EB;
	--step-3: #FAB8FF;
	background-image: linear-gradient(100deg, var(--step-1), var(--step-2), var(--step-3), var(--step-2), var(--step-1));
	background-size: 200% 100%;
}

[txt-gradient="turquoise" i] {
	--step-1: rgb(0, 224, 224);
	--step-2: rgb(131, 255, 189);
	--step-3: rgb(152, 255, 155);
	background-image: linear-gradient(100deg, var(--step-1), var(--step-2), var(--step-3), var(--step-2), var(--step-1));
	background-size: 200% 100%;
}

[txt-gradient="lime" i] { 
	background-image: linear-gradient(342deg, var(--color--transparent) 69%, #dbeb7a), linear-gradient(29deg, hsla(148.06451612903226, 100.00%, 75.69%, 0.00) 25%, hsla(180, 100.00%, 43.92%, 0.00) 42%, #98ff9b), linear-gradient(to bottom, hsla(0, 0.00%, 100.00%, 1.00),hsla(0, 0.00%, 100.00%, 1.00)); }
  
[txt-gradient-animation="true"] { 
	animation: txt-gradient 12s linear infinite;
}

@keyframes txt-gradient {
	from { background-position: 0%; }
  to { background-position: -200%; }
}

/* Desktop/mobile swap */
[display-mode="desktop"] { 
@media only screen and (max-width: 767px) {
	display: none;
}
}

[display-mode="mobile"] { 
@media only screen and (min-width: 768px) {
	display: none;
}
}


## Our vision for Lattice AI

Augment managers with tools to better understand employees and drive performance more effectively.  

[![](https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/670459f12ac257172d40d74b_ai-assistant.webp)](/platform/ai-agent)

### [AI Agent](/platform/ai-agent)

[

Get instant answers to company policy questions, career growth recommendations, and people strategy best practices based off of Lattice Library content built by HR experts so your team has time back to focus on what matters.

Learn more

](/platform/ai-agent)

![](https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/6807fdcab36c4cda33012f80_ai-boost-manager-effectiveness%20\(1\).webp)

### Manager Effectiveness

Equip managers with AI-powered insights that boost team performance, flag burnout risks, and guide career conversations—so HR can scale their impact without adding headcount.

![Customer service performance review interface for Mel Miller showing a question about most significant accomplishments and a question overview with objective to increase customer satisfaction by 10%.](https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/6632719a6a72caf1232a3925_ai-performance-insights.webp)

### Performance Insights

Write better employee performance reviews in less time, with insights based on cross-functional feedback, goals, growth areas, and more from the review period.

![Three Q2 engagement survey comments highlighting needs for open management communication and honest, constructive feedback, under the header 'Comment trends: Desire for improved management communication and feedback' with an action plan and team member icons, powered by OpenAI.](https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/663271995cd92e58eaaf7e38_ai-engagement-insights.webp)

### Engagement Insights

Synthesize your survey results and open-ended feedback in a matter of seconds – not days. Once your survey is closed, Lattice AI will deliver a key driver analysis, comment trends, and recommended actions.  

![User interface showing a profile card for Bethany Hale, Sales Rep, with a text snippet and a bias check suggestion highlighting the word 'knowledge'.](https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/663271993e29dc4b51044e98_ai-writing-assistant.webp)

### Writing Assistance

Get real-time recommendations to improve the quality of your performance reviews or feedback with checks for grammar, clarity, and bias.

![Dashboard showing team engagement results with top themes like Team culture, Psychological safety, Self-efficacy; top comment trend about desire for improved management communication and feedback; overall stats with 100% participation and a Likert score of 44, both higher than last year.](https://cdn.prod.website-files.com/64ad6f1aef87635bd23449f1/6632719904f88efb143c05dc_ai-team-engagement.webp)

### Team Health

View trends for your team based on survey data, one-on-ones, and Updates, and get recommendations to improve team participation and reduce attrition.

## Our promise

We take our AI development seriously because we know your people data is precious. Here’s how we’re doing that:  

### 1

#### Elevate human decision-making.

Our AI enhancements are designed to empower people leaders (not machines!) to make informed decisions with all of the information and insights they need.

### 2

#### Protect customer data.

We are GDPR and SOC 2 compliant and will continue to responsibly collect, use, and protect customer data. Learn more about [how we keep your data secure](https://trustcenter.lattice.com/)

### 3

#### Leverage best-in-class technology.

Our applications are powered by OpenAI’s trusted machine-learning model, because the best people teams deserve the best that tech has to offer.

Resources
