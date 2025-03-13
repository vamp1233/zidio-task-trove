
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Speed, 
  Group, 
  AssignmentTurnedIn, 
  Timeline 
} from '@mui/icons-material';

const Index = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const featureItems = [
    {
      icon: <AssignmentTurnedIn fontSize="large" />,
      title: "Task Management",
      description: "Create, assign, and track tasks with deadlines and priorities to keep your team organized."
    },
    {
      icon: <Group fontSize="large" />,
      title: "Team Collaboration",
      description: "Seamlessly collaborate with your team through comments, file sharing, and real-time updates."
    },
    {
      icon: <Timeline fontSize="large" />,
      title: "Progress Tracking",
      description: "Visualize project progress with Kanban boards and get insights through simple analytics."
    },
    {
      icon: <Speed fontSize="large" />,
      title: "Streamlined Workflow",
      description: "Optimize your team's productivity with intuitive interfaces and streamlined processes."
    }
  ];
  
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: '#fcfcfd',
        backgroundImage: 'linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,1) 100%)',
        overflow: 'hidden'
      }}
    >
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 10 },
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: { xs: 'center', md: 'left' } }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography 
                    component="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: 2,
                      background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Simplify Task Management for Your Team
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography 
                    variant="h6" 
                    color="text.secondary"
                    sx={{ 
                      mb: 4,
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    Zidio Task Trove helps teams organize, track, and manage their work efficiently. 
                    Boost productivity with intuitive task management and real-time collaboration.
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: { xs: 'center', md: 'flex-start' }
                    }}
                  >
                    <Button
                      component={Link}
                      to="/login"
                      variant="contained"
                      size="large"
                      sx={{ 
                        borderRadius: 2, 
                        py: 1.5,
                        px: 4,
                        fontWeight: 600,
                        boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 24px rgba(25, 118, 210, 0.4)',
                        }
                      }}
                    >
                      Get Started
                    </Button>
                    
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      size="large"
                      sx={{ 
                        borderRadius: 2, 
                        py: 1.5, 
                        px: 4,
                        fontWeight: 600,
                        borderWidth: 2
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </motion.div>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Box 
                  sx={{ 
                    position: 'relative',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <Box 
                    component="img"
                    src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Project management dashboard"
                    sx={{ 
                      width: '100%',
                      height: 'auto',
                      borderRadius: 4,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                      transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg)',
                    }}
                  />
                  
                  {/* Decorative elements */}
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      background: 'linear-gradient(45deg, #42a5f5, #1976d2)',
                      top: -20,
                      right: -20,
                      zIndex: -1
                    }} 
                  />
                  
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      width: 120, 
                      height: 120, 
                      borderRadius: '50%', 
                      border: '20px solid rgba(25, 118, 210, 0.1)',
                      bottom: -30,
                      left: -30,
                      zIndex: -1
                    }} 
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                background: 'linear-gradient(90deg, #1e293b 0%, #334155 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Powerful Features
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Everything you need to manage projects and tasks efficiently
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {featureItems.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                      <Box 
                        sx={{ 
                          display: 'inline-flex', 
                          p: 1.5, 
                          borderRadius: 2, 
                          bgcolor: 'primary.lighter',
                          color: 'primary.main',
                          mb: 2
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      
      {/* Call to Action */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 }, 
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(165deg, #bbdefb 0%, #e3f2fd 100%)',
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            opacity: 0.1,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231976d2' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(30px)',
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2 
                }}
              >
                Ready to streamline your workflow?
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  mb: 4, 
                  maxWidth: 600,
                  mx: 'auto'
                }}
              >
                Join thousands of teams using Zidio Task Trove to boost productivity and collaboration.
              </Typography>
              
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{ 
                  borderRadius: 2, 
                  py: 1.5,
                  px: 5,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(25, 118, 210, 0.4)',
                  }
                }}
              >
                Get Started Now
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 6, 
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Zidio Task Trove. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
