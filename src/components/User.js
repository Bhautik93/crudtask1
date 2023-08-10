import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const User = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortvalue, setSortValue] = useState("");
  const [curPage, setCurPage] = useState(1)
  const recordpage = 5
  const lastIndex = curPage * recordpage
  const firstIndex = lastIndex - recordpage
  // const records = data.slice(firstIndex, lastIndex)
  const page = Math.ceil(data.length / recordpage)
  const numbers = [...Array(page + 1).keys()].slice(1)

  const Sort = [
    "name",
    "industry",
    "lineofbusiness",
    "datadomain",
    "businessfunction",
    "region",
  ];

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const resp = await axios.get("http://localhost:4000/users");
    setData(resp.data);
  };

  const deleteUser = async (id) => {
    alert("Are You Sure For DELETE data ?");
    await axios.delete(`http://localhost:4000/users/${id}`);
    loadUser();
    toast.success("User deleted successfully");
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await axios.get(`http://localhost:4000/users?q=${value}`);
    setData(data.data);
    setValue("");
  };

  const handlerSort = async (e) => {
    e.preventDefault();
    let value = e.target.value;
    setSortValue(value);
    const data = await axios.get(
      `http://localhost:4000/users?_sort=${value}&_order=asc`
    );
    setData(data.data);
    setValue("");
  };

  const handleReset = () => {
    loadUser();
  };

  const prePage = () => {
    if(curPage !== firstIndex){
      setCurPage(curPage - 1)
    }
  }

  const changeCpage = (id) => {
    setCurPage(id)
  }

  const nextPage = () => {
    if(curPage !== lastIndex) {
      setCurPage(curPage + 1)
    }
  }

  return (
    <div className="container pt-5">
      <form
        style={{
          margin: "auto",
          padding: "5px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn-dark">
          Search
        </button>
        <button className="mx-2 btn btn-info" onClick={() => handleReset()}>
          Reset
        </button>
      </form>
      <h4 className="d-flex justify-content-between">
        Organization List
        <Link
          className="btn btn-info"
          style={{ marginLeft: "80%", height: "50%", color: "white" }}
          to="/create"
        >
          Create
        </Link>
      </h4>
      <table className="table" style={{ fontSize: "13px" }}>
        <thead className="table-dark">
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">EMPLOYEES</th>
            <th scope="col">INDUSTRY</th>
            <th scope="col">LINE OF BUSINESS</th>
            <th scope="col">DATA DOMAIN</th>
            <th scope="col">BUSINESS FUNCTION</th>
            <th scope="col">REGION</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.employee}</td>
                <td>{item.industry}</td>
                <td>{item.lineofbusiness}</td>
                <td>{item.datadomain}</td>
                <td>{item.businessfunction}</td>
                <td>{item.region}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/create/edit/${item.id}`}
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <Link
                    className="btn btn-danger"
                    onClick={() => deleteUser(item.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
        <div>
          <ul className="pagination">
            <li className="page-item">
              <Link className="page-link" onClick={prePage}>
              Prev
              </Link>
            </li>
            {
              numbers.map((n ,i) => (
                <li className={`page-item ${curPage === n ? 'active' : ''}`} key={i}>
                  <Link className="page-link" onClick={changeCpage}>{n}</Link>
                </li>
              ))
            }
            <li className="page-item">
            <Link className="page-link" onClick={nextPage}>
            Next
            </Link>
          </li>
          </ul>
        </div>
        <tr>
          <th size="4">
            <h4>Sort By:</h4>
            <select
              style={{ width: "100%", borderRadius: "2px", height: "35px" }}
              onChange={handlerSort}
              value={sortvalue}
            >
              <option>Please Select</option>
              {Sort.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </th>
          <th size="4">
            <h5>Filter By Status:</h5>
          </th>
        </tr>
    </div>
  );
};

export default User;
