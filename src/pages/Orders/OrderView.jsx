import { Avatar, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select } from '@material-ui/core'
import { AddToHomeScreen, ArrowDownward } from '@material-ui/icons'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {Loading} from '../Loading/Loading'
import { AdditionalData } from './AdditionalData'


export const OrderView = (props) => {
    let date =  new Date(props.rowData.createdAt)
    let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
   console.log(props.rowData)
   const [userInformation, setUserInformation] = useState({})
   const [categorisData, setCategorisData] = useState([])
   const [additionalData, setAdditionalData] = useState({})
   const [isComplete, setIsComplete] = useState(false)
   const [isAdditionalCategories, setAdditionalCategories] = useState(false)
   const [isLoading, setIsLoading] = useState(true)
   const [isAccepted, setIsAccepted] = useState(false)
   const userData = ()=>{
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
    }
      axios.post("api/v1/singleRestaurent/order/userinfo",{_id:props.rowData.user_id,details:props.rowData.details},config).then((res)=>{
        console.log(res)
          setUserInformation(res.data.data[0])
          setCategorisData(res.data.category)
          setIsLoading(false)
      })
   }
   function setAllAditional(props){
    console.log(props,"jiii")
    setAdditionalCategories(true)
    setAdditionalData({details:props.details[0].additions,data: props.data.additions})
   }
   const CategoryList = (props)=>{
    //   const {details, data} = props
    //    let additionalPass = props.details[0].additions
    //    let rowDetails = props.data.additions
    //    let arrayOfAdditional = {
    //     additionalPass,rowDetails
    //    }
       return(
           <>
            <div style={{display:"inline-block",width:"300px"}}>
                            <div>
                                <div class="container2">

                                    <img src={props.data.image_url} style={{width:"100%"}} />
                                    <div class="content-box1">
                                        <h4 style={{fontSize:"1.33em"}} class="name">{props.data.item_name}</h4>
                                        <p>{props.data.description?props.data.description:<>A burguer typically considered a sandwich, consisting of one or more cooked patties-usually placed inside a sliced bread roll or bun</>}</p>
                                        <p></p>
                                  
                                        <div class="btn1">
                                        <h2 class="price" style={{fontSize:"1.5em"}}>$ {props.data.item_price}</h2>
                                        
                                        <button style={{cursor:"pointer"}} onClick={()=>{setAllAditional(props)} }>View</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
           </>
       )
   }
   useEffect(()=>{
    userData()
   },[])
   useEffect(()=>{
     console.log(isAccepted)
   },[isAccepted])
  return (
    <div>
    {isLoading?<><Loading/> </>:<> 
    {isAdditionalCategories?<><AdditionalData additionalData={additionalData}/></>:<>  
    <div class="editOrder-container">
   

    <div class="details-cont">
        <li>
            <h3>Order Id</h3>
            <a >{props.rowData._id}</a>
        </li>
        <li>
            <h3>Order Type</h3>
            <a>{props.rowData.order_type}</a>
        </li>
        <li>
            <h3>Total Amount</h3>
            <a>${props.rowData.order_amount}</a>
        </li>
        <li>
            <h3>Name</h3>
            <a>{userInformation.name}</a>
        </li>
        <li>
            <h3>Time</h3>
            <a>{time}</a>
        </li>
        <li>
            <h3>Time</h3>
            <a>{time}</a>
        </li>
        <li>
            <h3>isAccepted</h3>
            <a><select name="isAccepted" value={isAccepted} style={{padding:"10px 0", width:"70px"}} onChange={(e)=>setIsAccepted(e.target.value)}><option value={true}>Yes</option><option value={false}>No</option></select></a>
        </li>
        <li>
            <h3>isComplete</h3>
            <a><select name="isAccepted" value={isComplete} style={{padding:"10px 0", width:"70px"}} onChange={(e)=>setIsComplete(e.target.value)}><option value={true}>Yes</option><option value={false}>No</option></select></a>
        </li>
        <li>
            <h3>Mobile App</h3>
            <a>{userInformation.phone_number}</a>
        </li>
        <li>
            <h3>Order Status</h3>

            <div class="dropdown" >
            <div style={{width:"300px"}}>
            <div class="dropdown">
                    <a href="#" class="show">{props.rowData.order_status}
                        <i class="fas fa-caret-down"></i>
                    </a>
                    <div id="dropdown-lists">
                        <p><span>Status</span></p>
                        <hr/>
                        <a href="#" class="active">{props.rowData.order_status}</a>
                        <a href="#">New</a>
                        <a href="#">Ongoing</a>
                        <a href="#">Cancelled</a>
                    </div>
                </div>
      </div>
            </div>
        </li>
    </div>

    <div class="paidTotal-cont">
        <div class="paidTotal paid-cont">
            <h3>Curbside</h3>
            {userInformation.name?<>{userInformation.curbside.map((car)=>{
                return(<>
                  <h4>{car.make}</h4>
                  <p>{car.platenumber}</p>
                  <span style={{height:"20px",width:"20px",backgroundColor:`#${car.color}`,borderRadius:"100%", border:"2px solid black"}}></span>
                </>)
            })}</>:""}
        </div>
        <div class="paidTotal status-cont">
            <p><span>Status</span></p>
           <h2 style={{textTransform:"uppercase"}}>{props.rowData.order_status}</h2>
           <p>2022-04-17 08:41</p>
        </div>
    </div>

    <div class="address-cont">
        <p><span>ADDRESS</span></p>
        <a>{userInformation.name?<>{userInformation.addresses.map((data)=>{return<>{data.address}</>})}</>:<>No address found</>}</a>
    </div>

    <div style={{background:"white",padding:"10px", borderRadius:"10px"}}>
        <h5 style={{padding:"10px"}}>Product</h5>
        {userInformation.name?<>{categorisData.map((data)=>{
            return(<> <CategoryList data={data} details={props.rowData.details}/>    </>)
        })}</>:""}
        </div> 
</div></>}</>}
</div>
  )
}
