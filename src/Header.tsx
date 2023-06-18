const Header = () => {
  return (
    <nav className="bg-gray-800 h-[7vh]">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-white font-bold text-xl flex">
              <img src="/logo.svg" alt="DBML2Drizzle" className="w-6 h-6 mr-2 mt-1" />
              DBML2Drizzle
            </a>
          </div>
          <div className="flex items-center">
            <a
              href="https://www.alagarbaa.com/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
