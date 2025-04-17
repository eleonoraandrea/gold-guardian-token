
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { ArrowRightCircle, Info } from "lucide-react";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency, calculateGftValue } from "@/utils/goldPriceUtils";

export function CustomPriceSimulator() {
  // Initial values from whitepaper
  const gftToOzRatio = 0.2; // 1 GFT = 0.2 oz of gold
  const protectionPercentage = 95; // 95% protection
  
  // State management
  const [startPrice, setStartPrice] = useState<string>("2900");
  const [endPrice, setEndPrice] = useState<string>("2900");
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  
  // Derived state
  const startPriceNum = parseFloat(startPrice) || 2900;
  const endPriceNum = parseFloat(endPrice) || 2900;
  const protectiveStrikePrice = (startPriceNum * protectionPercentage) / 100;
  
  // GFT values
  const initialGftValue = startPriceNum * gftToOzRatio;
  const finalGftValueWithoutProtection = endPriceNum * gftToOzRatio;
  const finalGftValue = endPriceNum < protectiveStrikePrice 
    ? protectiveStrikePrice * gftToOzRatio 
    : finalGftValueWithoutProtection;
  
  const isProtectionActive = endPriceNum < protectiveStrikePrice;
  const profitLoss = finalGftValue - initialGftValue;
  const profitLossPercent = (profitLoss / initialGftValue) * 100;
  const protectionBenefit = isProtectionActive 
    ? finalGftValue - finalGftValueWithoutProtection 
    : 0;
  
  // Generate chart data
  const generateChartData = useCallback(() => {
    // If prices are the same, create a flat line with small variations
    if (startPriceNum === endPriceNum) {
      return [
        { name: "Start", price: startPriceNum, gft: initialGftValue, projectedGft: initialGftValue },
        { name: "Mid", price: startPriceNum * 1.02, gft: startPriceNum * 1.02 * gftToOzRatio, projectedGft: startPriceNum * 1.02 * gftToOzRatio },
        { name: "End", price: endPriceNum, gft: finalGftValue, projectedGft: finalGftValueWithoutProtection }
      ];
    }
    
    // Create a simple transition from start to end price
    const midPrice = (startPriceNum + endPriceNum) / 2;
    const midGftWithoutProtection = midPrice * gftToOzRatio;
    const midGft = midPrice < protectiveStrikePrice 
      ? protectiveStrikePrice * gftToOzRatio 
      : midGftWithoutProtection;
    
    return [
      { name: "Start", price: startPriceNum, gft: initialGftValue, projectedGft: initialGftValue },
      { name: "Mid", price: midPrice, gft: midGft, projectedGft: midGftWithoutProtection },
      { name: "End", price: endPriceNum, gft: finalGftValue, projectedGft: finalGftValueWithoutProtection }
    ];
  }, [startPriceNum, endPriceNum, initialGftValue, finalGftValue, finalGftValueWithoutProtection, protectiveStrikePrice, gftToOzRatio]);
  
  // Calculate results
  const handleCalculate = () => {
    setHasCalculated(true);
  };
  
  const chartData = generateChartData();
  
  const chartConfig = {
    gft: {
      label: "GFT Value (Protected)",
      theme: {
        light: "#7E69AB",
        dark: "#9b87f5"
      }
    },
    projected: {
      label: "Without Protection",
      theme: {
        light: "#8E9196",
        dark: "#8E9196"
      }
    },
    strike: {
      label: "Protection Level",
      theme: {
        light: "#FF6B6B",
        dark: "#FF6B6B"
      }
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Custom Price Simulator</CardTitle>
              <CardDescription>
                Enter your own gold prices to see how the GFT value would perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="inputs" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="inputs">Inputs</TabsTrigger>
                  <TabsTrigger value="results" disabled={!hasCalculated}>Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="inputs">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Label htmlFor="startPrice" className="mr-2">Starting Gold Price (€/oz)</Label>
                          <TooltipProvider>
                            <TooltipUI>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-64">
                                  This is the price when the GFT is issued or purchased.
                                  The protection level is calculated based on this price.
                                </p>
                              </TooltipContent>
                            </TooltipUI>
                          </TooltipProvider>
                        </div>
                        <Input 
                          id="startPrice"
                          type="number"
                          min="0"
                          step="10"
                          value={startPrice}
                          onChange={(e) => setStartPrice(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-2">
                          <Label htmlFor="endPrice" className="mr-2">Expiry Gold Price (€/oz)</Label>
                          <TooltipProvider>
                            <TooltipUI>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="w-64">
                                  This is the gold price at expiry of the GFT contract.
                                  If it falls below the protection threshold, the protection mechanism activates.
                                </p>
                              </TooltipContent>
                            </TooltipUI>
                          </TooltipProvider>
                        </div>
                        <Input 
                          id="endPrice"
                          type="number"
                          min="0"
                          step="10"
                          value={endPrice}
                          onChange={(e) => setEndPrice(e.target.value)}
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          onClick={handleCalculate}
                          className="w-full"
                          size="lg"
                        >
                          Calculate Results
                          <ArrowRightCircle className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-navy-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-3">Configuration Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>GFT to Gold Ratio:</span>
                          <span className="font-medium">1 GFT = 0.2 oz</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protection Level:</span>
                          <span className="font-medium">95% of Initial Price</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Starting GFT Value:</span>
                          <span className="font-medium">{formatCurrency(initialGftValue)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protection Strike Price:</span>
                          <span className="font-medium">{formatCurrency(protectiveStrikePrice)}/oz</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protected GFT Value:</span>
                          <span className="font-medium">{formatCurrency(protectiveStrikePrice * gftToOzRatio)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="results">
                  <div className="space-y-6">
                    <div className="bg-navy-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-4">GFT Value Projection</h3>
                      <div className="h-72 w-full">
                        <ChartContainer config={chartConfig} className="h-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                              <XAxis dataKey="name" />
                              <YAxis 
                                width={60}
                                tickFormatter={(value) => `€${value}`}
                              />
                              <Tooltip content={<ChartTooltipContent />} />
                              <ReferenceLine 
                                y={protectiveStrikePrice * gftToOzRatio} 
                                stroke="#FF6B6B" 
                                strokeDasharray="3 3"
                                label={{ value: "Protection Level", position: "insideBottomRight" }} 
                              />
                              <Line 
                                type="monotone" 
                                dataKey="gft" 
                                stroke="#7E69AB" 
                                strokeWidth={2.5}
                                activeDot={{ r: 8 }}
                                name="gft"
                              />
                              <Line 
                                type="monotone" 
                                dataKey="projectedGft" 
                                stroke="#8E9196"
                                strokeWidth={1.5}
                                strokeDasharray="5 5"
                                name="projected"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className={`border-l-4 ${endPriceNum >= startPriceNum ? 'border-l-green-500' : 'border-l-red-500'}`}>
                        <CardHeader>
                          <CardTitle>Gold Price Change</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>Initial Price:</span>
                            <span className="font-medium">{formatCurrency(startPriceNum)}/oz</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Final Price:</span>
                            <span className="font-medium">{formatCurrency(endPriceNum)}/oz</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Change:</span>
                            <span className={endPriceNum >= startPriceNum ? 'text-green-600' : 'text-red-600'}>
                              {endPriceNum > startPriceNum ? '+' : ''}
                              {formatCurrency(endPriceNum - startPriceNum)}/oz 
                              ({((endPriceNum / startPriceNum - 1) * 100).toFixed(2)}%)
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className={`border-l-4 ${profitLoss >= 0 ? 'border-l-green-500' : isProtectionActive ? 'border-l-orange-500' : 'border-l-red-500'}`}>
                        <CardHeader>
                          <CardTitle>GFT Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span>Initial GFT Value:</span>
                            <span className="font-medium">{formatCurrency(initialGftValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Final GFT Value:</span>
                            <span className="font-medium">{formatCurrency(finalGftValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Profit/Loss:</span>
                            <span className={profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {profitLoss > 0 ? '+' : ''}
                              {formatCurrency(profitLoss)} 
                              ({profitLossPercent.toFixed(2)}%)
                            </span>
                          </div>
                          {isProtectionActive && (
                            <div className="flex justify-between bg-green-50 p-2 rounded">
                              <span>Protection Benefit:</span>
                              <span className="text-green-600 font-medium">
                                +{formatCurrency(protectionBenefit)}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="text-center mt-4">
                      <Button onClick={() => setHasCalculated(false)} variant="outline">
                        Modify Parameters
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
