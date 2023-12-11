import React, { useEffect, useState } from "react";
import Table from "../components/common/Table";
import Api from "../services/Api";

const Users = () => {
  const [data, setData] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    Api.getUsers().then((response) => {
      setData(response.data.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleCreate = () => {
    Api.createUser(firstName, lastName).then(()=>{
      
    }).catch(() =>{

    });
  }

  const columns = ["Department", "Name", "Role", "Email", "Date created", ""];
  const rows = data.map((d) => [d.department.name, `${d.firstName} ${d.lastName}`, d.role.name, d.email, d.createdDate, ""])

  return (
    <div className='area'>
      <div className="admin-header">
        <Table columns={columns} rows={rows} />
      </div>
    </div>
  );
};

export default Users;
