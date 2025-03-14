
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Card,
  CardContent,
  useMediaQuery
} from '@mui/material';
import { 
  AssignmentTurnedIn, 
  Group, 
  Timeline, 
  Speed 
} from '@mui/icons-material';
import AnimatedTransition from '../components/AnimatedTransition';

const Index = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  
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
    <AnimatedTransition>
      <Box 
        sx={{ 
          minHeight: '100vh',
          bgcolor: '#fcfcfd',
          backgroundImage: 'linear-gradient(180deg, rgba(248,250,252,0) 0%, rgba(248,250,252,1) 100%)',
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
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
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
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'rgba(255, 255, 255, 0.8)',
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
                          bgcolor: '#e3f2fd',
                          color: '#1976d2',
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
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Box 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.85)',
                p: { xs: 4, md: 8 },
                borderRadius: 4,
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
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
    </AnimatedTransition>
  );
};

export default Index;
