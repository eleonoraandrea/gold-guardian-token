
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { 
  CircleDollarSign, 
  Coins, 
  LineChart, 
  Info, 
  Menu, 
  X
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-navy-900 py-4 px-6 shadow-sm border-b dark:border-navy-800 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Coins size={28} className="text-gold-500" />
            <Link to="/" className="text-xl font-bold flex items-center">
              <span className="text-navy-800 dark:text-white">GBCFM</span>
              <span className="text-gold-500 ml-1">GFT</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium">{t('home')}</Link>
            <Link to="/simulator" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium">{t('simulator')}</Link>
            <Link to="/token" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium">{t('token_structure')}</Link>
            <Link to="/about" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium">{t('about')}</Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSelector />
              <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                {t('connect_wallet')}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <LanguageSelector />
            <button onClick={toggleMenu} className="text-navy-800 dark:text-white ml-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 flex flex-col">
            <Link to="/" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium py-2" onClick={toggleMenu}>{t('home')}</Link>
            <Link to="/simulator" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium py-2" onClick={toggleMenu}>{t('simulator')}</Link>
            <Link to="/token" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium py-2" onClick={toggleMenu}>{t('token_structure')}</Link>
            <Link to="/about" className="text-navy-800 dark:text-white hover:text-navy-600 dark:hover:text-navy-300 font-medium py-2" onClick={toggleMenu}>{t('about')}</Link>
            <Button className="bg-gold-500 hover:bg-gold-600 text-white w-full">
              {t('connect_wallet')}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
