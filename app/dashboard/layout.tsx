import Footer from "@/components/Footer";
import Header from "@/components/Header";
import checkAuth from "@/lib/auth-check";
export default async function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await checkAuth()
    return (
        <>
            <Header height={'auto'}>
                <p></p>
            </Header>
            <main>{children}</main>
            <Footer />
        </>
    );
}