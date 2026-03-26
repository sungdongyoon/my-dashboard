import { createClient } from "../supabase/client";

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

// [post] 스케줄 데이터
export const apiPostScheduleData = async ({
  start,
  end,
  title,
  memo,
  categoryId,
  categoryName,
}: {
  start: string;
  end: string;
  title: string;
  memo: string;
  categoryId: string;
  categoryName: string;
}) => {
  const supabase = await createClient();

  await supabase.from("schedules").insert([
    {
      start,
      end,
      title,
      memo,
      categoryId,
      categoryName,
    },
  ]);
};

// [update] 스케줄 데이터
export const apiUpdateScheduleData = async ({
  id,
  start,
  end,
  title,
  categoryId,
  categoryName,
  memo,
}: {
  id: string;
  start: string;
  end: string;
  title: string;
  categoryId: string;
  categoryName: string;
  memo: string;
}) => {
  const supabase = await createClient();

  await supabase
    .from("schedules")
    .update({
      start,
      end,
      title,
      categoryId,
      categoryName,
      memo,
    })
    .eq("id", id);
};

// [delete] 스케줄 데이터
export const apiDeleteScheduleData = async ({
  id,
  categoryId,
}: {
  id: string;
  categoryId?: string;
}) => {
  const supabase = await createClient();

  await supabase.from("schedules").delete().eq("id", id);
};
