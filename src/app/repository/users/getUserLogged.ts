"use server"
import { cookies } from 'next/headers'

export async function getUserLogged(){
  const cookieStore = cookies()
  const userCookie = cookieStore.get('acl1')?.value;
  if (userCookie){
    const userData = JSON.parse(userCookie);
    return userData;
  }
  return null;
}