import http from "../http-common";

const getAll = () => {
  return http.get("/employee");
};

const get = (id) => {
  return http.get(`/employee/${id}`);
};

const create = (data) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post("/employee", data, config);
};

const update = (id, data) => {
  return http.put(`/employee/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/employee/${id}`);
};

const removeAll = () => {
  return http.delete(`/employee`);
};

const EmployeeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default EmployeeService;
