import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Paper,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  ShoppingBag as OrdersIcon,
  FavoriteBorder as WishlistIcon,
  Settings as SettingsIcon,
  CreditCard as PaymentIcon,
  LocalShipping as ShippingIcon,
  LockOutlined as SecurityIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';

// TabPanel component to handle tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

// Sample order data
const sampleOrders = [
  {
    id: 'ORD-123456',
    date: '2023-05-15',
    status: 'Delivered',
    total: 299.97,
    items: 3,
  },
  {
    id: 'ORD-123455',
    date: '2023-04-02',
    status: 'Delivered',
    total: 149.99,
    items: 1,
  },
  {
    id: 'ORD-123454',
    date: '2023-03-20',
    status: 'Delivered',
    total: 89.99,
    items: 2,
  },
];

// Sample wishlist data
const sampleWishlist = [
  {
    id: '1',
    name: 'Tortoise Shell Sunglasses',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: '8',
    name: 'Art Deco Wall Mirror',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1585412454748-2471f9e932af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const Account = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: 'Emma',
    lastName: 'Thompson',
    email: 'emma.thompson@example.com',
    phone: '(555) 123-4567',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Show success message or handle accordingly
    }, 1500);
  };

  return (
    <Layout>
      {/* Account Banner */}
      <Box
        sx={{
          py: 8,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          position: 'relative',
          backgroundImage: 'url("https://images.unsplash.com/photo-1586941962765-d3896cc85e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1373&q=80")',
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
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'secondary.main',
                  fontSize: '2rem',
                }}
              >
                {userProfile.firstName.charAt(0)}
                {userProfile.lastName.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h3" sx={{ fontWeight: 600 }}>
                {userProfile.firstName} {userProfile.lastName}
              </Typography>
              <Typography variant="body1" sx={{ color: 'accent.light' }}>
                Member since May 2023
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Account Content */}
      <Box sx={{ py: 6, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Tab Navigation */}
            <Grid item xs={12} md={3}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  orientation="vertical"
                  variant="scrollable"
                  sx={{
                    '& .MuiTab-root': {
                      alignItems: 'flex-start',
                      textAlign: 'left',
                      py: 2,
                      px: 3,
                      minHeight: 'auto',
                    },
                  }}
                >
                  <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
                  <Tab icon={<OrdersIcon />} label="Orders" iconPosition="start" />
                  <Tab icon={<WishlistIcon />} label="Wishlist" iconPosition="start" />
                  <Tab icon={<SettingsIcon />} label="Settings" iconPosition="start" />
                </Tabs>
              </Paper>
            </Grid>

            {/* Tab Content */}
            <Grid item xs={12} md={9}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {/* Profile Tab */}
                <TabPanel value={tabValue} index={0}>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                    Profile Information
                  </Typography>
                  <form onSubmit={handleProfileUpdate}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={userProfile.firstName}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={userProfile.lastName}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          value={userProfile.email}
                          onChange={handleInputChange}
                          variant="outlined"
                          type="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={userProfile.phone}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          disabled={loading}
                          sx={{
                            borderRadius: 0,
                            px: 4,
                          }}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </TabPanel>
                
                {/* Orders Tab */}
                <TabPanel value={tabValue} index={1}>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                    Order History
                  </Typography>
                  {sampleOrders.length > 0 ? (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                      {sampleOrders.map((order) => (
                        <React.Fragment key={order.id}>
                          <ListItem
                            alignItems="flex-start"
                            sx={{
                              px: 3,
                              py: 2,
                              borderRadius: 1,
                              mb: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': {
                                bgcolor: 'accent.light',
                              },
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <ListItemText
                                  primary={
                                    <Typography variant="h6" component="span">
                                      {order.id}
                                    </Typography>
                                  }
                                  secondary={
                                    <>
                                      <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                      >
                                        {new Date(order.date).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                        })}
                                      </Typography>
                                      <Typography component="div" variant="body2">
                                        {order.items} {order.items === 1 ? 'item' : 'items'}
                                      </Typography>
                                    </>
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
                                <Chip
                                  label={order.status}
                                  color={order.status === 'Delivered' ? 'success' : 'primary'}
                                  size="small"
                                  sx={{ mb: 1 }}
                                />
                                <Typography variant="h6" color="primary.main">
                                  ${order.total.toFixed(2)}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                  sx={{ mt: 1, borderRadius: 0 }}
                                >
                                  View Details
                                </Button>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <OrdersIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Orders Yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        You haven't placed any orders yet.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        href="/shop"
                        sx={{ borderRadius: 0 }}
                      >
                        Start Shopping
                      </Button>
                    </Box>
                  )}
                </TabPanel>
                
                {/* Wishlist Tab */}
                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                    Your Wishlist
                  </Typography>
                  {sampleWishlist.length > 0 ? (
                    <Grid container spacing={3}>
                      {sampleWishlist.map((item) => (
                        <Grid item xs={12} md={6} key={item.id}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              display: 'flex',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': {
                                boxShadow: 2,
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 100,
                                height: 100,
                                flexShrink: 0,
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: 1,
                                mr: 2,
                              }}
                            />
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="h6" sx={{ mb: 1 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                ${item.price.toFixed(2)}
                              </Typography>
                              <Box sx={{ mt: 'auto', pt: 1, display: 'flex', gap: 1 }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  sx={{ borderRadius: 0, flex: 1 }}
                                >
                                  Add to Cart
                                </Button>
                                <Button
                                  variant="outlined"
                                  color="secondary"
                                  size="small"
                                  sx={{ borderRadius: 0, minWidth: 'auto', px: 1 }}
                                >
                                  <WishlistIcon fontSize="small" />
                                </Button>
                              </Box>
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <WishlistIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Your Wishlist is Empty
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Save items you love for later.
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        href="/shop"
                        sx={{ borderRadius: 0 }}
                      >
                        Browse Products
                      </Button>
                    </Box>
                  )}
                </TabPanel>
                
                {/* Settings Tab */}
                <TabPanel value={tabValue} index={3}>
                  <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                    Account Settings
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <SecurityIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Security
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Password
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            ••••••••••••
                          </Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ borderRadius: 0 }}
                          >
                            Change Password
                          </Button>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Two-Factor Authentication
                          </Typography>
                          <Typography variant="body1" color="error.main" sx={{ mb: 2 }}>
                            Not enabled
                          </Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ borderRadius: 0 }}
                          >
                            Enable 2FA
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <ShippingIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Shipping Addresses
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Default Address
                          </Typography>
                          <Typography variant="body1">
                            123 Main Street
                          </Typography>
                          <Typography variant="body1">
                            Apt 4B
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            New York, NY 10001
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ borderRadius: 0 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              sx={{ borderRadius: 0 }}
                            >
                              Add New Address
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PaymentIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">
                            Payment Methods
                          </Typography>
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Default Payment Method
                          </Typography>
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                            Visa •••• 4242
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Expires 05/2025
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              sx={{ borderRadius: 0 }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="secondary"
                              size="small"
                              sx={{ borderRadius: 0 }}
                            >
                              Add New Card
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Account;