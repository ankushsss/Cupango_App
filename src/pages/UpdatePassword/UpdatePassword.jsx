import React, { useState ,useEffect , useContext} from "react";
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
import axios from "axios";
import { UserStateContext } from '../../context/UserContext'
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
 
export default function UpdatePassword() {
  const classes = useStyles();
  const {isAuthenticated , admins } = useContext(UserStateContext);
  const history = useHistory();
  
 

  const [password, setPassword] = useState();
   
  const [isItemOpen, setIsItemOpen] = useState(false)
  
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState("");

  const handleSubmit= (e) => {
    e.preventDefault();
    // restaurants.menu.push(menus)

    // console.log(menus)
    // setRestaurants({...restaurants , menus : menus })

    // console.log(restaurants);
    setIsFetching(true);
    setErrors(false);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = axios.post("/api/v1/updatepass",{ password , restId : admins}, config);
      setIsFetching(false);

      alert("Password updated Successfully");
      
    } catch (err) {
      setIsFetching(false);
    }
  };
  // const options = {
  //   filterType: "checkbox",
  //   onRowClick: rowData => history.push(`/app/vendors/${rowData[0]}`)
  // };
  useEffect(() => {   
     
    
    if(admins) 
    { 
      console.log(admins) 
    }
   
},[admins])

  //  console.log(menu)
  return (
    <>
      <PageTitle title="Update Password" />
      <Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={() => {
      setIsItemOpen(!isItemOpen)
       
      }
      }
    >
        Update Password
    </Button><br></br>

    {
      isItemOpen ? <Card>
            <p style={{ color: "black", fontSize: 20, fontWeight: 900 }}>
                {" "}
               Update Password
              </p>
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                margin="normal"
                placeholder="password"
                type="text"
                fullWidth
              />

               

 
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={handleSubmit}
              >
                Update
              </Button>
              
            </Card>  
       
      
       : null
    }  
 
       
    </>
  );
}
