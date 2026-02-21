import { createClient } from "@/src/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("schedules").select("*");
    console.log("API 호출 성공!", data); // 서버 콘솔 로그
    return NextResponse.json({ message: "API is working!" }, { status: 200 });
  } catch (error) {
    console.error("API 에러:", error);
    return NextResponse.json({ message: "API error" }, { status: 500 });
  }
}
