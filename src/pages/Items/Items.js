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
 
export default function Items() {
  const classes = useStyles();
  const {isAuthenticated , admins } = useContext(UserStateContext);
  const history = useHistory();
  const [menu, setMenu]= useState([{ item_name: "", image_url: "", description: "", items_price: ""  , sizes :[{name :"" , additional_price :""}]}]);
   
  const [item_name, setItem_name] = useState();
  const [image_url, setImage_url] = useState();
  const [description, setDescription] = useState();
  const [item_price, setItemPrice] = useState();
  
  const [size, setSize] = useState([])
  const [sizeName, setSizeName] = useState();
  const [additional_price, setAdditional_price] = useState();

  const [progress, setProgress] = useState(0);
   
 
  const [isSubscribed, setSubscribed] = useState(true); 
  const [isItemOpen, setIsItemOpen] = useState(false)
  
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState("");

  const createItem = (e) => {
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
      const { data } = axios.post("/api/v1/additem", {menu , restId : admins}, config);
      setIsFetching(false);

      alert("Item added Successfully");
      setMenu([{ item_name: "", image_url: "", description: "", items_price: ""  , sizes :[]}]);
    } catch (err) {
      setIsFetching(false);
    }
  };
  // const options = {
  //   filterType: "checkbox",
  //   onRowClick: rowData => history.push(`/app/vendors/${rowData[0]}`)
  // };
  useEffect(() => {   
     
     
    console.log(isAuthenticated)
    if(admins) 
    { 
      console.log(admins) 
    }
   
},[admins])

{menu.map((e) => (
  e.sizes?.map((e) => (
    
        console.log(e.name)
    ))
))}
  console.log(menu)
  return (
    <>
      <PageTitle title="Items" />
      <Button
      variant="contained"
      size="medium"
      color="secondary"
      onClick={() => {
      setIsItemOpen(!isItemOpen)
      setMenu([])
      setImage_url();
      setItem_name();
      setDescription()
      setItemPrice()
      }
      }
    >
        Add Item
    </Button><br></br>

    {
      isItemOpen ? <Card>
            <p style={{ color: "black", fontSize: 20, fontWeight: 900 }}>
                {" "}
                Add Items
              </p>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="item_name"
                value={menu?.item_name}
                onChange={(e) => {
                  setItem_name(e.target.value);
                }}
                margin="normal"
                placeholder="item_name"
                type="text"
                fullWidth
              />

              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="image_url"
                value={menu?.image_url}
                onChange={(e) => {
                  setImage_url(e.target.value);
                }}
                margin="normal"
                placeholder="image_url"
                type="text"
                fullWidth
              />


                <TextField
                id="description"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="description"
                value={menu?.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                margin="normal"
                placeholder="description"
                type="text"
                fullWidth
              />

                <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="items_price"
                value={menu?.items_price}
                onChange={(e) => {
                  setItemPrice(e.target.value);
                }}
                margin="normal"
                placeholder="items_price"
                type="text"
                fullWidth
              />

<Card>
            <p style={{ color: "black", fontSize: 20, fontWeight: 900 }}>
                {" "}
                Add Size
              </p>
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="name"
                // value={menu.sizes?.sizeName}
                onChange={(e) => {
                  setSizeName(e.target.value);
                }}
                margin="normal"
                placeholder="name"
                type="text"
                fullWidth
              />

              <TextField
                id="additional_price"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="additional_price"
                // value={menu.sizes?.additional_price}
                onChange={(e) => {
                  setAdditional_price(e.target.value);
                }}
                margin="normal"
                placeholder="additional_price"
                type="text"
                fullWidth
              />
 
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={(e) => {
                 
                  menu?.map((e) => (
                    e.sizes?.push({
                    name: sizeName,
                    additional_price : additional_price 
                  })
                  ))
                  //  size?.push({
                  //   name: sizeName,
                  //   additional_price : additional_price 
                  // }); 
                  // setMenus([...menus , {item_name : item_name ,image_url : image_url }])
                    
                   
                  // restaurants.menu.push(menus)
                  // setRestaurants({...restaurants , menu : [...menus] })
                }}
              >
                Add Size
              </Button>
              {menu.map((e) => (
                e.sizes?.map((e) => (

                     <p>{e.name}</p>
                  ))
              ))}
            </Card>
            <br></br><br></br>


              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={(e) => {
                  // setMenus([...menus , {item_name : item_name ,image_url : image_url }])
                    menu.push({
                    item_name: item_name,
                    image_url: image_url,
                    description : description , 
                    items_price : item_price,
                    // sizes : menu?.sizes
                  });
                  // restaurants.menu.push(menus)
                  // setRestaurants({...restaurants , menu : [...menus] })
                }}
              >
                Add Item
              </Button>
              {menu?.map((e) => (
                <p>item name:{e.item_name} </p>
              ))}


              <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={createItem}
            >
              Add
            </Button>
            </Card>  
            
      
       : null
    }  
 
       
    </>
  );
}
