import sql from "mssql";
import dbConfig from "./dbConfig";

class Database {
    private static pool: sql.ConnectionPool | null = null;

    private constructor() {}

    public static async getConnection(): Promise<sql.ConnectionPool> {
        if (this.pool) {
            return this.pool;
        }
        try {
            this.pool = await sql.connect(dbConfig);
            console.log("Connected to MSSQL");
            return this.pool;
        } catch (err) {
            console.error("Database connection failed:", err);
            throw err;
        }
    }
}

export default Database;
