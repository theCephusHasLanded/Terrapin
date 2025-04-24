import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Pinterest as PinterestIcon,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: 'Playfair Display, serif',
                mb: 3,
                letterSpacing: 1,
              }}
            >
              TERRAPIN
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Curated elegance for the discerning individual. Premium products with
              timeless design and exceptional quality.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href="#" color="inherit" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </Link>
              <Link href="#" color="inherit" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter">
                <TwitterIcon fontSize="small" />
              </Link>
              <Link href="#" color="inherit" aria-label="Pinterest">
                <PinterestIcon fontSize="small" />
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/shop" color="inherit" underline="hover">
                All Products
              </Link>
              <Link component={RouterLink} to="/category/accessories" color="inherit" underline="hover">
                Accessories
              </Link>
              <Link component={RouterLink} to="/category/home" color="inherit" underline="hover">
                Home
              </Link>
              <Link component={RouterLink} to="/category/apparel" color="inherit" underline="hover">
                Apparel
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                Contact
              </Link>
              <Link component={RouterLink} to="/shipping" color="inherit" underline="hover">
                Shipping & Returns
              </Link>
              <Link component={RouterLink} to="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                1234 Elegance Avenue, Suite 567
                <br />
                Luxury District, NY 10001
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                info@terrapin.com
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                +1 (800) 123-4567
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} Terrapin. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Link component={RouterLink} to="/privacy" color="inherit" underline="hover" sx={{ opacity: 0.7 }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/terms-conditions" color="inherit" underline="hover" sx={{ opacity: 0.7 }}>
                Terms & Conditions
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;