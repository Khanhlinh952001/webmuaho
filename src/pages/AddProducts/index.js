import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import xml2js from 'xml2js';
import { auth } from '../../firebase';
import { database } from '../../firebase';
import { ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


function AddProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jsonData, setJsonData] = useState(null);
  

  const handleSearchChange = async () => {
    try {
      

      const response = await axios.get(
        `https://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=23ebb9fd1b66ae392b91870ed7bb4447&apiCode=ProductSearch&keyword=${searchQuery}`
      );

      xml2js.parseString(response.data, (error, result) => {
        if (error) {
          console.error('Error parsing XML:', error);
        } else {
          const jsonData = result?.ProductSearchResponse?.Products[0]?.Product || [];
          setJsonData(jsonData);
        }
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
     
    }
  };

  const handleLikeToggle = () => {
    // Implement your like toggle logic here
  };

  const handleSave = (product) => {
   
    const uniqueId = uuidv4();
  
    const images = [
      { id: "image1", url: product.ProductImage300[0] },
      // Add other image objects if necessary
    ];
  
    set(ref(database, `Products/${uniqueId}`), {
      StoreId: auth.currentUser.uid,
      ProductName: product.ProductName[0],
      ProductCode: product.ProductCode[0],
      ProductImage: images,
      ProductPrice: product.ProductPrice[0],
      ProductSales: product.SalePrice[0],
      Status: "false",
    }).then(() => {
     NotificationManager.success(`Thêm ${product.ProductCode} thành công`, 'Success', 3000);
    }).catch((error) => {
      console.error("Error writing user data: ", error);
      NotificationManager.error('Thêm không thành công', 'Error', 3000);
    });
  };

  return (
    <div style={{ backgroundColor: '#eff1f3', height: '100%', paddingTop:'40px' }}>
     <NotificationContainer />
      <Box sx={{ flexGrow: 1 }}>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack
              direction={'row'}
              sx={{
                backgroundColor: 'white',
                marginTop: '8px',
                borderRadius: '20px',
                marginLeft: '20px',
              }}
            >
              <TextField
                sx={{
                  margin: '10px',
                  marginBottom: '4px',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                }}
                id="standard-basic"
                label="Search for Products"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton onClick={handleSearchChange} color="primary">
                <SearchIcon />
              </IconButton>
              <IconButton color="primary">
                <ClearIcon onClick={() => setSearchQuery('')} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} mt={4}>
            <Stack ml={4} direction="row" justifyContent="start" flexWrap="wrap">
              {jsonData && jsonData.map((product) => (
                <div style={{ margin: '8px', display: 'flex', flexDirection: 'column' }} key={product.ProductCode}>
                  <Card
                    mb={10}
                    sx={{
                      maxWidth: 240,
                      height: '100%',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      position: 'relative',
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={product.ProductName[0]}
                      height="250"
                      image={product.ProductImage300[0]}
                    />

                    <CardContent sx={{ paddingBottom: '160px', color: 'black', whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      
                      <div>
                        {product.ProductName[0]}
                      </div>
                    </CardContent>

                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingTop: '0px' }}>
                      <CardContent>
                        <Stack flexDirection={'row'}>
                          <Typography color={'gray'} sx={{ marginTop: '4px' }} variant='body1'>
                            {product.ProductPrice[0]}원
                          </Typography>
                          <Typography color={'red'} variant='h6'>
                            ---  {product.SalePrice[0]}원
                          </Typography>
                        </Stack>
                        <Typography variant='body1'>
                          Code: {product.ProductCode[0]}
                        </Typography>
                      </CardContent>

                      <CardActions>
                        <IconButton color="secondary" onClick={handleLikeToggle}>
                          {true ? <FavoriteIcon color='red' /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Button sx={{ flex: 1 }} size="small" variant="contained" color="primary">
                          <Link to={product.DetailPageUrl[0]} color="white" underline="none">
                            Detail
                          </Link>
                        </Button>
                        <IconButton onClick={() => handleSave(product)} color="primary">
                          <AddIcon />
                        </IconButton>
                      </CardActions>
                    </div>
                  </Card>
                </div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default AddProducts;
