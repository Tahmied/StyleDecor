import Header from "@/components/Header";
import Hero from "@/components/homepage/Hero";
export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header height={'90vh'}><Hero /></Header>
            <main>{children}</main>
        </>
    );
}