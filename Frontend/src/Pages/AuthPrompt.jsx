import { Link } from "react-router-dom";
import { UserIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function AuthPrompt() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6">
            <UserIcon className="h-8 w-8 text-gray-900" />
          </div>
          
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Join Our Community
          </h2>
          
          <p className="text-gray-300 mb-8">
            To access all features and personalize your experience, please create an account or login if you already have one.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/register"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-full text-gray-900 bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowRightIcon className="h-5 w-5 text-gray-900 group-hover:text-gray-900 transition-colors" />
              </span>
              Create Account
            </Link>
            
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-3 px-4 border-2 border-yellow-400 text-lg font-medium rounded-full text-yellow-400 hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <ArrowLeftIcon className="h-5 w-5 text-yellow-400 group-hover:text-yellow-400 transition-colors" />
              </span>
              I Already Have an Account
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/contact" 
              className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
            >
              Need Help? Contact Us
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-800/50 px-6 py-4 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}