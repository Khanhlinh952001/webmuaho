import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';
function AddProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  const handleSearchChange = async () => {
    try {
      const response = await axios.get(
        `http://openapi.11st.co.kr/openapi/OpenApiService.tmall?key=23ebb9fd1b66ae392b91870ed7bb4447&apiCode=ProductSearch&keyword=${searchQuery}`
      );
      console.log("response"+ response.data)

     const trimmedData = response.data.trim();
      console.log(trimmedData)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
 

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  return (
    <div style={{ backgroundColor: '#eff1f3', height: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box height={20} />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Stack
              direction={'row'}
              style={{
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

          {/* ... rest of the code ... */}

          <Grid item xs={12} mt={4}>
            <Stack spacing={2} direction="row" justifyContent="center" flexWrap="wrap">
              <Card sx={{ maxWidth: 240, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Product Name
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Description of the product. Lizards are a widespread group of squamate reptiles,
                    with over 6,000 species, ranging across all continents except Antarctica.
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color={isLiked ? 'secondary' : 'default'} onClick={handleLikeToggle}>
                    {isLiked ? <FavoriteIcon color='red' /> : <FavoriteBorderIcon />}
                  </IconButton>
                  <Button size="small" variant="contained" color="primary">
                    View Details
                  </Button>
                  <IconButton color="primary" onClick={handleAddClick}>
                    <AddIcon />
                  </IconButton>
                </CardActions>
              </Card>
              {/* Add more cards as needed */}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Phương thức lưu</DialogTitle>
        <DialogContent>
          <Button sx={{ width: '100%', marginBottom: '8px' }} variant="outlined">
            <Typography>Chỉnh sữa và đăng</Typography>
          </Button>
          <Button sx={{ width: '100%', marginBottom: '8px' }} variant="outlined">
            <Typography>Thêm chỉnh sữa sau</Typography>
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary" variant="outlined" sx={{ marginRight: '8px' }}>
            Close
          </Button>
          <Button onClick={handleCloseAddDialog} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddProducts;
