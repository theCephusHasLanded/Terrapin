import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  InputAdornment,
  Pagination,
  CircularProgress,
  Button,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import { getProducts, searchProducts } from '../services/api';

const Shop = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 9,
    totalPages: 1,
  });
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || 'newest',
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let data;
        if (filters.search) {
          data = await searchProducts(
            filters.search,
            pagination.page,
            pagination.size
          );
        } else {
          let sortBy = 'id';
          let sortDir = 'desc';
          
          switch (filters.sort) {
            case 'priceAsc':
              sortBy = 'price';
              sortDir = 'asc';
              break;
            case 'priceDesc':
              sortBy = 'price';
              sortDir = 'desc';
              break;
            case 'name':
              sortBy = 'name';
              sortDir = 'asc';
              break;
            default: // newest
              sortBy = 'id';
              sortDir = 'desc';
              break;
          }
          
          data = await getProducts(
            pagination.page,
            pagination.size,
            sortBy,
            sortDir,
            filters.category
          );
        }
        
        if (data && data.products) {
          setProducts(data.products);
          if (data.pagination) {
            setPagination(prevState => ({
              ...prevState,
              totalPages: data.pagination.totalPages || 1,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [pagination.page, pagination.size, filters]);

  const handlePageChange = (event, value) => {
    setPagination(prevState => ({
      ...prevState,
      page: value - 1,
    }));
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setPagination(prevState => ({
      ...prevState,
      page: 0,
    }));
    
    // Update URL search params
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Update URL search params
    if (filters.search) {
      searchParams.set('search', filters.search);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
    
    setPagination(prevState => ({
      ...prevState,
      page: 0,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      sort: 'newest',
      search: '',
    });
    setSearchParams({});
    setPagination(prevState => ({
      ...prevState,
      page: 0,
    }));
  };

  return (
    <Layout>
      {/* Hero Banner */}
      <Box
        sx={{
          py: 10,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          backgroundImage: 'url("https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(117, 84, 62, 0.8)',
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
            }}
          >
            Shop Our Collection
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ maxWidth: 700, mx: 'auto', mb: 4, color: 'common.white' }}
          >
            Discover our curated selection of premium quality products crafted with exceptional materials and meticulous attention to detail.
          </Typography>
        </Container>
      </Box>

      {/* Shop Content */}
      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          {/* Filters & Search */}
          <Box sx={{ mb: 5 }}>
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item xs={12} md={4}>
                <form onSubmit={handleSearchSubmit}>
                  <TextField
                    fullWidth
                    label="Search products"
                    variant="outlined"
                    name="search"
                    value={filters.search}
                    onChange={(e) => handleFilterChange(e)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button type="submit" sx={{ minWidth: 'auto' }}>
                            <SearchIcon />
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="Jewelry">Jewelry</MenuItem>
                    <MenuItem value="Office">Office</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    name="sort"
                    value={filters.sort}
                    onChange={handleFilterChange}
                    label="Sort By"
                  >
                    <MenuItem value="newest">Newest</MenuItem>
                    <MenuItem value="name">Name (A-Z)</MenuItem>
                    <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
                    <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={clearFilters}
                  startIcon={<FilterListIcon />}
                  sx={{ borderRadius: 0 }}
                >
                  Clear Filters
                </Button>
              </Grid>
            </Grid>
            
            {/* Active Filters */}
            {(filters.category || filters.search) && (
              <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filters.category && (
                  <Chip
                    label={`Category: ${filters.category}`}
                    onDelete={() => {
                      setFilters(prev => ({ ...prev, category: '' }));
                      searchParams.delete('category');
                      setSearchParams(searchParams);
                    }}
                    color="primary"
                    variant="outlined"
                  />
                )}
                {filters.search && (
                  <Chip
                    label={`Search: ${filters.search}`}
                    onDelete={() => {
                      setFilters(prev => ({ ...prev, search: '' }));
                      searchParams.delete('search');
                      setSearchParams(searchParams);
                    }}
                    color="primary"
                    variant="outlined"
                  />
                )}
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 5 }} />
          
          {/* Products */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : products.length > 0 ? (
            <>
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
              
              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination
                    count={pagination.totalPages}
                    page={pagination.page + 1}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No products found.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search or filter criteria.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default Shop;