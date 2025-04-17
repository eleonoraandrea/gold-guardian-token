import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("404_not_found")}</h1>
        <p className="text-xl text-gray-600 mb-4">{t("oops_page_not_found")}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {t("return_to_home")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
