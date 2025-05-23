import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Invoice Generator",
  subtitle = "Professional PDF invoice generation solutions"
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm shadow-sm py-4 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-800">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="hidden sm:flex space-x-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-pink-800 transition-colors">
            Dashboard
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-800 transition-colors">
            Templates
          </button>
          <button className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium hover:bg-gradient-to-r from-rose-500 to-emerald-600 transition-colors">
            New Invoice
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;