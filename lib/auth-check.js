import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function checkAuth(requiredRole) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }
    if (requiredRole && session.user.role !== requiredRole) {
        redirect("/");
    }

    return session;
}