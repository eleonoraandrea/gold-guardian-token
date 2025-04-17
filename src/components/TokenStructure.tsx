
import React from "react";
import {
  Shield,
  Layers,
  RefreshCcw,
  Scale,
  Landmark,
  Lock,
  CalendarCheck,
  FileText,
  CircleDollarSign
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function TokenStructure() {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900">GFT Token Structure</h2>
            <p className="mt-3 text-lg text-gray-600">
              Understanding the technical and financial design of the Gold Futures Token
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-gold-100 p-3">
                  <CircleDollarSign className="h-8 w-8 text-gold-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Token Value</h3>
              <p className="text-navy-700 font-bold">1 GFT = 0.2 oz Gold</p>
              <p className="text-gray-500 text-sm mt-2">
                Each token represents a specific fraction of gold futures
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Protection Level</h3>
              <p className="text-navy-700 font-bold">95% Capital Protection</p>
              <p className="text-gray-500 text-sm mt-2">
                Built-in put option guarantees minimum redemption value
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <CalendarCheck className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expiry Options</h3>
              <p className="text-navy-700 font-bold">Monthly to Annual</p>
              <p className="text-gray-500 text-sm mt-2">
                Flexible contract periods to match your investment horizon
              </p>
            </div>
          </div>
          
          <div className="mb-16">
            <div className="flex items-center mb-6">
              <Layers className="h-6 w-6 text-navy-800 mr-2" />
              <h3 className="text-2xl font-bold text-navy-800">Token Mechanics</h3>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700">
                  The GFT operates as a tokenized futures contract with an embedded protective mechanism.
                  This structure provides investors with direct exposure to gold price movements while
                  limiting downside risk through a built-in put option that activates automatically.
                </p>
              </div>
              
              <Separator />
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span>Protection Mechanism</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-3">
                        Each GFT includes an implicit put option that activates if the gold settlement price
                        falls below a protection threshold (typically 95% of initial value).
                      </p>
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <h4 className="font-medium mb-2">Example:</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Gold price at GFT purchase: <span className="font-medium">€2,900/oz</span></li>
                          <li>• Protection threshold (95%): <span className="font-medium">€2,755/oz</span></li>
                          <li>• If price drops to €2,320/oz (20% drop), protection activates</li>
                          <li>• Instead of 20% loss, investor only experiences 5% loss</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-2">
                      <RefreshCcw className="h-5 w-5 text-blue-600" />
                      <span>Redemption Options</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Landmark className="h-4 w-4" /> Physical Gold
                        </h4>
                        <p className="text-sm text-gray-600">
                          Request delivery of physical gold (minimum quantity applies), 
                          managed through certified vaults.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CircleDollarSign className="h-4 w-4" /> Stablecoin Conversion
                        </h4>
                        <p className="text-sm text-gray-600">
                          Receive equivalent value in a liquid stablecoin (USDC, EURC) based on the settlement price.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CalendarCheck className="h-4 w-4" /> Contract Rollover
                        </h4>
                        <p className="text-sm text-gray-600">
                          Extend your position by renewing for the next expiry period, 
                          paying any associated costs.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-navy-600" />
                      <span>Collateralization</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-3">
                        GFT tokens are backed by verified physical gold or highly liquid equivalents:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="font-medium mb-2">Physical Gold Backing:</h4>
                          <p className="text-sm text-gray-600">
                            High-density gold concentrate processed through LBMA-certified refineries,
                            stored in secure and insured vaults managed by independent operators (e.g., Brinks, Loomis).
                          </p>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="font-medium mb-2">Alternative Liquid Collateral:</h4>
                          <p className="text-sm text-gray-600">
                            For greater flexibility, a portion can consist of extremely liquid assets directly 
                            correlated to gold, such as physical gold-backed ETFs held in dedicated accounts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-6">
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-purple-600" />
                      <span>Smart Contract Structure</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-3">
                        The GFT operates through a sophisticated smart contract ecosystem with multiple components:
                      </p>
                      
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="font-medium">Core Token Contract:</h4>
                          <p className="text-sm text-gray-600">
                            Handles token issuance, transfers, redemptions, and the protection mechanism logic.
                          </p>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="font-medium">Oracle Integration:</h4>
                          <p className="text-sm text-gray-600">
                            Connects to decentralized price oracles (e.g., Chainlink) to get reliable 
                            gold price data from multiple trusted sources.
                          </p>
                        </div>
                        
                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <h4 className="font-medium">Certifier Module:</h4>
                          <p className="text-sm text-gray-600">
                            Verifies that redemption requests are covered by actual reserves, 
                            adding a layer of security and trust.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button variant="secondary" size="sm" className="w-full">
                          <FileText className="h-4 w-4 mr-2" /> View Smart Contract Documentation
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-navy-800 mb-6">
              Ready to explore the benefits of Gold Futures Token?
            </p>
            <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6 text-lg">
              Try the GFT Simulator
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
