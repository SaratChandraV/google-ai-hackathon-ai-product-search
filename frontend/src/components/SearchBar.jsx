import { useState } from 'react';
import { Box, Input, IconButton, Typography } from '@mui/joy';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

const SearchBar = ({ onSearch, hasSearched, onSidebarToggle }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      layout
      style={{ 
        width: '100vw', 
        display: 'flex', 
        justifyContent: hasSearched ? 'space-between' : 'center', 
        alignItems: 'center',
        gap: '1rem',
        padding: '0 2rem'
      }}
    >
      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ 
          width: hasSearched ? 'calc(100vw - 5rem - 48px)' : '75vw',
          maxWidth: hasSearched ? 'calc(100vw - 5rem - 48px)' : '75vw'
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: 'background.surface',
            borderRadius: '16px',
            boxShadow: hasSearched 
              ? '0 2px 8px rgba(0,0,0,0.08)' 
              : '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid',
            borderColor: 'neutral.200',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'neutral.300',
              boxShadow: hasSearched 
                ? '0 4px 16px rgba(0,0,0,0.12)' 
                : '0 12px 40px rgba(0,0,0,0.16)',
            },
            '&:focus-within': {
              borderColor: 'neutral.400',
              boxShadow: hasSearched 
                ? '0 4px 16px rgba(0,0,0,0.15)' 
                : '0 12px 40px rgba(0,0,0,0.2)',
            }
          }}
        >
          <IconButton
            variant="plain"
            sx={{
              minHeight: hasSearched ? 48 : 56,
              minWidth: hasSearched ? 48 : 56,
              borderRadius: hasSearched ? '12px' : '14px',
              color: 'text.secondary',
              ml: 0.5,
              '&:hover': {
                backgroundColor: 'neutral.100',
                color: 'text.primary'
              }
            }}
          >
            <SearchIcon sx={{ fontSize: hasSearched ? 20 : 24 }} />
          </IconButton>
          
          <Input
            placeholder="Describe what you're looking for..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            variant="plain"
            sx={{
              flex: 1,
              border: 'none',
              fontSize: hasSearched ? '1rem' : '1.1rem',
              py: hasSearched ? 1.5 : 2,
              px: 1,
              backgroundColor: 'transparent',
              '&::before': { display: 'none' },
              '&:focus-within': { backgroundColor: 'transparent' },
              '--Input-focusedThickness': '0px',
              '& input': {
                fontWeight: 400,
                '&::placeholder': {
                  color: 'text.tertiary',
                  opacity: 1,
                  fontSize: hasSearched ? '1rem' : '1.1rem',
                  fontWeight: 400
                }
              }
            }}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: query.trim() 
                ? 'linear-gradient(135deg, #333 0%, #000 100%)'
                : '#e5e5e5',
              border: 'none',
              borderRadius: hasSearched ? '10px' : '12px',
              padding: hasSearched ? '8px 16px' : '12px 20px',
              margin: '4px',
              color: query.trim() ? '#fff' : '#999',
              cursor: query.trim() ? 'pointer' : 'default',
              fontSize: hasSearched ? '0.875rem' : '0.95rem',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            disabled={!query.trim()}
          >
            Search
          </motion.button>
        </Box>
      </motion.div>

      {/* Filter Button - only show after first search */}
      {hasSearched && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <IconButton
            variant="outlined"
            onClick={onSidebarToggle}
            sx={{
              minHeight: 48,
              minWidth: 48,
              borderRadius: '12px',
              borderColor: 'neutral.200',
              '&:hover': {
                borderColor: 'neutral.300',
                backgroundColor: 'neutral.50'
              }
            }}
          >
            <TuneIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchBar;