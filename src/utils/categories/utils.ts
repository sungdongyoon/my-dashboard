import { createClient } from "../supabase/client";

// [get] 스케줄 데이터
export const apiGetCategoryData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("카테고리 데이터 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data;
};
