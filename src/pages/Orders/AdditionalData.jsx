import React from 'react'
import { Avatar} from "@material-ui/core";
export const AdditionalData = (props) => {
    console.log(props,"hiii")
    
  return (
    <>
     <div style={{textAlign:"center"}}>
        <table style={{width:"500px" , background:"white", margin:"0 auto"}}>
      {props.additionalData.data.map((data)=>{
        console.log(props.additionalData.details)
        console.log(data.addition_name)
        return(<>
                   

                          <tr>
                            <td style={{padding:"10px"}}><Avatar src={data.addition_image}/></td>
                            <td style={{padding:"10px"}}>{data.addition_name}</td>
                            <td style={{padding:"10px"}}>{
                              props.additionalData.details.map((details)=>{
                                console.log(details)
                                return(<>
                                {
                                    data._id == details.addition_id?	<div id="">
                                    <div class="wrapper" style={{margin:"0 auto",justifyContent:"center"}}>
                                          <button class="btn btn--minus" type="button" name="button">
                                          -
                                          </button>
                                          <input class="quantity" type="text" name="name" value={details.selected[0].quantity}/>
                                          <button class="btn btn--plus" type="button" name="button">
                                            +
                                          </button><p style={{fontSize:"19px", padding:"5px" }}>${data.price}</p>
                                        </div>

                                  </div>:0
                                }
                                	
                                                
                                </>)
                              })
                            
                            }</td>
                          </tr>
                    
        </>)})}
        </table>
        </div>
            
    </>
  )
}
