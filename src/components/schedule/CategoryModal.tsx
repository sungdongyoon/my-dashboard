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

const CategoryModal = ({
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>카테고리 추가</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="categoryName">이름</Label>
            <Input
              id="categoryName"
              name="categoryName"
              placeholder="카테고리 이름을 입력해주세요."
              value={categoryData.name}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
              ) => setCategoryData({ ...categoryData, name: e.target.value })}
            />
          </Field>
          <Field>
            <div className="flex gap-1 items-center">
              <Label htmlFor="textColor">텍스트 색상</Label>
            </div>
            <Select
              onValueChange={(value) =>
                setCategoryData({ ...categoryData, textColor: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="backgroundColor">배경 색상</Label>
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
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button type="submit" onClick={handlePostCategory}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
