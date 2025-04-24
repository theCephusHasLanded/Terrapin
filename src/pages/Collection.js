import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Breadcrumbs,
  Link,
  Chip,
  useTheme,
} from '@mui/material';
import { Home as HomeIcon, NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/api';

// Collection banner images by category
const CATEGORY_BANNERS = {
  'Accessories': 'https://images.unsplash.com/photo-1588444650733-d1991babe907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'Home': 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'Jewelry': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'Office': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'default': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
};

// Collection descriptions by category
const CATEGORY_DESCRIPTIONS = {
  'Accessories': 'Elevate your style with our premium range of accessories, featuring exquisite tortoise shell patterns and artisanal craftsmanship.',
  'Home': 'Transform your living space with our curated collection of home décor items, designed to add elegance and sophistication to any room.',
  'Jewelry': 'Discover our handcrafted jewelry collection, where timeless design meets premium materials for pieces that make a statement.',
  'Office': 'Make your workspace a reflection of your refined taste with our collection of elegant office accessories and organizational tools.',
  'default': 'Discover our complete collection of premium products, each piece carefully selected for its quality, design, and craftsmanship.'
};

const Collection = () => {
  const theme = useTheme();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState([
    'Accessories', 'Home', 'Jewelry', 'Office'
  ]);

  // Banner and description based on category
  const bannerImage = category ? CATEGORY_BANNERS[category] || CATEGORY_BANNERS.default : CATEGORY_BANNERS.default;
  const collectionDescription = category ? CATEGORY_DESCRIPTIONS[category] || CATEGORY_DESCRIPTIONS.default : CATEGORY_DESCRIPTIONS.default;
  const collectionTitle = category || 'All Collections';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(0, 12, 'id', 'desc', category);
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <Layout>
      {/* Collection Banner */}
      <Box
        sx={{
          py: 10,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          backgroundImage: `url("${bannerImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(117, 84, 62, 0.75)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'accent.main',
              fontSize: { xs: '2.5rem', md: '3rem' },
            }}
          >
            {collectionTitle}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 700, mx: 'auto', mb: 0, color: 'common.white' }}
          >
            {collectionDescription}
          </Typography>
        </Container>
      </Box>

      {/* Collection Content */}
      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 4 }}
          >
            <Link 
              component={RouterLink} 
              to="/"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link 
              component={RouterLink} 
              to="/collections"
              underline="hover"
              color="inherit"
            >
              Collections
            </Link>
            {category && (
              <Typography color="text.primary">{category}</Typography>
            )}
          </Breadcrumbs>
          
          {/* Category Filters */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Browse by Category
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button
                component={RouterLink}
                to="/collections"
                variant={!category ? "contained" : "outlined"}
                color="primary"
                sx={{
                  borderRadius: 0,
                  mr: 1,
                  mb: 1,
                  px: 2,
                }}
              >
                All
              </Button>
              {allCategories.map((cat) => (
                <Button
                  key={cat}
                  component={RouterLink}
                  to={`/collections/${cat}`}
                  variant={category === cat ? "contained" : "outlined"}
                  color="primary"
                  sx={{
                    borderRadius: 0,
                    mr: 1,
                    mb: 1,
                    px: 2,
                  }}
                >
                  {cat}
                </Button>
              ))}
            </Box>
          </Box>
          
          <Divider sx={{ mb: 5 }} />
          
          {/* Products */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : products.length > 0 ? (
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No products found in this collection.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Please check back later or explore our other collections.
              </Typography>
              <Button
                component={RouterLink}
                to="/collections"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 0 }}
              >
                View All Collections
              </Button>
            </Box>
          )}
          
          {/* Featured Collection Card */}
          {products.length > 0 && (
            <Box
              sx={{
                mt: 10,
                p: { xs: 4, md: 6 },
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                bgcolor: 'accent.light',
                backgroundImage: 'url("https://images.unsplash.com/photo-1584811644165-33078f1a60df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(2px)',
                  zIndex: 1,
                },
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Typography variant="h3" color="primary.main" sx={{ mb: 2, fontWeight: 600 }}>
                      Exclusive Collection
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                      Explore our newest arrivals and limited edition pieces, carefully curated to add sophistication and elegance to your lifestyle. Each item in this collection represents the pinnacle of craftsmanship and design.
                    </Typography>
                    <Button
                      component={RouterLink}
                      to="/shop"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ borderRadius: 0, px: 4, py: 1.5 }}
                    >
                      Shop the Collection
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: 200, md: 300 },
                        backgroundColor: 'primary.main',
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundImage: 'url("https://images.unsplash.com/photo-1616627547182-08d51f291cdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          border: '2px solid',
                          borderColor: 'secondary.main',
                          borderRadius: 2,
                          transform: 'translate(8px, 8px)',
                          zIndex: -1,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default Collection;