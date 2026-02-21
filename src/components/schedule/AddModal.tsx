"use client";

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
import { useScheduleStore } from "@/src/store/scheduleStore";
import { createClient } from "@/src/utils/supabase/client";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import React, { Fragment, useState } from "react";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

interface AddModalType {
  className?: string;
  date: Date | null;
  triggerVisible?: boolean;
  isModal?: boolean;
  setIsModal?: (payload: boolean) => void;
}

interface ScheduleType {
  // id: string;
  date: string | null;
  title: string;
  memo?: string;
}

const AddModal = ({
  className,
  date,
  triggerVisible = true,
  isModal,
  setIsModal,
}: AddModalType) => {
  // 날짜 변환
  const dateStr = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : null;

  // 트리거 hidden or visible
  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden;

  // supbase
  const supabaseClient = createClient();

  // 라우터
  const router = useRouter();

  const [scheduleData, setScheduleData] = useState<ScheduleType>({
    date: dateStr,
    title: "",
    memo: "",
  });
  // const { scheduleData, setScheduleData, resetScheduleData } =
  //   useScheduleStore();

  // post 스케줄 데이터
  const handlePostSchedule = async (e: any) => {
    e.preventDefault();

    await supabaseClient.from("schedules").insert([
      {
        date: scheduleData.date,
        title: scheduleData.title,
        memo: scheduleData.memo,
      },
    ]);

    alert("일정이 등록되었습니다!");
    setIsModal?.(false);
    router.refresh();
  };

  // console.log("data", scheduleData);

  return (
    <Dialog open={isModal} onOpenChange={(open) => setIsModal?.(open)}>
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handlePostSchedule}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
