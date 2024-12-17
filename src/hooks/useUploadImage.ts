import { useToast } from "@/components/toast/ToastProvider";
import { PostActivitiesImage } from "@/lib/api/Activities";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const useUploadImage = () => {
  const Toast = useToast();

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const res = await PostActivitiesImage(file);
      return res.activityImageUrl;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        Toast.error(error.message || "이미지 업로드 중 에러가 발생했습니다.");
      } else {
        Toast.error("이미지 업로드 중 에러가 발생했습니다.");
      }
    },
  });

  return mutation;
};

export default useUploadImage;
