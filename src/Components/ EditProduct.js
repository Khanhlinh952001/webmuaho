import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, child, get, set } from 'firebase/database';
import { ref as storageRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { database, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import CardMedia from '@mui/material/CardMedia';
import { CircularProgress, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const PRODUCT_PATH = 'Products/';
const FILE_PATH = 'files/';

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [editedProduct, setEditedProduct] = useState({});
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `${PRODUCT_PATH}${productId}`));
        setEditedProduct(snapshot.val() || {});
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleClick = async (file) => {
    try {
      setImg(file);
      const imgRef = storageRef(storage, `${FILE_PATH}${uuidv4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);

      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        ProductImage: [
          ...(prevProduct.ProductImage || []),
          {
            id: uuidv4(),
            url: url,
          },
        ],
      }));
       // Show success notification
       NotificationManager.success('Thêm thành công', 'Success', 3000);
    } catch (error) {
      console.error("Lỗi khi tải lên hình ảnh:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      let updatedProduct = { ...editedProduct };

      if (img) {
        const imageUrlArray = (updatedProduct.ProductImage || []).map((image) => ({
          id: image.id,
          url: image.url,
        }));
        updatedProduct = {
          ...updatedProduct,
          ProductImage: imageUrlArray,
        };
      }

      await set(ref(database, `${PRODUCT_PATH}${productId}`), updatedProduct);
      setSnackbarSeverity('success');
      setSnackbarMessage('Product updated successfully');
      setSnackbarOpen(true);
       // Show success notification
       NotificationManager.success('Cập nhật thành công', 'Thành Công ', 3000);
      navigate('/allProducts');
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);

      setSnackbarSeverity('error');
      setSnackbarMessage('Error updating product');
      NotificationManager.error('Lỗi khi cập nhật sản phẩm:', 'Lổi', 3000);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteImage = (imageId) => {
    const updatedProduct = { ...editedProduct };
    const updatedImages = (updatedProduct.ProductImage || []).filter(
      (image) => image.id !== imageId
    );
     // Show success notification
     NotificationManager.warning('Xoá thành công', 'Xoá', 3000);
    setEditedProduct({
      ...updatedProduct,
      ProductImage: updatedImages,
    });
  };
  return (
    <div style={{ backgroundColor: '#eff1f3', height: '100%', padding: '20px', fontSize: '18px' }}>
      <NotificationContainer />
      <Typography pt={2} variant='h5'>Thông tin chi tiết: {editedProduct.ProductCode}</Typography>
     <Box height={30} />
      <Stack>
        <Typography variant='h6' pb={2}>Hình ảnh</Typography>
        <Stack flexDirection={'row'}>
        {editedProduct.ProductImage &&
          editedProduct.ProductImage.map((image, index) => (
            <div key={index} style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                alt={image.id}
                height="200"
                sx={{ width: 200, marginRight: 1 }}
                image={image.url}
              />
              <IconButton
                style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                onClick={() => handleDeleteImage(image.id)}
              >
                {/* You can use an icon for delete, for example, the close icon */}
                <DeleteIcon  />
              </IconButton>
            </div>
          ))}
        {img && (
          <CardMedia
            component="img"
            alt="New Image"
            height="200"
            sx={{ width: 200, marginRight: 1 }}
            image={URL.createObjectURL(img)}
          />
        )}
          <Stack justifyContent={'center'} bgcolor={'white'} width={200} textAlign={'center'}>
            <label htmlFor="fileInput" style={{ cursor: 'pointer', borderRadius: '4px' }}>
             
                <AddPhotoAlternateIcon style={{fontSize:'80px'}} />
              
            </label>
            <input
              type='file'
              id="fileInput"
              onChange={(event) => handleClick(event.target.files[0])}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Stack>



        </Stack>
      </Stack>

      <Box height={70} />

      <Stack>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            Tên sản phẩm:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px' }}
              name="ProductName"
              value={editedProduct.ProductName ?? ''}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={2}>
            Giá sản phẩm:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              name="ProductPrice"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px', }}
              value={editedProduct.ProductPrice ?? ''}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={2}>
            Giá Sales:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              name="ProductSales"
             style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px', }}
              value={editedProduct.ProductSales ?? ''}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={2}>
            Description:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              name="Description"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px', }}
              value={editedProduct?.Description ?? ''}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Display:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              name="Display"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px', }}
              value={editedProduct?.Status ?? ''}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Stack>

      <div style={{ justifyContent: 'end', marginTop: '20px' }}>
        <Button type="button" variant="outlined" onClick={handleUpdate}>
          Cập nhật sản phẩm
        </Button>
      </div>

      {loading && <CircularProgress style={{ margin: '20px' }} />}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </MuiAlert>
        </Snackbar>
    </div>
  );
}

export default EditProduct;
