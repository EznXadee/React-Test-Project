import express, { Request, Response } from "express";
const router = express.Router();
import Database from "../dbConnection";

router.get("/", (req: Request, res: Response) => {
    const { limit, offset } = req.query;

    let query = `
        USE AdventureWorks2022;
        SELECT FirstName, MiddleName, LastName, JobTitle, HireDate, de.Name as Department, 
               BirthDate, AddressLine1, AddressLine2, City, PostalCode, EmailAddress, 
               PhoneNumber, sp.Name as State 
        FROM Person.Person p 
        LEFT JOIN Person.PersonPhone pp ON pp.BusinessEntityID = p.BusinessEntityID 
        LEFT JOIN Person.EmailAddress e ON e.BusinessEntityID = p.BusinessEntityID 
        LEFT JOIN Person.BusinessEntityAddress a ON p.BusinessEntityID = a.BusinessEntityID 
        LEFT JOIN Person.Address k ON k.AddressID = a.AddressID 
        JOIN HumanResources.Employee h ON p.BusinessEntityID = h.BusinessEntityID 
        LEFT JOIN HumanResources.EmployeeDepartmentHistory d ON d.BusinessEntityID = p.BusinessEntityID 
        LEFT JOIN HumanResources.Department de ON de.DepartmentID = d.DepartmentID 
        LEFT JOIN Person.StateProvince sp ON sp.StateProvinceID = k.StateProvinceID
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
                message: "Failed to get employees",
                error: err,
            });
        });
});

module.exports = router;
