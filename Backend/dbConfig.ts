import { config } from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig: config = {
    user: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
    server: process.env.DB_HOST || "",
    database: process.env.DB_NAME || "",
    port: parseInt(process.env.DB_PORT || "1433"),
    options: {
        encrypt: false, // Use this if you're on Windows Azure
        enableArithAbort: true,
    },
};

export default dbConfig;
