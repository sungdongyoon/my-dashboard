// 할 일 데이터 타입
export interface TodoDataType {
  title: string;
  memo: string;
}

// client -> modal 전달 props
export interface AddTaskType {
  todoDate: string;
  isAddTodo: boolean;
  setIsAddTodo: (payload: boolean) => void;
}
