import express, { Request, Response } from "express";
const router = express.Router();
import Database from "../dbConnection";

router.get("/", (req: Request, res: Response) => {
    const { limit, offset } = req.query;

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

    if (limit && offset) {
        query += ` ORDER BY p.BusinessEntityID OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;`;
    } else if (limit) {
        query += ` ORDER BY p.BusinessEntityID OFFSET 0 ROWS FETCH NEXT ${limit} ROWS ONLY;`;
    } else if (offset) {
        query += ` ORDER BY p.BusinessEntityID OFFSET ${offset} ROWS;`;
    } else {
        query += ` ORDER BY p.BusinessEntityID;`;
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
