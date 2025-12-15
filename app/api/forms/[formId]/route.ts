import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { JsonForms } from "@/configs/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, param } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const { formId } = await params;
    console.log("FORM ID:", formId);

    const user = await currentUser();

    if (!user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, formId))
      .limit(1);

    if (!result.length) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ form: result[0] });
  } catch (error) {
    console.error("FETCH FORM ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// form delete 
// form update

// routes soon