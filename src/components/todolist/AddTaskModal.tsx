"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import type { TodoDataType, AddTaskType } from "./types";
import { Button } from "../ui/button";
import { usePostTodoList } from "@/src/hooks/mutations/useTodoListMutation";
import { useRouter } from "next/navigation";

const AddTaskModal = ({ isAddTodo, setIsAddTodo }: AddTaskType) => {
  /* hooks */
  const [todoValue, setTodoValue] = useState<TodoDataType>({
    date: new Date(),
    title: "",
    memo: "",
  }); // todo 바구니
  const router = useRouter();

  /* 커스텀 훅 */
  const postTodoList = usePostTodoList();

  /* 할 일 추가 함수 */
  const handelChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTodoValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* [post] 할 일 데이터 */
  const handlePostTodoList = async () => {
    if (!todoValue.title) {
      alert("할 일을 입력해주세요!");
      return;
    }

    postTodoList.mutate(
      {
        title: todoValue.title,
        memo: todoValue.memo,
      },
      {
        onSuccess: () => {
          alert("할 일이 추가되었습니다!");
          setTodoValue({ date: new Date(), title: "", memo: "" });
          setIsAddTodo(false);
          router.refresh();
        },
      },
    );
  };

  /* [post] 스케줄 데이터 */
  //  const handlePostSchedule = async () => {
  //   if (!scheduleData.title) {
  //     alert("할 일을 입력해주세요!");
  //     return;
  //   } else if (!scheduleData.cateogryId) {
  //     alert("카테고리를 선택해주세요!");
  //     return;
  //   }

  //   postSchedule.mutate(
  //     {
  //       start: scheduleData.start,
  //       end: scheduleData.end,
  //       title: scheduleData.title,
  //       memo: scheduleData.memo ?? "",
  //       categoryId: scheduleData.cateogryId,
  //       categoryName: scheduleData.categoryName,
  //     },
  //     {
  //       onSuccess: () => {
  //         alert("일정이 등록되었습니다!");
  //         setIsAddModal?.(false);
  //         router.refresh();
  //       },
  //     },
  //   );
  // };

  console.log("value", todoValue);

  return (
    <Dialog open={isAddTodo} onOpenChange={(open) => setIsAddTodo(open)}>
      {/* <DialogTrigger>
        <IoAddCircle size={20} />
      </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>할 일을 작성해주세요</DialogTitle>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="title">제목</Label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
              placeholder="제목을 입력해주세요."
              value={todoValue.title}
              onChange={handelChangeTask}
            />
          </Field>
          <Field>
            <Label htmlFor="memo">메모</Label>
            <input
              id="memo"
              name="memo"
              type="text"
              className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
              placeholder="메모를 입력해주세요."
              value={todoValue.memo}
              onChange={handelChangeTask}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
          <Button type="submit" onClick={handlePostTodoList}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
