type Activity = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

type ActivityListResponse = {
  cursorId: number;
  totalCount: number;
  activities: Activity[];
};

const mockData: ActivityListResponse = {
  cursorId: 1,
  totalCount: 3,
  activities: [
    {
      id: 1,
      userId: 101,
      title: "산악 등산 체험",
      description: "아름다운 산악 트레일을 따라가는 가이드 투어입니다.",
      category: "야외활동",
      price: 50000,
      address: "모험 도시, 123 산악 트레일",
      bannerImageUrl: "https://example.com/images/hiking.jpg",
      rating: 4.8,
      reviewCount: 120,
      createdAt: "2024-11-20T10:00:00.000Z",
      updatedAt: "2024-11-22T15:00:00.000Z",
    },
    {
      id: 2,
      userId: 102,
      title: "요리 교실: 이탈리아 요리",
      description: "전문 셰프와 함께하는 정통 이탈리아 요리 배우기.",
      category: "요리",
      price: 80000,
      address: "푸드 타운, 456 요리 거리",
      bannerImageUrl: "https://example.com/images/cooking.jpg",
      rating: 4.9,
      reviewCount: 95,
      createdAt: "2024-11-21T12:00:00.000Z",
      updatedAt: "2024-11-23T14:00:00.000Z",
    },
    {
      id: 3,
      userId: 103,
      title: "사진 촬영 워크숍",
      description: "전문가와 함께하는 실습형 사진 촬영 기술 익히기.",
      category: "워크숍",
      price: 100000,
      address: "셔터 도시, 789 스냅샷 거리",
      bannerImageUrl: "https://example.com/images/photography.jpg",
      rating: 4.7,
      reviewCount: 75,
      createdAt: "2024-11-22T09:00:00.000Z",
      updatedAt: "2024-11-24T16:00:00.000Z",
    },
  ],
};

export default mockData;
