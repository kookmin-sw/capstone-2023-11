const isProduction = process.env.NODE_ENV === "production";
export const DOMAIN = isProduction ? "미정" : "http://localhost:3000";
