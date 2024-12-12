// 숫자에 컴마(,) 넣어주는 함수
export const formatWithCommas = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 숫자에 컴마(,) 제거하는 함수
export const removeCommas = (value: string) => {
  return value.replace(/,/g, "");
};
