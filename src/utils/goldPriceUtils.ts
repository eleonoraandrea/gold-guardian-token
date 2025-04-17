
import { useQuery } from "@tanstack/react-query";

// This is the Yahoo Finance symbol for Gold futures
const GOLD_SYMBOL = "GC=F";

interface GoldPriceData {
  regularMarketPrice: number;
  currency: string;
  symbol: string;
}

/**
 * Fetches the current gold price from Yahoo Finance
 */
export const fetchGoldPrice = async (): Promise<GoldPriceData> => {
  try {
    // Using Yahoo Finance API
    const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${GOLD_SYMBOL}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch gold price');
    }
    
    const data = await response.json();
    const result = data.quoteResponse?.result?.[0];
    
    if (!result) {
      throw new Error('Invalid response format');
    }
    
    return {
      regularMarketPrice: result.regularMarketPrice || 0,
      currency: result.currency || 'USD',
      symbol: result.symbol || GOLD_SYMBOL
    };
  } catch (error) {
    console.error('Error fetching gold price:', error);
    // Return default values based on the whitepaper if unable to fetch
    return {
      regularMarketPrice: 2900, // Default to €2,900 per oz as in the whitepaper
      currency: 'EUR',
      symbol: GOLD_SYMBOL
    };
  }
};

/**
 * React hook to fetch and use the gold price in a component
 */
export const useGoldPrice = () => {
  return useQuery({
    queryKey: ['goldPrice'],
    queryFn: fetchGoldPrice,
    refetchInterval: 60000, // Refetch every minute
    initialData: {
      regularMarketPrice: 2900, // Default to €2,900 per oz as in the whitepaper
      currency: 'EUR',
      symbol: GOLD_SYMBOL
    }
  });
};

/**
 * Convert USD price to EUR (approximate conversion)
 */
export const convertToEUR = (usdPrice: number): number => {
  const usdToEurRate = 0.92; // Approximate conversion rate
  return usdPrice * usdToEurRate;
};

/**
 * Format price as currency
 */
export const formatCurrency = (amount: number, currency: string = 'EUR'): string => {
  return new Intl.NumberFormat('en-EU', { 
    style: 'currency', 
    currency: currency,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Calculate GFT token value from gold price
 */
export const calculateGftValue = (goldPricePerOz: number): number => {
  const gftToOzRatio = 0.2; // 1 GFT = 0.2 oz of gold
  return goldPricePerOz * gftToOzRatio;
};
