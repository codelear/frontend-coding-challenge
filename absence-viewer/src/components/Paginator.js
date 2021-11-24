import React from 'react'

export default function Paginator ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions
}) {
  return (
    <div className="pagination">
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </button>{" "}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {"<"}
      </button>{" "}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {">"}
      </button>{" "}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </button>{" "}
      <span>
        Page{" "}
        <strong>
          {pageOptions.length>0?pageIndex + 1:0} of {pageOptions.length}
        </strong>{" "}
      </span>
      <span>
        | Go to page:{" "}
        <input
          type="number"
          min="1"
          max={pageCount}
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px" }}
        />
      </span>
    </div>
  );
}
