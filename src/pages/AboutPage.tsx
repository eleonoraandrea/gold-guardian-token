import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, Landmark, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-navy-900 mb-6">{t("about_gbcfm")}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t("about_gbcfm_description")}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-gold-500" />
                {t("our_mission")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("our_mission_description1")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("our_mission_description2")}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center">
                <Landmark className="mr-2 h-6 w-6 text-gold-500" />
                {t("market_context")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("market_context_description1")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("market_context_description2")}
              </p>
              
              <div className="mt-8 bg-navy-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-navy-800 mb-4">
                  {t("traditional_gold_investment_challenges")}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-medium mb-2">{t("physical_gold")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("physical_gold_description")}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-medium mb-2">{t("gold_etfs")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("gold_etfs_description")}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-medium mb-2">{t("gold_futures")}</h4>
                    <p className="text-sm text-gray-600">
                      {t("gold_futures_description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center">
                <Users className="mr-2 h-6 w-6 text-gold-500" />
                {t("team_and_partners")}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t("team_and_partners_description1")}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t("team_and_partners_description2")}
              </p>
            </div>

            <div className="bg-navy-800 text-white rounded-xl p-8 relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">{t("ready_to_explore")}</h2>
                <p className="text-lg text-gray-300 mb-6">
                  {t("try_simulator")}
                </p>
                <Button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6 text-lg">
                  {t("go_to_simulator")}
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy-800 mb-6">{t("disclaimer")}</h2>
              <div className="bg-gray-50 p-6 rounded-lg text-sm text-gray-600">
                <p>
                  {t("disclaimer_content1")}
                </p>
                <p className="mt-3">
                  {t("disclaimer_content2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
