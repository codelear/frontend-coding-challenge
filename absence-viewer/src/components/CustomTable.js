import { useEffect } from 'react'
import { useTable, usePagination, useFilters } from 'react-table'
import Paginator from './Paginator'
import styles from '../styles/CustomTable.module.css'

// based on the react-table 
export default function Table ({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  setFiltersList
}) {
  const {
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex, pageSize, filters }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      autoResetPage: false
    },
    useFilters,
    usePagination
    )
  // we need the complete list of filters
  // because dates are 2 fields and we need to filter
  // based on the data combination from 2 fields
  useEffect(() => {
    setFiltersList(filters)
  }, [filters, setFiltersList])

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])
  const visible = loading ? null : styles.invisible ;
  return (
    <>
      <div className={`${styles.band} ${visible}`}>Loading Data...</div>
      <div className={`${styles.band}`}>
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) => (
            <div {...column.getHeaderProps()} className={`${styles.title}`}>
              {column.render("Header")}
              {column.canFilter ? <div>{column.render("Filter")}</div> : null}
            </div>
          ))
        )}
      </div>
      <div>
        {page.length > 0 ? (
          page.map((row, i) => {
            prepareRow(row);
            return (
              <div className={styles.row} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <div {...cell.getCellProps()} className={styles.cell}>
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className={styles.band}>
            <span>
              <h3>No Data Available</h3>
            </span>
          </div>
        )}
      </div>

      <div className={styles.band}>
        <Paginator
          gotoPage={gotoPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
        />
      </div>
    </>
  );
}
