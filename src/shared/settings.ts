import dotenv from "dotenv"
dotenv.config()

export const settings = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
}
