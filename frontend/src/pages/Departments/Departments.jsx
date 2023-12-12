import React, { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import Table from "../../components/common/Table";
import Api from "../../services/Api";

const Departments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let controller = new AbortController();
    setLoading(true)

    Api.getDepartments(controller).then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setLoading(false)
    })

    return () => {
      controller.abort();
    }
  }, []);

  const columns = ["Departments", "Department Head", "Date created", ""];
  const rows = data.map((d) => [d.name, `${d.head.firstname} ${d.head.lastname}`, d.createdDate, ""])

  return (
    <div className="area">
      <div className="admin-header">
      {loading && (
        <div className="circularProgress">
          <CircularProgress />
        </div>
         )}
        <Table columns={columns} rows={rows}/>
      </div>
    </div>
  );
};

export default Departments;
