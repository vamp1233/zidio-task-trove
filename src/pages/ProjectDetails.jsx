
import React from 'react';
import { useParams, Link } from 'react-router-dom';
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
  Chip,
  LinearProgress,
  Divider,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  AvatarGroup,
  IconButton
} from '@mui/material';
import { 
  ArrowBack,
  Add,
  Edit,
  Delete,
  PieChart,
  Group,
  Assignment,
  AccessTime,
  MoreVert
} from '@mui/icons-material';

// Mock project data
const project = {
  id: '1',
  name: 'Website Redesign',
  description: 'Redesign the company website with modern UI and improved UX. The new website should be responsive, accessible, and optimized for performance. The project includes redesigning all pages, implementing new features, and migrating content from the old website.',
  progress: 75,
  startDate: '2023-09-01',
  dueDate: '2023-12-15',
  status: 'In Progress',
  totalTasks: 24,
  completedTasks: 18,
  teamMembers: [
    { id: '1', name: 'Jane Smith', role: 'Designer', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'John Doe', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Bob Wilson', role: 'QA Engineer', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Emma Davis', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=5' }
  ]
};

// Mock tasks data
const tasksData = [
  {
    id: '1',
    title: 'Create wireframes for homepage',
    assignee: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
    dueDate: '2023-10-20',
    priority: 'High',
    status: 'Done'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    assignee: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
    dueDate: '2023-11-05',
    priority: 'High',
    status: 'In Progress'
  },
  {
    id: '3',
    title: 'Design responsive navbar',
    assignee: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
    dueDate: '2023-10-15',
    priority: 'Medium',
    status: 'Done'
  },
  {
    id: '4',
    title: 'Create API endpoints',
    assignee: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
    dueDate: '2023-11-10',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: '5',
    title: 'Test contact form functionality',
    assignee: { name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
    dueDate: '2023-11-15',
    priority: 'Low',
    status: 'To Do'
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const { currentUser, isAdmin } = useAuth();
  const [tabValue, setTabValue] = React.useState(0);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
          {/* Header with back button */}
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <Button
              component={Link}
              to="/projects"
              startIcon={<ArrowBack />}
              sx={{ mr: 2 }}
            >
              Back to Projects
            </Button>
          </Box>
          
          {/* Project Header */}
          <Paper
            elevation={2}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              background: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mr: 2 }}>
                    {project.name}
                  </Typography>
                  <Chip 
                    label={project.status} 
                    sx={{ 
                      bgcolor: `${getStatusColor(project.status)}20`,
                      color: getStatusColor(project.status),
                      fontWeight: 500
                    }} 
                  />
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {project.description}
                </Typography>
                
                <Grid container spacing={4} sx={{ mb: 2 }}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Start Date
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {formatDate(project.startDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Due Date
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {formatDate(project.dueDate)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Tasks
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {project.completedTasks}/{project.totalTasks} Completed
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="body2" color="text.secondary">
                      Team Members
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {project.teamMembers.length} Members
                    </Typography>
                  </Grid>
                </Grid>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Progress ({project.progress}%)
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={project.progress} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      bgcolor: 'rgba(0, 0, 0, 0.05)'
                    }} 
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mb: 3 }}>
                  {isAdmin() && (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
                
                <Paper sx={{ p: 2, borderRadius: 2, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Team Members
                  </Typography>
                  <AvatarGroup max={5} sx={{ mb: 2, justifyContent: 'flex-start' }}>
                    {project.teamMembers.map((member) => (
                      <Avatar key={member.id} alt={member.name} src={member.avatar} />
                    ))}
                  </AvatarGroup>
                  {isAdmin() && (
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      fullWidth
                      component={Link}
                      to="/team"
                    >
                      Manage Team
                    </Button>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Tabs Navigation */}
          <Box sx={{ mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                '& .MuiTabs-indicator': { height: 3, borderRadius: 3 }, 
                mb: 2 
              }}
            >
              <Tab label="Tasks" />
              <Tab label="Team" />
              <Tab label="Files" />
              <Tab label="Activity" />
            </Tabs>
            
            <Divider />
          </Box>
          
          {/* Tab Content */}
          <Box sx={{ mb: 4 }}>
            {/* Tasks Tab */}
            {tabValue === 0 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Project Tasks
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      component={Link}
                      to="/tasks/new"
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        mr: 1,
                        boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                      }}
                    >
                      Add Task
                    </Button>
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/projects/${id}/board`}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500
                      }}
                    >
                      Kanban Board
                    </Button>
                  </Box>
                </Box>
                
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}
                >
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {tasksData.map((task, index) => (
                      <React.Fragment key={task.id}>
                        {index > 0 && <Divider />}
                        <ListItem
                          component={Link}
                          to={`/tasks/${task.id}`}
                          sx={{
                            py: 2,
                            px: 3,
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                              bgcolor: 'rgba(0, 0, 0, 0.02)'
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src={task.assignee.avatar} alt={task.assignee.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {task.title}
                                <Chip 
                                  size="small"
                                  label={task.status}
                                  sx={{ 
                                    bgcolor: `${getStatusColor(task.status)}20`,
                                    color: getStatusColor(task.status),
                                    fontWeight: 500,
                                    ml: 1,
                                    fontSize: '0.75rem',
                                    height: 20
                                  }} 
                                />
                              </Box>
                            }
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <AccessTime sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Due {formatDate(task.dueDate)}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Chip 
                                size="small"
                                label={task.priority}
                                sx={{ 
                                  bgcolor: `${getPriorityColor(task.priority)}10`,
                                  color: getPriorityColor(task.priority),
                                  fontWeight: 500,
                                  mr: 1,
                                  height: 24
                                }} 
                              />
                              <IconButton edge="end">
                                <MoreVert />
                              </IconButton>
                            </Box>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}
            
            {/* Team Tab */}
            {tabValue === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Team Members
                  </Typography>
                  {isAdmin() && (
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      component={Link}
                      to="/team"
                      sx={{
                        borderRadius: 2,
                        fontWeight: 500,
                        boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                      }}
                    >
                      Add Members
                    </Button>
                  )}
                </Box>
                
                <Paper
                  elevation={2}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}
                >
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {project.teamMembers.map((member, index) => (
                      <React.Fragment key={member.id}>
                        {index > 0 && <Divider />}
                        <ListItem sx={{ py: 2, px: 3 }}>
                          <ListItemAvatar>
                            <Avatar src={member.avatar} alt={member.name} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={member.name}
                            secondary={member.role}
                          />
                          {isAdmin() && (
                            <ListItemSecondaryAction>
                              <IconButton edge="end">
                                <MoreVert />
                              </IconButton>
                            </ListItemSecondaryAction>
                          )}
                        </ListItem>
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}
            
            {/* Files Tab */}
            {tabValue === 2 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <Typography variant="body1" color="text.secondary">
                  No files uploaded yet
                </Typography>
              </Box>
            )}
            
            {/* Activity Tab */}
            {tabValue === 3 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <Typography variant="body1" color="text.secondary">
                  No recent activity
                </Typography>
              </Box>
            )}
          </Box>
        </Container>
      </AnimatedTransition>
    </Box>
  );
};

export default ProjectDetails;
