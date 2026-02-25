import { apiGetCategoryData } from "@/src/utils/categories/utils";
import { createClient } from "@/src/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await apiGetCategoryData();
    console.log("API 호출 성공!"); // 서버 콘솔 로그
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json({ message: "API error" }, { status: 500 });
  }
}
