import { useState, useEffect, useRef, useContext } from "react";
import {
  PaperAirplaneIcon,
  SpeakerWaveIcon,
  StopCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "../Config/Axios";
import { toast, Bounce, ToastContainer } from "react-toastify";
import CreditCounter from "../Components/CreditCounter";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [IsRes, setIsRes] = useState(false);
  const messagesEndRef = useRef(null);
  const [credits, setCredits] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState([]);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [ResponseCount, setResponseCount] = useState(0);

  const Navigate = useNavigate();

  const { rescount, setrescount } = useContext(userDataContext);

  useEffect(() => {
    setrescount(ResponseCount);
  }, [ResponseCount]);

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

  const name = localStorage.getItem("name");

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
          name,
        });

        // Check if credits are available, using the backend logic
        const credit = await getCredits(); // Fetch the current credits from the backend

        if (credits === 5) {
          // Show the follow modal
          setShowFollowModal(true);
        }

        if (credits <= 0) {
          toast.error("You have reached your credit limit.", {
            position: "bottom-left",
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
          setResponseCount((prev) => prev + 1);

          if (response.status === 500) {
            toast.error("Server Error", {
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
          }

          // Optionally: You can refresh the credit after each message if needed
          getCredits(); // This ensures the frontend reflects the latest credit balance
        }
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400) {
          toast.error("You have reached your credit limit..", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
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

        if (status === 500) {
          toast.error("AI is busy. Server Error. try again!", {
            position: "top-center",
            autoClose: 3000,
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

        toast.error("Something went wrong. Please try again.", {
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
      const response = await axios.get("/users/get-credit", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
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
      const regex =
        /(\*\*\([^)]+\)\*\*|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|"[^"]*")/g;

      const parts = line.split(regex).map((part, partIndex) => {
        const key = `${lineIndex}-${partIndex}`;

        // 💡 Handle **(hidden text)** first so it doesn't get caught by other patterns
        if (part.startsWith("**(") && part.endsWith(")**")) {
          return (
            <span key={key} className="hidden">
              {part.slice(3, -3)} {/* Removes **( and )** */}
            </span>
          );
        } else if (part.startsWith("***") && part.endsWith("***")) {
          return (
            <span
              key={key}
              className="font-bold italic text-gray-950 text-sm md:text-lg block"
            >
              {part.slice(3, -3)}
            </span>
          );
        } else if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span
              key={key}
              className="font-bold text-gray-950 text-sm md:text-lg block mb-2"
            >
              {part.slice(2, -2)}
            </span>
          );
        } else if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <span key={key} className="text-black font-semibold">
              {part.slice(1, -1)}
            </span>
          );
        } else if (part.startsWith('"') && part.endsWith('"')) {
          return (
            <span key={key} className="text-gray-800 font-semibold">
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
      <ToastContainer
        position="bottom-right"
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

      {/* Pop Up Modal */}

      {showFollowModal && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full mx-4 relative">
            <XMarkIcon
              className="h-8 w-8 text-yellow-400 absolute right-4 top-4 cursor-pointer"
              onClick={() => setShowFollowModal(false)}
            />
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Enjoying EmoAI ?
            </h2>
            <p className="text-gray-300 mb-6">
              Support our journey to create better AI experiences! with
              EndGaming AI 🚀
            </p>

            <div className="flex flex-col gap-4 mb-6">
              <a
                href="https://github.com/201Harsh"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Star on GitHub
              </a>

              <a
                href="https://instagram.com/201harshs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-yellow-400 hover:to-amber-500 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
                Follow on Instagram
              </a>
            </div>

            <button
              onClick={() => setShowFollowModal(false)}
              className="w-full text-center text-yellow-400 hover:text-amber-500 transition-colors duration-300 text-sm"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

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
