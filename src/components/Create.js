import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CreateValidation } from "./CreateValid";

const Create = () => {
  const [users, setUsers] = useState({
    name: "",
    employee: "",
    industry: "",
    lineofbusiness: "",
    datadomain: "",
    businessfunction: "",
    region: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const { name, employee, lineofbusiness, datadomain, businessfunction } =
    users;

  const onInputChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setUsers({ ...users, industry: e.target.value });
  };

  const selectRadio = (e) => {
    setUsers({ ...users, region: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = CreateValidation(users);
    if (Object.keys(errors).length === 0) {
      await axios.post("http://localhost:4000/users", users);
      navigate("/");
      toast.success("User created successfully");
    } else {
      setErrors(errors);
      toast.error("User not created");
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-4">
        <h2 className="text-center mb-4">Create New</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group" style={{ textAlign: "left" }}>
            <label htmlFor="name">ORGANIZATION NAME*</label>&nbsp;
            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
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
            {errors.employee && 
              <p style={{ color: "red" }}>{errors.employee}</p>
            }
          </div>
          &nbsp;
          <div className="form-group" style={{ textAlign: "left" }}>
            <label>INDUSTRY*</label>&nbsp;
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handleChange}
            >
              {errors.industry && 
                <p style={{ color: "red" }}>{errors.industry}</p>
              }
              <option selected>Please Select</option>
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
            {errors.lineofbusiness && 
              <p style={{ color: "red" }}>{errors.lineofbusiness}</p>
            }
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
            {errors.datadomain && 
              <p style={{ color: "red" }}>{errors.datadomain}</p>
            }
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
            {errors.businessfunction && (
              <p style={{ color: "red" }}>{errors.businessfunction}</p>
            )}
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
              onChange={selectRadio}
            />
            {errors.region && <p style={{ color: "red" }}>{errors.region}</p>}
            <label for="asia">Asia</label>
            <br />
            <input
              type="radio"
              id="australia"
              name="fav_language"
              value="Australia"
              onChange={selectRadio}
            />
            <label for="australia">Australia</label>
            <br />
            <input
              type="radio"
              id="europe"
              name="fav_language"
              value="Europe"
              onChange={selectRadio}
            />
            <label for="europe">Europe</label>
          </div>
          <br />
          <button className="btn btn-warning btn-block">Save</button>&nbsp;
          <Link className="btn btn-outline-danger btn-block" to="/">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Create;
