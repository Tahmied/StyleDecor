import CustomerReviews from '@/Components/Homepage/CustomerReviews';
import LatestArticles from '@/Components/Homepage/LatestArticles';
import Packages from '@/Components/Homepage/Packages';
import TrustedCompanies from '@/Components/Homepage/TrustedCompanies';

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