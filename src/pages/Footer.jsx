import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray2 text-green py-4 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        
 
        <h1 className="text-sm">
          © 2026 <span className="font-semibold">SMV-ECOM</span>. All Rights Reserved.
        </h1>

    
        <div className="mt-2 md:mt-0 text-sm text-green">
          Built with ❤️ for E-Commerce
        </div>

      </div>
    </footer>
  );
};

export default Footer;
