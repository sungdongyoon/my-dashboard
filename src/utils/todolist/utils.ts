import { createClient } from "../supabase/client";

// [get] 할 일 데이터
export const apiGetTodoListData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("todolist").select("*");

  if (error) {
    console.error("할 일 데이터 불러오기 실패", error);
    throw new Error(error.message);
  }

  return data;
};

// [post] 할 일 데이터
export const apiPostTodoListData = async ({
  title,
  memo,
}: {
  title: string;
  memo: string;
}) => {
  const supabase = await createClient();

  await supabase.from("todolist").insert([
    {
      title,
      memo,
    },
  ]);
};
