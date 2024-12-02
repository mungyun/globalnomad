const getJosa = (word: string) => {
  if (!word) return "";
  const lastChar = word.slice(-1);
  const hasJongseong = (lastChar.charCodeAt(0) - 44032) % 28 !== 0;
  return hasJongseong ? "으로" : "로";
};
export default getJosa;
