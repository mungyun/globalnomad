import { z } from "zod";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD
const timeSchema = z.string().regex(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/); // HH:MM

// Schedule 스키마 예시 (예시로만 작성, 실제 스케줄 객체의 구조에 맞게 수정 필요)
const ScheduleSchema = z.object({
  date: dateSchema,
  startTime: timeSchema,
  endTime: timeSchema,
});

// PostActivityType의 Zod 스키마 정의
export const PostActivitySchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0, "Price must be a positive number"),
  address: z.string().min(1),
  bannerImageUrl: z.string().url(),
  subImageUrls: z.array(z.string().url()).min(1),
  schedules: z.array(ScheduleSchema).min(1),
});
