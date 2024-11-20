import { parseCookies } from 'nookies';

export async function getClientUserLogged(){
  const cookies = parseCookies();
  const userCookie = cookies['acl1'];
  if (userCookie){
    const userData = JSON.parse(userCookie);
    return userData;
  }
  return null;
}
