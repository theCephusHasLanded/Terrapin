import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
} from '@mui/material';
import Layout from '../components/layout/Layout';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/api';

// Sample checkout form
const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const steps = ['Shipping information', 'Payment details', 'Review your order'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeStep !== steps.length - 1) {
      handleNext();
      return;
    }

    setLoading(true);
    
    try {
      // Create order with API
      const orderData = {
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: total
      };
      
      const order = await createOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page
      navigate('/checkout/success', { state: { orderId: order.id } });
    } catch (error) {
      console.error("Error creating order:", error);
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State/Province/Region"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  id="zip"
                  label="Zip / Postal code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
              Payment Method
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cardName"
                  label="Name on card"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="cardNumber"
                  label="Card number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="expDate"
                  label="Expiry date"
                  name="expDate"
                  placeholder="MM/YY"
                  value={formData.expDate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cvv"
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} key={item.id}>
                  <Box display="flex" justifyContent="space-between">
                    <Box>
                      <Typography variant="subtitle1">
                        {item.product.name} × {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.product.description.substring(0, 60)}...
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Typography gutterBottom>
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography gutterBottom>{formData.address}</Typography>
              <Typography gutterBottom>
                {formData.city}, {formData.state} {formData.zip}
              </Typography>
              <Typography gutterBottom>{formData.email}</Typography>
            </Box>
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Payment Details
              </Typography>
              <Typography gutterBottom>
                Card ending in {formData.cardNumber.slice(-4)}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Checkout;