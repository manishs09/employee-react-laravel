import React, { useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useHistory } from "react-router-dom";
import FileUploader from "./FileUploader";

const AddEmployee = () => {
  const initialEmployeeState = {
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    job_title: "",
    photo: null,
  };
  const [employee, setEmployee] = useState(initialEmployeeState);
  const [previewPhoto, setPhotoPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState([]);
  const history = useHistory();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = () => {
    let formData = new FormData();

    formData.append("first_name", employee.first_name);
    formData.append("last_name", employee.last_name);
    formData.append("email", employee.email);
    formData.append("photo", employee.photo);
    formData.append("job_title", employee.job_title);

    EmployeeService.create(formData)
      .then((response) => {
        if (response.data.success) {
          setEmployee({
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published,
          });
          setSubmitted(true);
          history.push("/");
        } else {
          let responeData = response.data.data;
          const errorMessage = [];
          for (const validation in responeData) {
            if (Array.isArray(responeData[validation])) {
              responeData[validation].forEach((value, index) => {
                errorMessage.push(value);
              });
            } else {
              errorMessage.push(responeData[validation]);
            }
          }
          setMessage(errorMessage);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setEmployee(initialEmployeeState);
    setSubmitted(false);
  };

  const handleFileInput = (e) => {
    let image_as_files = e.target.files[0];
    setEmployee({ ...employee, photo: image_as_files });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={employee.first_name}
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
              value={employee.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileInput}
            />
            {previewPhoto && (
              <img src={`data:image/png;base64, ${previewPhoto}`} />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={employee.email}
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
              value={employee.job_title}
              onChange={handleInputChange}
            />
          </div>

          <button onClick={saveEmployee} className="btn btn-success">
            Submit
          </button>

          <div className="mt-2">
            {message &&
              message.map((m, i) => (
                <p key={"er" + i} className="m-0 p-0 text-danger">
                  *{m}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
