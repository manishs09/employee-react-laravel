import React, { useState, useEffect, useMemo, useRef } from "react";
import EmployeeService from "../services/EmployeeService";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";

const EmployeeList = (props) => {
  console.log(process.env.REACT_APP_EMPLOYEE_IMAGE_URL);
  const [employees, setEmployees] = useState([]);
  const empRef = useRef();
  const history = useHistory();

  empRef.current = employees;

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    EmployeeService.getAll()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
  };

  const openTutorial = (rowIndex) => {
    const id = empRef.current[rowIndex].id;

    props.history.push("/employee/" + id);
  };

  const deleteTutorial = (rowIndex) => {
    const id = empRef.current[rowIndex].id;

    EmployeeService.remove(id)
      .then((response) => {
        history.push("/employee");
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Photo",
        accessor: "photo",
        Cell: (tableProps) => (
          <img
            src={
              process.env.REACT_APP_EMPLOYEE_IMAGE_URL +
              (tableProps.row.original.photo
                ? tableProps.row.original.photo
                : "user.png")
            }
            width={60}
            alt="Player"
          />
        ),
      },
      {
        Header: "Job Title",
        accessor: "job_title",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTutorial(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTutorial(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: employees,
    });

  return (
    <div className="list row">
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
