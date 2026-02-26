import { apiGetScheduleData } from "@/src/utils/schedules/utils";
import ScheduleClient from "@/src/components/schedule/ScheduleClient";
import { apiGetCategoryData } from "@/src/utils/categories/utils";

const Schedule = async () => {
  const scheduleData = await apiGetScheduleData(); // 전체 스케줄 데이터
  const categoryData = await apiGetCategoryData(); // 카테고리 데이터

  return (
    <div className="w-full h-full">
      <ScheduleClient scheduleData={scheduleData} categoryData={categoryData} />
    </div>
  );
};

export default Schedule;
