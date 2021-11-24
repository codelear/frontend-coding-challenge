import './App.css'
import { useMemo, useState, useCallback } from 'react'
import CustomTable from './components/CustomTable'
import DropdownFilter from './components/DropdownFilter'
import { DateFilterUI, DateFilter } from './components/DateFilter'
import axios from 'axios'

export default function App () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageCount, setPageCount] = useState(0)
  const [filtersList, setFiltersList] = useState([])
  const [errored, setErrored] = useState(false);

  const dateFilter = DateFilter(filtersList)

  const columns = useMemo(
    () => [
      { Header: 'name', accessor: 'name', disableFilters: true },
      { Header: 'type', accessor: 'type', disableFilters: true },
      {
        Header: 'startDate',
        accessor: 'startDate',
        Filter: DateFilterUI,
        filter: dateFilter
      },
      {
        Header: 'endDate',
        accessor: 'endDate',
        Filter: DateFilterUI,
        filter: dateFilter
      },
      { Header: 'memberNote', accessor: 'memberNote', disableFilters: true },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: DropdownFilter,
        filter: 'includes'
      },
      {
        Header: 'admitterNote',
        accessor: 'admitterNote',
        disableFilters: true
      }
    ],
    [dateFilter]
  )

  const getDependantData = useCallback((absences) => {
    axios
      .all(
        absences.map((absence) => {
          const status = absence.confirmedAt
            ? 'Confirmed'
            : absence.rejectedAt
              ? 'Rejected'
              : 'Requested'
          return axios.get(`/members/${absence.userId}`).then((res) => {
            return { ...absence, status: status, name: res.data[0].name }
          })
        })
      )
      .then((res) => {
        setData(res)
      })
  }, [])

  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      // Set the loading state
      setLoading(true)
      setErrored(false);
      axios.get(`/absences?pagenumber=${pageIndex + 1}`).then((res) => {
        setPageCount(res.data.totalpages)
        getDependantData(res.data.payload)
        setLoading(false);
        setErrored(false);
      }).catch((error) => {
        setErrored(true);
        setLoading(false)
    })
    },
    [getDependantData]
  )
  return (
    <>
      {errored && <div className="band">Error occured</div>}
        <CustomTable
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={loading}
          pageCount={pageCount}
          setFiltersList={setFiltersList}
        />
    </>
  );
}
