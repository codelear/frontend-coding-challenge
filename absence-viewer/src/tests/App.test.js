import React, { render, screen } from '@testing-library/react'
import App from '../App'

test('renders absence viewer', () => {
  render(<App />)
  const linkElement = screen.getByText(/Absence Viewer/i)
  expect(linkElement).toBeInTheDocument()
})
