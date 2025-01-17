import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request: Request) {

    if (request.method !== "GET") {
        return new Response("Method not allowed", { status: 405 });
    }

    const user = await currentUser()

    console.log("Current User:", user);
    if (!user) {
        redirect("/sign-in");
    }

    let userSettings = await prisma.userSettings.findUnique({
        where: {
            userId: user.id,
        },
    })

    if (!userSettings) {
        userSettings = await prisma.userSettings.create({
            data: {
                userId: user.id,
                currency: "BRL"
            }
        })
    }

    // Revalidação da home page para atualizar o menu
    revalidatePath("/");
    return new Response(JSON.stringify(userSettings), {
        headers: { "Content-Type": "application/json" },
    });

}