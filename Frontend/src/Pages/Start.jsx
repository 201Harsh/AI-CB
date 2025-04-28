import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRightIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  UserIcon,
  CreditCardIcon,
  FaceSmileIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Landing() {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom >= 0) {
          element.classList.add("opacity-100", "translate-y-0");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-xl sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="shbox rounded-full p-2"
              >
                <CpuChipIcon className="h-8 w-8 text-yellow-400" />
              </motion.div>
              <span className="ml-3 text-2xl font-bold text-yellow-400">
                EmoAI ChatBot
              </span>
            </div>
            <Link
              to="/register"
              className="bg-yellow-500 hidden md:flex hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-full transition duration-300"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold text-yellow-400 mb-6"
            >
              Emotionally Intelligent AI Conversations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Experience an AI that understands you, supports you, and can be
              your best companion.
            </motion.p>

            {/* Emotional Features Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                "😊 Empathy",
                "🎭 Mood Adaption",
                "🧠 Context Aware",
                "❤️ Emotional Memory",
              ].map((text, index) => (
                <div key={index} className="bg-yellow-400/10 p-3 rounded-lg">
                  <p className="text-yellow-400">{text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="/register"
                className="bg-yellow-500 inline-block hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition duration-300 transform hover:scale-105"
              >
                Start Emotional Journey
                <ChevronRightIcon className="h-5 w-5 inline-block ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Replaced SVG Animated Section */}
          <motion.div
            className="mt-20 relative bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl text-yellow-400 font-bold mb-6">
              Your AI Companion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                {
                  icon: HeartIcon,
                  title: "Girlfriend/Boyfriend",
                  desc: "Talk, flirt, and feel cared for with AI that listens deeply and responds affectionately.",
                },
                {
                  icon: HandThumbUpIcon,
                  title: "Best Friend",
                  desc: "Laugh, share secrets, and enjoy endless late-night conversations with your AI buddy.",
                },
                {
                  icon: FaceSmileIcon,
                  title: "Friendly Chat",
                  desc: "Feeling lonely? EmoAI is there to cheer you up and keep you company anytime.",
                },
                {
                  icon: SparklesIcon,
                  title: "Custom Personalities",
                  desc: "Switch between different personality modes to match your mood and needs.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <item.icon className="h-10 w-10 text-yellow-400" />
                  <div>
                    <h4 className="text-xl text-yellow-400 font-semibold mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-12">
            Core Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaceSmileIcon,
                title: "Emotion Recognition",
                desc: "Real-time sentiment analysis adapts responses to your emotional state",
              },
              {
                icon: SparklesIcon,
                title: "Personality Modes",
                desc: "Switch between professional, friendly, or empathetic interaction styles",
              },
              {
                icon: ChatBubbleLeftIcon,
                title: "Context Memory",
                desc: "Remembers conversation history for coherent long-term dialogues",
              },
              {
                icon: UserIcon,
                title: "Secure Auth",
                desc: "Military-grade encryption for all user data and conversations",
              },
              {
                icon: ShieldCheckIcon,
                title: "Privacy First",
                desc: "End-to-end encryption and strict data protection policies",
              },
              {
                icon: CreditCardIcon,
                title: "Flexible Credits",
                desc: "Fair usage system with multiple subscription options",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 p-6 rounded-xl transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl animate-on-scroll opacity-0 translate-y-10"
                whileHover={{ scale: 1.05 }}
              >
                <feature.icon className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CpuChipIcon className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl text-yellow-400">
                EmoAI ChatBot
              </span>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/201Harsh"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
              >
                GitHub
              </a>
              <a
                target="_blank"
                href="https://github.com/201Harsh/AI-CB?tab=readme-ov-file#readme"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
              >
                Documentation
              </a>
              <Link
                to="/pricing"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
              >
                Pricing
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400">
            <p>
              Crafted with ❤️ by{" "}
              <a
                href="https://www.instagram.com/201harshs/"
                className="text-yellow-400 font-semibold"
              >
                Harsh
              </a>{" "}
              - © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
