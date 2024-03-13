import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Home from './AllPage/home';
export default function HomeTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' ,backgroundColor:'#eff1f3' }}>
        <Box height={40}/>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Doanh thu " value="1" />
            <Tab label="Đang xữ lý" value="2" />
            <Tab label="Đơn đang giao" value="3" />
            <Tab label="Đơn đã giao" value="4" />
            
          </TabList>
        </Box>
        <TabPanel value="1"><Home/></TabPanel>
        <TabPanel style={{height:'100vh',}} value="2">Chưa có đơn</TabPanel>
        <TabPanel  style={{height:'100vh',}}  value="3">Chưa có đơn</TabPanel>
        <TabPanel  style={{height:'100vh',}}  value="4">Chưa có đơn</TabPanel>
      </TabContext>
    </Box>
  );
}
