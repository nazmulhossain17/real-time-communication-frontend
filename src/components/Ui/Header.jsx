import { useState } from "react";
import { Search, Menu, Bell, Settings, ChevronLeft, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Menu
            className="cursor-pointer lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <h1 className="text-2xl font-bold">convove</h1>
        </div>
        <div className="hidden lg:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by category or celebrity name..."
              className="w-full bg-gray-700 rounded-full py-2 px-4 pl-10 text-white"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <Bell className="cursor-pointer" />
          <Settings className="cursor-pointer" />
          <div className="flex items-center space-x-2">
            <span>Andrew Michael</span>
            <ChevronLeft className="cursor-pointer" />
          </div>
        </div>
        <div className="flex lg:hidden items-center space-x-4">
          <Search className="cursor-pointer" />
          <Bell className="cursor-pointer" />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-800 shadow-md z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">convove</h1>
              <X
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search by category or celebrity name..."
                className="w-full bg-gray-700 rounded-full py-2 px-4 pl-10 text-white"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Settings className="cursor-pointer" />
                <span>Settings</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Andrew Michael</span>
                <ChevronLeft className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
