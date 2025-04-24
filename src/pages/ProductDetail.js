import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Card,
  CardMedia,
  Breadcrumbs,
  Link,
  Chip,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { useCart } from '../contexts/CartContext';
import { getProduct, getProducts } from '../services/api';
import ProductCard from '../components/product/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productData = await getProduct(id);
        setProduct(productData);
        
        // Fetch related products in the same category
        const relatedData = await getProducts(4, productData.category);
        // Filter out the current product
        setRelatedProducts(
          relatedData.products.filter(p => p.id !== productData.id)
        );
      } catch (error) {
        console.error('Error fetching product data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
    
    // Reset state when product ID changes
    return () => {
      setProduct(null);
      setRelatedProducts([]);
      setQuantity(1);
      setLoading(true);
      setImageError(false);
    };
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 12, textAlign: 'center' }}>
          <Typography variant="h4" color="text.primary" gutterBottom>
            Product Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            The product you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Return to Homepage
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <Link component={RouterLink} to="/" color="inherit" underline="hover">
            Home
          </Link>
          <Link component={RouterLink} to="/shop" color="inherit" underline="hover">
            Shop
          </Link>
          <Link
            component={RouterLink}
            to={`/category/${product.category.toLowerCase()}`}
            color="inherit"
            underline="hover"
          >
            {product.category}
          </Link>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={6}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 0,
                overflow: 'hidden',
                position: 'relative',
                height: 500,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {product.image && !imageError ? (
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={() => setImageError(true)}
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
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h1"
                      component="div"
                      sx={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '8rem',
                      }}
                    >
                      T
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                        fontWeight: 600,
                      }}
                    >
                      {product.category}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Chip
                label={product.category}
                color="secondary"
                size="small"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
              />
              
              <Typography
                variant="h3"
                component="h1"
                color="primary.main"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                {product.name}
              </Typography>
              
              <Typography
                variant="h4"
                sx={{ color: 'primary.main', fontWeight: 600, mb: 3 }}
              >
                ${product.price.toFixed(2)}
              </Typography>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography
                variant="body1"
                sx={{ mb: 4, color: 'text.secondary', lineHeight: 1.8 }}
              >
                {product.description}
              </Typography>
              
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
                >
                  Quantity
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Button
                    aria-label="decrease quantity"
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    sx={{
                      minWidth: 'auto',
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 0,
                      color: 'text.primary',
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  
                  <TextField
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{
                      min: 1,
                      max: 10,
                      style: { textAlign: 'center' },
                    }}
                    sx={{
                      width: 60,
                      mx: 1,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 0,
                      },
                    }}
                  />
                  
                  <Button
                    aria-label="increase quantity"
                    onClick={handleIncrement}
                    disabled={quantity >= 10}
                    sx={{
                      minWidth: 'auto',
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 0,
                      color: 'text.primary',
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={handleAddToCart}
                    sx={{ py: 1.5, borderRadius: 0 }}
                  >
                    Add to Cart
                  </Button>
                  
                  <Button
                    component={RouterLink}
                    to="/cart"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5, borderRadius: 0, borderWidth: 2 }}
                  >
                    View Cart
                  </Button>
                </Box>
                
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                  >
                    {product.inventory > 0
                      ? `${product.inventory} items in stock`
                      : 'Out of stock'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 12 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                mb: 6,
                textAlign: 'center',
                color: 'primary.main',
              }}
            >
              You Might Also Like
            </Typography>
            
            <Grid container spacing={4}>
              {relatedProducts.map((relatedProduct) => (
                <Grid item key={relatedProduct.id} xs={12} sm={6} md={4}>
                  <ProductCard product={relatedProduct} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default ProductDetail;