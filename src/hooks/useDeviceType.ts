import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setDeviceType("desktop");
      } else if (width >= 768) {
        setDeviceType("tablet");
      } else {
        setDeviceType("mobile");
      }
    };

    // 초기 실행
    updateDeviceType();

    // 윈도우 크기 변경에 따라 업데이트
    window.addEventListener("resize", updateDeviceType);

    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;
