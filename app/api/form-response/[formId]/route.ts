import { db } from "@/configs/db";
import { formResponses } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: Promise<{ formId: string }> }
) => {
    try {
        
        const user = await currentUser();
        const { formId } = await params;

        if (!formId) {
            return NextResponse.json(
                { error: "formId is required" },
                { status: 400 }
            )
        }

        if (!currentUser) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const userEmail = user?.primaryEmailAddress?.emailAddress

        const response = await db
            .select()
            .from(formResponses)
            .where(
                and(eq(formResponses.formRef, formId), eq(formResponses.createdBy, userEmail))
            )

        return NextResponse.json({ data : response }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        )
    }
}