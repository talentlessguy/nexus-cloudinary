import * as dotenv from '@tinyhttp/dotenv'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

export type Context = {
  cloudinary: typeof cloudinary
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

export const context = {
  cloudinary
}
