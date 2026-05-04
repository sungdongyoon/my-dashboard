"use client";

import React, { Fragment, useState } from "react";
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
import { Input } from "@/src/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IoAddCircle, IoCalendar } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  useDeleteSchedule,
  useUpdateSchedule,
} from "@/src/hooks/mutations/useScheduleMutations";
import {
  formatDateToDot,
  formatDateToISO,
  formatDateToKorean,
} from "@/src/utils/common";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Field, FieldGroup } from "../ui/field";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "../ui/spinner";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, parse, startOfDay } from "date-fns";
import Loading from "../Loading";

interface DetailsModalType {
  className?: string;
  triggerVisible?: boolean;
  isDetailsModal?: boolean;
  setIsDetailsModal?: (payload: boolean) => void;
  detailsData: {
    id: string;
    date: Date;
    start: Date;
    end: Date;
    dateStr: string;
    startStr: string;
    endStr: string;
    title: string;
    props: {
      memo?: string;
      category?: string;
    };
  } | null;
}

interface DetailsInputType {
  id: string;
  title: string;
  props: {
    memo?: string;
    categoryId?: string;
    categoryName?: string;
  };
  date: Date;
  start: Date;
  end: Date;
  dateStr: string;
  startStr: string;
  endStr: string;
}

const DetailsModal = ({
  className,
  triggerVisible = true,
  isDetailsModal,
  setIsDetailsModal,
  detailsData,
}: DetailsModalType) => {
  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden; // 트리거 hidden or visible

  /* hooks */
  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 일정 업데이트
  const [detailsInput, setDetailsInput] = useState<DetailsInputType | null>(
    detailsData,
  ); // 일정 상세 정보

  /* 커스텀 훅 */
  const router = useRouter(); // 라우터
  const updateSchedule = useUpdateSchedule(); // 일정 업데이트 뮤테이션
  const deleteSchedule = useDeleteSchedule(); // 일정 삭제 뮤테이션

  /* 날짜 변환 공통 함수 */
  const dateISO = formatDateToISO(detailsInput?.date ?? null);
  const dateKorean = formatDateToKorean(detailsInput?.date ?? null);
  const dateDot = formatDateToDot(detailsInput?.date ?? null);

  /* 카테고리 데이터 */
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("/api/categories").then((res) => res.data),
  });

  /* [update] 스케줄 데이터 */
  const handlePostSchedule = async () => {
    if (confirm("일정을 업데이트 하시겠습니까?")) {
      updateSchedule.mutate(
        {
          id: detailsInput?.id ?? "",
          start: detailsInput?.startStr ?? "",
          end: detailsInput?.endStr ?? "",
          title: detailsInput?.title ?? "",
          categoryId: detailsInput?.props.categoryId ?? "",
          categoryName: detailsInput?.props.categoryName ?? "",
          memo: detailsInput?.props.memo ?? "",
        },
        {
          onSuccess: () => {
            alert("일정이 변경되었습니다!");

            setIsUpdate(false);
            setIsDetailsModal?.(false);
            router.refresh();
          },
        },
      );
    }
  };

  /* [delete] 스케줄 데이터 */
  const handleDeleteSchedule = async () => {
    if (confirm("일정을 삭제하시겠습니까?")) {
      deleteSchedule.mutate(
        {
          id: detailsInput?.id ?? "",
        },
        {
          onSuccess: () => {
            alert("일정이 삭제되었습니다!");

            setIsDetailsModal?.(false);
            router.refresh();
          },
        },
      );
    }
  };

  return (
    <Dialog
      open={isDetailsModal}
      onOpenChange={(open) => setIsDetailsModal?.(open)}
    >
      <TriggerWrapper>
        <DialogTrigger className={className}>
          <IoAddCircle size={20} />
        </DialogTrigger>
      </TriggerWrapper>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          {isUpdate ? (
            <DialogTitle className="text-[1.2rem]">{dateKorean}</DialogTitle>
          ) : (
            <>
              <span className="text-[0.8rem] text-gray-500">
                {detailsInput?.props.categoryName}
              </span>
              <DialogTitle className="text-[1.4rem]">
                {detailsInput?.title}
              </DialogTitle>
            </>
          )}
        </DialogHeader>
        <FieldGroup>
          {isUpdate ? (
            <>
              <Field>
                <Label htmlFor="title">제목</Label>
                <input
                  id="title"
                  type="text"
                  value={detailsInput?.title}
                  className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
                  onChange={(e) =>
                    detailsInput &&
                    setDetailsInput({
                      ...detailsInput,
                      title: e.target.value,
                    })
                  }
                  placeholder="제목을 입력해주세요."
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
                        {detailsInput?.start
                          ? detailsInput.startStr
                          : "시작일을 설정해주세요"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 flex flex-row"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={detailsInput?.start}
                        onSelect={(selected) => {
                          if (!selected) return;
                          const startTime = format(
                            detailsInput?.start ?? "",
                            "HH:mm",
                          );

                          setDetailsInput((prev) => {
                            if (!prev) return prev;
                            const parsedDate = parse(
                              `${selected} ${startTime}`,
                              "yyyy-MM-dd HH:mm",
                              new Date(),
                            );

                            return {
                              ...prev,
                              start: parsedDate,
                              startStr: format(selected, "yyyy-MM-dd HH:mm"),
                              end:
                                prev.end < parsedDate ? parsedDate : prev.end,
                              endStr: format(
                                prev.end < parsedDate ? parsedDate : prev.end,
                                "yyyy-MM-dd HH:mm",
                              ),
                            };
                          });
                        }}
                        defaultMonth={detailsInput?.start}
                      />
                      <div className="border-l flex flex-col">
                        <div className="p-3 flex flex-col flex-1 gap-3 border-t">
                          <Label>Start Time</Label>
                          <Input
                            type="time"
                            value={format(detailsInput?.start ?? "", "HH:mm")}
                            onChange={(e) => {
                              const startTime = e.target.value;

                              setDetailsInput((prev) => {
                                if (!prev) return prev;
                                const startDate = prev.startStr.slice(0, 10);
                                return {
                                  ...prev,
                                  start: parse(
                                    `${startDate} ${startTime}`,
                                    "yyyy-MM-dd HH:mm",
                                    new Date(),
                                  ),
                                  startStr: `${startDate} ${startTime}`,
                                };
                              });
                            }}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild className="flex-1">
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                      >
                        {detailsInput?.end
                          ? detailsInput?.endStr
                          : "종료일을 설정해주세요"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 flex flex-row"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={detailsInput?.end}
                        onSelect={(selected) => {
                          if (!selected) return;
                          setDetailsInput((prev) => {
                            if (!prev) return prev;

                            return {
                              ...prev,
                              end: selected,
                              endStr: format(selected, "yyyy-MM-dd HH:mm:ss"),
                            };
                          });
                        }}
                        disabled={(date) =>
                          detailsInput?.start
                            ? startOfDay(date) < startOfDay(detailsInput.start)
                            : false
                        }
                        defaultMonth={detailsInput?.end}
                      />
                      <div className="border-l flex flex-col">
                        <div className="p-3 flex flex-col flex-1 gap-3 border-t">
                          <Label>End Time</Label>
                          <Input
                            type="time"
                            value={format(detailsInput?.end ?? "", "HH:mm")}
                            onChange={(e) => {
                              const endTime = e.target.value;

                              setDetailsInput((prev) => {
                                if (!prev) return prev;

                                const endDate = detailsInput?.dateStr.slice(
                                  0,
                                  10,
                                );
                                return {
                                  ...prev,
                                  end: parse(
                                    `${endDate} ${endTime}`,
                                    "yyyy-MM-dd HH:mm",
                                    new Date(),
                                  ),
                                  endStr: `${endDate} ${endTime}`,
                                };
                              });
                            }}
                          />
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </Field>
              <Field>
                <Label htmlFor="category">카테고리</Label>
                {categoryLoading ? (
                  <Loading />
                ) : (
                  <RadioGroup
                    className="flex gap-1"
                    value={detailsInput?.props.categoryId ?? ""}
                    onValueChange={(value: string) => {
                      const selectedCategory = categoryData?.find(
                        (el: { id: string }) => el.id === value,
                      );

                      setDetailsInput((prev) =>
                        prev
                          ? {
                              ...prev,
                              props: {
                                ...prev.props,
                                categoryId: selectedCategory.id,
                                categoryName: selectedCategory.name,
                              },
                            }
                          : prev,
                      );
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
                          <RadioGroupItem
                            value={el.id}
                            className="peer sr-only"
                          />
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
                <Label>메모</Label>
                <input
                  type="text"
                  value={detailsInput?.props?.memo}
                  className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
                  onChange={(e) =>
                    detailsInput &&
                    setDetailsInput({
                      ...detailsInput,
                      props: { ...detailsInput.props, memo: e.target.value },
                    })
                  }
                  placeholder="제목을 입력해주세요."
                />
              </Field>
            </>
          ) : (
            <>
              <Field>
                <div className="flex items-center gap-1">
                  <IoCalendar className="text-gray-500" />
                  <span className="text-gray-500 text-[0.8rem]">
                    {formatDateToDot(detailsInput?.start ?? null)} ~
                  </span>
                  <span className="text-gray-500 text-[0.8rem]">
                    {formatDateToDot(detailsInput?.end ?? null)}
                  </span>
                </div>
              </Field>
              <Field>
                {detailsInput?.props.memo ? (
                  <p className="text-[0.9rem] text-gray-400">
                    {detailsInput?.props?.memo}
                  </p>
                ) : (
                  <span className="text-[0.9rem] text-gray-400">
                    등록된 메모가 없습니다.
                  </span>
                )}
              </Field>
            </>
          )}
        </FieldGroup>
        <DialogFooter>
          {isUpdate === false ? (
            <>
              <DialogClose asChild>
                <Button variant="outline">닫기</Button>
              </DialogClose>
              <Button onClick={() => setIsUpdate(true)}>수정</Button>
              <Button variant="destructive" onClick={handleDeleteSchedule}>
                삭제
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsUpdate(false)}>
                뒤로가기
              </Button>
              <Button onClick={handlePostSchedule}>저장</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
