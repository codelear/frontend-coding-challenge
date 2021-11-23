import { useMemo } from "react";

export function DateFilterUI({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
      <input
        type="date"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      />
  );
}

export const DateFilter = (filtersList) =>
  useMemo(
    () => (rows, columnIds, filterValue) => {
      let startDate = undefined;
      let endDate = undefined;

      // find the start and end dates for which we need to apply the filter
      filtersList.forEach((filter) => {
        startDate = filter["id"] === "startDate" ? filter["value"] : startDate;
        endDate = filter["id"] === "endDate" ? filter["value"] : endDate;
      });

      // filter rows based on start end date
      if (startDate && endDate) {
        const filterStart = new Date(startDate);
        const filterEnd = new Date(endDate);
        return rows.filter((row) => {
          const start = new Date(row.values["startDate"]);
          const end = new Date(row.values["endDate"]);
          return start >= filterStart && end <= filterEnd;
        });
      }
      if (startDate) {
        return rows.filter((row) => row.values["startDate"] === startDate);
      }
      if (endDate) {
        return rows.filter((row) => row.values["endDate"] === endDate);
      }
      return rows;
    },
    [filtersList]
  );
