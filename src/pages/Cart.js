import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  Paper,
  TextField,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutline as DeleteIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const theme = useTheme();
  const { items, total, updateQuantity, removeItem } = useCart();

  // Calculate shipping cost - free shipping for orders over $100
  const shippingCost = total >= 100 ? 0 : 8.99;
  
  // Calculate tax (e.g., 8% tax rate)
  const taxRate = 0.08;
  const taxAmount = total * taxRate;
  
  // Calculate order total
  const orderTotal = total + shippingCost + taxAmount;

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          color="primary.main"
          sx={{
            mb: 4,
            fontWeight: 600,
            borderBottom: '2px solid',
            borderColor: 'secondary.main',
            pb: 2,
            display: 'inline-block',
          }}
        >
          Your Cart
        </Typography>

        {items.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Looks like you haven't added any items to your cart yet.
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 0, py: 1.5, px: 4 }}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 4 }}>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={3} alignItems="center">
                        {/* Product Image */}
                        <Grid item xs={3} sm={2}>
                          <Box
                            component={RouterLink}
                            to={`/product/${item.product.id}`}
                            sx={{
                              display: 'block',
                              width: '100%',
                              height: 80,
                              bgcolor: 'background.default',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {item.product.image ? (
                              <Box
                                component="img"
                                src={item.product.image}
                                alt={item.product.name}
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: theme.palette.accent.main,
                                  color: theme.palette.primary.dark,
                                }}
                              >
                                <Typography variant="h6" component="span">
                                  T
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Grid>

                        {/* Product Details */}
                        <Grid item xs={9} sm={4}>
                          <Typography
                            component={RouterLink}
                            to={`/product/${item.product.id}`}
                            variant="subtitle1"
                            color="primary.main"
                            sx={{
                              fontWeight: 600,
                              textDecoration: 'none',
                              '&:hover': { color: 'secondary.main' },
                            }}
                          >
                            {item.product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.product.category}
                          </Typography>
                        </Grid>

                        {/* Quantity Controls */}
                        <Grid item xs={6} sm={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              sx={{ color: 'text.secondary' }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            
                            <TextField
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value > 0 && value <= 10) {
                                  updateQuantity(item.product.id, value);
                                }
                              }}
                              inputProps={{
                                min: 1,
                                max: 10,
                                style: { textAlign: 'center' },
                              }}
                              sx={{
                                width: 40,
                                mx: 1,
                                '& .MuiOutlinedInput-root': {
                                  height: 35,
                                },
                                '& .MuiOutlinedInput-input': {
                                  p: 1,
                                },
                              }}
                              variant="outlined"
                              size="small"
                            />
                            
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              sx={{ color: 'text.secondary' }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Grid>

                        {/* Price and Remove Button */}
                        <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </Typography>
                          
                          <IconButton
                            onClick={() => removeItem(item.product.id)}
                            size="small"
                            color="error"
                            sx={{ p: 0.5 }}
                          >
                            <DeleteIcon fontSize="small" />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                              Remove
                            </Typography>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    {index < items.length - 1 && (
                      <Divider sx={{ borderColor: 'divider' }} />
                    )}
                  </React.Fragment>
                ))}
              </Paper>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                }}
              >
                <Button
                  component={RouterLink}
                  to="/"
                  startIcon={<RemoveIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Continue Shopping
                </Button>
                
                <Button
                  onClick={() => window.location.reload()}
                  startIcon={<AddIcon />}
                  sx={{ textTransform: 'none' }}
                >
                  Update Cart
                </Button>
              </Box>
            </Grid>

            {/* Order Summary */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 3,
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Order Summary
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Shipping
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Tax (8%)
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ${taxAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary.main" fontWeight={600}>
                    ${orderTotal.toFixed(2)}
                  </Typography>
                </Box>
                
                <Button
                  component={RouterLink}
                  to="/checkout"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5, borderRadius: 0 }}
                >
                  Proceed to Checkout
                </Button>
                
                {total < 100 && (
                  <Typography
                    variant="body2"
                    color="secondary.main"
                    sx={{ mt: 2, textAlign: 'center' }}
                  >
                    Add ${(100 - total).toFixed(2)} more for free shipping!
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default Cart;