
import { Navbar } from "@/components/Navbar";
import { TokenStructure } from "@/components/TokenStructure";
import { Footer } from "@/components/Footer";

const TokenPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <TokenStructure />
      </main>
      <Footer />
    </div>
  );
};

export default TokenPage;
