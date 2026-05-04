"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import type { Dispatch, SetStateAction } from "react";
import type { TodoDataType } from "./types";
import { IoAddCircle } from "react-icons/io5";

interface AddTaskType {
  todoData: TodoDataType[];
  setTodoData: Dispatch<SetStateAction<TodoDataType[]>>;
  isAddTodo: boolean;
  setIsAddTodo: (payload: boolean) => void;
}

const AddTaskModal = ({
  todoData,
  setTodoData,
  isAddTodo,
  setIsAddTodo,
}: AddTaskType) => {
  /* 할 일 추가 함수 */
  const handelChangeTask = (e: any) => {
    console.log("title", e.target.value);
    console.log("content", e.target.value);
  };

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
              type="text"
              className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
              placeholder="제목을 입력해주세요."
            />
          </Field>
          <Field>
            <Label htmlFor="title">부가 설명</Label>
            <input
              id="title"
              type="text"
              className="w-full border-b-1 py-1 px-2 text-[0.8rem]"
              placeholder="부가 설명을 입력해주세요."
            />
          </Field>
        </FieldGroup>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
