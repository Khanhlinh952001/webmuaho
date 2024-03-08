import React, { useState, useEffect } from 'react';
import { ref, child, get, update } from 'firebase/database';
import { auth, database, storage } from '../../../firebase'; // Giả sử storage và storageRef đã được định nghĩa trong cấu hình Firebase của bạn
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { uploadBytes, getDownloadURL, ref as Ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const FILE_PATH = 'userAvarter';

function Profile() {
  // State cho dữ liệu người dùng và dữ liệu form
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    storeName: '',
    address: '',
  });

  // Ref đến database và uid của người dùng hiện tại
  const dbRef = ref(database);
  const uid = auth.currentUser?.uid;

  // State cho hình ảnh và avatar
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // State cho trạng thái loading và thông báo
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Hàm xử lý khi chọn hình ảnh
  const handleClick = async (file) => {
    try {
      setImg(file);
      const imgRef = Ref(storage, `${FILE_PATH}${uuidv4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setAvatar(url);
    } catch (error) {
      console.error("Lỗi khi tải lên hình ảnh:", error);
    }
  };

  // Effect hook để fetch dữ liệu người dùng khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid) {
          const snapshot = await get(child(dbRef, `users/${uid}`));
          if (snapshot.exists()) {
            setData(snapshot.val());
            // Đặt giá trị mặc định cho form dựa trên dữ liệu người dùng
            setFormData({
              email: snapshot.val()?.email || '',
              password: snapshot.val()?.password || '',
              firstName: snapshot.val()?.firstName || '',
              lastName: snapshot.val()?.lastName || '',
              storeName: snapshot.val()?.storeName || '',
              address: snapshot.val()?.address || '',
            });
          } else {
            console.log("Không có dữ liệu");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function để hủy đăng ký bất kỳ listener hoặc tác vụ async nào
    return () => {
      // Các công việc cleanup nếu cần
    };
  }, [uid]);

  // Hàm xử lý khi input thay đổi
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Cập nhật giá trị form dựa trên input thay đổi
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý khi ấn nút cập nhật
  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (uid) {
        // Cập nhật dữ liệu người dùng trong database
        await update(child(dbRef, `users/${uid}`), {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          storeName: formData.storeName,
          address: formData.address,
          image: avatar || data?.image,
        });
        setSnackbarSeverity('success');
        setSnackbarMessage('Cập nhật thành công');
        window.location.reload();
        setSnackbarOpen(true);
      } else {
        console.error('Không có ID người dùng');
        setSnackbarSeverity('error');
        setSnackbarMessage('Lỗi khi cập nhật người dùng');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Thêm ảnh đại diện ');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#eff1f3', height: '100%', paddingTop: '40px' }}>
      <Stack>
        <Typography variant='h6' pb={2}>Cài đặt thông tin</Typography>
        <Stack flexDirection={'row'}>
          <CardMedia
            component="img"
            alt="Hình ảnh mới"
            height="200"
            sx={{ width: 200, marginRight: 1 }}
            image={data?.image || avatar}
          />
          <Stack justifyContent={'center'} bgcolor={'white'} width={200} textAlign={'center'}>
            <label htmlFor="fileInput" style={{ cursor: 'pointer', borderRadius: '4px' }}>
             <AddPhotoAlternateIcon style={{ fontSize: '80px' }} />
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
            StoreName:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px' }}
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Address:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px' }}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Email:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px' }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Password*:
          </Grid>
          <Grid item xs={10}>
            <input
              type="password"
              name="password"
              style={{ height: '40px', flex: 1, width: '80%', paddingLeft: '10px' }}
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Name:
          </Grid>
          <Grid item xs={10} flexDirection={'row'}>
            <input
              type="text"
              name="firstName"
              style={{ height: '40px', flex: 1, width: '40%', paddingLeft: '10px' }}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              style={{ height: '40px', flex: 1, width: '40%', paddingLeft: '10px' }}
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Button style={{marginTop:'20px'}} type="button" variant="outlined" onClick={handleUpdate}>
          Cập nhật sản phẩm
        </Button>

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
      </Stack>
    </div>
  );
}

export default Profile;
