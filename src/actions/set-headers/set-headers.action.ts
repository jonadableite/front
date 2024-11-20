"use server"
import { cookies } from "next/headers";
import api from "@/services/api";
export async function setHeaders() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("acl0")?.value;
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        api.defaults.headers.ApplicationName = 'web';
        return token;
    }
    return null;
  } catch (error) {
    return null;
  }
}