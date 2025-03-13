
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
  Avatar,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { 
  ArrowBack,
  Edit,
  Delete,
  AccessTime,
  Send,
  AttachFile,
  Assignment,
  Flag,
  ChangeCircle
} from '@mui/icons-material';

// Mock task data
const task = {
  id: '1',
  title: 'Create wireframes for homepage',
  description: 'Design wireframes for the new homepage layout including hero section, features section, testimonials, and footer. The wireframes should be responsive and follow the new brand guidelines. Consider the user journey and optimize for conversion.',
  status: 'In Progress',
  priority: 'High',
  dueDate: '2023-11-20',
  createdAt: '2023-10-15',
  assignee: { id: '1', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
  project: { id: '1', name: 'Website Redesign' },
  comments: [
    {
      id: '1',
      user: { id: '3', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
      text: 'Could you share your progress so far?',
      timestamp: '2023-10-20T09:30:00'
    },
    {
      id: '2',
      user: { id: '1', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
      text: 'I\'ve completed the initial sketches and will upload them soon.',
      timestamp: '2023-10-20T10:15:00'
    },
    {
      id: '3',
      user: { id: '2', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2' },
      text: 'Looking forward to seeing them. Please consider mobile responsiveness from the start.',
      timestamp: '2023-10-20T11:05:00'
    }
  ],
  attachments: [
    { id: '1', name: 'initial-sketch.pdf', size: '2.5 MB', uploadedAt: '2023-10-18T14:30:00' }
  ],
  activity: [
    { id: '1', type: 'created', user: { id: '3', name: 'Alice Johnson' }, timestamp: '2023-10-15T08:00:00' },
    { id: '2', type: 'assigned', user: { id: '3', name: 'Alice Johnson' }, assignee: { id: '1', name: 'Jane Smith' }, timestamp: '2023-10-15T08:05:00' },
    { id: '3', type: 'comment', user: { id: '3', name: 'Alice Johnson' }, timestamp: '2023-10-20T09:30:00' },
    { id: '4', type: 'status_change', user: { id: '1', name: 'Jane Smith' }, from: 'To Do', to: 'In Progress', timestamp: '2023-10-17T10:15:00' }
  ]
};

const TaskDetails = () => {
  const { id } = useParams();
  const { currentUser, isAdmin } = useAuth();
  const [comment, setComment] = useState('');
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [status, setStatus] = useState(task.status);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do': return '#9e9e9e';
      case 'In Progress': return '#42a5f5';
      case 'Done': return '#66bb6a';
      default: return '#757575';
    }
  };
  
  // Handle comment change
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  
  // Handle comment submit
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // In a real app, this would send the comment to the backend
      console.log('Submitting comment:', comment);
      setComment('');
    }
  };
  
  // Open status change dialog
  const handleOpenStatusDialog = () => {
    setOpenStatusDialog(true);
  };
  
  // Close status change dialog
  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };
  
  // Handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  
  // Save status change
  const handleSaveStatus = () => {
    // In a real app, this would update the task status in the backend
    console.log('Changing status to:', status);
    handleCloseStatusDialog();
  };
  
  // Open delete dialog
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  
  // Close delete dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  // Handle delete task
  const handleDeleteTask = () => {
    // In a real app, this would delete the task in the backend
    console.log('Deleting task:', id);
    handleCloseDeleteDialog();
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
              to={`/projects/${task.project.id}`}
              startIcon={<ArrowBack />}
              sx={{ mr: 2 }}
            >
              Back to Project
            </Button>
          </Box>
          
          {/* Task Header */}
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
                  <Assignment sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {task.title}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                  <Chip 
                    label={task.status} 
                    sx={{ 
                      bgcolor: `${getStatusColor(task.status)}20`,
                      color: getStatusColor(task.status),
                      fontWeight: 500
                    }} 
                  />
                  <Chip 
                    label={task.priority} 
                    sx={{ 
                      bgcolor: `${getPriorityColor(task.priority)}10`,
                      color: getPriorityColor(task.priority),
                      fontWeight: 500
                    }} 
                  />
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                    in <Link to={`/projects/${task.project.id}`} style={{ textDecoration: 'none', color: 'primary.main', marginLeft: '4px' }}>{task.project.name}</Link>
                  </Typography>
                </Box>
                
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {task.description}
                </Typography>
                
                <Grid container spacing={4} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Assigned To
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Avatar src={task.assignee.avatar} alt={task.assignee.name} sx={{ width: 24, height: 24, mr: 1 }} />
                      <Typography variant="body1">
                        {task.assignee.name}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Due Date
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{ 
                        color: isOverdue(task.dueDate) ? 'error.main' : 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        mt: 0.5
                      }}
                    >
                      <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                      {formatDate(task.dueDate)}
                      {isOverdue(task.dueDate) && ' (Overdue)'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Created
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(task.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, mb: 2, gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ChangeCircle />}
                    onClick={handleOpenStatusDialog}
                  >
                    Change Status
                  </Button>
                  {isAdmin() && (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<Edit />}
                        component={Link}
                        to={`/tasks/${id}/edit`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={handleOpenDeleteDialog}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
          
          <Grid container spacing={4}>
            {/* Comments Section */}
            <Grid item xs={12} md={8}>
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Comments
                </Typography>
                
                <List sx={{ mb: 3 }}>
                  {task.comments.map((comment) => (
                    <ListItem
                      key={comment.id}
                      alignItems="flex-start"
                      sx={{ px: 0, py: 2 }}
                    >
                      <ListItemAvatar>
                        <Avatar src={comment.user.avatar} alt={comment.user.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {comment.user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(comment.timestamp)} at {formatTime(comment.timestamp)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body1"
                            sx={{ mt: 1 }}
                          >
                            {comment.text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Avatar 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name} 
                    sx={{ mt: 1, mr: 2 }} 
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    variant="outlined"
                    value={comment}
                    onChange={handleCommentChange}
                    sx={{ mr: 2 }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<Send />}
                    onClick={handleCommentSubmit}
                    disabled={!comment.trim()}
                    sx={{ mt: 1 }}
                  >
                    Post
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              {/* Attachments */}
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
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Attachments
                </Typography>
                
                {task.attachments.length > 0 ? (
                  <List>
                    {task.attachments.map((attachment) => (
                      <ListItem
                        key={attachment.id}
                        sx={{ px: 0, py: 1 }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <AttachFile />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={attachment.name}
                          secondary={`${attachment.size} • ${formatDate(attachment.uploadedAt)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No attachments yet
                  </Typography>
                )}
                
                <Button
                  variant="outlined"
                  startIcon={<AttachFile />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add Attachment
                </Button>
              </Paper>
              
              {/* Activity Log */}
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  background: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Activity
                </Typography>
                
                <List>
                  {task.activity.map((activity) => (
                    <ListItem
                      key={activity.id}
                      sx={{ px: 0, py: 1 }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="body2">
                            <Typography component="span" fontWeight={600}>
                              {activity.user.name}
                            </Typography>
                            {' '}
                            {activity.type === 'created' && 'created this task'}
                            {activity.type === 'assigned' && `assigned this task to ${activity.assignee.name}`}
                            {activity.type === 'comment' && 'commented on this task'}
                            {activity.type === 'status_change' && `changed status from ${activity.from} to ${activity.to}`}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Status Change Dialog */}
          <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
            <DialogTitle>Change Task Status</DialogTitle>
            <DialogContent>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseStatusDialog}>Cancel</Button>
              <Button onClick={handleSaveStatus} variant="contained">Save</Button>
            </DialogActions>
          </Dialog>
          
          {/* Delete Task Dialog */}
          <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this task? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
              <Button onClick={handleDeleteTask} color="error">Delete</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </AnimatedTransition>
    </Box>
  );
};

export default TaskDetails;
