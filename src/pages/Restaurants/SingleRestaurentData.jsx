import React,{ useEffect,useState }  from 'react'
import { useSelector } from 'react-redux'
import { ArrowRightAltOutlined, Close, Edit, Phone, RestaurantMenu, RestaurantMenuTwoTone,AddCircle, StarBorder, VerifiedUser, Delete } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { Button} from '@material-ui/core'
import { RestaurentEditModel } from './RestaurentEditModel'
import axios from 'axios'

export const SingleRestaurantData = (props) => {
    const [editModel, setEditModel] = useState({open:false,type:""})
    const [restData, setRestData] = useState(props.restData)
    const history = useHistory
    const [menu, setMenu] = useState(restData.menu)
    const [restaurantBasicData, setRestaurantBasicData] = useState({
        name: restData.name,
        address:restData.address,
        image_url :restData.image_url,
        description: restData.description,
        latitude: restData.latitude,
        longitude: restData.longitude,
        rating: restData.rating,
        number_of_ratings: restData.number_of_ratings,
        profile_percentage:restData.profile_percentage,
        experience: restData.experience,
        about: restData.about,
        phone_number : restData.phone_number,
        is_verified :restData.is_verified,
        field_changed:restData.field_changed,
        status:restData.status,
       
      });
      const [additions,setAdditions] = useState([])
      const [menuItem, setMenuItem] = useState({
          item_name:"",
          category_name:"",
          description:"",
          image_url:"",
          item_price:"",
          _id:""
      })

      const [dataCategory, setDataCategory] = useState(restData.category)
    const DataCatagories = ()=>{
        return(
            <>
                    {
                    dataCategory.map((data,index)=>{
                            return(
                                <>
                                <span key="0" href = "#Italian"key={data}>{data}</span>
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
             props.setReload() 
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
            description:"",
            image_url:"",
            item_price:0,
            additions:[],
            sizes:[],
            tag:[]
          }
          console.log(localStorage.getItem("admin_token"),"trkenhiiiiiiiiiiiiiiiiiiiii")
          axios.post("/api/v1/editsinglerestaurant/",{restaurants:data,type:"newMenu",ownerId:restaurantBasicData.ownerId },config).then((res)=>{
              console.log("hiii",res)
            window.location.reload()
              
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
    <div><div class = "__area text-center">
    <div class = "__card">
        <Button onClick={editRest} class = "__favorit"><Edit/></Button>
        
      <div style={{height:"200px",overflow:"hidden"}}><img src = {restData.image_url ? restData.image_url:"https://i.pinimg.com/originals/74/84/4c/74844c4207ec819b6ffaa6291591311e.jpg"} class="img-fluid __img"/></div>
      <div class = "__card_detail text-left">
        <h4><div class = "__type" ><span style={{backgroundColor:"white!important"}}><RestaurantMenu/></span>{restData.name}</div></h4><br/>
        <div class = "__type"><span href = "#Italian"><Phone/>{restData.phone_number}</span><span href = "#Italian"><StarBorder/>{restData.rating}.0</span><span href = "#Italian">{restData.is_verified?<><VerifiedUser/>Verified</>:<><Close/>Not Verified</>}</span></div>
        <p>
          {restData.address}
          
        </p>
        <div class = "__type">
          {restData.name?<DataCatagories/>: <span href = "#Italian">Italian</span>}

        </div>
            <div class = "__detail">
                <div class = "__type">Calender :- <span href = "#Italian" style={{backgroundColor:"#c0c0c03b"}}>M</span><span href = "#Italian">T</span><span href = "#Italian">W</span><span href = "#Italian">Th</span></div>
            </div>
        <div>
            <br/>
        <div  style={{textAlign:"center",fontSize:"12px",color:"#fc9d52"}}><span href = "#Italian" style={{fontSize:"22px", margin:"0 auto"}}><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><RestaurantMenuTwoTone/> MENU <RestaurantMenuTwoTone/> <ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/><ArrowRightAltOutlined/></span></div>
        </div>
       <div style={{textAlign:"center"}}> {restData.is_verified?<MenuList/>:<div style={{textAlign:"center"}}>Restaurent is not verified</div>}</div>
      </div>
    </div>
    </div>
     <RestaurentEditModel setReload={props.setReload} additions={additions} setAdditions={setAdditions} dataCategory={dataCategory} setDataCategory={setDataCategory} editModel={editModel} setEditModel={setEditModel} restaurantBasicData={restaurantBasicData} menuItem={menuItem} setMenuItem={setMenuItem} setRestaurantBasicData={setRestaurantBasicData}/>
   
  </div>
  )
}
