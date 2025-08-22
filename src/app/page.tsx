
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PortfolioClientPage from '@/components/portfolio-client-page';
import ThemeCustomizer from '@/components/theme-customizer';

export default async function Home() {

  return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <PortfolioClientPage />
        <Footer />
        <ThemeCustomizer />
      </div>
  );
}
