import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Api from "../services/Api";

const Departments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Api.getDepartments().then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const columns = ["Departments", "Department Head", "Date created", ""];
  const rows = data.map((d) => [d.name, `${d.head.firstname} ${d.head.lastname}`, d.createdDate, ""])

  return (
    <div className="area">
      <div className="admin-header">
        <Table columns={columns} rows={rows}/>
      </div>
    </div>
  );
};

export default Departments;
