import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Paper,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  VerifiedUser as QualityIcon,
  Lock as SecureIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../contexts/CartContext';
import { getProducts } from '../services/api';

// Sample products for static display
const sampleProducts = [
  {
    id: '1',
    name: 'Tortoise Shell Glasses',
    description: 'Elegant tortoise shell glasses with premium craftsmanship.',
    price: 129.99,
    image: '/images/products/glasses.jpg',
    category: 'Accessories',
    inventory: 15,
  },
  {
    id: '2',
    name: 'Art Deco Pendant Light',
    description: 'Beautiful art deco inspired pendant light that elevates any space.',
    price: 249.99,
    image: '/images/products/light.jpg',
    category: 'Home',
    inventory: 8,
  },
  {
    id: '3',
    name: 'Leather Wallet',
    description: 'Handcrafted leather wallet with beautiful detailing.',
    price: 79.99,
    image: '/images/products/wallet.jpg',
    category: 'Accessories',
    inventory: 20,
  },
];

const Home = () => {
  const theme = useTheme();
  const [products, setProducts] = useState(sampleProducts);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(6);
        if (data && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      {/* Hero Banner */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'accent.main',
          color: 'text.primary',
          overflow: 'hidden',
          pt: 10,
          pb: 12,
        }}
      >
        {/* Tortoise Shell Pattern Overlay - Can be implemented with CSS */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: `radial-gradient(circle, ${theme.palette.primary.dark} 2px, transparent 3px) 0 0 / 20px 20px`,
            mixBlendMode: 'multiply',
          }}
        />

        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h1"
                  color="primary.dark"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Curated Elegance
                </Typography>
                <Divider
                  sx={{
                    width: { xs: '100px', md: '120px' },
                    mx: { xs: 'auto', md: 0 },
                    my: 3,
                    borderWidth: 2,
                    borderColor: 'secondary.main',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    mb: 4,
                    maxWidth: { md: '80%' },
                  }}
                >
                  Discover our handpicked collection of premium products, crafted with precision
                  and designed for elegance.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/shop"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 0,
                    fontWeight: 600,
                  }}
                >
                  Shop Collection
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '300px', md: '400px' },
                  mx: 'auto',
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: 'secondary.main',
                  }}
                >
                  {/* Art Deco Decorative Element */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '12rem',
                      color: 'accent.light',
                      opacity: 0.4,
                    }}
                  >
                    T
                  </Typography>

                  {/* Corner Accents */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 40,
                      height: 40,
                      borderTop: '3px solid',
                      borderLeft: '3px solid',
                      borderColor: 'secondary.main',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 40,
                      height: 40,
                      borderTop: '3px solid',
                      borderRight: '3px solid',
                      borderColor: 'secondary.main',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 40,
                      height: 40,
                      borderBottom: '3px solid',
                      borderLeft: '3px solid',
                      borderColor: 'secondary.main',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 40,
                      height: 40,
                      borderBottom: '3px solid',
                      borderRight: '3px solid',
                      borderColor: 'secondary.main',
                    }}
                  />
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    bgcolor: 'accent.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <QualityIcon sx={{ fontSize: 32, color: 'primary.dark' }} />
                </Box>
                <Typography variant="h5" color="primary.main" sx={{ mb: 1 }}>
                  Premium Quality
                </Typography>
                <Divider
                  sx={{
                    width: 50,
                    mx: 'auto',
                    my: 2,
                    borderColor: 'secondary.main',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Carefully selected materials and expert craftsmanship in every product.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    bgcolor: 'accent.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <ShippingIcon sx={{ fontSize: 32, color: 'primary.dark' }} />
                </Box>
                <Typography variant="h5" color="primary.main" sx={{ mb: 1 }}>
                  Swift Delivery
                </Typography>
                <Divider
                  sx={{
                    width: 50,
                    mx: 'auto',
                    my: 2,
                    borderColor: 'secondary.main',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Fast and reliable shipping with careful handling for perfect arrival.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    bgcolor: 'accent.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <SecureIcon sx={{ fontSize: 32, color: 'primary.dark' }} />
                </Box>
                <Typography variant="h5" color="primary.main" sx={{ mb: 1 }}>
                  Secure Shopping
                </Typography>
                <Divider
                  sx={{
                    width: 50,
                    mx: 'auto',
                    my: 2,
                    borderColor: 'secondary.main',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Protected transactions and discreet packaging for peace of mind.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Products */}
      <Box
        id="products"
        sx={{
          py: 10,
          bgcolor: 'background.default',
          position: 'relative',
        }}
      >
        {/* Subtle pattern overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            background: `radial-gradient(circle, ${theme.palette.primary.dark} 2px, transparent 3px) 0 0 / 20px 20px`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              color="primary.main"
              sx={{
                position: 'relative',
                display: 'inline-block',
                fontWeight: 600,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  right: '100%',
                  width: 50,
                  height: 1,
                  mr: 2,
                  bgcolor: 'secondary.main',
                  display: { xs: 'none', md: 'block' },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  width: 50,
                  height: 1,
                  ml: 2,
                  bgcolor: 'secondary.main',
                  display: { xs: 'none', md: 'block' },
                },
              }}
            >
              Featured Collection
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}
            >
              Discover our carefully curated selection of premium products.
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              component={RouterLink}
              to="/shop"
              variant="outlined"
              color="secondary"
              sx={{
                borderRadius: 0,
                borderWidth: 2,
                py: 1,
                px: 4,
                fontWeight: 600,
              }}
            >
              View All Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          py: 10,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top and bottom decorative lines */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(to right, ${theme.palette.secondary.dark}, ${theme.palette.accent.main}, ${theme.palette.secondary.light})`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(to right, ${theme.palette.secondary.light}, ${theme.palette.accent.main}, ${theme.palette.secondary.dark})`,
          }}
        />

        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'accent.main',
            }}
          >
            Timeless Elegance, Modern Functionality
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 5, opacity: 0.9, maxWidth: 700, mx: 'auto' }}
          >
            Join our exclusive collection of customers who appreciate refined aesthetics
            and exceptional quality.
          </Typography>
          <Button
            component={RouterLink}
            to="/about"
            variant="outlined"
            sx={{
              color: 'accent.main',
              borderColor: 'accent.main',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                borderColor: 'accent.light',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
              px: 4,
              py: 1.2,
              borderRadius: 0,
            }}
          >
            Explore Our Philosophy
          </Button>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;