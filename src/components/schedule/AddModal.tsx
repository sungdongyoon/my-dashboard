"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Field, FieldGroup } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

import React, { Fragment, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePostSchedule } from "@/src/hooks/mutations/useScheduleMutations";

interface AddModalType {
  className?: string;
  date: Date | null;
  triggerVisible?: boolean;
  isAddModal?: boolean;
  setIsAddModal?: (payload: boolean) => void;
}

interface ScheduleType {
  // id: string;
  date: string;
  title: string;
  memo?: string;
  cateogry: string;
}

const AddModal = ({
  className,
  date,
  triggerVisible = true,
  isAddModal,
  setIsAddModal,
}: AddModalType) => {
  const dateStr = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : ""; // 날짜 string으로 변환

  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden; // 트리거 hidden or visible

  /* hooks */
  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    date: dateStr,
    title: "",
    memo: "",
    cateogry: "",
  });

  /* 커스텀 훅 */
  const router = useRouter(); // 라우터
  const postSchedule = usePostSchedule(); // 일정 추가 뮤테이션
  // const { scheduleData, setScheduleData, resetScheduleData } =
  //   useScheduleStore();

  /* 카테고리 데이터 */
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("/api/categories").then((res) => res.data),
  });

  /* [post] 스케줄 데이터 */
  const handlePostSchedule = async () => {
    postSchedule.mutate(
      {
        date: scheduleData.date,
        title: scheduleData.title,
        memo: scheduleData.memo ?? "",
        category: scheduleData.cateogry,
      },
      {
        onSuccess: () => {
          alert("일정이 등록되었습니다!");
          setIsAddModal?.(false);
          router.refresh();
        },
      },
    );
  };

  return (
    <Dialog open={isAddModal} onOpenChange={(open) => setIsAddModal?.(open)}>
      <TriggerWrapper>
        <DialogTrigger className={className}>
          <IoAddCircle size={20} />
        </DialogTrigger>
      </TriggerWrapper>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{dateStr}</DialogTitle>
          </div>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              name="title"
              placeholder="할 일을 입력해주세요."
              value={scheduleData?.title}
              onChange={(e) =>
                setScheduleData({ ...scheduleData, title: e.target.value })
              }
            />
          </Field>
          <Field>
            <div className="flex gap-1 items-center">
              <Label htmlFor="category">카테고리</Label>
            </div>
            <Select
              onValueChange={(value) =>
                setScheduleData({ ...scheduleData, cateogry: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categoryData?.map((el: { id: string; name: string }) => (
                    <SelectItem key={el.id} value={el.name}>
                      {el.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="memo">메모</Label>
            <Textarea
              id="memo"
              name="memo"
              value={scheduleData?.memo}
              onChange={(e) =>
                setScheduleData({ ...scheduleData, memo: e.target.value })
              }
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button type="submit" onClick={handlePostSchedule}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
