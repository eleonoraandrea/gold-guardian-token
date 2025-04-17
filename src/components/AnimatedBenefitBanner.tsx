import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGoldPrice, formatCurrency, calculateGftValue, convertToEUR } from "../utils/goldPriceUtils";
import { ArrowUpCircle, Shield, LineChart, Coins, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AnimatedBenefitBanner() {
  const { data: goldData, isLoading } = useGoldPrice();
  const [isVisible, setIsVisible] = useState<number>(0);
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: t("capital_protection_banner"),
      description: t("capital_protection_banner_description")
    },
    {
      icon: <Coins className="h-8 w-8 text-gold-500" />,
      title: t("physical_gold_backing_banner"),
      description: t("physical_gold_backing_banner_description")
    },
    {
      icon: <LineChart className="h-8 w-8 text-blue-600" />,
      title: t("low_transaction_costs"),
      description: t("low_transaction_costs_description")
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: t("24_7_liquidity"),
      description: t("24_7_liquidity_description")
    }
  ];

  // Rotate through benefits
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => (prev + 1) % benefits.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [benefits.length]);

  // Convert gold price to EUR if needed
  const goldPriceEUR = goldData.currency === 'USD' ? convertToEUR(goldData.regularMarketPrice) : goldData.regularMarketPrice;
  const gftValue = calculateGftValue(goldPriceEUR);

  return (
    <div className="py-8 bg-gradient-to-r from-navy-900 to-navy-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 items-center gap-8">
          {/* Live gold price section */}
          <div className="md:col-span-2">
            <div className="rounded-lg bg-navy-800/50 p-6 backdrop-blur-sm border border-navy-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-white">{t("live_gold_price")}</h3>
                <ArrowUpCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t("gold_price")}:</span>
                  <span className="text-xl font-bold text-gold-400">
                    {isLoading ? "Loading..." : formatCurrency(goldPriceEUR, 'EUR')}
                    <span className="text-sm text-gray-400">/oz</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t("gft_token_value")}:</span>
                  <span className="text-xl font-bold text-green-400">
                    {isLoading ? "Loading..." : formatCurrency(gftValue, 'EUR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{t("protection_level")}:</span>
                  <span className="text-sm bg-green-900/70 text-green-300 px-2 py-1 rounded">
                    {t("95_protected")}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated benefits section */}
          <div className="md:col-span-3 relative h-48">
            <div className="absolute inset-0 flex items-center justify-center text-center">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isVisible === index ? 1 : 0,
                    y: isVisible === index ? 0 : 20 
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 ${isVisible === index ? 'z-10' : 'z-0'}`}
                >
                  <div className="mb-3">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
