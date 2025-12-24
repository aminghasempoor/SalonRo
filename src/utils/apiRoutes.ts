export const api = process.env.NEXT_PUBLIC_API_URL;

// auth
export const POST_OTP = api + "/api/sms/otp";
export const POST_VERIFY_OTP_LOGIN_AND_SIGNUP = api + "/api/login/otp";
export const POST_USER_PASS_LOGIN = api + "/api/login/user-pass";
export const POST_LOGOUT = api + "/api/logout";
// auth

// user panel
export const GET_USER_ROUTE = api + "/api/client";
// user panel

export const GET_PROVINCES = api + "/provinces";
export const GET_CITIES = api + "/api/cities";
