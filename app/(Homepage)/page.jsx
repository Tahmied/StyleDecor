import CustomerReviews from '@/components/homepage/CustomerReviews';
// import LatestArticles from '@/components/homepage/LatestArticles';
import Packages from '@/components/homepage/Packages';
import ServiceCoverageMap from '@/components/homepage/ServiceCoverageMap';
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
            <ServiceCoverageMap/>
        </>
    );
};

export default Page;