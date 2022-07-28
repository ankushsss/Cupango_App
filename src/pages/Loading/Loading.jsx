import React from 'react'
import { Box } from '@material-ui/core'
import { CircularProgress } from '@material-ui/core'
export const Loading = () => {
  return (
    <div><div style={{position:"absolute",width:"100%",top:"0",right:"0",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <CircularProgress />
    </div></div>
  )
}
