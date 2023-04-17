const isProduction = process.env.NODE_ENV === "production";
export const DOMAIN = isProduction ? "https://capstone-2023-11.vercel.app" : "http://localhost:3000";
