import { apiPostCategoryData } from "@/src/utils/categories/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// [post] 카테고리 뮤테이션
export const usePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: apiPostCategoryData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("카테고리 데이터 전송 실패", error);
    },
  });
};
