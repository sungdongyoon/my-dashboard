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
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import {
  useDeleteCategory,
  usePostCategory,
} from "@/src/hooks/mutations/useCategoryMutation";
import { IoTrashOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";

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
  /* 커스텀 훅 */
  const router = useRouter(); // 라우터
  const postCategory = usePostCategory(); // 카테고리 추가 뮤테이션
  const deleteCategory = useDeleteCategory();

  /* [post] 카테고리 데이터 */
  const handlePostCategory = async () => {
    postCategory.mutate(
      {
        name: categoryData.name,
        textColor: categoryData.textColor,
        backgroundColor: categoryData.backgroundColor,
      },
      {
        onSuccess: () => {
          alert("카테고리가 등록되었습니다!");
          setIsCategoryModal?.(false);
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
                  <li className="font-medium borders ">{el.name}</li>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100">
                  <div className="text-[1rem] cursor-pointer hover:text-blue-500">
                    <PiNotePencil />
                  </div>
                  <div
                    className="text-[1rem] cursor-pointer hover:text-red-500"
                    onClick={() => handleDeleteCategory(el.id)}
                  >
                    <IoTrashOutline />
                  </div>
                </div>
              </div>
            ),
          )}
        </ul>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button type="submit" onClick={handlePostCategory}>
            카테고리 추가
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
