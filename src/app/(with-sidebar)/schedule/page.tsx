import { apiGetScheduleData } from "@/src/api/utils";
import ScheduleClient from "@/src/components/schedule/ScheduleClient";

const Schedule = async () => {
  const scheduleData = await apiGetScheduleData();

  return (
    <div className="w-full h-full">
      <ScheduleClient scheduleData={scheduleData} />
    </div>
  );
};

export default Schedule;
