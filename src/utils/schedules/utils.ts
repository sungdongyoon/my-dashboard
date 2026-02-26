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
  date,
  title,
  memo,
  category,
}: {
  date: string;
  title: string;
  memo: string;
  category: string;
}) => {
  const supabase = await createClient();

  await supabase.from("schedules").insert([
    {
      date: date,
      title: title,
      memo: memo,
      category: category,
    },
  ]);
};

// [update] 스케줄 데이터
export const apiUpdateScheduleData = async ({
  id,
  date,
  title,
  memo,
}: {
  id: string;
  date: string;
  title: string;
  memo: string;
}) => {
  const supabase = await createClient();

  await supabase
    .from("schedules")
    .update({
      date: date,
      title: title,
      memo: memo,
    })
    .eq("id", id);
};

// [delete] 스케줄 데이터
export const apiDeleteScheduleData = async ({ id }: { id: string }) => {
  const supabase = await createClient();

  await supabase.from("schedules").delete().eq("id", id);
};
