import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const CreditCounter = ({ credits }) => {
  return (
    <div className="fixed top-2 right-2 md:top-auto md:right-auto md:bottom-96 md:mb-2 md:left-10 z-50 flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-yellow-400/20 shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 group">
      <CurrencyDollarIcon className="h-5 w-5 text-yellow-400" />
      <span className="text-yellow-400 font-semibold">
        Credits: 
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent ml-1">
          {credits}
        </span>
      </span>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-yellow-400/10 rounded-lg" />
        <div className="absolute -inset-1 blur-md bg-gradient-to-r from-yellow-400/20 to-transparent" />
      </div>
    </div>
  );
};

export default CreditCounter;
