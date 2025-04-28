import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import axios from "../Config/Axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import CreditCounter from "../Components/CreditCounter";


const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [IsRes, setIsRes] = useState(false);
  const messagesEndRef = useRef(null);
  const [credits, setCredits] = useState(0);

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const userMessage = { text: inputMessage, sender: "user" };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage(""); // Clear input field
      setLoading(true); // Set loading state to true while waiting for AI response

      // Send the message to the backend and get the AI's response
      try {
        const email = localStorage.getItem("email");
        const response = await axios.post("/ai/aires", {
          prompt: inputMessage,
          email,
        });

        // Check if credits are available, using the backend logic
        const credit = await getCredits(); // Fetch the current credits from the backend

        if (credit <= 0) {
          toast.error("You have reached your credit limit.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          return;
        }

        // If response is successful, show the AI response
        if (response.status === 200) {
          setIsRes(true);
          const AIResponse = { text: response.data.response, sender: "Ai" };
          setMessages((prevMessages) => [...prevMessages, AIResponse]);

          // Optionally: You can refresh the credit after each message if needed
          getCredits(); // This ensures the frontend reflects the latest credit balance
        }
      } catch (error) {
        console.error("Error sending message to backend:", error);
        // Handle error gracefully if needed
      } finally {
        setLoading(false); // Reset loading state after the response
      }
    }
  };

  // Fetch the latest credit value from the backend
  const getCredits = async () => {
    try {
      const response = await axios.get("/users/get-credit");
      if (response.status === 200) {
        const creditValue = response.data.credit.credits;
        setCredits(creditValue); // Update the state with the credit value
      }
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  // Fetch credits when the component mounts or after a new message
  useEffect(() => {
    getCredits(); // Fetch the credits when the component mounts
  }, []);
  // Format the AI response to show highlighted text
  const formatMessage = (message) => {
    const formattedMessage = message.split("\n").map((line, index) => {
      // Split by '**' to highlight parts
      const parts = line.split("**").map((part, index) => {
        const key = `${line}-${index}`; // Create a unique key by combining line and part index
        if (index % 2 === 1) {
          // Bold the part that is surrounded by '**'
          return (
            <span key={key} className="font-bold text-gray-950 font-lg">
              {part}
            </span>
          );
        }
        return part;
      });

      return <p key={index}>{parts}</p>; // Add key to each paragraph
    });

    return formattedMessage;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900/50">
      {/* Messages Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <CreditCounter credits={credits} />
      <div className="flex-1 overflow-y-auto md:p-6 p-2 space-y-4 chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex justify-${
              message.sender === "user" ? "end" : "start"
            } w-full`}
          >
            <div
              className={`p-4 min-w-26 max-w-80 md:max-w-[70%] font-medium text-sm ${
                message.sender === "user"
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-200 text-gray-900"
              } flex flex-col justify-start items-start rounded-2xl`}
            >
              {formatMessage(message.text)} {/* Display formatted message */}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="p-4 h-16 min-w-26 max-w-80 md:max-w-[70%] bg-gray-100 text-gray-900 flex justify-center items-center rounded-2xl">
              <h1>Loading...</h1>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-yellow-400/20 p-4 mb:mb-0 mb-12">
        <div className="flex gap-2">
          <form
            className="flex flex-1 items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-yellow-400 rounded-lg px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-yellow-500
                     placeholder:text-yellow-400/50"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 
                    rounded-lg transition duration-200 flex items-center justify-center
                    active:scale-95"
            >
              <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
