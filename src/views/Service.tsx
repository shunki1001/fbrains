import { Box,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from '@mui/material'
import React from 'react'
import { advertisementList, movieList, OtherList, videoList } from '../data/serviceList'
import LaunchIcon from '@mui/icons-material/Launch';
import poster_visuals from "../image/poster_visuals.JPG"

const Service = () => {
  return (
    <Box sx={{width:"90%", maxWidth:680, m:"0 auto" }} className="service-page">
      <Typography variant="h6">広告</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{minWidth:"6em"}}>業界</TableCell>
              <TableCell>活動実績</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {advertisementList.map((item) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                      {item.label}
                      </TableCell>
                      <TableCell>{item.content}</TableCell>
                    </TableRow>
                  )
                  
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6">映画製作</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>作品名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {movieList.map((item) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                      {item}
                      </TableCell>
                    </TableRow>
                  )
                  
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="img_container">
        <img src={poster_visuals} alt="lady in white poster"/>
      </div>
      <Typography variant="h6">映像作品</Typography>
      <TableContainer component={Paper} sx={{mb:4}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{minWidth:"6em"}}>映像作品名</TableCell>
              <TableCell>活動時期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {videoList.map((item) => {
              if (item.label === '日本酒姉妹') {
                return (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    <Link href="https://www.youtube.com/channel/UCdRLmsjsuhBWxhXtQeQlwcA" target='_blank' className="svg-margin">{item.label}<LaunchIcon fontSize="small"  /></Link>
                    </TableCell>
                    <TableCell>{item.year}</TableCell>
                  </TableRow>
                )
              } else {
                return (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                    {item.label}
                    </TableCell>
                    <TableCell>{item.year}</TableCell>
                  </TableRow>
                )  
              }
              
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>その他  ドラマ、バラエティ、地上波、BS波にて多数</Typography>
      <Typography variant="h6">その他</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>活動内容</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {OtherList.map((item) => {
                  return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell>
                      {item}
                      </TableCell>
                    </TableRow>
                  )
                  
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>    
  )
}

export default Service