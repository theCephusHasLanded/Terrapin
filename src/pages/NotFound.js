import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
} from '@mui/material';
import Layout from '../components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 12 }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '5rem', md: '8rem' },
              fontWeight: 600,
              color: 'primary.main',
              lineHeight: 1,
              mb: 3,
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 500, mb: 2 }}
          >
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 500, mb: 4 }}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}
          >
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 0, px: 4 }}
            >
              Back to Home
            </Button>
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ borderRadius: 0, px: 4 }}
            >
              View Cart
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default NotFound;