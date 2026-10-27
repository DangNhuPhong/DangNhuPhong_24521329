
import { useMemo, useRef, useState } from "react";
import { columns, initialUsers } from "./data.js";

export default function DataGrid() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "name", direction: "asc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedId, setSelectedId] = useState(null);
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const gridRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return users.filter((user) =>
      [user.name, user.email, user.role, user.status].some((value) =>
        value.toLowerCase().includes(q)
      )
    );
  }, [users, query]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const result = a[sort.key].localeCompare(b[sort.key], undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sort.direction === "asc" ? result : -result;
    });
  }, [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visible = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function changeQuery(value) {
    setQuery(value);
    setPage(1);
    setActiveCell({ row: 0, col: 0 });
  }

  function changePageSize(value) {
    setPageSize(Number(value));
    setPage(1);
    setActiveCell({ row: 0, col: 0 });
  }

  function sortBy(key) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
    setPage(1);
  }

  function deleteSelected() {
    if (!selectedId) return;

    setUsers((current) => current.filter((user) => user.id !== selectedId));
    setSelectedId(null);
    setActiveCell({ row: 0, col: 0 });
  }

  function handleGridKeyDown(event) {
    const rowCount = visible.length;
    const colCount = columns.length;

    if (!rowCount) return;

    let { row, col } = activeCell;
    let handled = true;

    switch (event.key) {
      case "ArrowUp":
        row = Math.max(0, row - 1);
        break;
      case "ArrowDown":
        row = Math.min(rowCount - 1, row + 1);
        break;
      case "ArrowLeft":
        col = Math.max(0, col - 1);
        break;
      case "ArrowRight":
        col = Math.min(colCount - 1, col + 1);
        break;
      case "Enter":
        setSelectedId(visible[row].id);
        break;
      case " ":
        if (
          event.target instanceof HTMLElement &&
          event.target.closest("button")
        ) {
          handled = false;
          break;
        }
        setSelectedId((current) =>
          current === visible[row].id ? null : visible[row].id
        );
        break;
      default:
        handled = false;
    }

    if (handled) {
      event.preventDefault();
      setActiveCell({ row, col });

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        gridRef.current
          ?.querySelector(
            `[data-cell="${row}-${col}"]`
          )
          ?.focus();
      }
    }
  }

  return (
    <section className="panel" aria-labelledby="grid-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HOMEWORK 01</p>
          <h2 id="grid-heading">Enterprise Data-Grid</h2>
          <p>Accessible user directory with sorting, filtering and pagination.</p>
        </div>
        <span className="status-pill">{sorted.length} records</span>
      </div>

      <div className="toolbar">
        <label className="search-field">
          <span>Search users</span>
          <input
            type="search"
            value={query}
            onChange={(event) => changeQuery(event.target.value)}
            placeholder="Name, email, role, status..."
          />
        </label>

        <label>
          Rows per page
          <select
            value={pageSize}
            onChange={(event) => changePageSize(event.target.value)}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <button
          className="button button-secondary"
          onClick={deleteSelected}
          disabled={!selectedId}
        >
          Delete selected
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {sorted.length} matching users. Page {safePage} of {pageCount}.
      </p>

      <div
        className="table-wrap"
        ref={gridRef}
        onKeyDown={handleGridKeyDown}
      >
        <table
          role="grid"
          aria-label="User management data grid"
          aria-rowcount={sorted.length + 1}
          aria-colcount={columns.length}
        >
          <caption className="sr-only">
            User directory. Use arrow keys to navigate cells, Enter to select a
            row and Space to toggle selection.
          </caption>
          <thead>
            <tr role="row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  role="columnheader"
                  aria-sort={
                    sort.key !== column.key
                      ? "none"
                      : sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                  }
                >
                  <button
                    className="sort-button"
                    onClick={() => sortBy(column.key)}
                    aria-label={`Sort by ${column.label}`}
                  >
                    {column.label}
                    <span aria-hidden="true">
                      {sort.key === column.key
                        ? sort.direction === "asc"
                          ? " ↑"
                          : " ↓"
                        : " ↕"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((user, rowIndex) => (
              <tr
                key={user.id}
                role="row"
                aria-selected={selectedId === user.id}
                className={selectedId === user.id ? "selected-row" : ""}
                onClick={() => setSelectedId(user.id)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    role="gridcell"
                    tabIndex={
                      activeCell.row === rowIndex && activeCell.col === colIndex
                        ? 0
                        : -1
                    }
                    data-cell={`${rowIndex}-${colIndex}`}
                    onFocus={() => setActiveCell({ row: rowIndex, col: colIndex })}
                  >
                    {column.key === "status" ? (
                      <span
                        className={
                          user.status === "Active"
                            ? "status-pill"
                            : "status-pill status-muted"
                        }
                      >
                        {user.status}
                      </span>
                    ) : (
                      user[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {visible.length === 0 && (
          <p className="empty-state">No users match your search.</p>
        )}
      </div>

      <div className="pagination">
        <span>
          Showing {sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1}–
          {Math.min(safePage * pageSize, sorted.length)} of {sorted.length}
        </span>
        <div className="pagination-actions">
          <button
            className="button button-secondary"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span aria-label={`Page ${safePage} of ${pageCount}`}>
            {safePage} / {pageCount}
          </span>
          <button
            className="button button-secondary"
            disabled={safePage >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <p className="help-text">
        Keyboard: focus a table cell, then use arrows to navigate, Enter to
        select and Space to toggle the selected row.
      </p>
    </section>
  );
}
