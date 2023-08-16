
import { getLocalKey } from "./localstore";
export const loginRoute = '/login';
export const signupRoute = '/signup';

export const authCheck = () => {
    try {
        const token = getLocalKey('token');
        if(!token) {
            return;
        } else {
         return token;   
        }
    } catch (error) {
        console.error('Auth check error', error);
    }
}