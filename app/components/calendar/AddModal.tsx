import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import React, { Fragment } from "react";
import { IoAddCircle, IoCloseCircle } from "react-icons/io5";

interface AddModalType {
  className?: string;
  date: Date | null;
  triggerVisible?: boolean;
  isModal?: boolean;
  setIsModal?: (payload: boolean) => void;
}

const AddModal = ({
  className,
  date,
  triggerVisible = true,
  isModal,
  setIsModal,
}: AddModalType) => {
  // 트리거 hidden or visible
  const TriggerWrapper = triggerVisible ? Fragment : VisuallyHidden;

  // 날짜 변환
  const dateStr = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : null;
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
            <DialogClose className="cursor-pointer">
              <IoCloseCircle size={20} />
            </DialogClose>
          </div>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
