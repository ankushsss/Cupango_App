import React , { useState , useEffect}from "react";
import {  Button, CardMedia, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
 import './orderstype.css'
import axios from "axios";
 
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Widget from "../../components/Widget/Widget";
import image1 from '../../img/image1.jpg'
import image2 from '../../img/image2.jpg'
import image3 from '../../img/image3.jpg'
import { NavLink, Redirect } from "react-router-dom";
import { OrderView } from "./OrderView";
 
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
  ,media :{
      height : 200
  }
}))




export default function OrdersType() {
const classes = useStyles();
const [tableView, setTableView] = useState(true)
const [errors, setErrors] = useState("");
const [isFetching, setIsFetching] = useState(false);
const [order, setOrder] = useState([])

 
useEffect(() => {
  
  

},[])
console.log(order)
  return (
    <>
     {tableView?<OrderView/>:<><PageTitle title="Categories" />
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <Widget  disableWidgetMenu>
            <div className={classes.dashedBorder}>
            <CardMedia
                        className={classes.media}
                        image={image1}
                        title={"Image"}
                    />
                    <br></br>
                    <div className="catFoot">
                        <div className="catItem">
                            <Typography variant="h3" className={classes.text}>
                            <b>Dine In</b> </Typography>
                        </div>
                        <div className="catItem catbut">
                            {/* <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            >
                                All Orders
                            </Button>  */}
                            <NavLink to={`/app/orders`}>All Orders</NavLink>
                        </div> 
                    </div> 
              
            </div>
          </Widget>
           
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <Widget  disableWidgetMenu>
            <div className={classes.dashedBorder}>
            <CardMedia
                        className={classes.media}
                        image={image2}
                        title={"Image"}
                    />
                    <br></br>
                    <div className="catFoot">
                        <div className="catItem">
                            <Typography variant="h3" className={classes.text}>
                            <b>Dine out</b> </Typography>
                        </div>
                        <div className="catItem catbut">
                            {/* <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            onClick={() => 
                            // Sign-out successful.
                            // console.log('Sign-out successful')
                            <NavLink to={`/app/orders`}>All Institutes</NavLink>
   
                          }
                            >
                                All Orders
                            </Button>  */}
                            <NavLink to={`/app/orders`}>All Orders</NavLink>
                        </div> 
                    </div> 
               
            </div>
          </Widget>
           
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
        <Widget  disableWidgetMenu>
            <div className={classes.dashedBorder}>
            <CardMedia
                        className={classes.media}
                        image={image3}
                        title={"Image"}
                    />
                    <br></br>
                    <div className="catFoot">
                        <div className="catItem">
                            <Typography variant="h3" className={classes.text}>
                            <b>Delivery</b> </Typography>
                        </div>
                        <div className="catItem catbut">
                            {/* <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            >
                                All Orders
                            </Button>  */}
                            <NavLink to={`/app/orders`}>All Orders</NavLink>
                        </div> 
                    </div> 
               
            </div>
          </Widget>
           
        </Grid>
      </Grid></>}
    </>
  );
}
