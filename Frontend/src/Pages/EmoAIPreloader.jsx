import { motion } from "framer-motion";
import { CpuChipIcon, SparklesIcon } from "@heroicons/react/24/outline";

const EmoAIPreloader = () => {
  const emojis = ["❤️", "🤖", "✨", "😊", "🧠", "🌟", "💡", "🤝"];
  
  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center">
      {/* Floating emojis background */}
      <div className="absolute inset-0 overflow-hidden">
        {emojis.map((emoji, i) => (
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
      
      {/* Main loader content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Logo with animation */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="shbox rounded-full p-3 bg-gradient-to-br from-yellow-400 to-amber-600 mb-6"
        >
          <CpuChipIcon className="h-12 w-12 text-gray-900" />
        </motion.div>
        
        {/* Text with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-4"
        >
          EmoAI ChatBot
        </motion.h1>
        
        {/* Loading text with dots animation */}
        <motion.div 
          className="text-gray-300 text-lg flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>Loading</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatDelay: 0,
              times: [0, 0.5, 1],
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatDelay: 0,
              times: [0, 0.3, 0.6, 1],
            }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 0, 0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              repeatDelay: 0,
              times: [0, 0.2, 0.4, 0.7, 1],
            }}
          >
            .
          </motion.span>
        </motion.div>
        
        {/* Sparkles animation */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <SparklesIcon className="h-8 w-8 text-yellow-400 animate-pulse" />
        </motion.div>
        
        {/* Progress bar */}
        <motion.div 
          className="h-1 bg-gray-700 rounded-full w-64 mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmoAIPreloader;