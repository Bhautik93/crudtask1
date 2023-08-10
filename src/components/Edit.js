import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [users, setUsers] = useState({
    name: "",
    employee: "",
    industry: "",
    lineofbusiness: "",
    datadomain: "",
    businessfunction: "",
    region: "",
  });

  console.log(users);

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    name,
    employee,
    lineofbusiness,
    datadomain,
    businessfunction,
    industry,
    region,
  } = users;

  const onInputChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setUsers({ ...users, industry: e.target.value });
  };

  const selectRadio = (e) => {
    setUsers({ ...users, region: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/users/${id}`, users);
    toast.success("User updated successfully")
    navigate("/");
  };

  const loadUser = async () => {
    const response = await axios.get(`http://localhost:4000/users/${id}`);
    setUsers(response.data);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-4">
        <h2 className="text-center mb-4">Update Data</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>ORGANIZATION NAME*</label>&nbsp;
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>EMPLOYEES*</label>&nbsp;
            <input
              type="text"
              className="form-control form-control-lg"
              name="employee"
              value={employee}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>INDUSTRY*</label>&nbsp;
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleChange}
              value={industry}
            >
              <option>Please Select</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Construction & Development">
                Construction & Development
              </option>
              <option value="Chemical & Agriculture">
                Chemical & Agriculture
              </option>
              <option value="Pharma">Pharma</option>
            </select>
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>LINE OF BUSINESS</label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="lineofbusiness"
              value={lineofbusiness}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>DATA DOMAIN*</label>&nbsp;
            <input
              type="text"
              className="form-control form-control-lg"
              name="datadomain"
              value={datadomain}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>BUSINESS FUNCTION*</label>&nbsp;
            <input
              type="text"
              className="form-control form-control-lg"
              name="businessfunction"
              value={businessfunction}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>REGION*</label>
            <br></br>
            <input
              type="radio"
              id="asia"
              name="fav_language"
              value="Asia"
              checked={region === "Asia"}
              onChange={selectRadio}
            />
            <label>Asia</label>
            <br />
            <input
              type="radio"
              id="australia"
              name="fav_language"
              value="Australia"
              checked={region === "Australia"}
              onChange={selectRadio}
            />
            <label>Australia</label>
            <br />
            <input
              type="radio"
              id="europe"
              name="fav_language"
              value="Europe"
              checked={region === "Europe"}
              onChange={selectRadio}
            />
            <label>Europe</label>
          </div>
          <br />
          <button className="btn btn-warning btn-block">Update</button>
          &nbsp;
          <Link className="btn btn-outline-danger btn-block" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Edit;
