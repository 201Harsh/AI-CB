# 🤖 EmoAI ChatBot (MERN + EndGaming AI)

An AI-powered chatbot web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) integrated with the Endgaming AI API. Users can register, log in, and interact with an intelligent chatbot. The app also includes a credit-based system to limit API usage.

---

# 🧠 Core Architecture

## 🔄 System Design

<svg role="graphics-document document" viewBox="0 0 717.734375 430" class="flowchart mermaid-svg" xmlns="http://www.w3.org/2000/svg" width="100%" id="mermaid-svg-9" style="max-width: 717.734px; transform-origin: 0px 0px; user-select: none; transform: translate(0px, 2.55475px) scale(1);"><style>#mermaid-svg-9{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#ccc;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#mermaid-svg-9 .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#mermaid-svg-9 .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#mermaid-svg-9 .error-icon{fill:#a44141;}#mermaid-svg-9 .error-text{fill:#ddd;stroke:#ddd;}#mermaid-svg-9 .edge-thickness-normal{stroke-width:1px;}#mermaid-svg-9 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-svg-9 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-svg-9 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-svg-9 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-svg-9 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-svg-9 .marker{fill:lightgrey;stroke:lightgrey;}#mermaid-svg-9 .marker.cross{stroke:lightgrey;}#mermaid-svg-9 svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-svg-9 p{margin:0;}#mermaid-svg-9 .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#ccc;}#mermaid-svg-9 .cluster-label text{fill:#F9FFFE;}#mermaid-svg-9 .cluster-label span{color:#F9FFFE;}#mermaid-svg-9 .cluster-label span p{background-color:transparent;}#mermaid-svg-9 .label text,#mermaid-svg-9 span{fill:#ccc;color:#ccc;}#mermaid-svg-9 .node rect,#mermaid-svg-9 .node circle,#mermaid-svg-9 .node ellipse,#mermaid-svg-9 .node polygon,#mermaid-svg-9 .node path{fill:#1f2020;stroke:#ccc;stroke-width:1px;}#mermaid-svg-9 .rough-node .label text,#mermaid-svg-9 .node .label text,#mermaid-svg-9 .image-shape .label,#mermaid-svg-9 .icon-shape .label{text-anchor:middle;}#mermaid-svg-9 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-svg-9 .rough-node .label,#mermaid-svg-9 .node .label,#mermaid-svg-9 .image-shape .label,#mermaid-svg-9 .icon-shape .label{text-align:center;}#mermaid-svg-9 .node.clickable{cursor:pointer;}#mermaid-svg-9 .root .anchor path{fill:lightgrey!important;stroke-width:0;stroke:lightgrey;}#mermaid-svg-9 .arrowheadPath{fill:lightgrey;}#mermaid-svg-9 .edgePath .path{stroke:lightgrey;stroke-width:2.0px;}#mermaid-svg-9 .flowchart-link{stroke:lightgrey;fill:none;}#mermaid-svg-9 .edgeLabel{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-svg-9 .edgeLabel p{background-color:hsl(0, 0%, 34.4117647059%);}#mermaid-svg-9 .edgeLabel rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-svg-9 .labelBkg{background-color:rgba(87.75, 87.75, 87.75, 0.5);}#mermaid-svg-9 .cluster rect{fill:hsl(180, 1.5873015873%, 28.3529411765%);stroke:rgba(255, 255, 255, 0.25);stroke-width:1px;}#mermaid-svg-9 .cluster text{fill:#F9FFFE;}#mermaid-svg-9 .cluster span{color:#F9FFFE;}#mermaid-svg-9 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(20, 1.5873015873%, 12.3529411765%);border:1px solid rgba(255, 255, 255, 0.25);border-radius:2px;pointer-events:none;z-index:100;}#mermaid-svg-9 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#ccc;}#mermaid-svg-9 rect.text{fill:none;stroke-width:0;}#mermaid-svg-9 .icon-shape,#mermaid-svg-9 .image-shape{background-color:hsl(0, 0%, 34.4117647059%);text-align:center;}#mermaid-svg-9 .icon-shape p,#mermaid-svg-9 .image-shape p{background-color:hsl(0, 0%, 34.4117647059%);padding:2px;}#mermaid-svg-9 .icon-shape rect,#mermaid-svg-9 .image-shape rect{opacity:0.5;background-color:hsl(0, 0%, 34.4117647059%);fill:hsl(0, 0%, 34.4117647059%);}#mermaid-svg-9 :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-9_flowchart-v2-pointEnd"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 0 L 10 5 L 0 10 z"></path></marker><marker orient="auto" markerHeight="8" markerWidth="8" markerUnits="userSpaceOnUse" refY="5" refX="4.5" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-9_flowchart-v2-pointStart"><path style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 0 5 L 10 10 L 10 0 z"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="11" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-9_flowchart-v2-circleEnd"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5" refX="-1" viewBox="0 0 10 10" class="marker flowchart-v2" id="mermaid-svg-9_flowchart-v2-circleStart"><circle style="stroke-width: 1; stroke-dasharray: 1, 0;" class="arrowMarkerPath" r="5" cy="5" cx="5"></circle></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="12" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-svg-9_flowchart-v2-crossEnd"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><marker orient="auto" markerHeight="11" markerWidth="11" markerUnits="userSpaceOnUse" refY="5.2" refX="-1" viewBox="0 0 11 11" class="marker cross flowchart-v2" id="mermaid-svg-9_flowchart-v2-crossStart"><path style="stroke-width: 2; stroke-dasharray: 1, 0;" class="arrowMarkerPath" d="M 1,1 l 9,9 M 10,1 l -9,9"></path></marker><g class="root"><g class="clusters"></g><g class="edgePaths"><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_A_B_0" d="M181.938,62L181.938,68.167C181.938,74.333,181.938,86.667,181.938,98.333C181.938,110,181.938,121,181.938,126.5L181.938,132"></path><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_B_C_0" d="M134.75,190L123.973,196.167C113.195,202.333,91.641,214.667,80.863,226.333C70.086,238,70.086,249,70.086,254.5L70.086,260"></path><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_B_D_0" d="M213.631,190L220.869,196.167C228.108,202.333,242.585,214.667,249.824,226.333C257.063,238,257.063,249,257.063,254.5L257.063,260"></path><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_B_E_0" d="M239.266,176.947L273.555,185.289C307.844,193.632,376.422,210.316,410.711,224.158C445,238,445,249,445,254.5L445,260"></path><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_E_F_0" d="M381.953,301.936L342.496,308.78C303.039,315.624,224.125,329.312,184.668,339.656C145.211,350,145.211,357,145.211,360.5L145.211,364"></path><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_E_G_0" d="M405.993,318L399.973,322.167C393.954,326.333,381.914,334.667,375.895,342.333C369.875,350,369.875,357,369.875,360.5L369.875,364"></path><path marker-end="url(#mermaid-svg-9_flowchart-v2-pointEnd)" style="" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" id="L_E_H_0" d="M508.047,310.865L525.046,316.221C542.044,321.576,576.042,332.288,593.04,341.144C610.039,350,610.039,357,610.039,360.5L610.039,364"></path></g><g class="edgeLabels"><g transform="translate(181.9375, 99)" class="edgeLabel"><g transform="translate(-18.5390625, -12)" class="label"><foreignObject height="24" width="37.078125"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"><p>Axios</p></span></div></foreignObject></g></g><g transform="translate(70.0859375, 227)" class="edgeLabel"><g transform="translate(-34.546875, -12)" class="label"><foreignObject height="24" width="69.09375"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"><p>Mongoose</p></span></div></foreignObject></g></g><g transform="translate(257.0625, 227)" class="edgeLabel"><g transform="translate(-15.2734375, -12)" class="label"><foreignObject height="24" width="30.546875"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"><p>JWT</p></span></div></foreignObject></g></g><g transform="translate(445, 227)" class="edgeLabel"><g transform="translate(-53.4140625, -12)" class="label"><foreignObject height="24" width="106.828125"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"><p>EndGaming API</p></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g transform="translate(0, 0)" class="label"><foreignObject height="0" width="0"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" class="labelBkg" xmlns="http://www.w3.org/1999/xhtml"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g transform="translate(181.9375, 35)" id="flowchart-A-0" class="node default"><rect height="54" width="124.671875" y="-27" x="-62.3359375" style="" class="basic label-container"></rect><g transform="translate(-32.3359375, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64.671875"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Frontend</p></span></div></foreignObject></g></g><g transform="translate(181.9375, 163)" id="flowchart-B-1" class="node default"><rect height="54" width="114.65625" y="-27" x="-57.328125" style="" class="basic label-container"></rect><g transform="translate(-27.328125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="54.65625"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Node.js</p></span></div></foreignObject></g></g><g transform="translate(70.0859375, 291)" id="flowchart-C-3" class="node default"><rect height="54" width="124.171875" y="-27" x="-62.0859375" style="" class="basic label-container"></rect><g transform="translate(-32.0859375, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="64.171875"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>MongoDB</p></span></div></foreignObject></g></g><g transform="translate(257.0625, 291)" id="flowchart-D-5" class="node default"><rect height="54" width="149.78125" y="-27" x="-74.890625" style="" class="basic label-container"></rect><g transform="translate(-44.890625, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="89.78125"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Auth Service</p></span></div></foreignObject></g></g><g transform="translate(445, 291)" id="flowchart-E-7" class="node default"><rect height="54" width="126.09375" y="-27" x="-63.046875" style="" class="basic label-container"></rect><g transform="translate(-33.046875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="66.09375"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>AI Engine</p></span></div></foreignObject></g></g><g transform="translate(145.2109375, 395)" id="flowchart-F-9" class="node default"><rect height="54" width="168.390625" y="-27" x="-84.1953125" style="" class="basic label-container"></rect><g transform="translate(-54.1953125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="108.390625"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Emotion Matrix</p></span></div></foreignObject></g></g><g transform="translate(369.875, 395)" id="flowchart-G-11" class="node default"><rect height="54" width="180.9375" y="-27" x="-90.46875" style="" class="basic label-container"></rect><g transform="translate(-60.46875, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="120.9375"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Memory Network</p></span></div></foreignObject></g></g><g transform="translate(610.0390625, 395)" id="flowchart-H-13" class="node default"><rect height="54" width="199.390625" y="-27" x="-99.6953125" style="" class="basic label-container"></rect><g transform="translate(-69.6953125, -12)" style="" class="label"><rect></rect><foreignObject height="24" width="139.390625"><div style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;" xmlns="http://www.w3.org/1999/xhtml"><span class="nodeLabel"><p>Language Processor</p></span></div></foreignObject></g></g></g></g></g></svg>


```mermaid
flowchart TD
    A[Client (React.js)] -->|Axios API Calls| B[Backend (Node.js + Express.js)]
    B -->|Mongoose| C[MongoDB Database]
    B -->|JWT Authentication| D[Auth System]
    B -->|API Integration| E[EndGaming AI API]
    E -->|Response| F[Backend]
    F -->|Data| G[Client (React.js)]
```
---

# 🔥 Features

- 🧠 AI Chat using EndGaming AI API
- 👤 User Authentication (Register / Login)
- 🔐 JWT-based Auth with secure password hashing
- 💳 Credit System: Limits chatbot queries based on user credits
- 🌐 Full MERN Stack Integration
- ⚡ Real-time API response rendering using React
- 🗃️ MongoDB database for user and credit management

## 🌈 Emotional Response System

Mood Adaptation Matrix
User Emotion	AI Response Pattern	Sample Response
- 😠 Angry	Calm + Solution-Oriented	"Let's workthrough this..."
- 😔 Sad	Empathetic + Encouraging	"I'm here for you..."
- 😃 Happy	Enthusiastic + Playful	"That's awesome! 🎉..."


---

# 🛠️ Tech Stack

## Frontend:
- React.js
- Axios
- Tailwind CSS
- React Router DOM

## Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt

### API:
- EndGaming AI API (or you can use other AI API)

---

# 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/201Harsh/AI-CB.git
cd ai-cb
```

### 2. Setup Backend
```bash
cd Backend
npm install
```

- Create a .env file in the server directory:

```bash
PORT=your_Port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENDG_API_KEY=your_endg_api_key
```

- Start the backend:

```bash
npx nodemon
```

### 3. Setup Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

# ✨ Usage
- Register a new user

- Login to your account

- Each user gets initial free credits (configurable)

- Ask a question to the chatbot

- Response is generated via AI API

- Each query consumes credits

---

# 📦 API Integration

#### Using Google Gemini or a similar Google AI API:

- Backend makes POST requests to the API with the user’s prompt

- Response is returned to the frontend

- Credit is deducted per request

---

# 🧮 Credit System (Example)

- Each user starts with 10 credits

- 1 credit = 1 chatbot question

- Credit deduction logic is handled in the backend

- Prevents queries when credits are 0w

---

# 📌 TODOs

- Add UI feedback for no credits

- Add option to purchase or earn more credits

- Improve chatbot UI with typing effect

- Save chat history per user

---

# 🛡️ Security

- Passwords are hashed using bcrypt

- JWT tokens are used for authentication and route protection

- Rate-limiting (optional for production)

---


# 📸 Screenshots

- no Screenshot Availiable



---

# 📃 License
- MIT License

## 💬 Acknowledgments

- END Gaming AI API

- MongoDB

- React

- Node.js

- Express

## 📮 Contact & Support
- Lead Developer: Harsh (@201Harsh)
- GitHub : [201Harsh](https://github.com/201Harsh) | Instagram : [201harshs](https://www.instagram.com/201harshs/)

- Support Portal: support@endgamingai2@gmail.com
---

## Made With ❤️ by Harsh




