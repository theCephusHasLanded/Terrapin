import React from 'react';
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import Layout from '../components/layout/Layout';

const TermsConditions = () => {
  const theme = useTheme();

  return (
    <Layout>
      {/* Header */}
      <Box
        sx={{
          py: 6,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          backgroundImage: 'url("https://images.unsplash.com/photo-1589216532372-1c2a367900d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(117, 84, 62, 0.85)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              mb: 2,
            }}
          >
            Terms & Conditions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            Please read these terms carefully before using our services.
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
            color="inherit"
          >
            Home
          </Link>
          <Typography color="text.primary">Terms & Conditions</Typography>
        </Breadcrumbs>

        <Paper elevation={0} sx={{ p: 4, mb: 4, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Terms of Service
          </Typography>
          <Typography variant="body2" paragraph sx={{ mb: 3 }}>
            Last Updated: April 24, 2025
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to Terrapin E-commerce. These Terms of Service ("Terms") govern your use of our website, products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our Services, you confirm that you accept these Terms and agree to comply with them. If you do not agree to these Terms, you must not access or use our Services.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            2. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We may revise these Terms at any time by amending this page. Please check this page regularly to take notice of any changes we made, as they are binding on you.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            3. Account Registration
          </Typography>
          <Typography variant="body1" paragraph>
            When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account.
          </Typography>
          <Typography variant="body1" paragraph>
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account or password.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            4. Products and Services
          </Typography>
          <Typography variant="body1" paragraph>
            All products and services displayed on our website are subject to availability. We reserve the right to discontinue any product or service at any time.
          </Typography>
          <Typography variant="body1" paragraph>
            Prices for our products are subject to change without notice. We reserve the right to modify or discontinue our Services without notice at any time.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            5. Orders and Payments
          </Typography>
          <Typography variant="body1" paragraph>
            When you place an order, you offer to purchase the product at the price stated. All orders are subject to acceptance and availability.
          </Typography>
          <Typography variant="body1" paragraph>
            Payment must be made at the time of ordering. We accept payment via the methods displayed on our website. By submitting payment information, you represent and warrant that you have the legal right to use any payment method used in connection with any purchase.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            6. Shipping and Delivery
          </Typography>
          <Typography variant="body1" paragraph>
            Shipping and delivery times are estimates only and cannot be guaranteed. We are not liable for any delays in receiving your order.
          </Typography>
          <Typography variant="body1" paragraph>
            Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            7. Returns and Refunds
          </Typography>
          <Typography variant="body1" paragraph>
            Our return and refund policy is outlined separately and incorporated into these Terms by reference. By using our Services, you agree to be bound by our return and refund policy.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            8. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            The Service and its original content, features, and functionality are and will remain the exclusive property of Terrapin E-commerce and its licensors. The Service is protected by copyright, trademark, and other laws.
          </Typography>
          <Typography variant="body1" paragraph>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Terrapin E-commerce.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            9. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            In no event shall Terrapin E-commerce, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Your access to or use of or inability to access or use the Service" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Any conduct or content of any third party on the Service" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Any content obtained from the Service" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Unauthorized access, use or alteration of your transmissions or content" />
            </ListItem>
          </List>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            10. Governing Law
          </Typography>
          <Typography variant="body1" paragraph>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </Typography>
          <Typography variant="body1" paragraph>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            11. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Terrapin E-commerce <br />
            1234 Elegance Avenue, Suite 567 <br />
            Luxury District, NY 10001 <br />
            Email: info@terrapin.com <br />
            Phone: +1 (800) 123-4567
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default TermsConditions;