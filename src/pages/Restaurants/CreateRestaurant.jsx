import React, { useState ,useEffect } from "react";
import classnames from "classnames";
import { Box, Button, Card, CardMedia, CircularProgress, Dialog, FormControl, FormControlLabel, Grid, Input, InputLabel, LinearProgress, MenuItem, Select, Switch, TextField } from "@material-ui/core";
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
import { Delete, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

//  import viewRestaurentCurrentData from "../../components/ReduxComponent/reducers/restaurantReducer";
import viewRestaurentDetails from "../../components/ReduxComponent/actions/restaurantActions";
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


export default function CreateRestaurant() {
  const classes = useStyles();
  const history = useHistory();
  const [restaurants, setRestaurants]= useState({email:"", password:"Cupango@123",role:"restaurant",restaurantId: Date.now()});
  const [allRestaurants, setAllRestaurant] = useState([])
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch()
    useEffect(()=>{
      getAllRestaurants()
    },[])
    const getAllRestaurants = async()=>{
      try {
         axios.get("/api/v1/restaurant/",  {header: {
          "Content-Type": "application/json"
      }}).then((res)=>{
        console.log(res)
        setAllRestaurant(res.data.data)
        setLoad(false)
      }).catch((err)=>{
        console.log(err)
        setLoad(true)
      })
         
      }catch (err) {
        console.log(err)
    }
    }
    
function deleteResturant(_id) {
  const config = {
    header: {
        "Content-Type": "application/json"
    }
  }
  axios.post("/api/v1/restaurant/delete", {_id}, config).then((deleted) => {
    console.log(deleted);
    let updateArray =   allRestaurants.filter(function (f) { return f._id !== _id })
    setAllRestaurant(updateArray)
    alert("Sucess")
  }).catch( (error) => {
    console.log(error);
  }

  )
}
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setRestaurants({ ...restaurants, [name]: value });
        // console.log(subadmins)
    }
    const [isFetching, setIsFetching] = useState(false);
    const [errors, setErrors] = useState("");

    const createRestaurant = async(e)=>{
        e.preventDefault();
        setIsFetching(true)
        setErrors(false);
        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }
  
            try {
                const {data} = await axios.post("/api/v1/signup", restaurants, config);
                setIsFetching(false);
                console.log("hii success")
              }catch (err) {
                setIsFetching(false)
                console.log(err)
            }
           
            alert('Restaurant Created Successfully')
            setIsRestaurantOpen(!isRestaurantOpen)
            setRestaurants({email :"" , password:"Cupango@123" , role : "restaurant",restaurantId: Date.now()})
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
  
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false)
  
  const [restaurant, setRestaurant] = useState([])
  useEffect(() => {
    
    const restaurantData = async () => {
  
      setIsFetching(true)
      setErrors(false);
      const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
    }
  
       
      try {
        const { data } = await axios.get("/api/v1/getrestaurantId",config).catch(err => {
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
        setRestaurant(data.restaurantId)
        /* setProduct(data.products) */
  
        setIsFetching(false);
  
      } catch (err) {
  
        setErrors(err.message)
      }
    }
    restaurantData()
   
  
  },[])
  console.log(restaurants)
 const AllRestaurents = ()=>{
   return(
     <>
     {allRestaurants.map((data)=>{
          return(<>
           <div key={data._id} class="card card__small card__dark card__dark--magenta" style={{width:"30%", display:"inline-block"}}>
            <div class="media" > <img src={data.image_url}alt="" width="640" height="426"/> </div>
            <div class="primary-title">
              <div class="primary-text">{data.name}</div>
              <div class="secondary-text">rating : {data.rating}</div>
            </div>
            <div class="actions border-top">
              <div class="action-buttons">
                 <Button onClick={()=>ViewResturant(data)}style={{color:"white", textAlign:"right"}}>View</Button>
                 <Button onClick={()=>deleteResturant(data._id)}style={{color:"white", textAlign:"right"}}>Delete</Button>
              </div>
            </div>
          </div>
          
          </>)
        })}
     
     </>
   )
 }
  const ViewResturant = (data)=>{
    dispatch(viewRestaurentDetails(data))
    localStorage.setItem("ownerId", data.ownerId)
    history.push({pathname:"/app/restaurentdetails",state:data })
  }
  return (
    <div>
      <PageTitle title="Restaurants" />
     <br></br>
     

    {
      isRestaurantOpen ?  
      <Dialog
      open={true}
      onClose={() => setIsRestaurantOpen(false )}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    > 
      <Grid item xs={12} md={12}>
          <Widget title="Create Restaurant" disableWidgetMenu>
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
                value={restaurants.email}
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
                value={restaurants.password}
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
                onClick={createRestaurant}
              >
                  Add 
              </Button>
          </Widget>  
        </Grid>
        </Dialog>
      
       : null
    }  
    {/* <PageTitle title="Restaurants" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Order List"
            data={restaurant}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        </Grid> */}
        <Box >
       <div class="card card__small card__dark card__dark--magenta " style={{width:"30%", display:"inline-block", textAlign:"center "}} >
           <div class="media" style={{display:"flex" ,width:"100%", justifyContent:"center"}}> 
          
                 <button onClick={() => {
                setIsRestaurantOpen(!isRestaurantOpen)
                setRestaurants({email :"" , password:"Cupango@123" , role : "restaurant" ,restaurantId: Date.now()})
                }
                } style={{ width:"100%",backgroundColor:"transparent", color:"white", cursor:"pointer"}}><h5>Create Restaurant Owner</h5></button>
              
          </div>
            
            </div>
        
            {load? <LinearProgress style={{top:"0"}}/>:<AllRestaurents/>  }
          
        </Box>
    </div>
  );
}
