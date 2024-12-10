import { Signup } from "@/zodSchema/authSchema";

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: number;
  updatedAt: number;
}

export interface UpdateUser {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
}

export type InputField = {
  label: string;
  name: keyof Signup;
  type: string;
  placeholder: string;
  readOnly?: boolean;
};

export type ProfileUpdateData = {
  nickname: string;
  profileImageUrl: string;
  newPassword: string;
};
