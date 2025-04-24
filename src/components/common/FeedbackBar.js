import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Snackbar,
  Alert,
  IconButton,
  Fab,
  Drawer,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Feedback as FeedbackIcon,
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
} from '@mui/icons-material';

const FeedbackBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('general');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setType('general');
    setRating(0);
    setFeedback('');
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call to submit feedback
    console.log({
      type,
      rating,
      feedback,
      timestamp: new Date().toISOString(),
    });
    
    // Show success message and reset form
    setSubmitted(true);
    
    // Close after delay
    setTimeout(() => {
      handleClose();
      setTimeout(handleReset, 500); // Reset after drawer closes
    }, 2000);
  };

  const FeedbackTypeButton = ({ value, label, icon }) => (
    <Button
      variant={type === value ? 'contained' : 'outlined'}
      color={type === value ? 'primary' : 'inherit'}
      onClick={() => setType(value)}
      startIcon={icon}
      sx={{
        borderRadius: 0,
        flexGrow: 1,
        py: 1,
      }}
    >
      {label}
    </Button>
  );

  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
    bgcolor: 'secondary.main',
    '&:hover': {
      bgcolor: 'secondary.dark',
    },
    zIndex: theme.zIndex.drawer - 1,
  };

  return (
    <>
      {/* Feedback button */}
      <Fab 
        color="secondary" 
        aria-label="feedback" 
        onClick={handleOpen}
        sx={fabStyle}
      >
        <FeedbackIcon />
      </Fab>
      
      {/* Feedback drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={submitted ? null : handleClose}
        PaperProps={{
          sx: { 
            width: { xs: '100%', sm: 400 },
            p: 3,
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {submitted ? 'Thank You!' : 'Share Your Feedback'}
          </Typography>
          {!submitted && (
            <IconButton 
              edge="end" 
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {submitted ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" sx={{ color: 'success.main', mb: 2 }}>
              Feedback Received
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Thank you for your valuable feedback. We appreciate your input and will use it to improve our services.
            </Typography>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Typography variant="body2" color="text.secondary" paragraph>
              Your feedback helps us improve our service. How was your experience with Terrapin?
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mb: 1, mt: 3 }}>
              Feedback Type
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <FeedbackTypeButton
                value="general"
                label="General"
                icon={<FeedbackIcon fontSize="small" />}
              />
              <FeedbackTypeButton
                value="positive"
                label="Positive"
                icon={<ThumbUpIcon fontSize="small" />}
              />
              <FeedbackTypeButton
                value="negative"
                label="Negative"
                icon={<ThumbDownIcon fontSize="small" />}
              />
            </Box>
            
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Rate Your Experience
            </Typography>
            <Rating
              name="experience-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={1}
              size="large"
              sx={{ mb: 3 }}
            />

            <TextField
              label="Your Feedback"
              multiline
              rows={4}
              fullWidth
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you liked or how we can improve..."
              sx={{ mb: 3 }}
            />

            <Divider sx={{ mb: 3 }} />
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              endIcon={<SendIcon />}
              disabled={!feedback.trim()}
              sx={{ borderRadius: 0, py: 1.5 }}
            >
              Submit Feedback
            </Button>
          </form>
        )}
      </Drawer>
    </>
  );
};

export default FeedbackBar;