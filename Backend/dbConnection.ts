import sql from "mssql";
import dbConfig from "./dbConfig";

class Database {
    private static pool: sql.ConnectionPool | null = null;

    private constructor() {}

    public static async query(query: string): Promise<sql.IResult<any>> {
        try {
            const pool = await this.getConnection();
            const result = await pool.query(query);
            return result;
        } catch (err) {
            console.error("Database query failed:", err);
            throw err;
        }
    }

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
