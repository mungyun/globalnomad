import { GetActivities } from "@/types/ActivityType";

export const mockData: GetActivities = {
  cursorId: 10,
  totalCount: 21,
  activities: [
    {
      id: 1,
      userId: 101,
      title: "함께 배우는 스트릿 댄스",
      description: "스트릿 댄스의 기본기를 배우고 다양한 동작을 익힐 수 있는 워크숍",
      category: "문화 · 예술",
      price: 38000,
      address: "서울시 마포구 홍익로 10",
      bannerImageUrl: "https://example.com/street-dance.jpg",
      rating: 4.8,
      reviewCount: 15,
      createdAt: "2024-11-01T10:00:00.000Z",
      updatedAt: "2024-11-20T12:00:00.000Z",
    },
    {
      id: 2,
      userId: 102,
      title: "홈메이드 피자 만들기",
      description: "피자 반죽부터 토핑까지 나만의 피자를 만들어보는 시간",
      category: "식음료",
      price: 25000,
      address: "부산시 해운대구 센텀중앙로 55",
      bannerImageUrl: "https://example.com/pizza-making.jpg",
      rating: 4.5,
      reviewCount: 8,
      createdAt: "2024-11-05T11:00:00.000Z",
      updatedAt: "2024-11-20T13:00:00.000Z",
    },
    {
      id: 3,
      userId: 103,
      title: "산악 트레킹과 야생화 탐방",
      description: "전문 가이드와 함께하는 산악 트레킹과 자연 탐험",
      category: "투어 · 관광",
      price: 45000,
      address: "경기도 가평군 설악면 어비산로 23",
      bannerImageUrl: "https://example.com/trekking.jpg",
      rating: 4.7,
      reviewCount: 20,
      createdAt: "2024-11-10T09:30:00.000Z",
      updatedAt: "2024-11-21T15:00:00.000Z",
    },
    {
      id: 4,
      userId: 104,
      title: "테니스 초보자 클래스",
      description: "테니스 기본 자세와 기술을 배울 수 있는 초보자 워크숍",
      category: "스포츠",
      price: 32000,
      address: "서울시 송파구 잠실로 25",
      bannerImageUrl: "https://example.com/tennis-class.jpg",
      rating: 4.6,
      reviewCount: 12,
      createdAt: "2024-11-12T08:00:00.000Z",
      updatedAt: "2024-11-22T11:00:00.000Z",
    },
    {
      id: 5,
      userId: 105,
      title: "아크릴화 그리기 클래스",
      description: "나만의 창의성을 표현할 수 있는 아크릴화 클래스",
      category: "문화 · 예술",
      price: 27000,
      address: "서울시 종로구 인사동 30",
      bannerImageUrl: "https://example.com/acrylic-art.jpg",
      rating: 4.9,
      reviewCount: 25,
      createdAt: "2024-11-15T14:00:00.000Z",
      updatedAt: "2024-11-23T16:00:00.000Z",
    },
    {
      id: 6,
      userId: 106,
      title: "보드게임 마스터하기",
      description: "다양한 전략 보드게임을 배우고 즐길 수 있는 취미 클래스",
      category: "게임 · 취미",
      price: 20000,
      address: "대전시 유성구 은행동 42",
      bannerImageUrl: "https://example.com/boardgame.jpg",
      rating: 4.2,
      reviewCount: 10,
      createdAt: "2024-11-18T13:00:00.000Z",
      updatedAt: "2024-11-24T18:00:00.000Z",
    },
    {
      id: 7,
      userId: 107,
      title: "바리스타 원데이 클래스",
      description: "핸드 드립부터 라떼 아트까지 바리스타 체험",
      category: "식음료",
      price: 30000,
      address: "인천시 남구 학익동 35",
      bannerImageUrl: "https://example.com/barista-class.jpg",
      rating: 4.7,
      reviewCount: 18,
      createdAt: "2024-11-19T15:00:00.000Z",
      updatedAt: "2024-11-25T14:00:00.000Z",
    },
    {
      id: 8,
      userId: 108,
      title: "캠핑 요리와 별 관찰",
      description: "캠핑장에서 요리하고 별을 관찰하는 자연 체험",
      category: "투어 · 관광",
      price: 50000,
      address: "강원도 평창군 대관령면 47",
      bannerImageUrl: "https://example.com/camping.jpg",
      rating: 5.0,
      reviewCount: 30,
      createdAt: "2024-11-20T17:00:00.000Z",
      updatedAt: "2024-11-25T19:00:00.000Z",
    },
    {
      id: 9,
      userId: 109,
      title: "드론 비행 체험",
      description: "드론 조종법과 기본 촬영 기술을 배우는 체험",
      category: "교육 · 학습",
      price: 35000,
      address: "대구시 수성구 범어로 18",
      bannerImageUrl: "https://example.com/drone.jpg",
      rating: 4.4,
      reviewCount: 14,
      createdAt: "2024-11-21T10:00:00.000Z",
      updatedAt: "2024-11-25T15:00:00.000Z",
    },
    {
      id: 10,
      userId: 110,
      title: "요가로 하루 시작하기",
      description: "기초 요가 동작과 스트레칭으로 몸과 마음을 리프레시하세요.",
      category: "스포츠",
      price: 18000,
      address: "서울시 서초구 반포대로 45",
      bannerImageUrl: "https://example.com/yoga.jpg",
      rating: 4.9,
      reviewCount: 22,
      createdAt: "2024-11-22T08:00:00.000Z",
      updatedAt: "2024-11-25T20:00:00.000Z",
    },
    {
      id: 11,
      userId: 111,
      title: "전통 한지 공예 배우기",
      description: "한지로 나만의 공예품을 만들어보는 체험 클래스",
      category: "문화 · 예술",
      price: 29000,
      address: "서울시 종로구 삼청동 25",
      bannerImageUrl: "https://example.com/hanji-craft.jpg",
      rating: 4.8,
      reviewCount: 12,
      createdAt: "2024-11-15T09:00:00.000Z",
      updatedAt: "2024-11-20T14:00:00.000Z",
    },
    {
      id: 12,
      userId: 112,
      title: "바디 체커와 함께하는 헬스 클래스",
      description: "체성분 분석과 함께 개인 맞춤 운동 프로그램 제공",
      category: "스포츠",
      price: 45000,
      address: "서울시 강남구 역삼로 10",
      bannerImageUrl: "https://example.com/fitness-class.jpg",
      rating: 4.7,
      reviewCount: 19,
      createdAt: "2024-11-12T08:30:00.000Z",
      updatedAt: "2024-11-22T10:30:00.000Z",
    },
    {
      id: 13,
      userId: 113,
      title: "초콜릿 공방 투어 및 만들기",
      description: "공방 투어와 함께 나만의 초콜릿을 만드는 즐거움",
      category: "식음료",
      price: 32000,
      address: "제주시 연동 45",
      bannerImageUrl: "https://example.com/chocolate-workshop.jpg",
      rating: 4.9,
      reviewCount: 15,
      createdAt: "2024-11-18T11:00:00.000Z",
      updatedAt: "2024-11-22T14:00:00.000Z",
    },
    {
      id: 14,
      userId: 114,
      title: "인문학 북클럽",
      description: "전문 강사와 함께하는 인문학 서적 토론과 공유",
      category: "교육 · 학습",
      price: 20000,
      address: "서울시 관악구 신림로 32",
      bannerImageUrl: "https://example.com/book-club.jpg",
      rating: 4.6,
      reviewCount: 8,
      createdAt: "2024-11-10T15:00:00.000Z",
      updatedAt: "2024-11-20T12:00:00.000Z",
    },
    {
      id: 15,
      userId: 115,
      title: "서울 야경 투어",
      description: "가이드와 함께 즐기는 서울의 아름다운 야경 투어",
      category: "투어 · 관광",
      price: 30000,
      address: "서울시 중구 을지로 30",
      bannerImageUrl: "https://example.com/seoul-night-tour.jpg",
      rating: 4.8,
      reviewCount: 22,
      createdAt: "2024-11-14T20:00:00.000Z",
      updatedAt: "2024-11-23T18:00:00.000Z",
    },
    {
      id: 16,
      userId: 116,
      title: "일일 바텐더 체험",
      description: "칵테일 제조법을 배우고 나만의 음료를 만들어보는 클래스",
      category: "식음료",
      price: 40000,
      address: "부산시 해운대구 우동 20",
      bannerImageUrl: "https://example.com/bartender-experience.jpg",
      rating: 4.7,
      reviewCount: 13,
      createdAt: "2024-11-17T19:00:00.000Z",
      updatedAt: "2024-11-24T21:00:00.000Z",
    },
    {
      id: 17,
      userId: 117,
      title: "전문가와 함께하는 별자리 관찰",
      description: "천문학 전문가와 함께 별자리와 천체를 관찰하는 시간",
      category: "투어 · 관광",
      price: 28000,
      address: "강원도 춘천시 별천지로 33",
      bannerImageUrl: "https://example.com/stargazing.jpg",
      rating: 5.0,
      reviewCount: 18,
      createdAt: "2024-11-13T22:00:00.000Z",
      updatedAt: "2024-11-24T23:00:00.000Z",
    },
    {
      id: 18,
      userId: 118,
      title: "보드게임 전략 분석 클래스",
      description: "전문 강사와 함께 다양한 보드게임의 전략을 분석해보는 시간",
      category: "게임 · 취미",
      price: 18000,
      address: "서울시 서대문구 연희로 45",
      bannerImageUrl: "https://example.com/boardgame-strategy.jpg",
      rating: 4.5,
      reviewCount: 10,
      createdAt: "2024-11-14T10:00:00.000Z",
      updatedAt: "2024-11-25T14:00:00.000Z",
    },
    {
      id: 19,
      userId: 119,
      title: "전통 도예 체험",
      description: "도예 강사의 지도 아래 나만의 도자기를 만들어보는 클래스",
      category: "문화 · 예술",
      price: 36000,
      address: "경기도 이천시 도자기로 15",
      bannerImageUrl: "https://example.com/pottery.jpg",
      rating: 4.9,
      reviewCount: 20,
      createdAt: "2024-11-16T09:30:00.000Z",
      updatedAt: "2024-11-25T17:30:00.000Z",
    },
    {
      id: 20,
      userId: 120,
      title: "수제 초콜릿과 커피 페어링 클래스",
      description: "초콜릿 전문가와 함께 커피와의 완벽한 조화를 찾아보는 시간",
      category: "식음료",
      price: 42000,
      address: "서울시 강동구 천호대로 60",
      bannerImageUrl: "https://example.com/chocolate-coffee.jpg",
      rating: 4.8,
      reviewCount: 16,
      createdAt: "2024-11-15T14:00:00.000Z",
      updatedAt: "2024-11-26T11:00:00.000Z",
    },
    {
      id: 21,
      userId: 121,
      title: "초보자를 위한 스케이트보드 강습",
      description: "기본 자세와 기술을 배우고 트릭도 시도해보는 기회",
      category: "스포츠",
      price: 20000,
      address: "서울시 마포구 연남동 30",
      bannerImageUrl: "https://example.com/skateboard.jpg",
      rating: 4.3,
      reviewCount: 9,
      createdAt: "2024-11-19T11:00:00.000Z",
      updatedAt: "2024-11-25T15:00:00.000Z",
    },
  ],
};
