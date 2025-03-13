
import React, { useState } from 'react';
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
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { 
  Add,
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  PersonAdd,
  Mail
} from '@mui/icons-material';

// Mock team members data
const teamMembersData = [
  { 
    id: '1', 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com',
    role: 'Designer', 
    avatar: 'https://i.pravatar.cc/150?img=1',
    projects: ['Website Redesign', 'Mobile App'],
    tasks: 12,
    dateJoined: '2023-01-15'
  },
  { 
    id: '2', 
    name: 'John Doe', 
    email: 'john.doe@example.com',
    role: 'Developer', 
    avatar: 'https://i.pravatar.cc/150?img=2',
    projects: ['Website Redesign', 'Database Migration', 'API Development'],
    tasks: 18,
    dateJoined: '2023-02-20'
  },
  { 
    id: '3', 
    name: 'Alice Johnson', 
    email: 'alice.johnson@example.com',
    role: 'Project Manager', 
    avatar: 'https://i.pravatar.cc/150?img=3',
    projects: ['Website Redesign', 'Mobile App', 'Marketing Campaign'],
    tasks: 5,
    dateJoined: '2022-11-05'
  },
  { 
    id: '4', 
    name: 'Bob Wilson', 
    email: 'bob.wilson@example.com',
    role: 'QA Engineer', 
    avatar: 'https://i.pravatar.cc/150?img=4',
    projects: ['Website Redesign', 'Mobile App'],
    tasks: 9,
    dateJoined: '2023-03-10'
  },
  { 
    id: '5', 
    name: 'Emma Davis', 
    email: 'emma.davis@example.com',
    role: 'Developer', 
    avatar: 'https://i.pravatar.cc/150?img=5',
    projects: ['Database Migration', 'API Development'],
    tasks: 14,
    dateJoined: '2023-01-25'
  },
  { 
    id: '6', 
    name: 'Michael Brown', 
    email: 'michael.brown@example.com',
    role: 'Designer', 
    avatar: 'https://i.pravatar.cc/150?img=8',
    projects: ['Mobile App', 'Marketing Campaign'],
    tasks: 8,
    dateJoined: '2023-04-15'
  }
];

const TeamManagement = () => {
  const { currentUser, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [search, setSearch] = useState('');
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Handle search change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  // Handle menu open
  const handleMenuOpen = (event, member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };
  
  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Open add member dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  
  // Close add member dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };
  
  // Handle add member
  const handleAddMember = () => {
    // In a real app, this would add a new team member
    console.log('Adding new team member');
    handleCloseAddDialog();
  };
  
  // Open edit member dialog
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
    handleMenuClose();
  };
  
  // Close edit member dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  
  // Handle edit member
  const handleEditMember = () => {
    // In a real app, this would update the team member
    console.log('Editing team member:', selectedMember);
    handleCloseEditDialog();
  };
  
  // Open delete member dialog
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    handleMenuClose();
  };
  
  // Close delete member dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  // Handle delete member
  const handleDeleteMember = () => {
    // In a real app, this would delete the team member
    console.log('Deleting team member:', selectedMember);
    handleCloseDeleteDialog();
  };
  
  // Filter team members based on search
  const filteredMembers = teamMembersData.filter(member => 
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase()) ||
    member.role.toLowerCase().includes(search.toLowerCase())
  );
  
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
                  Team Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your team members and their roles
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                {isAdmin() && (
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenAddDialog}
                    sx={{
                      borderRadius: 2,
                      fontWeight: 500,
                      py: 1,
                      boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                    }}
                  >
                    Add Team Member
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
          
          {/* Search and Filter */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search team members..."
                  variant="outlined"
                  value={search}
                  onChange={handleSearchChange}
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
                <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ borderRadius: 2 }}
                  >
                    Filter
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          {/* Team Members List */}
          <Paper
            elevation={2}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              mb: 4
            }}
          >
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {filteredMembers.map((member, index) => (
                <React.Fragment key={member.id}>
                  {index > 0 && <Divider />}
                  <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemAvatar>
                      <Avatar src={member.avatar} alt={member.name} sx={{ width: 50, height: 50 }} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 500 }}>
                          {member.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Mail sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {member.email}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Member since {formatDate(member.dateJoined)}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            <Chip 
                              label={member.role} 
                              size="small" 
                              sx={{ 
                                bgcolor: 'primary.light',
                                color: 'primary.contrastText',
                                fontWeight: 500,
                                height: 24
                              }} 
                            />
                            <Chip 
                              label={`${member.tasks} Tasks`} 
                              size="small" 
                              sx={{ 
                                bgcolor: 'rgba(0,0,0,0.08)',
                                color: 'text.secondary',
                                height: 24
                              }} 
                            />
                            <Chip 
                              label={`${member.projects.length} Projects`} 
                              size="small" 
                              sx={{ 
                                bgcolor: 'rgba(0,0,0,0.08)',
                                color: 'text.secondary',
                                height: 24
                              }} 
                            />
                          </Box>
                        </Box>
                      }
                      sx={{ ml: 2 }}
                    />
                    {isAdmin() && (
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={(e) => handleMenuOpen(e, member)}>
                          <MoreVert />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </React.Fragment>
              ))}
              
              {filteredMembers.length === 0 && (
                <ListItem sx={{ py: 4 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1" align="center" color="text.secondary">
                        No team members found matching your search
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </Paper>
          
          {/* Team Member Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleOpenEditDialog}>
              <ListItemAvatar>
                <Edit fontSize="small" />
              </ListItemAvatar>
              <ListItemText primary="Edit Member" />
            </MenuItem>
            <MenuItem onClick={handleOpenDeleteDialog}>
              <ListItemAvatar>
                <Delete fontSize="small" color="error" />
              </ListItemAvatar>
              <ListItemText primary="Remove Member" sx={{ color: 'error.main' }} />
            </MenuItem>
          </Menu>
          
          {/* Add Team Member Dialog */}
          <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="sm" fullWidth>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Role"
                      defaultValue=""
                    >
                      <MenuItem value="Project Manager">Project Manager</MenuItem>
                      <MenuItem value="Developer">Developer</MenuItem>
                      <MenuItem value="Designer">Designer</MenuItem>
                      <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddDialog}>Cancel</Button>
              <Button onClick={handleAddMember} variant="contained" startIcon={<PersonAdd />}>
                Add Member
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Edit Team Member Dialog */}
          {selectedMember && (
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
              <DialogTitle>Edit Team Member</DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 0.5 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      defaultValue={selectedMember.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      defaultValue={selectedMember.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Role</InputLabel>
                      <Select
                        label="Role"
                        defaultValue={selectedMember.role}
                      >
                        <MenuItem value="Project Manager">Project Manager</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Designer">Designer</MenuItem>
                        <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
                <Button onClick={handleEditMember} variant="contained">
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          )}
          
          {/* Delete Team Member Dialog */}
          {selectedMember && (
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
              <DialogTitle>Remove Team Member</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to remove {selectedMember.name} from the team? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                <Button onClick={handleDeleteMember} color="error">
                  Remove
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </AnimatedTransition>
    </Box>
  );
};

export default TeamManagement;
