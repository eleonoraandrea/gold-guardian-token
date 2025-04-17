
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  PieChart,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GoldSimulator() {
  // Initial values from whitepaper
  const initialGoldPrice = 2900; // €/oz
  const initialProtectionPercentage = 95; // 95% protection
  const gftToOzRatio = 0.2; // 1 GFT = 0.2 oz of gold
  
  // State management
  const [goldPrice, setGoldPrice] = useState(initialGoldPrice);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate values
  const protectiveStrikePrice = (initialGoldPrice * initialProtectionPercentage) / 100;
  const initialGftValue = initialGoldPrice * gftToOzRatio;
  const simulatedGoldPrice = initialGoldPrice * (1 + priceChangePercent / 100);
  
  const simulatedGftValue = simulatedGoldPrice * gftToOzRatio;
  const guaranteedGftValue = protectiveStrikePrice * gftToOzRatio;
  
  // Final value with protection
  const finalGftValue = simulatedGoldPrice < protectiveStrikePrice 
    ? guaranteedGftValue
    : simulatedGftValue;
    
  const isProtectionActive = simulatedGoldPrice < protectiveStrikePrice;
  const profitLoss = finalGftValue - initialGftValue;
  const profitLossPercent = (profitLoss / initialGftValue) * 100;

  // Reset function
  const handleReset = () => {
    setPriceChangePercent(0);
  };

  const formatCurrency = (value: number) => {
    return "€" + value.toFixed(2);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy-900">Gold Futures Token Simulator</h2>
            <p className="mt-3 text-lg text-gray-600">
              See how GFT performs under different gold price scenarios with built-in protection
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Simulation Controls</CardTitle>
              <CardDescription>
                Adjust the gold price to see how the GFT value changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Gold Price Change</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-64">
                              Adjust this slider to simulate changes in the gold price. 
                              See how the GFT value responds with its built-in protection.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-bold text-lg" style={{ color: priceChangePercent >= 0 ? '#16a34a' : '#dc2626' }}>
                      {priceChangePercent > 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%
                    </span>
                  </div>
                  <Slider 
                    value={[priceChangePercent]} 
                    min={-50} 
                    max={50} 
                    step={0.5}
                    onValueChange={(value) => setPriceChangePercent(value[0])} 
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>-50%</span>
                    <span>0%</span>
                    <span>+50%</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                  <Button variant="secondary" onClick={() => setShowAdvanced(!showAdvanced)}>
                    {showAdvanced ? "Hide" : "Show"} Advanced Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className={`border-l-4 ${priceChangePercent >= 0 ? 'border-l-green-500' : 'border-l-red-500'}`}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span>Simulated Gold Price</span>
                  {priceChangePercent >= 0 
                    ? <TrendingUp className="h-5 w-5 text-green-500" />
                    : <TrendingDown className="h-5 w-5 text-red-500" />
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Initial Price:</span>
                    <span className="font-medium">{formatCurrency(initialGoldPrice)}/oz</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="font-bold text-lg">{formatCurrency(simulatedGoldPrice)}/oz</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Change:</span>
                    <span className={priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {priceChangePercent > 0 ? '+' : ''}{formatCurrency(simulatedGoldPrice - initialGoldPrice)}
                      {' '}({priceChangePercent > 0 ? '+' : ''}{priceChangePercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`border-l-4 ${profitLoss >= 0 ? 'border-l-green-500' : 'border-l-orange-500'}`}>
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <span>GFT Value</span>
                    {isProtectionActive && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center bg-amber-100 text-amber-800 rounded-full px-2 py-0.5 text-xs">
                              <ShieldCheck className="h-3 w-3 mr-1" /> Protected
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            Protection activated! Your GFT value is protected by the 95% floor.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                  {profitLoss >= 0 
                    ? <ArrowUpCircle className="h-5 w-5 text-green-500" />
                    : <ArrowDownCircle className="h-5 w-5 text-orange-500" />
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Initial GFT Value:</span>
                    <span className="font-medium">{formatCurrency(initialGftValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {isProtectionActive ? "Protected Value:" : "Current Value:"}
                    </span>
                    <span className="font-bold text-lg">{formatCurrency(finalGftValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Profit/Loss:</span>
                    <span className={profitLoss >= 0 ? 'text-green-600' : 'text-orange-600'}>
                      {profitLoss > 0 ? '+' : ''}{formatCurrency(profitLoss)}
                      {' '}({profitLoss > 0 ? '+' : ''}{profitLossPercent.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {showAdvanced && (
            <Card className="mt-6 bg-navy-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-navy-600" />
                  Advanced Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Token Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-gray-600">GFT to Gold Ratio</p>
                        <p className="font-medium">1 GFT = 0.2 oz</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-gray-600">Protection Level</p>
                        <p className="font-medium">95% of Initial Price</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-gray-600">Protection Strike Price</p>
                        <p className="font-medium">{formatCurrency(protectiveStrikePrice)}/oz</p>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <p className="text-gray-600">Protection Status</p>
                        <p className={`font-medium ${isProtectionActive ? 'text-green-600' : 'text-gray-600'}`}>
                          {isProtectionActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Comparison with Unprotected Gold Investment</h4>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-navy-100">
                          <th className="p-2 text-left">Metric</th>
                          <th className="p-2 text-right">GFT (With Protection)</th>
                          <th className="p-2 text-right">Standard Gold Investment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-navy-100">
                          <td className="p-2">Value</td>
                          <td className="p-2 text-right font-medium">{formatCurrency(finalGftValue)}</td>
                          <td className="p-2 text-right">{formatCurrency(simulatedGftValue)}</td>
                        </tr>
                        <tr className="border-b border-navy-100">
                          <td className="p-2">Profit/Loss</td>
                          <td className="p-2 text-right font-medium">
                            <span className={profitLoss >= 0 ? 'text-green-600' : 'text-orange-600'}>
                              {profitLoss > 0 ? '+' : ''}{formatCurrency(profitLoss)} ({profitLossPercent.toFixed(1)}%)
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            <span className={priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {priceChangePercent > 0 ? '+' : ''}{formatCurrency(simulatedGftValue - initialGftValue)} ({priceChangePercent.toFixed(1)}%)
                            </span>
                          </td>
                        </tr>
                        {isProtectionActive && (
                          <tr className="border-b border-navy-100 bg-green-50">
                            <td className="p-2">Protection Benefit</td>
                            <td colSpan={2} className="p-2 text-right font-medium text-green-600">
                              +{formatCurrency(finalGftValue - simulatedGftValue)} ({((finalGftValue/simulatedGftValue-1)*100).toFixed(1)}% better)
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-xs text-gray-500">
                This simulation is for educational purposes only. Actual results may vary based on market conditions.
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
