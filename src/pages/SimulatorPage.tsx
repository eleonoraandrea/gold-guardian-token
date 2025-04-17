
import { Navbar } from "@/components/Navbar";
import { GoldSimulator } from "@/components/GoldSimulator";
import { CustomPriceSimulator } from "@/components/CustomPriceSimulator";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const SimulatorPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="bg-gray-50 dark:bg-navy-800/50 py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-navy-900 dark:text-white mb-4">
              {t('gft_simulator')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('simulator_description')}
            </p>
          </div>
        </div>
      </div>
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="dynamic" className="w-full max-w-5xl mx-auto">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="dynamic" className="px-6">
                {t('dynamic_simulator')}
              </TabsTrigger>
              <TabsTrigger value="custom" className="px-6">
                {t('custom_simulator')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dynamic">
              <GoldSimulator />
            </TabsContent>
            <TabsContent value="custom">
              <CustomPriceSimulator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SimulatorPage;
