import React, { render, screen } from '@testing-library/react'
import { useMemo}from 'react';
import CustomTable from '../components/CustomTable'

test('renders custom table', () => {
  const columns = [{ Header: "name", accessor: "name", disableFilters: true }];

  const data = [{ "name": "Max" },]

  const filter = () => { }
  
  render(<CustomTable columns={columns}
    data={data}
    fetchData={() => data}
    loading={false}
    pageCount={1}
    setFiltersList= {filter}/>)
  const nameElement = screen.getByText(/name/i)
  expect(nameElement).toBeInTheDocument()
  const maxElement = screen.getByText(/Max/i);
  expect(maxElement).toBeInTheDocument();
})

