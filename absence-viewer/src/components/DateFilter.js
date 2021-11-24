import { useMemo } from 'react'

// the UI to display the input field for the date filter
export function DateFilterUI ({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  return (
      <input
        type="date"
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      />
  )
}

// we get the complete list of filters from the CustomTable
// and we use this list to get the start and end date to filter
// if only start date is available. then data is filtered on the condition
// startdate == date value from start date filter
// if only end date is available. then data is filtered on the condition
// end date == date value from start date filter
// if both start and end date is available then fitler on the condition
// startdate >= date value from start date filter and 
// enddate <=date value from end date filter
// return the filtered rows 
export const DateFilter = (filtersList) =>
  useMemo(
    () => (rows, columnIds, filterValue) => {
      let startDate
      let endDate

      // find the start and end dates for which we need to apply the filter
      filtersList.forEach((filter) => {
        startDate = filter.id === 'startDate' ? filter.value : startDate
        endDate = filter.id === 'endDate' ? filter.value : endDate
      })

      // filter rows based on start end date
      if (startDate && endDate) {
        const filterStart = new Date(startDate)
        const filterEnd = new Date(endDate)
        return rows.filter((row) => {
          const start = new Date(row.values.startDate)
          const end = new Date(row.values.endDate)
          return start >= filterStart && end <= filterEnd
        })
      }
      if (startDate) {
        return rows.filter((row) => row.values.startDate === startDate)
      }
      if (endDate) {
        return rows.filter((row) => row.values.endDate === endDate)
      }
      return rows
    },
    [filtersList]
  )
