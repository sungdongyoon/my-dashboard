import { apiGetScheduleData } from "@/src/utils/schedules/utils";
import React from "react";

const Home = async () => {
  const scheduleData = await apiGetScheduleData(); // 전체 스케줄 데이터

  return (
    <div className="w-full h-full grid grid-cols-3 gap-3">
      <div className="flex justify-center items-center border border-solid border-red-100 rounded-2xl">
        Schedule Coming Soon
      </div>
      <div className="flex justify-center items-center border border-solid border-red-100 rounded-2xl">
        Todo List Coming Soon
      </div>
      <div className="flex justify-center items-center border border-solid border-red-100 rounded-2xl">
        Memo Coming Soon
      </div>
      <div className="flex justify-center items-center border border-solid border-red-100 rounded-2xl">
        Diary Coming Soon
      </div>
    </div>
  );
};

export default Home;
