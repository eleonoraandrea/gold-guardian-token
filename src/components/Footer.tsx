
import React from "react";
import { Link } from "react-router-dom";
import { Coins } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Coins size={24} className="text-gold-400" />
              <span className="text-xl font-bold">
                <span className="text-white">GBCFM</span>
                <span className="text-gold-400">GFT</span>
              </span>
            </div>
            <p className="text-gray-300 text-sm mt-2">
              Gold Futures Token with Collateral Guarantee, Integrated Capital Protection, 
              and Continuous Market Liquidity
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 text-gold-300">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-gold-300 transition-colors">Home</Link></li>
              <li><Link to="/simulator" className="hover:text-gold-300 transition-colors">Simulator</Link></li>
              <li><Link to="/token" className="hover:text-gold-300 transition-colors">Token Structure</Link></li>
              <li><Link to="/about" className="hover:text-gold-300 transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 text-gold-300">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="#" className="hover:text-gold-300 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-gold-300 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-gold-300 transition-colors">Risk Disclosure</Link></li>
              <li><Link to="#" className="hover:text-gold-300 transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2025 GBCFM Gold Futures Token. All rights reserved.</p>
          <p className="mt-1">This is a simulation demo. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
