import express, { Request, Response } from "express";
const router = express.Router();
import Database from "../dbConnection";

router.get("/", (req: Request, res: Response) => {
    const { limit, offset, start, end } = req.query;

    // Convert EPOCH seconds to SQL Server datetime format
    const startDate = start
        ? new Date(parseInt(start as string) * 1000).toISOString()
        : null;
    const endDate = end
        ? new Date(parseInt(end as string) * 1000).toISOString()
        : null;

    let query = `
    SELECT 
        s.OrderDate,
        s.Status, 
        s.AccountNumber, 
        s.TaxAmt, 
        s.TotalDue, 
        s.SubTotal, 
        s.AccountNumber, 
        p.BusinessEntityID as BusinessID, 
        p.FirstName, 
        p.MiddleName, 
        p.LastName 
    FROM 
        Sales.SalesOrderHeader s 
    JOIN 
        Sales.SalesPerson sp ON s.SalesPersonID = sp.BusinessEntityID
    JOIN 
        Person.Person p ON sp.BusinessEntityID = p.BusinessEntityID
    `;

    // Add condition for date range
    if (startDate && endDate) {
        query += ` WHERE s.OrderDate BETWEEN '${startDate}' AND '${endDate}'`;
    } else if (startDate) {
        query += ` WHERE s.OrderDate >= '${startDate}'`;
    } else if (endDate) {
        query += ` WHERE s.OrderDate <= '${endDate}'`;
    }

    // Add order and pagination
    if (limit && offset) {
        query += ` ORDER BY s.OrderDate DESC OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
    } else if (limit) {
        query += ` ORDER BY s.OrderDate DESC OFFSET 0 ROWS FETCH NEXT ${limit} ROWS ONLY;`;
    } else if (offset) {
        query += ` ORDER BY s.OrderDate DESC OFFSET ${offset} ROWS;`;
    } else {
        query += ` ORDER BY s.OrderDate DESC;`;
    }

    Database.query(query)
        .then((result) => {
            res.status(200).json(result.recordset);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to get Sales",
                error: err,
            });
        });
});

module.exports = router;
