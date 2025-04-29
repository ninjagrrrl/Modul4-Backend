1. Zeige **alle Kunden** aus der Customers-Tabelle an, deren **Name mit A beginnt**
SELECT CustomerName FROM Customers WHERE CustomerName like 'A%';

2. Sortiere die **Kunden absteigend** nach **Postleitzahl**
SELECT * FROM Customers Order by PostalCode desc;

3. Zeige alle **Kunden aus Mexico**, **sortiert** zuerst nach **Stadt** und dann nach **Kundenname**
SELECT * FROM Customers WHERE Country = 'Mexico' ORDER BY City, CustomerName;

4. Zeige  alle Kunden an, die sich in **Deutschland**, dem **Vereinigten Königreich** oder **Frankreich** befinden.
SELECT * FROM Customers WHERE Country = 'France' OR Country = 'Germany' OR Country = 'UK';

Wechsle zur Tabelle Products
SELECT * FROM Products;

5. Zeige alle **Produkte** an, die **in Flaschen** verkauft werden
SELECT * FROM Products WHERE Unit like '%bottle%';

6. Zeige alle Produkte an, deren **Preis** **zwischen 20 und 30 Dollar** liegt
SELECT * FROM Products WHERE Price BETWEEN 20 AND 30;

7. Erstelle eine Liste, die die **Anzahl der Produkte pro Kategorie** anzeigt.
SELECT CategoryID, COUNT(*) FROM Products GROUP BY CategoryID;