
import React, { useState } from 'react';
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
  Card,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  DialogContentText
} from '@mui/material';
import { 
  ArrowBack,
  Add,
  MoreVert,
  Edit,
  Delete,
  Flag,
  Person,
  AccessTime,
  ArrowForward,
  DragIndicator
} from '@mui/icons-material';

// Mock project data
const project = {
  id: '1',
  name: 'Website Redesign',
  progress: 75
};

// Mock tasks data
const initialTasks = {
  'todo': [
    {
      id: '1',
      title: 'Design homepage wireframe',
      description: 'Create initial wireframes for the new homepage layout',
      assignee: { id: '1', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
      dueDate: '2023-11-10',
      priority: 'High'
    },
    {
      id: '2',
      title: 'Create style guide',
      description: 'Define colors, typography, and component styles',
      assignee: { id: '1', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
      dueDate: '2023-11-15',
      priority: 'Medium'
    },
    {
      id: '5',
      title: 'Browser testing',
      description: 'Test website in multiple browsers for compatibility',
      assignee: { id: '4', name: 'Bob Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
      dueDate: '2023-12-05',
      priority: 'Medium'
    }
  ],
  'inprogress': [
    {
      id: '3',
      title: 'Implement user authentication',
      description: 'Set up login, registration, and password reset functionality',
      assignee: { id: '2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
      dueDate: '2023-11-20',
      priority: 'High'
    },
    {
      id: '4',
      title: 'Develop responsive navbar',
      description: 'Create a mobile-friendly navigation menu',
      assignee: { id: '2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
      dueDate: '2023-11-18',
      priority: 'Medium'
    }
  ],
  'done': [
    {
      id: '6',
      title: 'Project setup',
      description: 'Initialize repository and set up development environment',
      assignee: { id: '2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
      dueDate: '2023-10-25',
      priority: 'High'
    },
    {
      id: '7',
      title: 'Requirements gathering',
      description: 'Collect and document project requirements',
      assignee: { id: '3', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
      dueDate: '2023-10-30',
      priority: 'High'
    }
  ]
};

const KanbanBoard = () => {
  const { id } = useParams();
  const { currentUser, isAdmin } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Check if a task is overdue
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

  // Handle task menu open
  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  // Handle task menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle edit task
  const handleEditTask = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  // Handle delete task
  const handleDeleteTask = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Handle drag start
  const handleDragStart = (e, task, status) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('status', status);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e, dropStatus) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceStatus = e.dataTransfer.getData('status');
    
    if (sourceStatus === dropStatus) return;
    
    const newTasks = { ...tasks };
    const taskToMove = newTasks[sourceStatus].find(task => task.id === taskId);
    
    newTasks[sourceStatus] = newTasks[sourceStatus].filter(task => task.id !== taskId);
    newTasks[dropStatus] = [...newTasks[dropStatus], taskToMove];
    
    setTasks(newTasks);
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
              to={`/projects/${id}`}
              startIcon={<ArrowBack />}
              sx={{ mr: 2 }}
            >
              Back to Project
            </Button>
          </Box>
          
          {/* Project Header */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {project.name} - Kanban Board
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {isAdmin() && (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    component={Link}
                    to="/tasks/new"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                    }}
                  >
                    Add Task
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
          
          {/* Kanban Board */}
          <Grid container spacing={3}>
            {/* To Do Column */}
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{ 
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  height: '100%',
                  minHeight: 500
                }}
              >
                <Box 
                  sx={{ 
                    p: 1, 
                    mb: 2, 
                    borderRadius: 2, 
                    bgcolor: '#e0e0e0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    To Do ({tasks.todo.length})
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'todo')}
                >
                  {tasks.todo.map((task) => (
                    <Card 
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, 'todo')}
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'grab',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <DragIndicator sx={{ color: 'text.secondary', mr: 1, cursor: 'grab' }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, flexGrow: 1 }}>
                            {task.title}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleMenuOpen(e, task)}
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {task.description.length > 100 
                              ? `${task.description.substring(0, 100)}...` 
                              : task.description}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip 
                            size="small"
                            label={task.priority}
                            sx={{ 
                              bgcolor: `${getPriorityColor(task.priority)}10`,
                              color: getPriorityColor(task.priority),
                              fontWeight: 500,
                              height: 20,
                              fontSize: '0.7rem'
                            }} 
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={task.assignee.avatar} 
                              alt={task.assignee.name} 
                              sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                              {task.assignee.name}
                            </Typography>
                          </Box>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              color: isOverdue(task.dueDate) ? 'error.main' : 'text.secondary'
                            }}
                          >
                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                              {formatDate(task.dueDate)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Grid>
            
            {/* In Progress Column */}
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{ 
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  height: '100%',
                  minHeight: 500
                }}
              >
                <Box 
                  sx={{ 
                    p: 1, 
                    mb: 2, 
                    borderRadius: 2, 
                    bgcolor: '#bbdefb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1565c0' }}>
                    In Progress ({tasks.inprogress.length})
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'inprogress')}
                >
                  {tasks.inprogress.map((task) => (
                    <Card 
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, 'inprogress')}
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'grab',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <DragIndicator sx={{ color: 'text.secondary', mr: 1, cursor: 'grab' }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, flexGrow: 1 }}>
                            {task.title}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleMenuOpen(e, task)}
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {task.description.length > 100 
                              ? `${task.description.substring(0, 100)}...` 
                              : task.description}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip 
                            size="small"
                            label={task.priority}
                            sx={{ 
                              bgcolor: `${getPriorityColor(task.priority)}10`,
                              color: getPriorityColor(task.priority),
                              fontWeight: 500,
                              height: 20,
                              fontSize: '0.7rem'
                            }} 
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={task.assignee.avatar} 
                              alt={task.assignee.name} 
                              sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                              {task.assignee.name}
                            </Typography>
                          </Box>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              color: isOverdue(task.dueDate) ? 'error.main' : 'text.secondary'
                            }}
                          >
                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                              {formatDate(task.dueDate)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Grid>
            
            {/* Done Column */}
            <Grid item xs={12} sm={4}>
              <Paper
                sx={{ 
                  p: 2,
                  borderRadius: 3,
                  bgcolor: '#f5f5f5',
                  height: '100%',
                  minHeight: 500
                }}
              >
                <Box 
                  sx={{ 
                    p: 1, 
                    mb: 2, 
                    borderRadius: 2, 
                    bgcolor: '#c8e6c9',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                    Done ({tasks.done.length})
                  </Typography>
                </Box>
                
                <Box 
                  sx={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'done')}
                >
                  {tasks.done.map((task) => (
                    <Card 
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task, 'done')}
                      sx={{ 
                        mb: 2, 
                        borderRadius: 2,
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'grab',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <DragIndicator sx={{ color: 'text.secondary', mr: 1, cursor: 'grab' }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, flexGrow: 1 }}>
                            {task.title}
                          </Typography>
                          <IconButton 
                            size="small"
                            onClick={(e) => handleMenuOpen(e, task)}
                          >
                            <MoreVert fontSize="small" />
                          </IconButton>
                        </Box>
                        
                        {task.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {task.description.length > 100 
                              ? `${task.description.substring(0, 100)}...` 
                              : task.description}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip 
                            size="small"
                            label={task.priority}
                            sx={{ 
                              bgcolor: `${getPriorityColor(task.priority)}10`,
                              color: getPriorityColor(task.priority),
                              fontWeight: 500,
                              height: 20,
                              fontSize: '0.7rem'
                            }} 
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={task.assignee.avatar} 
                              alt={task.assignee.name} 
                              sx={{ width: 24, height: 24, mr: 1 }}
                            />
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                              {task.assignee.name}
                            </Typography>
                          </Box>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              color: isOverdue(task.dueDate) ? 'error.main' : 'text.secondary'
                            }}
                          >
                            <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                              {formatDate(task.dueDate)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Task Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditTask}>
              <ListItemIcon>
                <Edit fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Edit Task" />
            </MenuItem>
            <MenuItem onClick={handleDeleteTask}>
              <ListItemIcon>
                <Delete fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Delete Task" sx={{ color: 'error.main' }} />
            </MenuItem>
          </Menu>
          
          {/* Edit Task Dialog */}
          {selectedTask && (
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Title"
                  fullWidth
                  variant="outlined"
                  defaultValue={selectedTask.title}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue={selectedTask.description}
                  sx={{ mb: 2 }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="dense"
                      label="Due Date"
                      type="date"
                      fullWidth
                      variant="outlined"
                      defaultValue={selectedTask.dueDate}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" margin="dense">
                      <InputLabel>Priority</InputLabel>
                      <Select
                        label="Priority"
                        defaultValue={selectedTask.priority}
                      >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button variant="contained" onClick={handleCloseDialog}>Save</Button>
              </DialogActions>
            </Dialog>
          )}
          
          {/* Delete Task Dialog */}
          {selectedTask && (
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
              <DialogTitle>Delete Task</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete the task "{selectedTask.title}"? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                <Button color="error" onClick={handleCloseDeleteDialog}>Delete</Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </AnimatedTransition>
    </Box>
  );
};

export default KanbanBoard;
