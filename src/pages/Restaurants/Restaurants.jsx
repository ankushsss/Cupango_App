import React, { useState, useEffect ,useContext} from "react";
import classnames from "classnames";
import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core";
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
import "./restaurant.css"
import { SingleRestaurantData } from "./SingleRestaurentData";
import { Loading } from "../Loading/Loading";
const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  media: {
    height: 140,
  },
}));
const ViewResturant = ()=>{
  // dispatch(viewRestaurentDetails(data))
  // history.push({pathname:"/app/restaurentdetails",state:data })
}
export default function Restaurants() {
  const classes = useStyles();
  const history = useHistory();
  const {isAuthenticated , admins } = useContext(UserStateContext);
  const [restaurants, setRestaurants] = useState({
    name: "",
    address: "",
    image_url :"",
    description: "",
    latitude: "",
    longitude: "",
    rating: "",
    category: [],
    number_of_ratings: "",
    profile_percentage: "",
    experience: "",
    about: "",
    phone_number : "",
    is_verified :false,
    field_changed:"",
    status:"",
    // menu: [{ item_name: "", image_url: "", description: "", items_price: ""  , sizes :[]}],
    available_modes: [],
    calender :[{day: "",
      start_time: "",
      end_time: ""}],
      certifications: [{
        certificateName: "",
        certifiacte_url: ""
    }],
    ownerId :admins,
     
  });
 
 const [isRestaurent, setIsRestaurent] = useState(false)
 const [restaurentDetails, setRestaurentDetails] = useState({})
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
      isCheck()
  },[])

  const isCheck = () =>{
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("admin_token")}`
      }
    };
    console.log(localStorage.getItem("admin_token"),"trken")
    axios.post("/api/v1/singlerestaurant/", {restaurants:"restaurants"}, config).then((res)=>{
      console.log(res.status,"hiii")
      if(res.status == 400)
      {
        console.log(res)
        setIsRestaurent(false)
        setIsLoading(false)
      }
      if(res.status == 200)
      {
        setIsRestaurent(true)
        setRestaurentDetails(res.data)
        setIsLoading(false)
      }
    }).catch((err)=>{
      console.log(err.status)
        console.log(err)
        setIsRestaurent(false)
        setIsLoading(false)
      
    })
  }

  const [type, setType] = useState();

   
  const [day, setDay] = useState();
  const [start_time, setStart_time] = useState();
  const [end_time, setEnd_time] = useState();


  const [certificateName, setCertificateName] = useState();
  const [certificate_url, setCertificate_url] = useState();
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setRestaurants({ ...restaurants, [name]: value });
    // console.log(subadmins)
  };

  
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState("");

  const createRestaurant = (e) => {
    e.preventDefault();
    // restaurants.menu.push(menus)

    // console.log(menus)
    // setRestaurants({...restaurants , menus : menus })

    console.log(restaurants);
    setIsFetching(true);
    setErrors(false);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = axios.post("/api/v1/addrestaurant", restaurants, config);
      setIsFetching(false);

      alert("Restaurant Created Successfully");
      setRestaurants({
        name: "",
        address: "",
        description: "",
        latitude: "",
        longitude: "",
        rating: "",
        category:[],
        number_of_ratings: "",
        profile_percentage: "",
        experience: "",
        about: "",
        phone_number : "",
        is_verified :false,
        field_changed:"",
        status:"",
        menu: [],
        calender:[],
        certifications :[],
         
      });
    } catch (err) {
      setIsFetching(false);
    }
  };

  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  useEffect(() => {   
     
     
    console.log(isAuthenticated)
    if(admins) 
    { 
      console.log(admins) 
    }
   
},[admins])
    const RestContainer = ()=>{
      return(<>
         {isRestaurent?<SingleRestaurantData restData = {restaurentDetails} setReload={isCheck}/>:      <Button
        variant="contained"
        size="medium"
        color="secondary"
        onClick={() => {
          setIsRestaurantOpen(!isRestaurantOpen);
          setRestaurants({
            name: "",
            address: "",
            image_url:"",
            description: "",
            latitude: "",
            longitude: "",
            rating: "",
            category: [],
            number_of_ratings: "",
            profile_percentage: "",
            experience: "",
            about: "",
            // menu: [],
            available_modes: [],
            calender:[],
            certifications:[],
            ownerId :admins,
            
          });

   
          // setMenus([]);
          setType()
          setDay()
          setStart_time()
          setEnd_time()
          setCertificateName()
          setCertificate_url()
        }}
      >
        Add/Edit Restaurant
      </Button>}
        
        
        </>)
    }
  return (
    <>
      <PageTitle title="Restaurants" />

      <br></br>
      {isLoading?<Loading/>:<RestContainer/>}
     {/* <RestContainer/> */}
      {isRestaurantOpen ? (
        <Grid item xs={12} md={12}>
          <Widget title="Add Restaurant" disableWidgetMenu>
            <br></br>
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="name"
              value={restaurants.name}
              onChange={handleChange}
              margin="normal"
              placeholder="Name"
              type="text"
              fullWidth
            />

            <TextField
              id="image_url"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="image_url"
              value={restaurants.image_url}
              onChange={handleChange}
              margin="normal"
              placeholder="image_url"
              type="text"
              fullWidth
            />
            <TextField
              id="address"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="address"
              value={restaurants.address}
              onChange={handleChange}
              margin="normal"
              placeholder="Address"
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
              value={restaurants.description}
              onChange={handleChange}
              margin="normal"
              placeholder="description"
              type="text"
              fullWidth
            />
            <TextField
              id="latitude"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="latitude"
              value={restaurants.latitude}
              onChange={handleChange}
              margin="normal"
              placeholder="latitude"
              type="text"
              fullWidth
            />
            <TextField
              id="longitude"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="longitude"
              value={restaurants.longitude}
              onChange={handleChange}
              margin="normal"
              placeholder="longitude"
              type="text"
              fullWidth
            />
            <TextField
              id="rating"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="rating"
              value={restaurants.rating}
              onChange={handleChange}
              margin="normal"
              placeholder="rating"
              type="Number"
              fullWidth
            />

            {/* <TextField
              id="category"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="category"
              value={restaurants.category}
              onChange={handleChange}
              margin="normal"
              placeholder="category"
              type="text"
              fullWidth
            /> */}

            <TextField
              id="number_of_ratings"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="number_of_ratings"
              value={restaurants.number_of_ratings}
              onChange={handleChange}
              margin="normal"
              placeholder="number_of_ratings"
              type="Number"
              fullWidth
            />

            <TextField
              id="profile_percentage"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="profile_percentage"
              value={restaurants.profile_percentage}
              onChange={handleChange}
              margin="normal"
              placeholder="profile_percentage"
              type="Number"
              fullWidth
            />
            <TextField
              id="experience"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="experience"
              value={restaurants.experience}
              onChange={handleChange}
              margin="normal"
              placeholder="experience"
              type="text"
              fullWidth
            />

            <TextField
              id="about"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="about"
              value={restaurants.about}
              onChange={handleChange}
              margin="normal"
              placeholder="about"
              type="text"
              fullWidth
            />
            <TextField
              id="phone_number"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="phone_number"
              value={restaurants.phone_number}
              onChange={handleChange}
              margin="normal"
              placeholder="phone_number"
              type="text"
              fullWidth
            />
            <TextField
              id="field_changed"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="field_changed"
              value={restaurants.field_changed}
              onChange={handleChange}
              margin="normal"
              placeholder="field_changed"
              type="text"
              fullWidth
            />
          <TextField
              id="status"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              name="status"
              value={restaurants.status}
              onChange={handleChange}
              margin="normal"
              placeholder="status"
              type="text"
              fullWidth
            />
          <Grid item xs={12} md={12}>
          <Widget title="Category" disableWidgetMenu> 
              <label> Veg   <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.category?.push("Veg") 
                   
                  
                   }
                  //  if(!e.target.checked) {
                  //   restaurants.available_modes?.pop("Pizza")
                  // }
                   
                   }} /></label>
            
              <label> Non Veg <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.category?.push("Non Veg")
                 
                
              }}} /></label>

          <label> Combo Meal <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.category?.push("Combo Meal")
                 
                
              }}} /></label>
                 <label> Starter <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.category?.push("Starter")
                 
                
              }}} /></label>
                 
               
              {restaurants.category && restaurants.category?.map((e,i) => (
                <p>category: {e} </p>
              ))}
              
              </Widget>
        </Grid><br></br> <br></br>
              <Grid item xs={12} md={12}>
          <Widget title="Available Modes" disableWidgetMenu> 
              <label> Pickup   <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.available_modes?.push("Pickup")
                 
                
              }}} /></label>
            
              <label> Curbside   <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.available_modes?.push("Curbside")
                 
                
              }}} /></label>
              <label> Delivery  <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.available_modes?.push("Delivery")
                 
                
              }}} /></label>
                {/* <label> Fav's <input type="checkbox"
              onInput={(e) => {
                 if(e.target.checked) {
                   restaurants.available_modes?.push("Fav's")
                 
                
              }}} /></label> */}
              {/* <TextField
                id="type"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="type"
                value={restaurants.available_modes?.type}
                onChange={(e) => {
                  setType(e.target.value);
                }}
                margin="normal"
                placeholder="type"
                type="text"
                fullWidth
              />
               <Button
                 variant="contained"
                size="medium"
                color="secondary"
                onClick={(e) => {
                   
                  restaurants.available_modes?.push(type);
                  
                }}
              >
                Add  
              </Button> */}
              {restaurants.available_modes?.map((e,i) => (
                <p>Type: {e} </p>
              ))}
              </Widget>
        </Grid>
              <br></br> <br></br>
              
              <Grid item xs={12} md={12}>
          <Widget title="Add calender" disableWidgetMenu>
             
              <TextField
                id="day"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="day"
                value={restaurants.calender?.day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
                margin="normal"
                placeholder="day"
                type="text"
                fullWidth
              />

              <TextField
                id="start_time"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="start_time"
                value={restaurants.calender?.start_time}
                onChange={(e) => {
                  setStart_time(e.target.value);
                }}
                margin="normal"
                placeholder="start_time"
                type="time"
                fullWidth
              />


                <TextField
                id="end_time"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="end_time"
                value={restaurants.calender?.end_time}
                onChange={(e) => {
                  setEnd_time(e.target.value);
                }}
                margin="normal"
                placeholder="end_time"
                type="time"
                fullWidth
              />

             
 
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={(e) => {
                  // setMenus([...menus , {item_name : item_name ,image_url : image_url }])
                  restaurants.calender.push({
                    day: day,
                    start_time: start_time,
                    end_time : end_time , 
                     
                  });
                  // restaurants.menu.push(menus)
                  // setRestaurants({...restaurants , menu : [...menus] })
                }}
              >
                Add calender
              </Button>
              {restaurants.calender?.map((e) => (
                <p>day:{e.day} </p>
              ))}
              </Widget>
        </Grid>
            <br></br><br></br>
            <Grid item xs={12} md={12}>
          <Widget title="Add certifications" disableWidgetMenu>
            
              <TextField
                id="certificateName"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="certificateName"
                value={restaurants.certifications?.certificateName}
                onChange={(e) => {
                  setCertificateName(e.target.value);
                }}
                margin="normal"
                placeholder="certificateName"
                type="text"
                fullWidth
              />

              <TextField
                id="certificate_url"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                name="certificate_url"
                value={restaurants.certifications?.certificate_url}
                onChange={(e) => {
                  setCertificate_url(e.target.value);
                }}
                margin="normal"
                placeholder="certificate_url"
                type="text"
                fullWidth
              />
 
 
              <Button
                variant="contained"
                size="medium"
                color="secondary"
                onClick={(e) => {
                  // setMenus([...menus , {item_name : item_name ,image_url : image_url }])
                  restaurants.certifications.push({
                    certificateName: certificateName,
                    certificate_url: certificate_url,
                     
                     
                  });
                  // restaurants.menu.push(menus)
                  // setRestaurants({...restaurants , menu : [...menus] })
                }}
              >
                Add certification
              </Button>
              {restaurants.certifications?.map((e) => (
                <p>Name:{e.certificateName} </p>
              ))}
              </Widget>
        </Grid>
            <br></br><br></br>
         
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={createRestaurant}
            >
              Add
            </Button>
          </Widget>
        </Grid>
      ) : null}

    
    </>
  );
}
