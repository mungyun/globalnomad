import { useToast } from "@/components/toast/ToastProvider";
import { PostActivitiesImage } from "@/lib/api/Activities";
import { Message } from "@/utils/toastMessage";
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
        Toast.error(error.response?.data?.message);
      } else {
        Toast.error(Message.updateImageError);
      }
    },
  });

  return mutation;
};

export default useUploadImage;
