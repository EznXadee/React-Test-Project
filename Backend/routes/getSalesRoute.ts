import express, { Request, Response } from "express";
import Database from "../dbConnection";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    //Return Database connection status
    Database.getConnection()
        .then(() => {
            res.status(200).json({ message: "Connected to MSSQL" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Database connection failed",
                error: err,
            });
        });
});

module.exports = router;
