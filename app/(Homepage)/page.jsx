import CustomerReviews from '@/components/homepage/CustomerReviews';
// import LatestArticles from '@/components/homepage/LatestArticles';
import Footer from '@/components/Footer';
import MapLoader from '@/components/homepage/MapLoader';
import Packages from '@/components/homepage/Packages';
import Services from '@/components/homepage/Services';
import TopDecorators from '@/components/homepage/TopDecorators';
import TrustedCompanies from '@/components/homepage/TrustedCompanies';

const Page = () => {
    return (
        <>
            <TrustedCompanies />
            <Packages />
            <CustomerReviews />
            {/* <LatestArticles /> */}
            <Services />
            <TopDecorators/>
            
            <MapLoader/>
            <Footer/>
        </>
    );
};

export default Page;