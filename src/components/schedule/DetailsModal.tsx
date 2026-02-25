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
import { IoAddCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { apiDeleteScheduleData, apiUpdateScheduleData } from "@/src/api/utils";

interface DetailsModalType {
  className?: string;
  triggerVisible?: boolean;
  isDetailsModal?: boolean;
  setIsDetailsModal?: (payload: boolean) => void;
  detailsData: {
    id: string;
    date: string;
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
  };
  date: string;
}

const DetailsModal = ({
  className,
  triggerVisible = true,
  isDetailsModal,
  setIsDetailsModal,
  detailsData,
}: DetailsModalType) => {
  // 트리거 hidden or visible
  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden;

  // 라우터
  const router = useRouter();

  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 일정 업데이트
  const [detailsInput, setDetailsInput] = useState<DetailsInputType | null>(
    detailsData,
  ); // 일정 상세 정보

  // update 스케줄 데이터
  const handlePostSchedule = async () => {
    if (confirm("일정을 업데이트 하시겠습니까?")) {
      try {
        await apiUpdateScheduleData({
          id: detailsInput?.id ?? "",
          date: detailsInput?.date ?? "",
          title: detailsInput?.title ?? "",
          memo: detailsInput?.props.memo ?? "",
        });

        alert("일정이 변경되었습니다.");

        setIsUpdate(false);
        setIsDetailsModal?.(false);
        router.refresh();
      } catch (error) {
        console.error("일정 업데이트 실패", error);
      }
    }
  };

  // delete 스케줄 데이터
  const handleDeleteSchedule = async () => {
    if (confirm("일정을 삭제하시겠습니까?")) {
      await apiDeleteScheduleData({
        id: detailsInput?.id ?? "",
      });

      alert("일정이 삭제되었습니다.");
      setIsDetailsModal?.(false);
      router.refresh();
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
          <div className="flex items-center justify-between">
            {isUpdate === false ? (
              <DialogTitle>{detailsInput?.title}</DialogTitle>
            ) : (
              <Input
                type="text"
                value={detailsInput?.title}
                onChange={(e) =>
                  detailsInput &&
                  setDetailsInput({ ...detailsInput, title: e.target.value })
                }
                placeholder="제목을 입력해주세요."
              />
            )}
          </div>
        </DialogHeader>
        <div>{detailsInput?.date}</div>
        {isUpdate === false ? (
          <div>{detailsInput?.props?.memo}</div>
        ) : (
          <Input
            type="text"
            value={detailsInput?.props?.memo}
            onChange={(e) =>
              detailsInput &&
              setDetailsInput({
                ...detailsInput,
                props: { memo: e.target.value },
              })
            }
            placeholder="제목을 입력해주세요."
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          {isUpdate === false ? (
            <>
              <Button onClick={() => setIsUpdate(true)}>수정</Button>
              <Button variant="destructive" onClick={handleDeleteSchedule}>
                삭제
              </Button>
            </>
          ) : (
            <Button onClick={handlePostSchedule}>저장</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
