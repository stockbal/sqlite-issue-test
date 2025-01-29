# @cap-js/sqlite DateTime -> Date issue

Small CAP project to demonstrate a missing _cut-off_/conversion from `DateTime` strings to `Date` columns during the execution of `UPDATE` queries:

e.g.

```cds
UPDATE(tableName, pk).set({ dateCol: "2025-28-01T15:00:00.000Z" });
```
