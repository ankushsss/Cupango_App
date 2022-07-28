import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { CloseOutlined, Delete, Edit } from '@material-ui/icons'
export const RestaurentEditModel = (props) => {
  const { additions, setAdditions, setReload, dataCategory, setDataCategory, editModel, setEditModel, restaurantBasicData, menuItem, setMenuItem, setRestaurantBasicData } = props
  const [addCategories, setAddCategories] = useState({ category: "" })
  const [editAdditionalModel, setEditAdditionalModel] = useState(false)
  const [deleteAlert, setDeleteAlert] =  useState(false)
  const [deleteData, setDeleteData] = useState("")
  const [updatedAdditionalData, setUpdatedAdditionalData] = useState({
    addition_name:"",
    price:0,
    addition_image:"",
    min_number:"",
    max_number:""
  })
  function sendToClient(data) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("admin_token")}`
      }
    };
    console.log(localStorage.getItem("admin_token"), "trken")
    axios.post("/api/v1/editsinglerestaurant/", { restaurants: data, type: editModel.type, ownerId: restaurantBasicData.ownerId, menuId:menuItem._id }, config).then((res) => {
      console.log(res.status, "hiii")
      if (res.status == 200) {
        console.log("success")

        setEditModel({ open: false })
        if (setReload) { setReload() }
      }
    }).catch((err) => {
      console.log(err)


    })
  }
  function addAdditionalData()
  {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("admin_token")}`
      }
    };
    console.log(localStorage.getItem("admin_token"), "trken")
    axios.post("/api/v1/addadditionalitem/", { restaurants: {
      addition_image:"",
      addition_name:"Demo",
      price:"",
      min_number:0,
      max_number:20
    }, type: editModel.type, ownerId: restaurantBasicData.ownerId, menuId:menuItem._id }, config).then((res) => {
      console.log(res.status, "hiii")
      if (res.status == 200) {
        console.log("success")
        setReload()
        setEditModel({open:false})
      }
    }).catch((err) => {
      console.log(err)


    })
  }

  const updateData = () => {
    console.log(editModel)
    if (editModel.type == "basic") {
      sendToClient(restaurantBasicData)
    }
    if (editModel.type == "menu") {
      sendToClient(menuItem)
    }
    if (editModel.type == "categories") {
      sendToClient(dataCategory)
    }
    if(editModel.type == "additional"){
      let updateArray =   additions.filter(function (f) { return f._id !== updatedAdditionalData._id })
      updateArray.push(updatedAdditionalData)
      console.log(updateArray)
      setAdditions(updateArray)
      setEditAdditionalModel(false)
      sendToClient(updateArray)
    }
  }
  const DataCatagories = () => {

    const removeCategory = (data) => {
      let update = dataCategory.filter(function (f) { return f !== data })
      setDataCategory(update)
    }
    return (
      <>
        {
          dataCategory.map((data, index) => {

            return (
              <>
                <span key="0" href="#Italian" key={data}>{data}<button onClick={() => removeCategory(data)} style={{ border: "none", padding: "5px", cursor: "pointer", color: "darkblue", textAlign: "left", weight: "900" }}> X</button></span>
              </>
            )
          })}
        <br />

      </>
    )
  }
  const Additionals = () => {
    function editAdditional(data)
    {
      setUpdatedAdditionalData(data)
      // setAdditions(...additions,data)
      setEditAdditionalModel(true)
      console.log(data)
    }
    function deleteAdditional(data)
    {
       setDeleteAlert(true)
       console.log(data._id)
       let updateArray =   additions.filter(function (f) { return f._id !== data._id })
       setDeleteData(updateArray)

    }
    return (
      <>
        {
          additions.map((data) => {
            return (<>
              
              <div>
                
                <div style={{display:"flex",width:"300px",alignContent:"center",padding:"5px"}}><div style={{width:"80%"}}>{data.addition_name}</div><button style={{color:"#f9b02d",border:"none",cursor:"pointer"}} onClick={()=>editAdditional(data)}><Edit fontSize='small' /></button><button style={{color:"#f9b02d",border:"none",cursor:"pointer"}} onClick={()=>deleteAdditional(data)}><Delete fontSize='small'/></button></div></div>
              
            </>)
          })
        }
      </>
    )
  }
const DeleteContent = ()=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("admin_token")}`
    }
  };
  axios.post("/api/v1/editsinglerestaurant/", { restaurants: deleteData, type: editModel.type, ownerId: restaurantBasicData.ownerId, menuId:menuItem._id }, config).then((res) => {
    console.log(res.status, "hiii")
    if (res.status == 200) {
      console.log("success")
      setEditAdditionalModel(false)
      setEditModel(false)
      setDeleteAlert(false)
      setReload()
  
    }
  }).catch((err) => {
    console.log(err)


  })
}

  return (
    <>
    <Dialog
      open={editModel.open}
      onClose={() => setEditModel({ open: false })}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Cupango
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Edit Restaurent
        </DialogContentText>
        {editModel.type == "basic" ? <Box>
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.name} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "name": e.target.value })} id="outlined-basic" label="name" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.about} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "about": e.target.value })} id="outlined-basic" label="about" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.rating} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "rating": e.target.value })} id="outlined-basic" label="rating" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.address} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "address": e.target.value })} id="outlined-basic" label="address" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.latitude} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "latitude": e.target.value })} id="outlined-basic" label="latitude" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.longitude} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "longitude": e.target.value })} id="outlined-basic" label="longitude" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.phone_number} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "phone_number": e.target.value })} id="outlined-basic" label="phone number" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.description} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "description": e.target.value })} id="outlined-basic" label="description" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.number_of_ratings} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "number_of_ratings": e.target.value })} id="outlined-basic" label="number_of_ratings" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={restaurantBasicData.profile_percentage} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "profile_percentage": e.target.value })} id="outlined-basic" label="profile_percentage" variant="outlined" />
          {/* {restaurantBasicData.ownerId ? <TextField style={{ margin: "10px" }} value={restaurantBasicData.is_verified} onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "is_verified": e.target.value })} id="outlined-basic" label="is_verified" variant="outlined" /> : ""} */}
          {restaurantBasicData.ownerId ? <FormControl >
            <InputLabel id="demo-simple-select-label " style={{marginLeft:"20px"}}>verified</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={restaurantBasicData.is_verified}
              label="Verified"
              variant="outlined"
              style={{ margin: "10px" }}
              onChange={(e) => setRestaurantBasicData({ ...restaurantBasicData, "is_verified": e.target.value })}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
              
            </Select>
          </FormControl>:""}
       
        </Box> : ""}
        {editModel.type == "menu" ? <Box>
          <TextField style={{ margin: "10px" }} value={menuItem.item_name} onChange={(e) => setMenuItem({ ...menuItem, "item_name": e.target.value })} id="outlined-basic" label="name" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={menuItem.item_price} onChange={(e) => setMenuItem({ ...menuItem, "item_price": e.target.value })} id="outlined-basic" label="price" variant="outlined" />
          {/* <TextField style={{ margin: "10px" }} value={menuItem.category_name} onChange={(e) => setMenuItem({ ...menuItem, "category_name": e.target.value })} id="outlined-basic" label="category_name" variant="outlined" /> */}
          <TextField style={{ margin: "10px" }} value={menuItem.image_url} onChange={(e) => setMenuItem({ ...menuItem, "image_url": e.target.value })} id="outlined-basic" label="image" variant="outlined" />
          <TextField style={{ margin: "10px" }} value={menuItem.description} onChange={(e) => setMenuItem({ ...menuItem, "description": e.target.value })} id="outlined-basic" label="description" variant="outlined" />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label " style={{marginLeft:"20px"}}>Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={menuItem.category_name}
              label="Category"
              variant="outlined"
              style={{ margin: "10px",width:"50%" }}
              onChange={(e) => setMenuItem({ ...menuItem, "category_name": e.target.value })}
            >
              
             
              {/* <MenuItem value={30}>Thirty</MenuItem> */}
                { dataCategory.map((data, index) => {
                  return( <MenuItem key={index} value={data} >{data}</MenuItem>)
                      
                  })}
                      
            </Select>
          </FormControl>
          
          
          {/*         <TextField style={{margin:"10px"}} value={restaurantBasicData.latitude} onChange={(e)=>setRestaurantBasicData({...restaurantBasicData,"latitude":e.target.value})} id="outlined-basic" label="latitude" variant="outlined" /> */}
        </Box> : ""}
        {editModel.type == "categories" ? <>
          <div class="__type"><DataCatagories />
            <div style={{ display: "flex", alignItems: "center" }}><TextField style={{ margin: "10px" }} value={addCategories.category} onChange={(e) => setAddCategories({ category: e.target.value })} label="Add Categories" variant="outlined" /><button style={{ padding: "12px" }} onClick={() => {
              dataCategory.push(addCategories.category)
              setDataCategory(dataCategory)
              setAddCategories({ category: "" })
            }}>ADD</button></div>
          </div></> : ""}

        {editModel.type == "additional" ? <><Additionals /></> : ""}
      </DialogContent>
      {editModel.type == "additional"?
         <DialogActions>
         <Button onClick={() => {setEditModel({ open: false })}}>Cancel</Button>
         <Button onClick={() => addAdditionalData()} autoFocus>
           Add
         </Button>
       </DialogActions>
      :
      <DialogActions>
        <Button onClick={() => {setEditModel({ open: false })}}>Cancel</Button>
        <Button onClick={updateData} autoFocus>
          Update
        </Button>
      </DialogActions>
      }
    </Dialog>
    <Dialog
      open={editAdditionalModel}
      onClose={() => setEditAdditionalModel(false )}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
          {updatedAdditionalData.addition_name}
        </DialogTitle>
        <DialogContent>
             <TextField style={{ margin: "10px" }} value={updatedAdditionalData.addition_name} onChange={(e) => setUpdatedAdditionalData({ ...updatedAdditionalData, "addition_name": e.target.value })} id="outlined-basic" label="addition_name" variant="outlined" />
             <TextField style={{ margin: "10px" }} value={updatedAdditionalData.price} onChange={(e) => setUpdatedAdditionalData({ ...updatedAdditionalData, "price": e.target.value })} id="outlined-basic" label="price" variant="outlined" />
             <TextField style={{ margin: "10px" }} value={updatedAdditionalData.min_number} onChange={(e) => setUpdatedAdditionalData({ ...updatedAdditionalData, "min_number": e.target.value })} id="outlined-basic" label="min_number" variant="outlined" />
             <TextField style={{ margin: "10px" }} value={updatedAdditionalData.max_number} onChange={(e) => setUpdatedAdditionalData({ ...updatedAdditionalData, "max_number": e.target.value })} id="outlined-basic" label="max_number" variant="outlined" />
             <TextField style={{ margin: "10px" }} value={updatedAdditionalData.addition_image} onChange={(e) => setUpdatedAdditionalData({ ...updatedAdditionalData, "addition_image": e.target.value })} id="outlined-basic" label="addition_image" variant="outlined" />
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setEditAdditionalModel(false )}>Cancel</Button>
        <Button onClick={updateData} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog
      open={deleteAlert}
      onClose={() => setDeleteAlert(false )}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
         <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          Are You Sure You Want To Delete It
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setDeleteAlert(false )}>Cancel</Button>
        <Button onClick={DeleteContent} autoFocus>
          Delete
        </Button>
      </DialogActions>
      </Dialog>
    </>
  )
}
