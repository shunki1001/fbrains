import { Box, Typography } from '@mui/material'
import React from 'react'
// import pathList from './pathList'

const Footer = () => {
  return (
    <Box className="footer-bg">
      <Box className="footer-container">
        <Typography variant="h6" component="div">
          株式会社エフ＆ブレインズ
        </Typography>
        {/* <Typography>info: yfuta@f-brains.tokyo</Typography> */}
          {/* <p>TEL:090-3509-8848</p> */}
      {/* <Box>
        <List sx={{display:"flex", maxWidth:"600px"}}>
        {pathList.map((item) => {
          return (
            <ListItem>
              <ListItemButton sx={{justifyContent:"center"}} onClick={() => { navigate(item.pathname); }}>{item.label}</ListItemButton>
            </ListItem>
          )
        })}
        </List>
        </Box> */}
      <Box sx={{ textAlign: "center", pt:3}}>
        <Typography variant="caption">©F{`&`}brains Inc. 2022</Typography>
      </Box>
      </Box>
      </Box>
  )
}

export default Footer