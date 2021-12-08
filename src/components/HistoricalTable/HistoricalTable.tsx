import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";
import historicalColumns from "./Columns";
import TableData from "./TableData";

const Styles = styled.div`
  padding: 1rem 0;

  .table-container {
    display: flex;
    justify-content: center;
  }

  h2 {
    margin-bottom: 3rem;
  }

  button {
    margin-bottom: 1rem;
    height: 2rem;
    width: 150px;
    background: #d4ecfc;
    border: 1px solid black;
    border-radius: 5px;
  }

  table {
    border-spacing: 0;
    border: 1px solid black;
    border-radius: 8px 8px 0px 0px;

    tr {
      :nth-child(even) {
        background: #d4ecfc;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 1.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
};

export default function HistoricalTable({ data }) {
  const [tableData, setTableData] = useState(TableData);

  useEffect(() => {
    const updateData = () => {
      const dates = Object.keys(data.cases);
      const updated = tableData.slice().map((data1, index) => {
        return {
          date: dates[index],
          cases: data.cases[dates[index]],
          deaths: data.deaths[dates[index]],
          recovered: data.recovered[dates[index]],
        };
      });
      setTableData(updated);
      return updated;
    };
    if (data) {
      updateData();
    }
  }, [data]);

  return (
    <Styles>
      <h2>Nationwide Past 14 Days</h2>
      <div className="table-container">
        <Table columns={historicalColumns} data={tableData} />
      </div>
    </Styles>
  );
}
