import { Box, Typography } from '@mui/joy';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  const dots = [0, 1, 2];
  
  const loadingTexts = [
    "Analyzing your search...",
    "Finding the perfect matches...",
    "Curating results for you...",
    "Almost ready..."
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}
    >
      {/* Animated circles */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {dots.map((dot) => (
          <motion.div
            key={dot}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: "easeInOut"
            }}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#333'
            }}
          />
        ))}
      </Box>

      {/* Animated loading text */}
      <motion.div
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Typography
          level="body-lg"
          sx={{
            color: 'text.secondary',
            fontSize: '1.1rem',
            fontWeight: 400,
            textAlign: 'center',
            letterSpacing: '0.01em'
          }}
        >
          <motion.span
            key="loading-text"
            animate={{
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1],
              ease: "easeInOut"
            }}
          >
            {loadingTexts[0]}
          </motion.span>
        </Typography>
      </motion.div>

      {/* Progress bar */}
      <Box
        sx={{
          width: '200px',
          height: '2px',
          backgroundColor: 'neutral.200',
          borderRadius: '1px',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            width: '50%',
            background: 'linear-gradient(90deg, transparent, #333, transparent)',
            borderRadius: '1px'
          }}
        />
      </Box>

      {/* Subtle pulsing background */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          backgroundColor: '#333',
          zIndex: -1
        }}
      />
    </motion.div>
  );
};

export default LoadingAnimation;