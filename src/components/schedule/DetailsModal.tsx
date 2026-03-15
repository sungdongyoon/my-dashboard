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

interface DetailsModalType {
  className?: string;
  triggerVisible?: boolean;
  isDetailsModal?: boolean;
  setIsDetailsModal?: (payload: boolean) => void;
  detailsData: {
    id: string;
    date: Date;
    dateStr: string;
    title: string;
    props: {
      memo?: string;
    };
  } | null;
}

interface DetailsInputType {
  id: string;
  title: string;
  props: {
    memo?: string;
    category?: string;
  };
  date: Date;
  dateStr: string;
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

  const dateISO = formatDateToISO(detailsInput?.date ?? null);
  const dateKorean = formatDateToKorean(detailsInput?.date ?? null);
  const dateDot = formatDateToDot(detailsInput?.date ?? null);

  /* [update] 스케줄 데이터 */
  const handlePostSchedule = async () => {
    if (confirm("일정을 업데이트 하시겠습니까?")) {
      updateSchedule.mutate(
        {
          id: detailsInput?.id ?? "",
          date: detailsInput?.dateStr ?? "",
          title: detailsInput?.title ?? "",
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

  console.log("test", detailsInput);

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
                {detailsInput?.props.category}
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
                <Label>메모</Label>
                <input
                  type="text"
                  value={detailsInput?.props?.memo}
                  className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
                  onChange={(e) =>
                    detailsInput &&
                    setDetailsInput({
                      ...detailsInput,
                      props: { memo: e.target.value },
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
                  <span className="text-gray-500 text-[0.8rem]">{dateDot}</span>
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
