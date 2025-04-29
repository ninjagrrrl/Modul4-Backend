Tabelle Customers:

1. Zeige alle **Länder** an, die **mehr als fünf Kunden** haben
SELECT Country, COUNT(*) 
FROM Customers 
GROUP BY Country 
HAVING COUNT(*) > 5;

Tabelle Orders:

1. Zeige alle **Bestellungen** im **August 1996** an
SELECT * 
FROM Orders 
WHERE OrderDate LIKE '1996-08%';

-- ODER so

SELECT *
FROM Orders 
WHERE OrderDate BETWEEN '1996-08-01' AND '1996-08-31';


2. Zeige alle CustomerIds, die **mehr als eine Bestellung** getätigt haben
SELECT CustomerID
FROM Orders 
GROUP BY CustomerID
HAVING COUNT(*) > 1;


3. Zeige die **CustomerId** mit den **meisten Bestellungen** an
SELECT CustomerID, COUNT(*) AS OrderCount
FROM Orders
GROUP BY CustomerID
ORDER BY OrderCount DESC
LIMIT 1;
Bonus: Zeige direkt den Kundennamen an (nutze JOIN um zwei Tabellenabfragen zu verbinden)

Tabelle Products

1. Zeige alle Produkte an, die von der Firma “**Heli Süßwaren GmbH & Co. KG** ” **geliefert** werden
SELECT ProductName
FROM Products
JOIN Suppliers ON Products.SupplierID = Suppliers.SupplierID
WHERE SupplierName LIKE '%Heli%';
2. Zeige den **Durchschnittspreis** aller Produkte an
SELECT AVG(Price) FROM Products;
3. Zeige den **Höchstpreis** aller Produkte an
SELECT Max(Price) FROM Products;

Tabelle Suppliers

1. Zeige alle **Lieferanten** an, deren **Telefonnummer** **keine Klammern** () enthält
SELECT * FROM Suppliers WHERE Phone NOT like '%(%' AND Phone Not like '%)%';

2. Liste die **Länder** mit der **Anzahl der Lieferanten** auf, **sortiert** nach der **Anzahl** der Lieferanten in **absteigender** Reihenfolge und bei gleicher Anzahl von Lieferanten alphabetisch nach Ländernamen.
SELECT Country, COUNT(*) AS SupplierCount -- zählt Lieferanten pro Land
FROM Suppliers
GROUP BY Country
ORDER BY SupplierCount DESC, Country ASC;

# ☝🏼 Hinweis

- schau dir GROUP BY, AVG, MAX und COUNT(*) genauer an
- Hier findest du mehr Informationen