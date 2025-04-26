# 🤖 AI ChatBot (MERN + Google AI API)

An AI-powered chatbot web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) integrated with the Google AI API. Users can register, log in, and interact with an intelligent chatbot. The app also includes a credit-based system to limit API usage.

---

## 🔥 Features

- 🧠 AI Chat using Google AI API
- 👤 User Authentication (Register / Login)
- 🔐 JWT-based Auth with secure password hashing
- 💳 Credit System: Limits chatbot queries based on user credits
- 🌐 Full MERN Stack Integration
- ⚡ Real-time API response rendering using React
- 🗃️ MongoDB database for user and credit management

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Axios
- Tailwind CSS
- React Router DOM

### Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- bcrypt

### API:
- Google Gemini (or you can use other AI API)

---

## 🚀 Getting Started

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
GOOGLE_API_KEY=your_google_api_key
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

## ✨ Usage
- Register a new user

- Login to your account

- Each user gets initial free credits (configurable)

- Ask a question to the chatbot

- Response is generated via Google AI API

- Each query consumes credits

---

## 📦 API Integration

#### Using Google Gemini or a similar Google AI API:

- Backend makes POST requests to the API with the user’s prompt

- Response is returned to the frontend

- Credit is deducted per request

---

## 🧮 Credit System (Example)

- Each user starts with 10 credits

- 1 credit = 1 chatbot question

- Credit deduction logic is handled in the backend

- Prevents queries when credits are 0w

---

## 📌 TODOs

- Add UI feedback for no credits

- Add option to purchase or earn more credits

- Improve chatbot UI with typing effect

- Save chat history per user

---

## 🛡️ Security

- Passwords are hashed using bcrypt

- JWT tokens are used for authentication and route protection

- Rate-limiting (optional for production)

---

## 📃 License
- MIT License

## 💬 Acknowledgments

- Google Gemini API

- MongoDB

- React

- Node.js

- Express

## 👨‍💻 Author

Harsh
GitHub: 201Harsh

---

## Made With ❤️ by 201Harsh




