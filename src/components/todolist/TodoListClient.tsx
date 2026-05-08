"use client";

import React, { useState } from "react";
import { TodoDataType } from "./types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { Checkbox } from "../ui/checkbox";
import AddTaskModal from "./AddTaskModal";
import { Badge } from "../ui/badge";
import Loading from "../Loading";
import { IoClose } from "react-icons/io5";
import { useDeleteTodoList } from "@/src/hooks/mutations/useTodoListMutation";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const TodoListClient = ({ todoData }: { todoData: any }) => {
  const date = new Date();
  /* hooks */
  const [todoDate, setTodoData] = useState<string>(format(date, "yyyy-MM-dd"));
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false); // 할 일 추가 모달 활성화
  const router = useRouter();

  /* 커스텀 훅 */
  const deleteTodoList = useDeleteTodoList();

  /* [delete] 할 일 삭제 함수 */
  const handleDeleteTodo = (id: string) => {
    if (confirm("할 일을 삭제하시겠습니까?")) {
      deleteTodoList.mutate(
        { todoId: id },
        {
          onSuccess: () => {
            alert("할 일이 삭제되었습니다!");
            router.refresh();
          },
        },
      );
    }
  };

  /* 할 일 데이터 */
  const {
    data: todoDatas,
    isLoading: todoLoading,
    error: todoError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: () => axios.get("/todoMock.json").then((res) => res.data),
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="">
        <h1 className="text-[2rem]">To Do</h1>
        <Badge className="bg-orange-300 text-orange-50">{todoDate}</Badge>
      </div>

      <div className="border-t w-full h-[1px]"></div>

      <div className="flex gap-3">
        <Button
          size="sm"
          className="bg-blue-700 text-blue-50"
          onClick={() => setIsAddTodo(true)}
        >
          New Task
        </Button>
        <Button size="sm" variant="outline">
          Filters
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline">
              Date
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 flex flex-row" align="start">
            <Calendar
              mode="single"
              selected={new Date(todoDate)}
              defaultMonth={new Date(todoDate)}
              onSelect={(selected) => {
                if (!selected) return;
                const formated = format(selected, "yyyy-MM-dd");
                setTodoData(formated);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-3">
        {todoData ? (
          todoData.map(
            (
              el: {
                todoId: string;
                title: string;
                memo: string;
              },
              idx: number,
            ) => (
              <FieldLabel key={`${el.title}-${idx}`} className="cursor-pointer">
                <Field orientation="horizontal">
                  <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                  <FieldContent>
                    <FieldTitle>{el.title}</FieldTitle>
                    <FieldDescription>{el.memo}</FieldDescription>
                  </FieldContent>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => handleDeleteTodo(el.todoId)}
                  >
                    <IoClose />
                  </Button>
                </Field>
              </FieldLabel>
            ),
          )
        ) : (
          <span className="font-semibold ">오늘 할 일 없음!</span>
        )}
      </div>

      <AddTaskModal
        isAddTodo={isAddTodo}
        setIsAddTodo={setIsAddTodo}
        todoDate={todoDate}
      />
    </div>
  );
};

export default TodoListClient;
