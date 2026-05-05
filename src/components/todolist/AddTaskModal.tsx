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

const AddTaskModal = ({ isAddTodo, setIsAddTodo }: AddTaskType) => {
  /* hooks */
  const [todoValue, setTodoValue] = useState<TodoDataType>({
    date: new Date(),
    title: "",
    memo: "",
  }); // todo 바구니

  /* 할 일 추가 함수 */
  const handelChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTodoValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          <Button type="submit">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
