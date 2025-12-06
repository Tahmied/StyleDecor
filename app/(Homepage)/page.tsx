import CustomerReviews from '@/components/Homepage/CustomerReviews';
import LatestArticles from '@/components/Homepage/LatestArticles';
import Packages from '@/components/Homepage/Packages';
import TrustedCompanies from '@/components/Homepage/TrustedCompanies';

const Page = () => {
    return (
        <>
            <TrustedCompanies />
            <Packages />
            <CustomerReviews />
            <LatestArticles />

        </>
    );
};

export default Page;