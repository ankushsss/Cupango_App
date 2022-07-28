import React, { useState ,useEffect } from "react";
import classnames from "classnames";
import { Button, Card, CardMedia, FormControl, FormControlLabel, Grid, Input, InputLabel, MenuItem, Select, Switch, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import { useHistory } from "react-router-dom";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import Table from "../dashboard/components/Table/Table";
import { v4 as uuidv4 } from "uuid";
// data
import mock from "../dashboard/mock";
import axios from "axios"
 
import { NavLink } from "react-router-dom";
 
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  media: {
    height: 140,
  },
}))
 
export default function Subadmin() {
  const classes = useStyles();
  const history = useHistory();
  const [subadmins, setSubadmins]= useState({email:"", password:"",role:"subadmin"});
   
 
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setSubadmins({ ...subadmins, [name]: value });
        // console.log(subadmins)
    }
    const [isFetching, setIsFetching] = useState(false);
    const [errors, setErrors] = useState("");

    const createSubadmin = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setErrors(false);
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
  
            try {
                const {data} = await axios.post("/api/v1/signup", subadmins, config).catch(err => {
                    if (err.response.status === 409) {
                        setErrors("User Already Exist!")
                        throw new Error(`user already exist`);
                    } else {
                        setErrors("Internal Server Error")
                        throw new Error(`Internal Server Error`);
                    }
                    throw err;
                     
                });
                setIsFetching(false);
                 
                alert('Subadmin Created Successfully')
                setSubadmins({email :"" , password:"" , role : "subadmin"})
                
            } catch (err) {
                setIsFetching(false)
            }
        
    }
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
       name: "email",
       label: "Email Id",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
        name: "password",
        label: "Password",
        options: {
         filter: true,
         sort: true,
        }
       },
        
     
      
      ]
  
  const [isSubadminOpen, setIsSubadminOpen] = useState(false)
  
  const [subadmin, setSubadmin] = useState([])
  useEffect(() => {
    
    const subadminData = async () => {
  
      setIsFetching(true)
      setErrors(false);
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
    }
  
       
      try {
        const { data } = await axios.get("/api/v1/getsubadmin",config).catch(err => {
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
        setSubadmin(data.subadmins)
        /* setProduct(data.products) */
  
        setIsFetching(false);
  
      } catch (err) {
  
        setErrors(err.message)
      }
    }
    subadminData()
   
  
  },[])
  console.log(subadmin)
  
  return (
    <div>
      <PageTitle title="Subadmins" />
      <Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={() => {
      setIsSubadminOpen(!isSubadminOpen)
      setSubadmins({email :"" , password:"" , role : "subadmin"})
      }
      }
    >
        Add Subadmin
    </Button><br></br>

    {
      isSubadminOpen ?   
      <Grid item xs={12} md={12}>
          <Widget title="Add Subadmin" disableWidgetMenu>
           
        
        <br></br>
          <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="email" 
                value={subadmins.email}
                onChange={handleChange}
                margin="normal"
                placeholder="Email"
                type="text"
                fullWidth
                
              />

            <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="password" 
                value={subadmins.password}
                onChange={handleChange}
                margin="normal"
                placeholder="password"
                type="text"
                fullWidth
              />

              
          <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={createSubadmin}
              >
                  Add 
              </Button>
          </Widget>  
        </Grid>
      
       : null
    }  
    <PageTitle title="Orders" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Order List"
            data={subadmin}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        </Grid>
    </div>
  );
}
