import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import TranslateIcon from '@mui/icons-material/Translate';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, child, get, remove } from 'firebase/database';
import { database } from '../../firebase';
import { auth } from '../../firebase';
import UpdateIcon from '@mui/icons-material/Update';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
function AllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dbRef = database;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Products'));

        if (snapshot.exists()) {
          const productsData = snapshot.val();

          // Convert the products object into an array
          const productsArray = Object.entries(productsData).map(([productId, productData]) => ({
            id: productId,
            ...productData,
          }));

          // Filter products based on matching StoreId with auth.uid
          const filteredProducts = productsArray.filter(product => auth.currentUser && auth.currentUser.uid === product.StoreId);

          setProducts(filteredProducts);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [auth.currentUser]);

  const handleTranslate = () => {
    // Implement translation logic here
  };

  const handleLikeToggle = () => {
    // Implement like toggle logic here
  };

  const handleSave = (product) => {
    // Implement save logic here
  };

  const handleEdit = (productId) => {
    // Implement edit logic here
    navigate(`/edit/${productId}`);
  };



  const handleDelete = async (productId) => {
    try {
      const dbRef = ref(database);
      const productRef = child(dbRef, `Products/${productId}`);

      // Delete the product from the database
      await remove(productRef);

      // Remove the deleted product from the local state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // ... rest of the component


  const handleUpdate = (productId) => {
    // Implement update logic here
  };
  console.log(products)

  return (
    <div style={{ backgroundColor: '#eff1f3', height: '100%',paddingTop:'40px' }}>
      <Box sx={{ display: 'flex' }}>
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant='h5'>
           Tất cả sản phẩm 
        </Typography>
          <Grid item xs={12} mt={4}>
            <Stack ml={4} direction="row" justifyContent="start" flexWrap="wrap">
              {products.map((product) => (
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
                    {product.ProductImage && (
                      <CardMedia 
                      onClick={() => handleEdit(product.id)}
                        component="img"
                        alt={product.ProductName}
                        height="250"
                        image={product.ProductImage[0].url}
                      />
                    )}
                    <CardContent sx={{ paddingBottom: '160px', color: 'black', whiteSpace: 'wrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {isLoading && <CircularProgress color="success" />}
                      <div onClick={handleTranslate}>
                       
                        <Typography variant='body1' fontWeight={'bold'}>
                          {product.ProductName}
                        </Typography>
                         <Typography variant='subtitle1'>
                        {product.Description}
                      </Typography>
                      </div>
                     
                    </CardContent>

                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingTop: '0px' }}>
                      <CardContent>
                        <Typography variant='body1'>
                          Code: {product.ProductCode}
                        </Typography>
                        <Typography variant='body1' fontWeight={'bold'}>
                         Display : {product.Status}
                        </Typography>
                        <Stack flexDirection={'row'} >
                          <Typography color={'gray'} sx={{ marginTop: '4px' }} variant='body1'>
                            {product.ProductPrice}원
                          </Typography>
                          <Typography ml={4} color={'red'} variant='h6'>
                              {product.ProductSales}원
                          </Typography>
                        </Stack>
                        
                      </CardContent>

                      <CardActions>
                        <IconButton onClick={() => handleSave(product)} color="primary">
                          <AddIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(product.id)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(product.id)} color="primary">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => handleUpdate(product.id)} color="primary">
                          <UpdateIcon />
                        </IconButton>
                        <IconButton onClick={() => handleUpdate(product.id)} color="primary">
                          <CloudUploadIcon />
                        </IconButton>
                      </CardActions>
                    </div>
                  </Card>
                </div>
              ))}
            </Stack>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AllProducts;
