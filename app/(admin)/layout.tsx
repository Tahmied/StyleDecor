import Header from "@/components/admin/Header";
import checkAuth from '@/lib/auth-check';

export default async function HomepageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await checkAuth('admin')
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}