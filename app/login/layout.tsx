import Header from "@/components/Header";
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
            <main>{children}</main>
        </>
    );
}