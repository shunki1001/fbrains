import { AppBar, Box, Drawer, IconButton, ListItem,List, Toolbar, Typography, useMediaQuery, useTheme, ListItemButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import pathList from './pathList';

const Headbar = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  
  return (
    <>
    <Box sx={{ flexGrow: 1, height:"8vh" }}>
      <AppBar position="static" sx={{backgroundColor:"rgba(255,255,255,0.2)", color:"#000", boxShadow:"none"}}>
        <Toolbar>
          {isMobile && (
            <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          ) }
          <Typography variant="h6" component="div" sx={{ flexGrow: 4 }}>
          株式会社エフ＆ブレインズ
            </Typography>
            {!isMobile && (
              <Box sx={{flexGrow:1}}>
              <List sx={{ display: "flex" }}>
                {pathList.map((item) => {
                  return (
                    <ListItem>
                      <ListItemButton onClick={() => { navigate(item.pathname); }}>{item.label}</ListItemButton>
                    </ListItem>
                  )
                })}
                </List>
                </Box>
          )}
        </Toolbar>
      </AppBar>
      </Box>
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{width:"240px"}}>
        <List>
        {pathList.map((item) => {
            return (
              <ListItem>
                <ListItemButton onClick={() => { navigate(item.pathname);setMenuOpen(false) }}>{item.label}</ListItemButton>
              </ListItem>
            )
          })}
        </List>
        </Box>
      
      </Drawer>
      </>
  )
}

export default Headbar