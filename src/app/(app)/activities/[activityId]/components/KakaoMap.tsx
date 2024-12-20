"use client";

import { useToast } from "@/components/toast/ToastProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  address: string;
}

const KakaoMap = ({ address }: KakaoMapProps) => {
  const [coordinates, setCoordinates] = useState({ lat: 33.450701, lng: 126.570667 });
  const Toast = useToast();

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];
        setCoordinates({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        Toast.error("지도를 불러오던 중, 오류가 발생했습니다.");
      }
    });
  }, [address]);

  return (
    <>
      <div className="relative z-0 h-[482px] w-full md:h-[276px] xl:h-[450px]">
        <Map center={coordinates} style={{ width: "100%", height: "100%" }} level={3}>
          <MapMarker position={coordinates}></MapMarker>
        </Map>
      </div>
      <div className="mt-2 flex h-[18px] items-center">
        <Image src="/icons/location.svg" alt="주소" width={18} height={18} />
        <p className="text-[14px] text-black02">{address}</p>
      </div>
    </>
  );
};

export default KakaoMap;
