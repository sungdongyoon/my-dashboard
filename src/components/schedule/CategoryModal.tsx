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
import {
  IoCloseCircle,
  IoCloseCircleSharp,
  IoTrashOutline,
} from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import AddCategoryModal from "./AddCategoryModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    backgroundColor: string;
    textColor: string;
    state: boolean;
  }>({
    id: "",
    name: "",
    textColor: "",
    backgroundColor: "",
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
    textColor,
    backgroundColor,
    state,
  }: {
    id: string;
    name: string;
    textColor: string;
    backgroundColor: string;
    state: boolean;
  }) => {
    setIsUpdateCategory({
      id,
      name,
      textColor,
      backgroundColor,
      state,
    });
  };

  /* [update] 카테고리 데이터 */
  const handleUpdateCategory = async (categoryId: string) => {
    updateCategory.mutate(
      {
        id: categoryId,
        name: isUpdateCategory.name,
        textColor: isUpdateCategory.textColor,
        backgroundColor: isUpdateCategory.backgroundColor,
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
        <DialogContent showCloseButton={false}>
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
                    <li className="font-medium text-[0.8rem]">
                      {isUpdateCategory.state === true &&
                      isUpdateCategory.id === el.id ? (
                        <div className="flex items-center gap-3">
                          <input
                            type="text"
                            placeholder="카테고리 이름을 입력해주세요"
                            className="w-full border-b-1 pys-1 px-2 text-[0.8rem]"
                            value={isUpdateCategory.name}
                            onChange={(e) =>
                              setIsUpdateCategory({
                                ...isUpdateCategory,
                                name: e.target.value,
                              })
                            }
                          />
                          <Select
                            onValueChange={(value) =>
                              setIsUpdateCategory({
                                ...isUpdateCategory,
                                textColor: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-full max-w-48">
                              <SelectValue placeholder={el.textColor} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>텍스트색</SelectLabel>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="black">Black</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <Select
                            onValueChange={(value) =>
                              setIsUpdateCategory({
                                ...isUpdateCategory,
                                backgroundColor: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-full max-w-48">
                              <SelectValue placeholder={el.backgroundColor} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>배경색</SelectLabel>
                                <SelectItem value="white">Red</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="orange">Orange</SelectItem>
                                <SelectItem value="gray">Gray</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        el.name
                      )}
                    </li>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                    {isUpdateCategory.state === true &&
                    isUpdateCategory.id === el.id ? (
                      <div className="flex items-center gap-1">
                        <Button
                          size="xs"
                          variant="destructive"
                          className="text-[0.6rem]"
                          onClick={() =>
                            setIsUpdateCategory({
                              ...isUpdateCategory,
                              state: false,
                            })
                          }
                        >
                          닫기
                        </Button>
                        <Button
                          size="xs"
                          className="text-[0.6rem]"
                          onClick={() => handleUpdateCategory(el.id)}
                        >
                          저장
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div
                          className="text-[1rem] cursor-pointer hover:text-blue-500"
                          onClick={() =>
                            updateCategoryState({
                              id: el.id,
                              name: el.name,
                              textColor: el.textColor,
                              backgroundColor: el.backgroundColor,
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
