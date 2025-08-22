
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getPortfolioData } from './actions';
import PortfolioClientPage from '@/components/portfolio-client-page';
import ThemeCustomizer from '@/components/theme-customizer';

export default async function Home() {
  const result = await getPortfolioData();

  return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <PortfolioClientPage portfolioDataResult={result} />
        <Footer />
        <ThemeCustomizer />
      </div>
  );
}
