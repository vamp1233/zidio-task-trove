
import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

const AnimatedTransition = ({ children }) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default AnimatedTransition;
