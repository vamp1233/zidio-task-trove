
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
  Paper,
  Button,
  LinearProgress,
  Divider,
  Chip,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import { 
  Add, 
  ArrowForward, 
  CheckCircle, 
  AccessTime, 
  Group,
  FolderOpen,
  Assignment,
  Timeline
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Mock data
const projectsData = [
  {
    id: '1',
    name: 'Website Redesign',
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
  },
  {
    id: '2',
    name: 'Mobile App Development',
    progress: 45,
    totalTasks: 32,
    completedTasks: 14,
  },
  {
    id: '3',
    name: 'Marketing Campaign',
    progress: 90,
    totalTasks: 18,
    completedTasks: 16,
  }
];

const tasksData = [
  {
    id: '1',
    title: 'Update homepage design',
    project: 'Website Redesign',
    dueDate: '2023-11-15',
    priority: 'High',
    status: 'In Progress'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    project: 'Mobile App Development',
    dueDate: '2023-11-20',
    priority: 'Medium',
    status: 'To Do'
  },
  {
    id: '3',
    title: 'Create content for social media',
    project: 'Marketing Campaign',
    dueDate: '2023-11-10',
    priority: 'High',
    status: 'In Progress'
  },
  {
    id: '4',
    title: 'Fix navigation bug',
    project: 'Website Redesign',
    dueDate: '2023-11-05',
    priority: 'High',
    status: 'To Do'
  }
];

const teamMembers = [
  { id: '1', name: 'Jane Smith', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'John Doe', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Bob Wilson', role: 'QA Engineer', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Emma Davis', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=5' }
];

const statusData = [
  { name: 'To Do', value: 8, color: '#9e9e9e' },
  { name: 'In Progress', value: 12, color: '#42a5f5' },
  { name: 'Done', value: 20, color: '#66bb6a' }
];

const Dashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  
  // Format due date
  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Calculate if a task is overdue
  const isOverdue = (dateString) => {
    const dueDate = new Date(dateString);
    const today = new Date();
    return dueDate < today;
  };
  
  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return '#9e9e9e';
      case 'In Progress': return '#42a5f5';
      case 'Done': return '#66bb6a';
      default: return '#757575';
    }
  };
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <AnimatedTransition>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Welcome Header */}
          <Box sx={{ mb: 5 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  Welcome back, {currentUser?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Here's an overview of your tasks and projects.
                </Typography>
              </Grid>
              <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
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
                <Button
                  variant="outlined"
                  startIcon={<Assignment />}
                  component={Link}
                  to="/tasks/new"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 500,
                    py: 1,
                  }}
                >
                  New Task
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { icon: <FolderOpen sx={{ fontSize: 30 }} />, title: 'Projects', value: isAdmin() ? 8 : 3, color: '#42a5f5' },
              { icon: <Assignment sx={{ fontSize: 30 }} />, title: 'Tasks', value: isAdmin() ? 40 : 12, color: '#ec407a' },
              { icon: <CheckCircle sx={{ fontSize: 30 }} />, title: 'Completed', value: isAdmin() ? 24 : 5, color: '#66bb6a' },
              { icon: <Group sx={{ fontSize: 30 }} />, title: 'Team Members', value: isAdmin() ? 12 : 5, color: '#ff9800' },
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {stat.title}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        bgcolor: `${stat.color}10`, 
                        color: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              {/* Projects Overview */}
              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Projects Overview
                  </Typography>
                  <Button
                    component={Link}
                    to="/projects"
                    endIcon={<ArrowForward />}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    View All
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  {projectsData.map((project) => (
                    <Grid item xs={12} sm={4} key={project.id}>
                      <Paper
                        component={Link}
                        to={`/projects/${project.id}`}
                        sx={{
                          p: 2.5,
                          height: '100%',
                          borderRadius: 2,
                          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          textDecoration: 'none',
                          color: 'inherit',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                          }
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                          {project.name}
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
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">
                            Tasks: {project.completedTasks}/{project.totalTasks}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
              
              {/* Recent Tasks */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Your Tasks
                  </Typography>
                  <Button
                    component={Link}
                    to="/tasks"
                    endIcon={<ArrowForward />}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    View All
                  </Button>
                </Box>
                
                <List sx={{ width: '100%' }}>
                  {tasksData.map((task, index) => (
                    <React.Fragment key={task.id}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem
                        alignItems="flex-start"
                        component={Link}
                        to={`/tasks/${task.id}`}
                        sx={{
                          py: 2,
                          borderRadius: 2,
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.02)'
                          }
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                {task.title}
                              </Typography>
                              <Chip 
                                size="small"
                                label={task.status}
                                sx={{ 
                                  bgcolor: `${getStatusColor(task.status)}20`,
                                  color: getStatusColor(task.status),
                                  fontWeight: 500,
                                  fontSize: 12,
                                  height: 24
                                }} 
                              />
                            </Box>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                                sx={{ display: 'block', mt: 0.5 }}
                              >
                                {task.project}
                              </Typography>
                              <Box 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  mt: 1,
                                  color: isOverdue(task.dueDate) ? 'error.main' : 'text.secondary'
                                }}
                              >
                                <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant="body2">
                                  Due {formatDueDate(task.dueDate)}
                                  {isOverdue(task.dueDate) && ' (Overdue)'}
                                </Typography>
                              </Box>
                            </React.Fragment>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Chip 
                            size="small"
                            label={task.priority}
                            sx={{ 
                              bgcolor: `${getPriorityColor(task.priority)}10`,
                              color: getPriorityColor(task.priority),
                              fontWeight: 500,
                              height: 24
                            }} 
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            {/* Right Column */}
            <Grid item xs={12} md={4}>
              {/* Task Status Chart */}
              <Paper
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Task Status
                </Typography>
                
                <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                  {statusData.map((entry, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: entry.color }} />
                      <Typography variant="body2">
                        {entry.name} ({entry.value})
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
              
              {/* Team Members */}
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Team Members
                  </Typography>
                  <Button
                    component={Link}
                    to="/team"
                    endIcon={<ArrowForward />}
                    sx={{ textTransform: 'none', fontWeight: 500 }}
                  >
                    Manage Team
                  </Button>
                </Box>
                
                <List sx={{ width: '100%' }}>
                  {teamMembers.slice(0, 4).map((member, index) => (
                    <React.Fragment key={member.id}>
                      {index > 0 && <Divider component="li" />}
                      <ListItem
                        alignItems="flex-start"
                        sx={{ py: 1.5 }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={member.name} src={member.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={member.name}
                          secondary={member.role}
                        />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
                
                {teamMembers.length > 4 && (
                  <Box sx={{ pt: 1 }}>
                    <Button 
                      component={Link}
                      to="/team"
                      variant="text" 
                      fullWidth
                    >
                      View All Members
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </AnimatedTransition>
    </Box>
  );
};

export default Dashboard;
