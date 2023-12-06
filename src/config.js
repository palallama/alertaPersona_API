import {config} from "dotenv";
config();

export const PORT = process.env.PORT || '3000';

export const DB_HOST = process.env.DB_HOST || '';
export const DB_PORT = process.env.DB_PORT || '';
export const DB_DATABASE = process.env.DB_DATABASE || '';
export const DB_USER = process.env.DB_USER || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';

export const TOKEN_SECRET = process.env.TOKEN_SECRET || '';

export const MAIL_USER = process.env.MAIL_USER || '';
export const MAIL_PASS = process.env.MAIL_PASS || '';