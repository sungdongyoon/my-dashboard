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

const TodoListClient = () => {
  /* hooks */
  const [todoData, setTodoData] = useState<TodoDataType[]>([]); // 할 일 데이터
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false); // 할 일 추가 모달 활성화

  /* Add Task 활성화 함수 */
  const handleClickShowAddTask = () => {};

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
        <Badge className="bg-orange-300 text-orange-50">2026-04-27</Badge>
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
        <Button size="sm" variant="outline">
          Date
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {todoData ? (
          todoLoading ? (
            <Loading />
          ) : (
            todoDatas.map(
              (
                el: { title: string; content: string; status: string },
                idx: number,
              ) => (
                <FieldLabel key={`${el.title}-${idx}`}>
                  <Field orientation="horizontal">
                    <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                    <FieldContent>
                      <FieldTitle>{el.title}</FieldTitle>
                      <FieldDescription>{el.content}</FieldDescription>
                      <Badge>{el.status}</Badge>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              ),
            )
          )
        ) : (
          <span className="font-semibold ">오늘 할 일 없음!</span>
        )}
      </div>

      <AddTaskModal
        todoData={todoData}
        setTodoData={setTodoData}
        isAddTodo={isAddTodo}
        setIsAddTodo={setIsAddTodo}
      />
    </div>
  );
};

export default TodoListClient;
