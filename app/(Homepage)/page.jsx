import CustomerReviews from '@/components/homepage/CustomerReviews';
// import LatestArticles from '@/components/homepage/LatestArticles';
import Packages from '@/components/homepage/Packages';
import Services from '@/components/homepage/Services';
import TrustedCompanies from '@/components/homepage/TrustedCompanies';

const Page = () => {
    return (
        <>
            <TrustedCompanies />
            <Packages />
            <CustomerReviews />
            {/* <LatestArticles /> */}
            <Services />
        </>
    );
};

export default Page;