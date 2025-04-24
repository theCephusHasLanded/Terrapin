import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import Layout from '../components/layout/Layout';

const About = () => {
  const theme = useTheme();

  return (
    <Layout>
      {/* Hero Banner */}
      <Box
        sx={{
          py: 12,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          backgroundImage: 'url("https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1530&q=80")',
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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              color: 'accent.main',
            }}
          >
            Our Story
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 700, mx: 'auto', mb: 4, fontSize: '1.1rem', color: 'common.white' }}
          >
            Founded on a passion for timeless elegance and exceptional quality, Terrapin brings you carefully curated products that combine artisan craftsmanship with modern design.
          </Typography>
        </Container>
      </Box>

      {/* Our Philosophy */}
      <Box sx={{ py: 10, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                alt="Craftsmanship"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 500,
                  objectFit: 'cover',
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                color="primary.main"
                sx={{ fontWeight: 600, mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                Our Philosophy
              </Typography>
              <Divider sx={{ width: 80, mb: 4, borderWidth: 2, borderColor: 'secondary.main' }} />
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                At Terrapin, we believe that exceptional products should be both beautiful and functional, enhancing your life through thoughtful design and quality materials.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Each item in our collection is carefully selected based on three core principles: premium quality, timeless design, and sustainable craftsmanship. We partner with skilled artisans and ethical manufacturers who share our commitment to excellence and responsible production.
              </Typography>
              <Button
                component={RouterLink}
                to="/collections"
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ borderRadius: 0, borderWidth: 2, px: 4, py: 1 }}
              >
                Explore Our Collections
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Journey */}
      <Box sx={{ py: 10, bgcolor: 'accent.light' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            color="primary.dark"
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Our Journey
          </Typography>
          
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  2018
                </Box>
                <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                  The Beginning
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Terrapin was founded with a simple mission: to create a curated collection of premium products that blend timeless elegance with modern functionality. What began as a passion project soon blossomed into a full-fledged brand dedicated to quality and craftsmanship.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  2021
                </Box>
                <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                  Growth & Innovation
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  As our community grew, so did our collection. We expanded our product lines while maintaining our commitment to quality and sustainability. We established partnerships with skilled artisans and ethical manufacturers around the world, bringing unique designs to our customers.
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  Today
                </Box>
                <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                  Looking Forward
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Today, Terrapin stands as a testament to our enduring commitment to quality and design. We continue to curate our collection with care, adding new products that align with our values and meet our exacting standards. We're grateful for our loyal customers who share our appreciation for the finer things in life.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Values */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography
                variant="h2"
                color="primary.main"
                sx={{ fontWeight: 600, mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}
              >
                Our Values
              </Typography>
              <Divider sx={{ width: 80, mb: 4, borderWidth: 2, borderColor: 'secondary.main' }} />
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                  Quality Without Compromise
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We believe that exceptional products should last. Each item in our collection is made from the finest materials and crafted with meticulous attention to detail.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                  Timeless Design
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Our products embody the perfect balance between classic elegance and contemporary function, designed to remain relevant beyond fleeting trends.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                  Ethical Production
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We partner with manufacturers who prioritize fair labor practices and environmental responsibility, ensuring our products have a positive impact.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1465887676198-be40a366db43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Our Values"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 500,
                  objectFit: 'cover',
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: 10,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          backgroundImage: 'url("https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1464&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              mb: 3,
              color: 'accent.main',
            }}
          >
            Experience the Terrapin Difference
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 700, mx: 'auto', mb: 5, color: 'common.white' }}
          >
            Join our community of discerning individuals who appreciate the finer things in life.
          </Typography>
          <Button
            component={RouterLink}
            to="/shop"
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              borderRadius: 0,
              px: 6,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Shop Now
          </Button>
        </Container>
      </Box>
    </Layout>
  );
};

export default About;