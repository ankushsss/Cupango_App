import React,{ useEffect, useState }  from 'react'
import { useSelector } from 'react-redux'
import { ArrowRightAltOutlined, Close, Edit, Phone, RestaurantMenu, RestaurantMenuTwoTone, StarBorder, VerifiedUser, AddCircle, Delete } from '@material-ui/icons'
import { Button} from '@material-ui/core'
import { RestaurentEditModel } from './RestaurentEditModel'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Loading } from '../Loading/Loading'
export const RestaurantProfile = () => {
    const [editModel, setEditModel] = useState({open:false,type:""})
    const [restData, setRestData] = useState(useSelector((state)=>state.restaurentView))

    console.log(localStorage.getItem("ownerId"))
    let history = useHistory()
    console.log(history.location.state,"sssssssssssssssssssssssssssssssssss")
    const [dataCategory, setDataCategory] = useState([])
    const [menu, setMenu] = useState([])
    const [restaurantBasicData, setRestaurantBasicData] = useState({
        ownerId:"",
        name: "",
        address:"",
        image_url :"",
        description: "",
        latitude: "",
        longitude: "",
        rating: "",
        number_of_ratings: "",
        profile_percentage:"",
        experience: "",
        about: "",
        phone_number : "",
        is_verified :"",
        field_changed:"",
        status:"",
       
      });
      const [menuItem, setMenuItem] = useState({
          item_name:"",
          category_name:"",
          description:"",
          image_url:"",
          item_price:"",
          _id:""
      })
      const [restaurentDetails, setRestaurentDetails] = useState({})
      const [isLoadingAgain, setIsLoadingAgain] = useState(true)
      const [additions,setAdditions] = useState([])
    // useEffect(()=>{
    //     check()
    // },[])
    // let check = ()=>{
    //     if(history.location.state == undefined)
    //     {
    //         history.push("/app/createrestaurant")
    //     }
    // }
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
      axios.post("/api/v1/singlerestaurant/", {ownerId:localStorage.getItem("ownerId")}, config).then((res)=>{
        console.log(res.status,"hiii")
        if(res.status == 400)
        {
          console.log(res)
        //   setIsRestaurent(false)
          
        }
        if(res.status == 200)
        {
        //   setIsRestaurent(true)
        console.log(res.data)
          setRestaurentDetails(res.data)
          setRestData(res.data)
          setDataCategory(res.data.category)
          setRestaurantBasicData({
            ownerId:res.data.ownerId,
            name: res.data.name,
            address:res.data.address,
            image_url :res.data.image_url,
            description: res.data.description,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
            rating: res.data.rating,
            number_of_ratings: res.data.number_of_ratings,
            profile_percentage:res.data.profile_percentage,
            experience: res.data.experience,
            about: res.data.about,
            phone_number : res.data.phone_number,
            is_verified :res.data.is_verified,
            field_changed:res.data.field_changed,
            status:res.data.status,
          })
          console.log(res.data.menu)
          setMenu(res.data.menu)
          setIsLoadingAgain(false)
        }
      }).catch((err)=>{
        console.log(err.status)
          console.log(err)
        //   setIsRestaurent(false)
        setIsLoadingAgain(false)
        
      })
    }
    const DataCatagories = ()=>{
        return(
            <>
                    {
                    dataCategory.map((data,index)=>{
                            return(
                                <>
                                <span href = "#Italian"key={data}>{data}</span>
                                </>
                            )
                    })}
                    <span style={{fontWeight:"900", cursor:"pointer"}} onClick={() => setEditModel({open:true, type:"categories"})}>Add Categories</span>
            </>
        )
    }
    const deleteMenuCard = (updateArray)=>{
      const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("admin_token")}`
          }
        };
        console.log(menu)
        console.log(localStorage.getItem("admin_token"), "trken")
        axios.post("/api/v1/menuItem/delete/", { restaurants: updateArray, type: editModel.type, ownerId: restaurantBasicData.ownerId, menuId:menuItem._id }, config).then((res) => {
          console.log(res.status, "hiii")
          if (res.status == 200) {
            console.log("success")
    
            setEditModel({ open: false })
            isCheck()
          }
        }).catch((err) => {
          console.log(err)
    
    
        })
  }
    function sendToClient(){
        const config = {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("admin_token")}`
            }
          };
          let data = {
            item_name:"",
            category_name:"",
            description:"A burguer typically considered a sandwich, consisting of one or more cooked patties-usually placed inside a sliced bread roll or bun Onion, Lettuce, Tomatoe, Patty, Chees ",
            image_url:"",
            item_price:"",
            additions:[],
            sizes:[],
            tag:[]
          }
          console.log(localStorage.getItem("admin_token"),"trkenhiiiiiiiiiiiiiiiiiiiii")
          axios.post("/api/v1/editsinglerestaurant/",{restaurants:data,type:"newMenu",ownerId:restaurantBasicData.ownerId },config).then((res)=>{
              console.log("hiii")
              window.location.reload(false);
          }).catch((err)=>{
              console.log(err)
          })
    }
    const MenuList = ()=>{
        function editMenuCard(data)
        {
            console.log(data,"hii")
            setMenuItem({
                item_name:data.item_name,
                category_name:data.category_name,
                description:data.description,
                image_url:data.image_url,
                item_price:data.item_price,
                _id:data._id
            })
           setEditModel({
               open:true,
               type:"menu"
           })
            
        }
        function setdeleteMenuCard(data, index)
        {
           console.log(menu[index])
         let updateArray =   menu.filter(function (f) { return f._id !== data })
            console.log(updateArray)
            setMenu(updateArray)
            deleteMenuCard(updateArray)
        }
        const additionalData = (data, additionalDataupdate)=>{
            setMenuItem({
                item_name:data.item_name,
                category_name:data.category_name,
                description:data.description,
                image_url:data.image_url,
                item_price:data.item_price,
                _id:data._id
            })
            setAdditions(additionalDataupdate)
            setEditModel({
                open:true,
                type:"additional"
            })
            isCheck()
        }
        return(
            <>
            {
                menu.map((data, index)=>{
                    return(
                        <>
                        {/* <div style={{margin:"20px 0" , display:"flex", justifyContent:"center",}} > <div class="container1" >
                            <div class="layer-one" >
                            <input type="checkbox" id="bookmark"/>
                            <label for="bookmark">
                                <i class="fas fa-bookmark"></i></label>
                            </div>
                                <div class="layer-two">
                                <div class="text">
                                    <h5>{data.item_name}</h5>
                                    <button style={{cursor:"pointer"}} onClick={()=>editMenuCard(data)}>Edit</button>
                                </div>
                                </div>
                            </div>  
                            </div> */}
                            <div style={{display:"inline-block",width:"300px"}}>
                            <div>
                                <div class="container2">
                                <button style={{backgroundColor:"black",border:"0",color:"white",position:"absolute",left:"0",zIndex:"3",borderBottomRightRadius:"20px", cursor:"pointer", padding:"10px"}} onClick={()=>setdeleteMenuCard(data._id, index)}><Delete fontSize="small"/></button>
                                    <button style={{backgroundColor:"black",border:"0",color:"white",position:"absolute",right:"0",zIndex:"3",borderBottomLeftRadius:"20px", cursor:"pointer", padding:"10px"}} onClick={()=>editMenuCard(data)}><Edit fontSize="small"/></button>
                                    <img src={data.image_url} style={{width:"100%"}} />
                                    <div class="content-box1">
                                        <h4 style={{fontSize:"1.33em"}} class="name">{data.item_name}</h4>
                                        <p>{data.description?data.description:<>A burguer typically considered a sandwich, consisting of one or more cooked patties-usually placed inside a sliced bread roll or bun</>}</p>
                                        <p>Onion, Lettuce, Tomatoe, Patty, Cheese</p>
                                        <div class="btn1">
                                        <h2 class="price" style={{fontSize:"1.5em"}}>$ {data.item_price}</h2>
                                        
                                        <button style={{cursor:"pointer"}} onClick={()=>additionalData(data,data.additions)}>Additional</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        
                        </>
                    )
                })
            }
            <div style={{display:"inline-block",width:"50%",overflow:"hidden",position:"relaive"}}>
                            <div style={{position:"absolute",top:"20px",right:"20px"}}>
                                <button class="container2button" onClick={()=>sendToClient()} >
                                   Add Menu
                                </button>
                            </div>
                </div>
           
            </>
        )
    }
  const editRest = ()=>{
      console.log(restData)
      setEditModel({open:true,type:"basic"})
  }
  return (
    <div>
      {isLoadingAgain?<Loading/>:<><div class = "__area text-center">
    <div class = "__card">
        <Button onClick={editRest} class = "__favorit"><Edit/></Button>
        
      <div style={{height:"200px",overflow:"hidden"}}><img src = {restaurentDetails.image_url ? restaurantBasicData.image_url:"https://i.pinimg.com/originals/74/84/4c/74844c4207ec819b6ffaa6291591311e.jpg"} class="img-fluid __img"/></div>
      <div class = "__card_detail text-left">
        <h4><div class = "__type" ><span style={{backgroundColor:"white!important"}}><RestaurantMenu/></span>{restaurantBasicData.name}</div></h4>
        <div class = "__type"><span href = "#Italian"><Phone/>{restaurentDetails.phone_number}</span><span href = "#Italian"><StarBorder/>{restaurentDetails.rating}.0</span><span href = "#Italian">{restData.is_verified?<><VerifiedUser/>Verified</>:<><Close/>Not Verified</>}</span></div>
        <p>
          {restData.address}
          
        </p>
        <div class = "__type">
          {restData.name?<DataCatagories/>: <span href = "#Italian">Italian</span>}

        </div>
            <div class = "__detail">
                <i class = "la la-clock-o"></i> <br/>
                <span>open</span><br/> 
                <div class = "__type"><span href = "#Italian">M</span><span href = "#Italian">T</span><span href = "#Italian">W</span><span href = "#Italian">Th</span></div>
            </div>
        <div>
            <br/>
        <div  style={{textAlign:"center",fontSize:"12px",color:"#fc9d52"}}><span href = "#Italian" style={{fontSize:"22px", margin:"0 auto"}}><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><RestaurantMenuTwoTone/> MENU <RestaurantMenuTwoTone/> <ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/></span></div>
        </div>
       <div style={{textAlign:"center"}}> {restData.name?<MenuList/>:""}</div>
      </div>
    </div>
    </div>
     <RestaurentEditModel setReload={isCheck} additions={additions} setAdditions={setAdditions} dataCategory={dataCategory} setDataCategory={setDataCategory} editModel={editModel} setEditModel={setEditModel} restaurantBasicData={restaurantBasicData} menuItem={menuItem} setMenuItem={setMenuItem} setRestaurantBasicData={setRestaurantBasicData}/>
         </> }
  </div>
  )
}
