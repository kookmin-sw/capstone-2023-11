const isProduction = process.env.NODE_ENV === "production";
export const DOMAIN = isProduction ? "https://capstone-2023-11.vercel.app" : "http://192.168.123.102:3000";
