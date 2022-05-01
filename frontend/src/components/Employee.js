import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import { useHistory } from "react-router-dom";

const Employee = (props) => {
  const initialEmployeeState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
  };
  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const getEmployee = (id) => {
    EmployeeService.get(id)
      .then((response) => {
        setCurrentEmployee(response.data.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployee(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const updateEmployee = () => {
    EmployeeService.update(currentEmployee.id, currentEmployee)
      .then((response) => {
        if (response.data.success) {
          history.push("/");
        } else {
          console.log(response.data.data);
          let responeData = response.data.data;
          let errorMessage = "";
          for (const validation in responeData) {
            if (Array.isArray(responeData[validation])) {
              responeData[validation].forEach((value, index) => {
                errorMessage += "\n" + value;
              });
            } else {
              errorMessage += "\n" + responeData[validation];
            }
          }
          setMessage(errorMessage);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmployee ? (
        <div className="edit-form">
          <h4>Update Employee</h4>
          <form>
            <div className="form-group">
              <label htmlFor="email text-muted">Email</label>
              <div className="form-control text-muted">
                {currentEmployee.email}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={currentEmployee.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={currentEmployee.last_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="job_title">Job Title</label>
              <input
                type="text"
                className="form-control"
                id="job_title"
                name="job_title"
                value={currentEmployee.job_title}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateEmployee}
          >
            Update
          </button>
          <p className="mt-1 text-danger">{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Employee;
