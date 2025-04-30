import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
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
import { TypeAnimation } from "react-type-animation";
import { StarRating } from "../Context/StarRating";

const features = [
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
];

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    text: "EmoAI gives me mental clarity during tough days. It’s more than just an assistant—it's a companion.",
  },
  {
    name: "Neha Verma",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "I've never felt this understood by an AI. EmoAI adapts to my mood so naturally.",
  },
  {
    name: "Rohit Mehta",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 3,
    text: "From debugging support to emotional check-ins, EmoAI handles it all. Highly recommended!",
  },
  {
    name: "Priya Nair",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
    text: "Feels like talking to a warm, empathetic friend who always knows the right thing to say.",
  },
  {
    name: "Karan Patel",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    rating: 2,
    text: "What sets EmoAI apart is how *human* it feels. It's my daily motivator and thought partner.",
  },
  {
    name: "Ananya Rao",
    role: "Psychology Student",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    rating: 5,
    text: "As someone studying emotions, I’m amazed at how well EmoAI mirrors human empathy.",
  },
  {
    name: "Vikram Desai",
    role: "Tech Blogger",
    image: "https://randomuser.me/api/portraits/men/38.jpg",
    rating: 4,
    text: "This isn't just another chatbot. EmoAI understands emotions and responds with genuine care.",
  },
  {
    name: "Sanya Kapoor",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    rating: 5,
    text: "I use EmoAI to brainstorm ideas, and it always provides thoughtful and creative solutions. A must-have tool!",
  },
  {
    name: "Jaydeep Singh",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 4,
    text: "EmoAI helps me stay focused and motivated at work. It’s like having a personal coach always by my side.",
  },
];

export default function Landing() {
  const mainControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-lg shadow-xl sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center"
            >
              <div className="shbox rounded-full p-2 bg-gradient-to-br from-yellow-400 to-amber-600">
                <CpuChipIcon className="h-8 w-8 text-gray-900" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                EmoAI ChatBot
              </span>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 md:flex hidden items-center gap-2"
              >
                Start Free Trial
                <SparklesIcon className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {["❤️", "🤖", "✨", "😊", "🧠"].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                scale: 0,
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 1000,
                scale: 1,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-Math.random() * 100}%`,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
              <TypeAnimation
                sequence={[
                  "Emotionally Intelligent AI",
                  2000,
                  "Your Personal Companion",
                  2000,
                  "Always Here For You",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience AI that doesn't just respond - it understands, adapts,
              and grows with you through every conversation.
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: "😊", label: "Empathy" },
                { icon: "🎭", label: "Mood Adaption" },
                { icon: "🧠", label: "Context Aware" },
                { icon: "❤️", label: "Memory" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-yellow-400 transition-all"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-yellow-400 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="relative bg-gradient-to-r from-yellow-400 to-amber-600 hover:shadow-2xl hover:shadow-yellow-400/30 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block group"
              >
                <span className="relative z-10">Start Emotional Journey</span>
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-600 to-yellow-400" />
                <SparklesIcon className="h-5 w-5 inline-block ml-2 animate-pulse" />
              </Link>
            </motion.div>
          </motion.div>

          {/* AI Companion Section */}
          <motion.div
            className="mt-20 relative bg-gray-800 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto border border-gray-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-amber-600/10 backdrop-blur-sm" />
            </div>

            <h3 className="text-3xl text-yellow-400 font-bold mb-6 relative z-10">
              Your Perfect AI Companion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
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
      <section className="py-20 bg-gray-800" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            className="text-3xl font-bold text-yellow-400 text-center mb-12"
          >
            Core Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.2 },
                  }),
                }}
                initial="hidden"
                animate={mainControls}
                custom={index}
                className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600 hover:border-yellow-400 transition-all group"
              >
                <div className="mb-4 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <feature.icon className="h-12 w-12 text-yellow-400 relative" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-yellow-400 text-center mb-12">
            What Users Say About EmoAI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="relative bg-gray-800 p-6 rounded-xl border border-gray-700"
              >
                {/* Rating stars top-right */}
                <div className="absolute top-4 right-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-yellow-400">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
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
              Made with ❤️ by{" "}
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
