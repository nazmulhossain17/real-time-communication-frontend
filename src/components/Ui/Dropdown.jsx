import { useEffect, useRef } from "react";

const Dropdown = ({ isOpen, setIsOpen, handleLogOut }) => {
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    isOpen && (
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-28 w-48 bg-gray-700 rounded-md shadow-lg z-50"
      >
        <ul>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-600">
            Settings
          </li>
          <li
            className="px-4 py-2 cursor-pointer hover:bg-gray-600"
            onClick={handleLogOut}
          >
            Log Out
          </li>
        </ul>
      </div>
    )
  );
};

export default Dropdown;
