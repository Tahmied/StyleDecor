import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Utils/Loader";
import { Suspense } from "react";
export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header height={'auto'}>
                <p></p>
            </Header>
            <main>
                <Suspense fallback={<Loader />}>
                    {children}
                </Suspense>

            </main>
            <Footer />
        </>
    );
}