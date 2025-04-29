import { useState, useEffect, useRef } from "react";
import {
  PaperAirplaneIcon,
  SpeakerWaveIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";
import axios from "../Config/Axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import CreditCounter from "../Components/CreditCounter";
import { useNavigate } from "react-router-dom";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [IsRes, setIsRes] = useState(false);
  const messagesEndRef = useRef(null);
  const [credits, setCredits] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);

  const Navigate = useNavigate();

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const limitedMessages = messages.slice(-50); // Keep only the last 50 messages
      localStorage.setItem("chat_messages", JSON.stringify(limitedMessages));
    }
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

        if (credits <= 0) {
          toast.error("You have reached your credit limit.", {
            position: "top-center",
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
        if (error.response.status === 400) {
          toast.error("You have reached your credit limit.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          setTimeout(() => {
            Navigate("/pricing");
          }, 5000);
          return;
        }
        // Handle error gracefully if needed
      } finally {
        setLoading(false); // Reset loading state after the response
      }
    }
  };

  // Watch when IsRes changes
  useEffect(() => {
    if (IsRes) {
      localStorage.setItem("responseornot", true);
    }
  }, [IsRes]);

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
    const formattedMessage = message.split("\n").map((line, lineIndex) => {
      const regex = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  
      const parts = line.split(regex).map((part, partIndex) => {
        const key = `${lineIndex}-${partIndex}`;
        
        if (part.startsWith("***") && part.endsWith("***")) {
          return (
            <span key={key} className="font-bold italic text-gray-950 text-sm md:text-lg block">
              {part.slice(3, -3)}
            </span>
          );
        } else if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={key} className="font-bold text-gray-950 text-sm md:text-lg block mb-2">
              {part.slice(2, -2)}
            </span>
          );
        } else if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={key} className="italic text-gray-700">
              {part.slice(1, -1)}
            </span>
          );
        }
  
        return part;
      });
  
      return <p key={lineIndex}>{parts}</p>;
    });
  
    return formattedMessage;
  };
  
  

  // Add this to your component
  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const availableVoices = synth.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
      } else {
        synth.onvoiceschanged = () => {
          setVoices(synth.getVoices());
        };
      }
    };

    loadVoices();
  }, []);

  const speak = (text) => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      const allVoices = speechSynthesis.getVoices();

      // Strict female voice filter - updated to be more precise
      const isFemaleVoice = (voice) => {
        const voiceName = voice.name.toLowerCase();
        return (
          voiceName.includes("female") ||
          voiceName.includes("woman") ||
          voiceName.includes("girl") ||
          voiceName.includes("female") ||
          voiceName.includes("zira") || // Windows female
          voiceName.includes("samantha") || // macOS female
          voiceName.includes("veena") || // Indian female
          voiceName.includes("priya") || // Indian female
          voiceName.includes("kajal") || // AWS Indian female
          voice.gender === "female"
        );
      };

      // 1. First try to find an Indian female voice
      let selectedVoice = allVoices.find(
        (voice) =>
          (voice.lang.includes("en-IN") || voice.lang.includes("hi-IN")) &&
          isFemaleVoice(voice)
      );

      // 2. If no Indian female, find any female voice
      if (!selectedVoice) {
        selectedVoice = allVoices.find(isFemaleVoice);
      }

      // 3. If still no female voice, fallback to first available voice
      selectedVoice = selectedVoice || allVoices[0];

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang || "en-IN";

        // Enhanced female voice parameters
        utterance.rate = 1.05; // Natural speaking pace
        utterance.pitch = 1.25; // Higher pitch for female voice
        utterance.volume = 0.9; // Slightly softer volume
      }

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900/50 pt-2">
      <ToastContainer
        position="top-center"
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
        toastClassName="text-sm"
      />
      <CreditCounter credits={credits} />

      {/* Messages Container with padding top to avoid header overlap */}
      <div className="flex-1 overflow-y-auto chat-box p-2 md:p-7 space-y-3 pt-0">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 min-w-20 max-w-[85%] md:text-sm text-xs ${
                message.sender === "user"
                  ? "bg-gray-700 text-yellow-400"
                  : "bg-gray-300 text-gray-900"
              } flex flex-col justify-start items-start rounded-xl relative`}
            >
              <div className="relative w-full">
                {message.sender === "Ai" && (
                  <button
                    onClick={() => speak(message.text)}
                    className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md"
                  >
                    {isSpeaking ? (
                      <StopCircleIcon
                        title="Stop the Speech"
                        className="h-5 w-5 text-black"
                      />
                    ) : (
                      <SpeakerWaveIcon
                        title="Start the Speech"
                        className="h-5 w-5 text-black"
                      />
                    )}
                  </button>
                )}
                {formatMessage(message.text)}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start w-full">
            <div className="p-3 h-12 min-w-20 max-w-[85%] bg-gray-200 text-gray-900/100 flex items-center rounded-xl animate-pulse">
              <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
              <div className="flex-1">
                <div className="h-2 bg-gray-500 rounded mb-1.5 w-3/4"></div>
                <div className="h-2 bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-yellow-400/20 p-3 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <form
            className="flex flex-1 items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              autoFocus
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-yellow-400 rounded-lg px-3 py-2 border border-yellow-400 
                     focus:outline-none focus:ring-1 focus:ring-yellow-500
                     placeholder:text-yellow-400/50 text-sm"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 
                    rounded-lg transition duration-200 flex items-center justify-center
                    active:scale-95"
              disabled={loading}
            >
              <PaperAirplaneIcon className="h-4 w-4 rotate-[-40deg]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
