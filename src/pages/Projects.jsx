
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AnimatedTransition from '../components/AnimatedTransition';
import Navbar from '../components/Navbar';
import { 
  Box, 
  Typography, 
  Container,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import { 
  Add,
  Search,
  MoreVert,
  Group,
  Assignment
} from '@mui/icons-material';

// Mock data for projects
const projectsData = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign the company website with modern UI and improved UX',
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
    members: 5,
    dueDate: '2023-12-15'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Create a mobile app version of our platform for iOS and Android',
    progress: 45,
    totalTasks: 32,
    completedTasks: 14,
    members: 8,
    dueDate: '2024-01-20'
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    description: 'Launch a digital marketing campaign for Q4',
    progress: 90,
    totalTasks: 18,
    completedTasks: 16,
    members: 4,
    dueDate: '2023-11-30'
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate data from SQL to NoSQL database for improved performance',
    progress: 30,
    totalTasks: 15,
    completedTasks: 5,
    members: 3,
    dueDate: '2024-02-10'
  },
  {
    id: '5',
    name: 'Product Launch',
    description: 'Prepare and execute the launch of our new product line',
    progress: 60,
    totalTasks: 28,
    completedTasks: 17,
    members: 12,
    dueDate: '2024-01-05'
  }
];

const Projects = () => {
  const { currentUser, isAdmin } = useAuth();

  // Format due date
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Check if a project is overdue
  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today;
  };
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <AnimatedTransition>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Projects
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage and track all your projects
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  component={Link}
                  to="/projects/new"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 500,
                    py: 1,
                    boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                  }}
                >
                  New Project
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          {/* Search and Filter */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search projects..."
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Filter options could be added here */}
              </Grid>
            </Grid>
          </Box>
          
          {/* Projects Grid */}
          <Grid container spacing={3}>
            {projectsData.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card 
                  elevation={2}
                  sx={{ 
                    borderRadius: 3,
                    height: '100%',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {project.name}
                      </Typography>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, height: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                          {project.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={project.progress} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: 'rgba(0, 0, 0, 0.05)'
                        }} 
                      />
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Assignment sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {project.completedTasks}/{project.totalTasks} Tasks
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Group sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {project.members} Members
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: isOverdue(project.dueDate) ? 'error.main' : 'text.secondary'
                        }}
                      >
                        Due {formatDueDate(project.dueDate)}
                      </Typography>
                      {isOverdue(project.dueDate) && (
                        <Chip 
                          label="Overdue" 
                          size="small" 
                          color="error" 
                          sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                        />
                      )}
                    </Box>
                  </CardContent>
                  
                  <Divider />
                  
                  <CardActions sx={{ p: 2 }}>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      component={Link}
                      to={`/projects/${project.id}`}
                    >
                      Details
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small"
                      component={Link}
                      to={`/projects/${project.id}/board`}
                    >
                      Kanban Board
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </AnimatedTransition>
    </Box>
  );
};

export default Projects;
