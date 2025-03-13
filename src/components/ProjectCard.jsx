
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress, 
  AvatarGroup, 
  Avatar, 
  Tooltip, 
  CardActionArea,
  Chip
} from '@mui/material';
import { AccessTime } from '@mui/icons-material';

const ProjectCard = ({ project }) => {
  const { id, name, description, progress, team, totalTasks, completedTasks, dueDate } = project;
  
  const formattedDueDate = new Date(dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          borderRadius: 2,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
          },
        }}
      >
        <CardActionArea 
          component={Link} 
          to={`/projects/${id}`}
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%'
          }}
        >
          <CardContent sx={{ width: '100%', p: 3, flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Chip 
                size="small" 
                label={progress === 100 ? "Completed" : "In Progress"} 
                color={progress === 100 ? "success" : "primary"}
                sx={{ height: 24 }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTime fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                {formattedDueDate}
              </Typography>
            </Box>
            
            <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
              {name}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                height: '40px'
              }}
            >
              {description}
            </Typography>
            
            <Box sx={{ mb: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" fontWeight={500}>
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {completedTasks}/{totalTasks} tasks
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  bgcolor: 'rgba(0, 0, 0, 0.05)'
                }} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <AvatarGroup max={4} sx={{ 
                '& .MuiAvatar-root': { 
                  width: 30, 
                  height: 30, 
                  fontSize: '0.875rem', 
                  border: '2px solid #fff' 
                } 
              }}>
                {team.map((member) => (
                  <Tooltip key={member.id} title={member.name}>
                    <Avatar alt={member.name} src={member.avatar} />
                  </Tooltip>
                ))}
              </AvatarGroup>
              
              <Typography 
                variant="body2" 
                fontWeight={600} 
                sx={{ 
                  color: progress === 100 ? 'success.main' : 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5
                }}
              >
                {progress}% complete
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
