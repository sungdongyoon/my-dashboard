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
import { Field, FieldGroup } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { IoAddCircle } from "react-icons/io5";
import { createClient } from "@/src/utils/supabase/client";

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

  // supbase
  const supabaseClient = createClient();

  const [isUpdate, setIsUpdate] = useState<boolean>(false); // 일정 업데이트
  const [detailsInput, setDetailsInput] = useState<DetailsInputType | null>(
    detailsData,
  );

  // update 스케줄 데이터
  const handlePostSchedule = async (e: any) => {
    e.preventDefault();

    console.log("업데이트 시작");

    await supabaseClient
      .from("schedules")
      .update({
        date: detailsInput?.date,
        title: detailsInput?.title,
        memo: detailsInput?.props.memo,
      })
      .eq("id", detailsInput?.id);

    setIsUpdate(false);
  };

  console.log("detailsData", detailsInput);

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
            <Button type="submit" onClick={() => setIsUpdate(true)}>
              수정
            </Button>
          ) : (
            <Button type="submit" onClick={handlePostSchedule}>
              저장
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
