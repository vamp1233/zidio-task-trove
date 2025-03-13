
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import AnimatedTransition from '../components/AnimatedTransition';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Paper, 
  Divider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';

const Login = () => {
  const { currentUser, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      await login(email, password);
      // Redirect happens in the AuthContext
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <AnimatedTransition>
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          px: 2,
          background: 'linear-gradient(145deg, #f8fafc 0%, #e1f5fe 100%)',
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              overflow: 'hidden',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Left side - Login form */}
            <Box 
              sx={{ 
                flex: '1 1 50%', 
                p: { xs: 4, md: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography 
                  component={Link} 
                  to="/" 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: 'primary.main',
                    display: 'inline-block',
                    mb: 3
                  }}
                >
                  Zidio Task Trove
                </Typography>
                
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  Welcome back
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Enter your credentials to access your account
                </Typography>
              </Box>
              
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Email Address"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com or user@example.com"
                  sx={{ mb: 3 }}
                />
                
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Use 'password' for demo"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  
                  <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                      Forgot password?
                    </Typography>
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  sx={{ 
                    py: 1.5,
                    mb: 3,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
                
                <Divider sx={{ mb: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Or continue with
                  </Typography>
                </Divider>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                  <Button
                    variant="outlined"
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      px: 3,
                      fontWeight: 500,
                      flexGrow: 1
                    }}
                  >
                    Google
                  </Button>
                  
                  <Button
                    variant="outlined"
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      px: 3,
                      fontWeight: 500,
                      flexGrow: 1
                    }}
                  >
                    Microsoft
                  </Button>
                </Box>
                
                <Typography variant="body2" align="center" color="text.secondary">
                  Don't have an account?{' '}
                  <Link to="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <Typography component="span" variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </Box>
            
            {/* Right side - Image */}
            <Box 
              sx={{ 
                flex: '1 1 50%',
                display: { xs: 'none', md: 'block' },
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box 
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'url(https://images.pexels.com/photos/7439141/pexels-photo-7439141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.8) 0%, rgba(66, 165, 245, 0.7) 100%)',
                    backdropFilter: 'blur(2px)',
                  }
                }}
              />
              
              <Box 
                sx={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  height: '100%',
                  p: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: 'white',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 2 }}>
                    Boost your team's productivity
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                    Manage tasks, track progress, and collaborate with your team in real-time.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['Create and assign tasks', 'Track deadlines and progress', 'Collaborate with your team'].map((feature, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          p: 2,
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <Box sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          bgcolor: 'white',
                          color: 'primary.main',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          ✓
                        </Box>
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Zidio Task Trove. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </AnimatedTransition>
  );
};

export default Login;
