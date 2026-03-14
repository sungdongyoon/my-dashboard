// 날짜 변환 함수 - 'yyyy-MM-DD'
export const formatDateToISO = (date: Date | null) => {
  return date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    : "";
};

// 날짜 변환 함수 - 'yyyy년 MM월 DD일'
export const formatDateToKorean = (date: Date | null) => {
  return date
    ? `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, "0")}월 ${String(date.getDate()).padStart(2, "0")}일`
    : "";
};

// 날짜 변환 함수 - 'yyyy.MM.DD'
export const formatDateToDot = (date: Date | null) => {
  return date
    ? `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
    : "";
};
