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
import { usePostCategory } from "@/src/hooks/mutations/useCategoryMutation";

interface CategoryModalType {
  className?: string;
  triggerVisible?: boolean;
  isCategoryModal?: boolean;
  setIsCategoryModal?: (payload: boolean) => void;
}

interface CategoryDataType {
  name: string;
  textColor: string;
  backgroundColor: string;
}

const AddCategoryModal = ({
  className,
  triggerVisible,
  isCategoryModal,
  setIsCategoryModal,
}: CategoryModalType) => {
  /* hooks */
  const [categoryData, setCategoryData] = useState<CategoryDataType>({
    name: "",
    textColor: "",
    backgroundColor: "",
  });

  /* 커스텀 훅 */
  const router = useRouter(); // 라우터
  const postCategory = usePostCategory(); // 카테고리 추가 뮤테이션

  /* [post] 카테고리 데이터 */
  const handlePostCategory = async () => {
    if (!categoryData.name) {
      alert("카테고리 이름을 입력해주세요!");
      return;
    } else if (!categoryData.textColor) {
      alert("카테고리 텍스트 색상을 선택해주세요!");
      return;
    } else if (!categoryData.backgroundColor) {
      alert("카테고리 배경 색상을 선택해주세요!");
      return;
    }

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

  return (
    <Dialog
      open={isCategoryModal}
      onOpenChange={(open) => setIsCategoryModal?.(open)}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>카테고리 추가</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label
              htmlFor="categoryName"
              className="font-semibold text-gray-500"
            >
              이름 *
            </Label>
            <input
              id="categoryName"
              name="categoryName"
              placeholder="카테고리 이름을 입력해주세요."
              className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
              value={categoryData.name}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
              ) => setCategoryData({ ...categoryData, name: e.target.value })}
            />
          </Field>
          <Field>
            <div className="flex gap-1 items-center">
              <Label
                htmlFor="textColor"
                className="font-semibold text-gray-500"
              >
                텍스트 색상 *
              </Label>
            </div>
            <RadioGroup
              onValueChange={(value) =>
                setCategoryData({ ...categoryData, textColor: value })
              }
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="white" id="white" />
                <Label htmlFor="white">White</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="black" id="black" />
                <Label htmlFor="black">Black</Label>
              </div>
            </RadioGroup>
          </Field>
          <Field>
            <Label
              htmlFor="backgroundColor"
              className="font-semibold text-gray-500"
            >
              배경 색상 *
            </Label>
            <RadioGroup
              defaultValue="comfortable"
              className="w-fit"
              onValueChange={(value) =>
                setCategoryData({ ...categoryData, backgroundColor: value })
              }
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="red" id="red" />
                <Label htmlFor="red">Red</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="blue" id="blue" />
                <Label htmlFor="blue">Blue</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="green" id="green" />
                <Label htmlFor="green">Green</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="orange" id="orange" />
                <Label htmlFor="orange">Orange</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="gray" id="gray" />
                <Label htmlFor="gray">Gray</Label>
              </div>
            </RadioGroup>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">뒤로가기</Button>
          </DialogClose>
          <Button type="submit" onClick={handlePostCategory}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
