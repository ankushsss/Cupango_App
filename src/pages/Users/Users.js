import React , { useState , useEffect}from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

 
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))




export default function Users() {
  const classes = useStyles();

const [errors, setErrors] = useState("");
const [isFetching, setIsFetching] = useState(false);
const [users, setUsers] = useState([])
const columns = [
  {
    name: "_id",
    label: "Id",
    options: {
     filter: true,
     sort: true,
    }
   },
  {
   name: "name",
   label: "Name",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
    name: "email",
    label: "Email",
    options: {
     filter: true,
     sort: true,
    }
   },
   
  ]

  
useEffect(() => {
  console.log(localStorage.getItem("admin_token"),"token")
  const userData = async () => {

    setIsFetching(true)
    setErrors(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("admin_token")}`
      }
    }

    // console.log(user.storeId)
    try {
      const { data } = await axios.get("/api/v1/alluser",config).catch(err => {
        if (err.response.status === 409) {
          setErrors("Invalid User")
          throw new Error(`Invalid User`);
        }
        else {
          setErrors("Internal Server Error")
          throw new Error(`Internal Server Error`);
        }
        throw err;
      });
      setUsers(data.users)
      console.log("hiii")
      console.log(data)
      /* setProduct(data.products) */

      setIsFetching(false);

    } catch (err) {

      setErrors(err.message)
    }
  }
  userData()
 

},[])
const options = {
  filterType: "checkbox",
   
};
console.log(users)
  return (
    <>
      <PageTitle title="Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="User List"
            data={users}
            columns={columns}
            options={options}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid>
    </>
  );
}
