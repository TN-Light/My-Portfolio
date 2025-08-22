
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getPortfolioData } from './actions';
import PortfolioClientPage from '@/components/portfolio-client-page';
import ThemeCustomizer from '@/components/theme-customizer';

export default async function Home() {
  const result = await getPortfolioData();

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Portfolio</h2>
          <p className="text-red-500">{result.error}</p>
          <p className="mt-4 text-muted-foreground">Could not fetch portfolio data. Please try again later.</p>
      </div>
    )
  }

  return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <PortfolioClientPage portfolioData={result.data} />
        <Footer />
        <ThemeCustomizer />
      </div>
  );
}
