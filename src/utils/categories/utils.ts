import { createClient } from "../supabase/client";

// [get] 카테고리 데이터
export const apiGetCategoryData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error("카테고리 데이터 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data;
};

// [post] 카테고리 데이터
export const apiPostCategoryData = async ({
  name,
  textColor,
  backgroundColor,
}: {
  name: string;
  textColor: string;
  backgroundColor: string;
}) => {
  const supabase = await createClient();

  await supabase.from("categories").insert([
    {
      name: name,
      textColor: textColor,
      backgroundColor: backgroundColor,
      borderColor: backgroundColor,
    },
  ]);
};

// [delete] 카테고리 데이터
export const apiDeleteCategoryData = async ({ id }: { id: string }) => {
  const supabase = await createClient();

  await supabase.from("categories").delete().eq("id", id);
};
