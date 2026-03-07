"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  useDeleteCategory,
  usePostCategory,
  useUpdateCategory,
} from "@/src/hooks/mutations/useCategoryMutation";
import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import AddCategoryModal from "./AddCategoryModal";

interface CategoryModalType {
  className?: string;
  triggerVisible?: boolean;
  isCategoryModal?: boolean;
  categoryData: any;
  setIsCategoryModal?: (payload: boolean) => void;
}

interface CategoryDataType {
  name: string;
  textColor: string;
  backgroundColor: string;
}

const CategoryModal = ({
  className,
  triggerVisible,
  categoryData,
  isCategoryModal,
  setIsCategoryModal,
}: CategoryModalType) => {
  /* hooks */
  const [isAddCategoryModal, setIsAddCategoryModal] = useState<boolean>(false); // [AddCategoryModal] 카테고리 추가 모달
  const [isUpdateCategory, setIsUpdateCategory] = useState<{
    id: string;
    name: string;
    state: boolean;
  }>({
    id: "",
    name: "",
    state: false,
  }); // 카테고리 업데이트 상태

  /* 커스텀 훅 */
  const router = useRouter(); // 라우터
  const deleteCategory = useDeleteCategory(); // 카테고리 삭제 뮤테이션
  const updateCategory = useUpdateCategory(); // 카테고리 업데이트 뮤테이션

  /* 카테고리 상태 업데이트 */
  const updateCategoryState = async ({
    id,
    name,
    state,
  }: {
    id: string;
    name: string;
    state: boolean;
  }) => {
    setIsUpdateCategory({
      id,
      name,
      state,
    });
  };

  /* [update] 카테고리 데이터 */
  const handleUpdateCategory = async (categoryId: string) => {
    updateCategory.mutate(
      {
        id: categoryId,
        name: isUpdateCategory.name,
      },
      {
        onSuccess: () => {
          alert("카테고리가 변경되었습니다!");
          setIsUpdateCategory({ ...isUpdateCategory, state: false });
          router.refresh();
        },
      },
    );
  };

  /* [delete] 카테고리 데이터 */
  const handleDeleteCategory = async (categoryId: string) => {
    if (confirm("카테고리를 삭제하시겠습니까?")) {
      deleteCategory.mutate(
        {
          id: categoryId,
        },
        {
          onSuccess: () => {
            alert("일정이 삭제되었습니다!");
            router.refresh();
          },
        },
      );
    }
  };

  return (
    <>
      <Dialog
        open={isCategoryModal}
        onOpenChange={(open) => setIsCategoryModal?.(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>카테고리 관리</DialogTitle>
          </DialogHeader>
          <ul className="flex flex-col">
            {categoryData.map(
              (el: {
                name: string;
                id: string;
                backgroundColor: string;
                textColor: string;
              }) => (
                <div
                  key={el.id}
                  className="flex gap-3 items-center justify-between p-2 rounded-lg hover:bg-gray-100 group"
                >
                  <div className="flex gap-3 items-center">
                    <div className="flex w-[20px] h-[20px] rounded-full">
                      <div
                        className="w-full h-full rounded-s-lg"
                        style={{ backgroundColor: el.backgroundColor }}
                      ></div>
                      <div
                        className="w-full h-full rounded-e-lg"
                        style={{ backgroundColor: el.textColor }}
                      ></div>
                    </div>
                    <li className="font-medium">
                      {isUpdateCategory.state === true &&
                      isUpdateCategory.id === el.id ? (
                        <Input
                          type="text"
                          placeholder="카테고리 이름을 입력해주세요"
                          value={isUpdateCategory.name}
                          onChange={(e) =>
                            setIsUpdateCategory({
                              ...isUpdateCategory,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        el.name
                      )}
                    </li>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                    {isUpdateCategory.state === true &&
                    isUpdateCategory.id === el.id ? (
                      <Button onClick={() => handleUpdateCategory(el.id)}>
                        저장
                      </Button>
                    ) : (
                      <>
                        <div
                          className="text-[1rem] cursor-pointer hover:text-blue-500"
                          onClick={() =>
                            updateCategoryState({
                              id: el.id,
                              name: el.name,
                              state: true,
                            })
                          }
                        >
                          <PiNotePencil />
                        </div>
                        <div
                          className="text-[1rem] cursor-pointer hover:text-red-500"
                          onClick={() => handleDeleteCategory(el.id)}
                        >
                          <IoTrashOutline />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ),
            )}
          </ul>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">닫기</Button>
            </DialogClose>
            <Button type="submit" onClick={() => setIsAddCategoryModal(true)}>
              카테고리 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AddCategoryModal
        triggerVisible={false}
        isCategoryModal={isAddCategoryModal}
        setIsCategoryModal={setIsAddCategoryModal}
      />
    </>
  );
};

export default CategoryModal;
