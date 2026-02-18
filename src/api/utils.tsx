import { createClient } from "../utils/supabase/server";

// [get] 스케줄 데이터
export const apiGetScheduleData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("schedules").select("*");

  if (error) {
    console.error("스케줄 데이터 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data;
};
