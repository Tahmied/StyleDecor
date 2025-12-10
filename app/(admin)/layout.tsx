export default function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}