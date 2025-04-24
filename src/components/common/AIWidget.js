import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Fab,
  Drawer,
  Paper,
  Avatar,
  CircularProgress,
  Divider,
  IconButton,
  useTheme,
  Chip,
} from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionIcon,
} from '@mui/icons-material';

// Sample responses from Gemma model (simulated)
const aiResponses = {
  'shipping': 'Our standard shipping takes 3-5 business days within the continental US. For international orders, shipping typically takes 7-14 business days. Express shipping options are available at checkout for faster delivery.',
  'returns': 'We accept returns within 30 days of delivery for most items in new, unworn condition with original packaging. Custom orders and sale items are final sale. To initiate a return, please visit your account page or contact customer service.',
  'materials': 'At Terrapin, we use only premium materials in our products. Our leather items are crafted from full-grain, vegetable-tanned leather. Our home accessories feature sustainable hardwoods, premium metals, and artisanal glass. All materials are responsibly sourced.',
  'care': 'For leather items, we recommend regular cleaning with a soft, dry cloth and occasional conditioning with a leather balm. Art deco pieces should be dusted regularly with a microfiber cloth. For specific care instructions, please refer to the product care card included with your purchase.',
  'warranty': 'All Terrapin products come with a one-year warranty against manufacturing defects. Our leather goods have an extended three-year warranty. This warranty covers defects in materials and workmanship under normal use.',
  'ordering': 'To place an order, simply browse our collections, select the items you want, add them to your cart, and proceed to checkout. You can pay using major credit cards, PayPal, or Apple Pay. Once your order is confirmed, you will receive an email with your order details.',
  'account': 'Creating an account allows you to track orders, save favorite items, and enjoy a faster checkout experience. To create an account, click the profile icon in the top navigation and select "Sign Up" or create one during checkout.',
  'sustainability': 'Sustainability is central to our mission. We use responsibly sourced materials, minimize waste through efficient production processes, use recycled packaging materials, and partner with manufacturers who adhere to ethical labor practices.'
};

// Common questions for suggestion chips
const commonQuestions = [
  { id: 1, text: 'How long does shipping take?', key: 'shipping' },
  { id: 2, text: 'What is your return policy?', key: 'returns' },
  { id: 3, text: 'Tell me about your materials', key: 'materials' },
  { id: 4, text: 'How do I care for my products?', key: 'care' },
  { id: 5, text: 'Do you offer warranty?', key: 'warranty' },
  { id: 6, text: 'How do I place an order?', key: 'ordering' },
  { id: 7, text: 'How do I create an account?', key: 'account' },
  { id: 8, text: 'What are your sustainability practices?', key: 'sustainability' }
];

// Message component for chat
const Message = ({ type, text }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 2,
        justifyContent: type === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      {type === 'bot' && (
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 32,
            height: 32,
            mr: 1,
            mt: 0.5,
          }}
        >
          <BotIcon sx={{ fontSize: 18 }} />
        </Avatar>
      )}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          maxWidth: '75%',
          borderRadius: 2,
          bgcolor: type === 'user' ? 'primary.main' : 'background.paper',
          color: type === 'user' ? 'primary.contrastText' : 'text.primary',
          border: type === 'bot' ? `1px solid ${theme.palette.divider}` : 'none',
        }}
      >
        <Typography variant="body2">{text}</Typography>
      </Paper>
      {type === 'user' && (
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 32,
            height: 32,
            ml: 1,
            mt: 0.5,
          }}
        >
          <PersonIcon sx={{ fontSize: 18 }} />
        </Avatar>
      )}
    </Box>
  );
};

// Main AI Widget component
const AIWidget = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m Gemma, your Terrapin assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const getResponseForQuery = (query) => {
    // Convert to lowercase for matching
    const lowercaseQuery = query.toLowerCase();
    
    // Check for keyword matches
    let bestMatch = null;
    let highestScore = 0;
    
    Object.keys(aiResponses).forEach(key => {
      // Simple scoring based on presence of keywords
      const score = lowercaseQuery.includes(key) ? key.length : 0;
      if (score > highestScore) {
        highestScore = score;
        bestMatch = key;
      }
    });
    
    // Fallback response if no match found
    if (!bestMatch || highestScore === 0) {
      return "I'm not sure I understand that question. Could you rephrase it or select one of the suggested topics below?";
    }
    
    return aiResponses[bestMatch];
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    
    // Simulate AI processing
    setLoading(true);
    setTimeout(() => {
      const response = getResponseForQuery(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setLoading(false);
    }, 1000);
  };
  
  const handleQuestionChip = (question) => {
    // Add selected question to chat as user message
    setMessages(prev => [...prev, { type: 'user', text: question.text }]);
    
    // Simulate AI processing
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: aiResponses[question.key] }]);
      setLoading(false);
    }, 1000);
  };
  
  return (
    <>
      {/* AI Help button */}
      <Fab
        color="primary"
        aria-label="help"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 90, // Positioned to the right of feedback button
          zIndex: theme.zIndex.drawer - 1,
        }}
      >
        <QuestionIcon />
      </Fab>
      
      {/* AI Help drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}>
              <BotIcon />
            </Avatar>
            <Box>
              <Typography variant="h6">Gemma</Typography>
              <Typography variant="caption" color="text.secondary">
                Terrapin AI Assistant
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Chat messages area */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: 'auto',
            bgcolor: 'background.default',
          }}
        >
          {messages.map((message, index) => (
            <Message
              key={index}
              type={message.type}
              text={message.text}
            />
          ))}
          
          {/* Loading indicator */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  maxWidth: '75%',
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  border: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <CircularProgress size={20} thickness={4} />
              </Paper>
            </Box>
          )}
          
          {/* Reference for auto-scroll */}
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Suggestion chips */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Common Questions
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mb: 2,
            }}
          >
            {commonQuestions.slice(0, 4).map((question) => (
              <Chip
                key={question.id}
                label={question.text}
                onClick={() => handleQuestionChip(question)}
                color="primary"
                variant="outlined"
                clickable
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            {commonQuestions.slice(4).map((question) => (
              <Chip
                key={question.id}
                label={question.text}
                onClick={() => handleQuestionChip(question)}
                color="primary"
                variant="outlined"
                clickable
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
        
        {/* Input area */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              fullWidth
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              variant="outlined"
              size="small"
              disabled={loading}
              sx={{
                mr: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!input.trim() || loading}
              sx={{
                minWidth: 'auto',
                width: 40,
                height: 40,
                borderRadius: '50%',
              }}
            >
              <SendIcon />
            </Button>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: 'block', textAlign: 'center' }}
          >
            Powered by Gemma AI | Finetuned for Terrapin
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default AIWidget;