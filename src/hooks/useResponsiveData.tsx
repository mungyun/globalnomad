import { mockData } from "@/app/(app)/components/mockdata";
import { ActivityItem } from "@/types/ActivityType";
import { useEffect, useState } from "react";
import useDeviceType from "./useDeviceType";

interface useResponsiveDataProps {
  ITEMS_PER_PAGE: { [key: string]: number };
  category?: string;
  keyword?: string;
  sort?: string;
}

interface UseResponsiveData {
  data: ActivityItem[];
  deviceType: "mobile" | "tablet" | "desktop";
  totalCount: number;
  page: number;
  setPage: (page: number) => void;
}

const useResponsiveData = ({
  ITEMS_PER_PAGE,
  category,
  keyword,
  sort = "latest",
}: useResponsiveDataProps): UseResponsiveData => {
  const [data, setData] = useState<ActivityItem[]>([]);
  const [filteredData, setFilteredData] = useState<ActivityItem[]>([]);
  const [sortedData, setSortedData] = useState<ActivityItem[]>([]);
  const [page, setPage] = useState(1);

  const deviceType = useDeviceType();
  const { activities } = mockData;

  useEffect(() => {
    let filtered = activities;
    if (keyword) {
      filtered = activities.filter((activity) => activity.title.includes(keyword));
    } else if (category) {
      filtered = activities.filter((activity) => activity.category === category);
    }
    setFilteredData(filtered); // 필터링된 데이터를 상태로 설정
  }, [activities, category, keyword]);

  useEffect(() => {
    let sorted = [...filteredData];
    switch (sort) {
      case "mostReviewed":
        sorted = [...filteredData].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "priceAsc":
        sorted = [...filteredData].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sorted = [...filteredData].sort((a, b) => b.price - a.price);
        break;
      case "latest":
        sorted = [...filteredData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    setSortedData(sorted); // 정렬된 데이터를 상태로 설정
  }, [filteredData, sort]);

  useEffect(() => {
    setPage(1);
  }, [activities, category, keyword, sort, deviceType]);

  useEffect(() => {
    const loadData = () => {
      const itemsPerPage = ITEMS_PER_PAGE[deviceType];
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

      const slicedData = sortedData.slice(startIndex, endIndex);

      setData(slicedData);
    };

    loadData();
  }, [deviceType, page, sortedData, filteredData.length]);

  const totalCount = filteredData.length;

  return { data, deviceType, totalCount, page, setPage };
};

export default useResponsiveData;
