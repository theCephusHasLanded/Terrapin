import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  useTheme,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addItem(product, 1);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        '&:hover': {
          '& .product-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product.id}`}
        sx={{
          position: 'relative',
          height: 300,
          overflow: 'hidden',
          textDecoration: 'none',
        }}
      >
        {product.image && !imageError ? (
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="product-image"
            onError={handleImageError}
          />
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: theme.palette.accent.main,
              color: theme.palette.primary.dark,
            }}
          >
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Typography
                variant="h3"
                component="div"
                sx={{ mb: 1, fontFamily: 'Playfair Display, serif' }}
              >
                T
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontWeight: 600,
                }}
              >
                {product.category}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Art Deco corner accent */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '40px 40px 0 0',
            borderColor: `${theme.palette.secondary.main} transparent transparent transparent`,
            opacity: 0.8,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component={RouterLink}
            to={`/product/${product.id}`}
            sx={{
              fontFamily: 'Playfair Display, serif',
              color: 'primary.main',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, color: 'primary.main' }}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0, mt: 'auto' }}>
        <Button
          onClick={handleAddToCart}
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 0,
            py: 1,
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;