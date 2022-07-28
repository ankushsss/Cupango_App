import React , { useState , useEffect}from "react";
import { Avatar, Button, Grid, Switch, Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import axios from "axios";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import { useContext } from "react";
import { UserStateContext } from "../../context/UserContext";
// data
import mock from "../dashboard/mock";
import { OrderView } from "./OrderView";
// import { OrderList } from "./OrderList";
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))
export default function Orders() {
  const classes = useStyles();
 const {isAuthenticated , admins } = useContext(UserStateContext);
  const [errors, setErrors] = useState("");
  const [tableView, setTableView] = useState({
    open:true,
    index:0
  })
const [isFetching, setIsFetching] = useState(false);
const [editModel, setEditModel]= useState({open:false,index:0})
const [order, setOrder] = useState([])
const [roData, setRoData] = useState({})

const columns = [
  {
    name: "Image_url",
    label: "Image",
    options: {
     filter: true,
     sort: true,
     customBodyRender: (value, tableMeta, updateValue) => {
      return (
      //   <Switch
      //   checked={value}
      //   onChange={
      //     async (e) => {
      //       e.preventDefault();
      //       updateValue(e.target.checked);
           

      //     }
      //   }
      //   name="active"
      //   color="primary"
      // />
      <>
        <Avatar  src="https://firebasestorage.googleapis.com/v0/b/cajaregistradora-776cc.appspot.com/o/pngwing.com(2).png?alt=media&token=bde13cf8-4b17-4da9-90cf-c16db83b2e1f" sx={{ width: 100, height: 100 }}/>
      </>
      )
     }
    }
  },
  {
    name: "_id",
    label: "Id",
    options: {
     filter: true,
     sort: true,
     customBodyRender: (value, tableMeta, updateValue) => {
      return (
      //   <Switch
      //   checked={value}
      //   onChange={
      //     async (e) => {
      //       e.preventDefault();
      //       updateValue(e.target.checked);
           

      //     }
      //   }
      //   name="active"
      //   color="primary"
      // />
      <>
        <div style={{textTransform:"uppercase"}}>{value}</div>
      </>
      )
     }
    }
   },
  {
    name: "order_amount",
    label: "Amount",
    options: {
     filter: true,
     sort: true,
     customBodyRender: (value, tableMeta, updateValue) => {
      return (
      //   <Switch
      //   checked={value}
      //   onChange={
      //     async (e) => {
      //       e.preventDefault();
      //       updateValue(e.target.checked);
           

      //     }
      //   }
      //   name="active"
      //   color="primary"
      // />
      <>
        <div style={{textTransform:"uppercase"}}>{value}</div>
      </>
      )
     }
    
    }
   },
   {
    name: "order_status",
    label: "Status",
    options: {
     filter: true,
     sort: true,
     customBodyRender: (value, tableMeta, updateValue) => {
      return (
      //   <Switch
      //   checked={value}
      //   onChange={
      //     async (e) => {
      //       e.preventDefault();
      //       updateValue(e.target.checked);
           

      //     }
      //   }
      //   name="active"
      //   color="primary"
      // />
      <>
        <div style={{textTransform:"uppercase"}}>{value}</div>
      </>
      )
     }
    }
   },
   {
    name: "order_type",
    label: "Type",
    options: {
     filter: true,
     sort: true,
     customBodyRender: (value, tableMeta, updateValue) => {
      return (
      //   <Switch
      //   checked={value}
      //   onChange={
      //     async (e) => {
      //       e.preventDefault();
      //       updateValue(e.target.checked);
           

      //     }
      //   }
      //   name="active"
      //   color="primary"
      // />
      <>
        <div style={{textTransform:"uppercase"}}>{value}</div>
      </>
      )
     }
    }
   },
   {
    name: "is_accepted",
    label: "Accepted",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
        //   <Switch
        //   checked={value}
        //   onChange={
        //     async (e) => {
        //       e.preventDefault();
        //       updateValue(e.target.checked);
             

        //     }
        //   }
        //   name="active"
        //   color="primary"
        // />
        <>
         {!value?<div style={{background:"green",color:"white", borderRadius:"10px",textAlign:"center", width:"fit-content", padding:"5px 20px"}}>Accepted</div>:<div style={{background:"#ff0000b0",color:"white", borderRadius:"10px", textAlign:"center", width:"fit-content", padding:"5px 20px"}}>Not Accepted</div>}
        </>
        )
    }
    }
   },
   {
    name: "is_complete",
    label: "Complete",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
        //   <Switch
        //   checked={value}
        //   onChange={
        //     async (e) => {
        //       e.preventDefault();
        //       updateValue(e.target.checked);
             

        //     }
        //   }
        //   name="active"
        //   color="primary"
        // />
        <>
          {value?<div style={{background:"green",color:"white", borderRadius:"10px",textAlign:"center", width:"fit-content", padding:"5px 20px"}}>Yes</div>:<div style={{background:"#ff0000b0",color:"white", borderRadius:"10px", textAlign:"center", width:"fit-content", padding:"5px 20px"}}>No</div>}
        </>
        )
    }
    }
   },
   {
    name: "edit",
    label: "edit",
    options: {
      customBodyRender: (value, tableMeta, updateValue) => {
            function setData(data)
            {
              console.log(data.rowIndex)
              setTableView({open:false,index:data.rowIndex})
            }
        return (
          <>
            <Button variant="outlined" onClick={()=>setData(tableMeta)}>View</Button>
          </>
        )
    }
    }
    
   }
  ]
  const orderData = async () => {

    setIsFetching(true)
    setErrors(false);
    const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
      }
  }

     
    try {
      const { data } = await axios.post("/api/v1/singleRestaurent/order",{rest_id:admins},config).catch(err => {
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
      console.log(data)
      setOrder(data.orders)
      /* setProduct(data.products) */

      setIsFetching(false);

    } catch (err) {

      setErrors(err.message)
    }
  }


useEffect(() => {
  orderData()
  // console.log(rowData)
},[])
// console.log(order)
  return (
    <>
     {!tableView.open?<OrderView rowData={order[tableView.index]}/>:<> <PageTitle title="Orders" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Order List"
            data={order}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: (rowsDeleted, dataRows, e) => {
                console.log(order[rowsDeleted.data[0].index])
                let rowData  = rowsDeleted.data
                let dataArray = []
                rowData.map((res)=>{
                      dataArray.push(order[res.index].id)
                })
                console.log(dataArray)
                const config = {
                  header: {
                      "Content-Type": "application/json"
                  }
              }
                const deletData = axios.post("/api/v1/order/delete", dataArray, config).then((res)=>{
                  alert("success")
                }).catch((err)=>{
                  alert("something wrong")
                }
                )
              }
            }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid> */}
      </Grid></>}
      {/* <OrderList editModel={editModel} setEditModel={setEditModel} rowData={rowData} setRowData={setRowData}/> */}

      
    </>
  );
}
