import TodoListClient from "@/src/components/todolist/TodoListClient";
import { apiGetTodoListData } from "@/src/utils/todolist/utils";

const TodoList = async () => {
  const todoListData = await apiGetTodoListData(); // 카테고리 데이터

  console.log("hi", todoListData);
  return (
    <div className="w-full h-full">
      <TodoListClient todoData={todoListData} />
    </div>
  );
};

export default TodoList;
