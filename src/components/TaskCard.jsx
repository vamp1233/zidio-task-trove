
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Chip, Avatar, Tooltip, Card, CardContent } from '@mui/material';
import { AccessTime, Flag } from '@mui/icons-material';

const priorityColors = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336'
};

const TaskCard = ({ task, isDraggable = false }) => {
  const { id, title, description, dueDate, priority, assignee, status } = task;
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card 
        component={Link} 
        to={`/tasks/${id}`}
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 2,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
          mb: 2,
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
            <Chip 
              size="small" 
              label={status} 
              sx={{ 
                bgcolor: status === 'To Do' ? 'grey.200' : 
                         status === 'In Progress' ? 'info.lighter' : 
                         'success.lighter',
                color: status === 'To Do' ? 'grey.700' : 
                       status === 'In Progress' ? 'info.main' : 
                       'success.main',
                fontWeight: 500,
                fontSize: 12,
                height: 24
              }} 
            />
            
            <Tooltip title={`Priority: ${priority}`}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: priorityColors[priority.toLowerCase()]
                }}
              >
                <Flag fontSize="small" />
              </Box>
            </Tooltip>
          </Box>
          
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
            {title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2, 
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {description}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={assignee.name}>
                <Avatar
                  src={assignee.avatar}
                  alt={assignee.name}
                  sx={{ width: 28, height: 28 }}
                />
              </Tooltip>
            </Box>
            
            <Tooltip title={`Due ${dueDate}`}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <AccessTime fontSize="small" sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption">{formattedDueDate}</Typography>
              </Box>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
