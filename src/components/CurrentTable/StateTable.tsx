import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";
import { standardColumns, perPopulationColumns } from "./Columns";
import TableData from "./TableData";

const Styles = styled.div`
  padding: 1rem 0;

  .table-container {
    display: flex;
    justify-content: center;
  }

  h2 {
    margin-bottom: 0.5rem;
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
      padding: 0.25rem 1rem;
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

export default function StateTable({ data }) {
  const [tableData, setTableData] = useState(TableData);
  const [showPerPopulation, setshowPerPopulation] = useState(false);

  const toggleView = () => {
    setshowPerPopulation(!showPerPopulation);
  };

  useEffect(() => {
    const updateData = () => {
      const updated = tableData.slice().map((data1) => {
        const matching = data.find((data2) => data2.state === data1.state);
        if (matching) {
          return {
            state: matching.state,
            population: matching.population,
            current: matching.cases,
            active: matching.active,
            recovered: matching.recovered,
            deaths: matching.deaths,
            tests: matching.test,
            casesPerOneMillion: matching.casesPerOneMillion,
            deathsPerOneMillion: matching.deathsPerOneMillion,
            testsPerOneMillion: matching.testsPerOneMillion,
          };
        }
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
      <h2>State Covid Stats</h2>
      <button onClick={toggleView}>{showPerPopulation ? "Show overall stats" : "Show per population"}</button>
      <div className="table-container">
        {showPerPopulation ? (
          <Table columns={perPopulationColumns} data={tableData} />
        ) : (
          <Table columns={standardColumns} data={tableData} />
        )}
      </div>
    </Styles>
  );
}
