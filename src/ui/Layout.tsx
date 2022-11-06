import { Box } from '@mui/material'
import React from 'react'
import Footer from '../models/common/Footer'
import Headbar from '../models/common/Headbar'

type Props = {
    children: React.ReactNode
}

const Layout:React.FC<Props> = ({children}) => {
    return (
        <>
            <Headbar />
            <Box>
                {children}
            </Box>
            <Footer />
        </>
  )
}

export default Layout