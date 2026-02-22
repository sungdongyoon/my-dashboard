"use client";

import React, { Fragment } from "react";
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

interface DetailsModalType {
  className?: string;
  triggerVisible?: boolean;
  isDetailsModal?: boolean;
  setIsDetailsModal?: (payload: boolean) => void;
  data: {
    id: string;
    date: string;
    title: string;
    props: {};
  } | null;
}

const DetailsModal = ({
  className,
  triggerVisible = true,
  isDetailsModal,
  setIsDetailsModal,
  data,
}: DetailsModalType) => {
  // 트리거 hidden or visible
  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden;
  console.log("data", data);

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
            <DialogTitle>{data?.date}</DialogTitle>
          </div>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              name="title"
              placeholder="할 일을 입력해주세요."
              // value={scheduleData?.title}
              // onChange={(e) =>
              //   setScheduleData({ ...scheduleData, title: e.target.value })
              // }
            />
          </Field>
          <Field>
            <Label htmlFor="memo">메모</Label>
            <Textarea
              id="memo"
              name="memo"
              // value={scheduleData?.memo}
              // onChange={(e) =>
              //   setScheduleData({ ...scheduleData, memo: e.target.value })
              // }
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
