import { useEffect } from "react";
import {
  ChevronRightIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  UserIcon,
  CreditCardIcon,
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
              <div className="shbox rounded-full p-2">
                <CpuChipIcon className="h-8 w-8 text-yellow-400" />
              </div>
              <span className="ml-3 text-2xl font-bold text-yellow-400">
                End AI ChatBot
              </span>
            </div>
            <Link
              to-="/register"
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
            <h1 className="text-5xl font-bold text-yellow-400 mb-6 animate-fade-in-down">
              Conversational AI Powered by EndGaming AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up delay-100">
              Experience next-generation AI conversations with our intelligent
              chatbot system
            </p>
            <Link
              to="/register"
              className="bg-yellow-500 cursor-pointer hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition duration-300 transform active:scale-95"
            >
              Get Started - It's Free
              <ChevronRightIcon className="h-5 w-5 inline-block ml-2" />
            </Link>
          </div>

          {/* Animated Bot Illustration */}
          <div className="mt-16 relative max-w-2xl mx-auto animate-float">
            <svg className="w-full h-64" viewBox="0 0 512 512">
              <path
                d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm-32 128h64v64h-64zm128 192h-96v-32h-32v32h-96l16-96h192l16 96z"
                fill="#F59E0B"
                className="transition-all duration-500"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-yellow-400 text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: UserIcon,
                title: "Secure Auth",
                desc: "JWT protected authentication with bcrypt hashing",
              },
              {
                icon: ShieldCheckIcon,
                title: "API Protection",
                desc: "Rate limiting and credit-based access control",
              },
              {
                icon: CreditCardIcon,
                title: "Credit System",
                desc: "Fair usage policy with credit management",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-700 p-6 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl animate-on-scroll opacity-0 translate-y-10"
              >
                <feature.icon className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
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
              <span className="ml-2 text-xl text-yellow-400">End AI ChatBot</span>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/201Harsh"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
              >
                GitHub
              </a>
              <a
                href="https://github.com/201Harsh/AI-CB?tab=readme-ov-file#-ai-chatbot-mern--google-ai-api"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
              >
                Docs
              </a>
              <a
                href="https://github.com/201Harsh/AI-CB?tab=readme-ov-file#-license"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
              >
                License
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400">
            <p>
              Built with ❤️ by{" "}
              <a
                className="text-yellow-400 font-semibold"
                href="https://www.instagram.com/201harshs/"
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
