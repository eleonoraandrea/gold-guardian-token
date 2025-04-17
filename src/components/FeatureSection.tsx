import { CheckCircle, Shield, LineChart, Coins, Banknote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeatureSection() {
  const { t } = useLanguage();
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: t("capital_protection_feature"),
      description: t("capital_protection_feature_description")
    },
    {
      icon: <Coins className="h-8 w-8 text-gold-500" />,
      title: t("physical_backing_feature"),
      description: t("physical_backing_feature_description")
    },
    {
      icon: <LineChart className="h-8 w-8 text-blue-600" />,
      title: t("market_liquidity_feature"),
      description: t("market_liquidity_feature_description")
    },
    {
      icon: <Banknote className="h-8 w-8 text-purple-600" />,
      title: t("flexible_redemption_feature"),
      description: t("flexible_redemption_feature_description")
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-navy-900">{t("key_features_gold_futures_token")}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t("gft_combines_traditional_gold_investment_benefits")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-navy-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-navy-800 rounded-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 md:flex justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">{t("ready_to_invest_gold_future")}</h3>
              <p className="mt-2 text-navy-100">
                {t("gft_secure_innovative_way")}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-400 h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{t("1_gft_equals_0_2_oz_gold")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
