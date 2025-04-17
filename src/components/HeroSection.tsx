import { ArrowRight, ShieldCheck, BarChart3, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useGoldPrice, formatCurrency, calculateGftValue } from "../utils/goldPriceUtils";
import { useLanguage } from "@/contexts/LanguageContext";

export function HeroSection() {
  const { data: goldData, isLoading } = useGoldPrice();
  const { t } = useLanguage();
  
  // Get gold price in EUR and calculate GFT value
  const goldPriceInEur = goldData.regularMarketPrice;
  const gftValue = calculateGftValue(goldPriceInEur);
  
  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Gold gradient accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-gold-200/30 to-gold-400/20 blur-3xl rounded-full -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
                {t("hero_title")}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600">
                {t("hero_description")}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-6 text-lg" asChild>
                <Link to="/simulator">
                  {t("try_simulator")} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="border-navy-700 text-navy-800 px-6 py-6 text-lg">
                {t("learn_more")}
              </Button>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-gray-500">
                {t("current_gold_price")} <span className="font-semibold">
                  {isLoading ? 'Loading...' : formatCurrency(goldPriceInEur, 'EUR')+'/oz'}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                {t("token_value")} <span className="font-semibold">
                  {isLoading ? 'Loading...' : formatCurrency(gftValue, 'EUR')+' per GFT'}
                </span>
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            
            <div className="relative bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-bold">
                    G
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800">{t("gold_futures_token")}</h3>
                    <p className="text-sm text-gray-500">{t("gbcfm")}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-navy-900">
                    {isLoading ? 'Loading...' : formatCurrency(gftValue, 'EUR')}
                  </p>
                  <p className="text-xs text-green-600">+2.3% today</p>
                </div>
              </div>
              
              <div className="aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden mb-6 flex items-center justify-center">
                <BarChart3 className="h-32 w-32 text-gold-400 opacity-80" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-600 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t("capital_protection")}</p>
                    <p className="text-xs text-gray-500">{t("capital_protection_description")}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Lock className="text-blue-600 h-5 w-5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t("collateral_backed")}</p>
                    <p className="text-xs text-gray-500">{t("collateral_backed_description")}</p>
                  </div>
                </div>
                
                <Button className="w-full bg-navy-800 hover:bg-navy-700 text-white">
                  {t("buy_gft")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
