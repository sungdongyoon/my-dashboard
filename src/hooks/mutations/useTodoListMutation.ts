import {
  apiDeleteTodoListData,
  apiPostTodoListData,
} from "@/src/utils/todolist/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [post] 할 일 뮤테이션
export const usePostTodoList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPostTodoListData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todolist"] });
    },
    onError: (error) => {
      console.error("할 일 데이터 전송 실패", error);
    },
  });
};

// [delete] 할 일 뮤테이션
export const useDeleteTodoList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiDeleteTodoListData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todolist"] });
    },
    onError: (error) => {
      console.error("할 일 데이터 삭제 실패", error);
    },
  });
};
