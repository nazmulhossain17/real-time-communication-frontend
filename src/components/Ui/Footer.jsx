const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex-1 mb-8 lg:mb-0">
          <h2 className="text-2xl font-bold mb-4">convove</h2>
          <p className="text-gray-400 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-4">
            <img
              src="/api/placeholder/120/40"
              alt="Google Play"
              className="h-10"
            />
            <img
              src="/api/placeholder/120/40"
              alt="App Store"
              className="h-10"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:flex lg:space-x-16">
          <div>
            <h3 className="font-semibold mb-2">Pages</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Home it work</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Demo</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Service</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Shopify</li>
              <li>WordPress</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <ul className="text-gray-400 space-y-2">
              <li>(406) 555-0120</li>
              <li>Lorem123@gmail.com</li>
              <li>2972 Westheimer Rd. Santa Ana, 85486</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
