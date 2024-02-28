import React from 'react'
import Sidebar from '../../Layout/Sidebar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchAppBar from '../../Layout/Navbar';
function About() {
  return (
    <>
      <Box height={20} />
      <Box sx={{ display: 'flex' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1> About</h1 >
        </Box>
      </Box>
    </>

  )
}

export default About
