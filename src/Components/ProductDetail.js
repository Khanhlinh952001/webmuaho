import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { translate } from "@vitalets/google-translate-api";
import LimitedAccordion from '../Contains/LimitAccordion';

const ProductDetail = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('vi');
  const [translatedProductName, setTranslatedProductName] = useState('');
  const [translationError, setTranslationError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await translate(product.ProductName[0], { to: targetLanguage });
        setTranslatedProductName(result.text);
        setTranslationError(null);
      } catch (error) {
        console.error('Error during translation:', error);
        setTranslationError(error);
      }
    };

    fetchData();
  }, [product.ProductName, targetLanguage]);




  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleLanguageChange = (newLanguage) => {
    setTargetLanguage(newLanguage);
  };

  return (
   <div style={{ margin: '8px' }}>
      <Card mb={10} sx={{ maxWidth: 240, minHeight: 500, maxHeight: 500, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardMedia
          component="img"
          alt={translatedProductName}
          height="250"
          image={product.ProductImage300[0]}
        />
        <CardContent sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {/* Pass the entire product object to LimitedAccordion component */}
          <LimitedAccordion product={product} />
        </CardContent>

        <CardActions>
          <IconButton color={isLiked ? 'secondary' : 'default'} onClick={handleLikeToggle}>
           {isLiked ? <FavoriteIcon color='red' /> : <FavoriteBorderIcon />}
          </IconButton>
          <Button size="small" variant="contained" color="primary">
            View Details
          </Button>
          <IconButton color="primary">
            <AddIcon />
          </IconButton>
        </CardActions>
        <div style={{ paddingBottom: '8px', marginLeft: '8px' }}>
          <label>Language: </label>
          <select onChange={(e) => handleLanguageChange(e.target.value)} value={targetLanguage}>
            <option value="vi">Tiếng Việt</option>
            <option value="kr">Korea</option>
            {/* Add other languages if needed */}
          </select>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetail;
