const getTimeAgo = (createdAt: string) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  if (isNaN(createdTime.getTime())) {
    return "알 수 없음";
  }

  const differenceInMilliseconds = currentTime.getTime() - createdTime.getTime();

  const minutes = Math.floor(differenceInMilliseconds / (1000 * 60));
  const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
  const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};

export default getTimeAgo;
