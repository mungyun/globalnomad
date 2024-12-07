import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const PostInput = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleComplete = (data) => {
    // 검색 결과에서 도로명 주소를 가져옵니다.
    setAddress(data.address);
    setIsPopupOpen(false); // 팝업 닫기
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <button onClick={togglePopup}>{isPopupOpen ? "닫기" : "주소 검색"}</button>

      {isPopupOpen && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "500px",
            zIndex: 100,
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}

      <div>
        <h3>선택한 주소:</h3>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default PostInput;
