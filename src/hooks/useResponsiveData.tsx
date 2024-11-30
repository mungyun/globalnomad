import { mockData } from "@/app/(app)/components/mockdata";
import { ActivityItem } from "@/types/types";
import { useEffect, useState } from "react";
import useDeviceType from "./useDeviceType";

interface useResponsiveDataProps {
  pageSize: { [key: string]: number };
  category?: string;
  keyword?: string | undefined;
  sort?: "mostReviewed" | "priceAsc" | "priceDesc" | "latest";
}

interface UseResponsiveData {
  data: ActivityItem[];
  prevPage: () => void;
  nextPage: () => void;
  deviceType: "mobile" | "tablet" | "desktop";
  page: number;
  cursor: number | null;
}

const useResponsiveData = ({
  pageSize,
  category = "",
  keyword = "",
  sort = "latest",
}: useResponsiveDataProps): UseResponsiveData => {
  const [data, setData] = useState<ActivityItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [cursor, setCursor] = useState<number | null>(0);

  const deviceType = useDeviceType();
  const { totalCount, activities } = mockData;

  let filteredData: ActivityItem[];
  if (keyword) {
    filteredData = activities.filter((activity) => activity.title.includes(keyword));
    category = "";
  } else if (category) {
    filteredData = activities.filter((activity) => activity.category === category);
  } else {
    filteredData = activities;
  }

  let sortedData: ActivityItem[];
  switch (sort) {
    case "mostReviewed":
      sortedData = filteredData.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "priceAsc":
      sortedData = filteredData.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      sortedData = filteredData.sort((a, b) => b.price - a.price);
      break;
    case "latest":
      sortedData = filteredData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  const loadData = () => {
    const itemsPerPage = pageSize[deviceType];
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalCount - 1);

    const newItems = sortedData.slice(startIndex, endIndex);

    setData((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const filteredItems = newItems.filter((item) => !existingIds.has(item.id));
      return [...prev, ...filteredItems];
    });
  };

  const prevPage = () => {
    if (page !== 1) setPage((prev) => prev - 1);
  };

  const nextPage = () => {
    if (cursor !== null) setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (totalCount <= data.length) {
      setCursor(null);
    }
  }, [data]);

  useEffect(() => {
    loadData();
  }, [page, deviceType]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setCursor(0);
    loadData();
  }, [category, sort]);

  return { data, prevPage, nextPage, deviceType, page, cursor };
};

export default useResponsiveData;
