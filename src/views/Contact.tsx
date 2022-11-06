import { Box, Icon, Typography } from '@mui/material'
import React from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Contact = () => {
  return (
      <Box className="content-container contact-page">
          <Typography variant="h5">お問い合わせ</Typography>
          <Box className="contact-container">
          <Typography variant="h6">メール</Typography>
          <Box className="contact-item">
          <Icon><EmailOutlinedIcon /></Icon>
              <Typography>info@f-brains.tokyo</Typography>
              </Box>
              </Box>
    </Box>
  )
}

export default Contact