import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Layout from '../components/layout/Layout';

const CheckoutSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom>
            Order Confirmed!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Thank you for your purchase. Your order has been successfully
            placed and is being processed.
          </Typography>
          <Box
            sx={{
              bgcolor: 'background.default',
              p: 2,
              borderRadius: 1,
              width: '100%',
              mb: 3,
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Order ID
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {orderId}
            </Typography>
          </Box>
          <Divider sx={{ width: '100%', mb: 3 }} />
          <Typography variant="body2" paragraph>
            You will receive a confirmation email shortly with the order
            details. If you have any questions about your order, please
            contact our customer support.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2,
              width: '100%',
            }}
          >
            <Button
              component={Link}
              to="/"
              variant="outlined"
              fullWidth
              sx={{ borderRadius: 0 }}
            >
              Continue Shopping
            </Button>
            <Button
              component={Link}
              to="/orders"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 0 }}
            >
              View Orders
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default CheckoutSuccess;