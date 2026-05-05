import {
  apiDeleteScheduleData,
  apiPostScheduleData,
  apiUpdateScheduleData,
} from "@/src/utils/schedules/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// [post] 스케줄 뮤테이션
export const usePostSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPostScheduleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
    onError: (error) => {
      console.error("스케줄 데이터 전송 실패", error);
    },
  });
};

// [update] 스케줄 뮤테이션
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiUpdateScheduleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
    onError: (error) => {
      console.error("일정 업데이트 실패", error);
    },
  });
};

// [delete] 스케줄 뮤테이션
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteScheduleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
    onError: (error) => {
      console.error("일정 삭제 실패", error);
    },
  });
};
