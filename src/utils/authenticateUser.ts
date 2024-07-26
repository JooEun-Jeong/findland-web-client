import { JwtPayload, jwtDecode } from 'jwt-decode';

export const validateAuthorizedUser = (token: string | undefined) => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token as string);
    console.log(decodedToken);
    // console.log(decodedToken['realm_access']['roles']);
    // const roles = decodedToken.realm_access.roles;
    // if (roles.includes('default-roles-service-engineer')) {
    //   return true;
    // }
    return true;
  } catch (e) {
    return false;
  }
};
