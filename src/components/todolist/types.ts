// 할 일 데이터 타입
export interface TodoDataType {
  date: Date;
  title: string;
  memo: string;
}

// client -> modal 전달 props
export interface AddTaskType {
  isAddTodo: boolean;
  setIsAddTodo: (payload: boolean) => void;
}
