"use client";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Label } from "@/src/components/ui/label";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";

import React, { Fragment, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePostSchedule } from "@/src/hooks/mutations/useScheduleMutations";
import { formatDateToISO, formatDateToKorean } from "@/src/utils/common";
import { Badge } from "../ui/badge";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Spinner } from "../ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardFooter } from "../ui/card";
import { startOfDay } from "date-fns";

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
  start: string;
  end: string;
  title: string;
  memo?: string;
  cateogryId: string;
  categoryName: string;
}

const AddModal = ({
  className,
  date,
  triggerVisible = true,
  isAddModal,
  setIsAddModal,
}: AddModalType) => {
  const dateISO = formatDateToISO(date);
  const dateKorean = formatDateToKorean(date);

  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden; // 트리거 hidden or visible

  /* hooks */
  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    date: dateISO,
    start: dateISO,
    end: dateISO,
    title: "",
    memo: "",
    cateogryId: "",
    categoryName: "",
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
    if (!scheduleData.title) {
      alert("할 일을 입력해주세요!");
      return;
    } else if (!scheduleData.cateogryId) {
      alert("카테고리를 선택해주세요!");
      return;
    }

    postSchedule.mutate(
      {
        start: scheduleData.start,
        end: scheduleData.end,
        title: scheduleData.title,
        memo: scheduleData.memo ?? "",
        categoryId: scheduleData.cateogryId,
        categoryName: scheduleData.categoryName,
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

  console.log("scheduleData", scheduleData);

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
            <DialogTitle className="text-[1.2rem]">{dateKorean}</DialogTitle>
          </div>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="title" className="font-semibold text-gray-500">
              제목 *
            </Label>
            <input
              id="title"
              name="title"
              placeholder="할 일을 입력해주세요"
              className="border-b-1 py-1 px-2 text-[0.8rem]"
              value={scheduleData?.title}
              onChange={(e) =>
                setScheduleData({ ...scheduleData, title: e.target.value })
              }
            />
          </Field>
          <Field>
            <Label htmlFor="date" className="font-semibold text-gray-500">
              날짜 *
            </Label>
            <div className="flex gap-1 justify-between">
              <Popover>
                <PopoverTrigger asChild className="flex-1">
                  <Button
                    variant="outline"
                    id="date-picker-simple"
                    className="justify-start font-normal"
                  >
                    {scheduleData.start ? (
                      scheduleData.start
                    ) : (
                      <span>시작일을 설정해주세요</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(scheduleData.start)}
                    onSelect={(selected) => {
                      if (!selected) return;
                      setScheduleData((prev) => ({
                        ...prev,
                        start: formatDateToISO(selected),
                        end:
                          prev.end < formatDateToISO(selected)
                            ? formatDateToISO(selected)
                            : prev.end,
                      }));
                    }}
                    defaultMonth={new Date(scheduleData.start)}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild className="flex-1">
                  <Button
                    variant="outline"
                    id="date-picker-simple"
                    className="justify-start font-normal"
                  >
                    {scheduleData.end ? (
                      scheduleData.end
                    ) : (
                      <span>종료일을 설정해주세요</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(scheduleData.end)}
                    onSelect={(selected) => {
                      if (!selected) return;
                      setScheduleData((prev) => ({
                        ...prev,
                        end: formatDateToISO(selected),
                      }));
                    }}
                    defaultMonth={new Date(scheduleData.end)}
                    disabled={(date) =>
                      startOfDay(date) <
                      startOfDay(new Date(scheduleData.start))
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Field>
          <Field>
            <div className="flex gap-1 items-center">
              <Label htmlFor="category" className="font-semibold text-gray-500">
                카테고리 *
              </Label>
            </div>
            {categoryLoading ? (
              <div>
                <Badge>
                  <Spinner data-icon="inline-start" />
                  loading
                </Badge>
              </div>
            ) : (
              <RadioGroup
                className="flex gap-1"
                value={scheduleData.cateogryId ?? ""}
                onValueChange={(value) => {
                  const selectedCategory = categoryData?.find(
                    (el: { id: string }) => el.id === value,
                  );

                  setScheduleData({
                    ...scheduleData,
                    cateogryId: selectedCategory.id,
                    categoryName: selectedCategory.name,
                  });
                }}
              >
                {categoryData?.map(
                  (el: {
                    id: string;
                    name: string;
                    textColor: string;
                    backgroundColor: string;
                  }) => (
                    <label key={el.id}>
                      <RadioGroupItem value={el.id} className="peer sr-only" />
                      <Badge
                        style={{
                          color: el.textColor,
                          backgroundColor: el.backgroundColor,
                        }}
                        className="cursor-pointer opacity-30 transition duration-300 peer-data-[state=checked]:opacity-100 hover:opacity-100"
                      >
                        {el.name}
                      </Badge>
                    </label>
                  ),
                )}
              </RadioGroup>
            )}
          </Field>
          <Field>
            <Label htmlFor="memo" className="font-semibold text-gray-500">
              메모
            </Label>
            <textarea
              id="memo"
              name="memo"
              className="border rounded-sm py-1 px-2 text-[0.8rem]"
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
