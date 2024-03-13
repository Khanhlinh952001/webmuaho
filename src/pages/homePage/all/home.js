import React from 'react'
import Sidebar from '../../../layout/Sidebar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SearchAppBar from '../../../layout/Navbar';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import '../../../dash.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import Accordionx from '../../../contains/Accordion';
import BarChart from '../../../charts/BarChars';
import CountUp from 'react-countup';
import { SuccessAlert } from '../../../contains/Alert';
import { useEffect, useState } from 'react';
function Home() {

    return (
        <div style={{ backgroundColor: '#eff1f3', paddingTop: '40px' }}>

            <Box sx={{ display: 'flex' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ minWidth: 49 + "%", height: 150 }} className='CardBgColor'>
                                    <CardContent>
                                        <Stack mb={1}>
                                            <CreditCardIcon sx={{ color: 'white' }} />
                                        </Stack>
                                        <Typography color={"white"} gutterBottom variant="h5" component="div">
                                            <CountUp delay={0.4} end={5500} duration={0.6} />
                                        </Typography>
                                        <Typography sx={{ color: "#ccd1d1" }} variant="body" color="text.secondary">
                                            Total Earning
                                        </Typography>
                                    </CardContent>
                                </Card>

                                <Card sx={{ minWidth: 49 + "%", height: 150 }} className='CardBgColor1'>
                                    <CardContent>
                                        <Stack mb={1}>
                                            <ShoppingBagIcon sx={{ color: 'white' }} />
                                        </Stack>
                                        <Typography color={'white'} gutterBottom variant="h5" component="div">
                                            <CountUp delay={0.4} end={3500} duration={0.6} />
                                        </Typography>
                                        <Typography sx={{ color: "#ccd1d1" }} variant="body" color="text.secondary">
                                            Total Order
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Card sx={{ maxWidth: 345 }} className='CardBgColor1'>
                                    <CardContent>
                                        <Stack direction="row">
                                            <Stack mt={2} mr={2}>
                                                <StorefrontIcon sx={{ color: "#ffff" }} />
                                            </Stack>
                                            <Stack>
                                                <Typography variant='body'>
                                                    <CountUp delay={0.4} end={2300} duration={0.6} />
                                                </Typography>
                                                <Typography variant='body'>
                                                    Total Income
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Stack direction="row">
                                            <Stack mt={2} mr={2}>
                                                <StorefrontIcon />
                                            </Stack>
                                            <Stack>
                                                <Typography variant='body'>
                                                    <CountUp delay={0.4} end={1800} duration={0.6} />
                                                </Typography>
                                                <Typography variant='body'>
                                                    Total Income
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>


                    </Grid>
                    <Box height={10} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Card sx={{ height: 60 + "vh" }}>
                                <CardContent>
                                    <BarChart />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card sx={{ height: 60 + "vh" }}>
                                <CardContent>
                                    <Typography variant='h5'>
                                        Products
                                    </Typography>
                                    <Accordionx />
                                </CardContent>
                            </Card>
                        </Grid>


                    </Grid>


                </Box>

            </Box>


        </div>

    )
}

export default Home
