import { Review } from "@/types/types";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const isImageValid = (url: string) => {
  return url && url.startsWith("http");
};

const CommentItem = ({ item }: { item: Review }) => {
  const { user, content, createdAt } = item;

  return (
    <div className="border-b-gary06 mb-6 flex items-center gap-4 border-b pb-6">
      {isImageValid(user.profileImageUrl) ? (
        <Image src={user.profileImageUrl} alt="프로필 사진" width={45} height={45} className="rounded-full" />
      ) : (
        <FaUserCircle className="text-gray-400" size={45} />
      )}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-[16px] font-bold text-black02">{user.nickname}</span>
          <span className="border-l border-l-black02 pl-2 text-xs text-gray06">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-[16px] text-black02">{content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
