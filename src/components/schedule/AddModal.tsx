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

import React, { Fragment, useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { apiPostScheduleData } from "@/src/utils/schedules/utils";
import { apiGetCategoryData } from "@/src/utils/categories/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
}

const AddModal = ({
  className,
  date,
  triggerVisible = true,
  isAddModal,
  setIsAddModal,
}: AddModalType) => {
  // 날짜 변환
  const dateStr = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";

  // 트리거 hidden or visible
  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden;

  // 라우터
  const router = useRouter();

  // tanstack query 클라이언트
  const queryClient = useQueryClient();

  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    date: dateStr,
    title: "",
    memo: "",
  });
  // const { scheduleData, setScheduleData, resetScheduleData } =
  //   useScheduleStore();

  // 카테고리 데이터
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("/api/categories").then((res) => res.data),
  });

  // [post] 스케줄 뮤테이션
  const postScheduleMutation = useMutation({
    mutationFn: apiPostScheduleData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });

      alert("일정이 등록되었습니다!");
      setIsAddModal?.(false);
      router.refresh();
    },
    onError: (error) => {
      console.error("스케줄 데이터 전송 실패", error);
    },
  });

  // [post] 스케줄 데이터
  const handlePostSchedule = async () => {
    postScheduleMutation.mutate({
      date: scheduleData.date,
      title: scheduleData.title,
      memo: scheduleData.memo ?? "",
    });
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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
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
