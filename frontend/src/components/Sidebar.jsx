import { useState } from 'react';
import { 
  Box, 
  Drawer, 
  Typography, 
  Slider, 
  Checkbox, 
  List, 
  ListItem, 
  ListItemButton, 
  Button,
  Divider,
  IconButton,
  Chip
} from '@mui/joy';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import StarIcon from '@mui/icons-material/Star';

const Sidebar = ({ open, onClose, filters, onFiltersChange }) => {
  const [tempFilters, setTempFilters] = useState(filters);
  
  const categories = [
    'Electronics', 
    'Fashion', 
    'Home & Garden', 
    'Sports', 
    'Books', 
    'Beauty', 
    'Automotive',
    'Health'
  ];

  const brands = [
    'Apple', 
    'Samsung', 
    'Nike', 
    'Adidas', 
    'Sony', 
    'Microsoft',
    'Amazon',
    'Google'
  ];

  const handleCategoryToggle = (category) => {
    const updatedCategories = tempFilters.category.includes(category)
      ? tempFilters.category.filter(c => c !== category)
      : [...tempFilters.category, category];
    
    setTempFilters({
      ...tempFilters,
      category: updatedCategories
    });
  };

  const handlePriceChange = (event, newValue) => {
    setTempFilters({
      ...tempFilters,
      priceRange: newValue
    });
  };

  const handleRatingChange = (rating) => {
    setTempFilters({
      ...tempFilters,
      rating: tempFilters.rating === rating ? 0 : rating
    });
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: [],
      priceRange: [0, 1000],
      rating: 0
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = tempFilters.category.length > 0 || 
                          tempFilters.priceRange[0] > 0 || 
                          tempFilters.priceRange[1] < 1000 || 
                          tempFilters.rating > 0;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-content': {
          width: { xs: '100vw', sm: '400px' },
          backgroundColor: 'background.surface',
          border: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid',
            borderColor: 'neutral.200'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterAltIcon sx={{ color: 'text.secondary' }} />
            <Typography
              level="title-lg"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Filters
            </Typography>
            {hasActiveFilters && (
              <Chip
                size="sm"
                color="primary"
                sx={{
                  backgroundColor: 'neutral.800',
                  color: 'common.white',
                  fontSize: '0.75rem'
                }}
              >
                Active
              </Chip>
            )}
          </Box>
          <IconButton
            variant="plain"
            onClick={onClose}
            sx={{
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'neutral.100'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Filters Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
          {/* Price Range */}
          <Box sx={{ mb: 4 }}>
            <Typography
              level="title-sm"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1rem'
              }}
            >
              Price Range
            </Typography>
            <Box sx={{ px: 1, mb: 2 }}>
              <Slider
                value={tempFilters.priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `$${value}`}
                min={0}
                max={1000}
                step={10}
                marks={[
                  { value: 0, label: '$0' },
                  { value: 500, label: '$500' },
                  { value: 1000, label: '$1000+' }
                ]}
                sx={{
                  color: 'neutral.800',
                  '& .MuiSlider-thumb': {
                    backgroundColor: 'neutral.800',
                    '&:hover': {
                      boxShadow: '0 0 0 8px rgba(51, 51, 51, 0.16)'
                    }
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: 'neutral.800'
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: 'neutral.200'
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                ${tempFilters.priceRange[0]}
              </Typography>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                ${tempFilters.priceRange[1]}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Rating */}
          <Box sx={{ mb: 4 }}>
            <Typography
              level="title-sm"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1rem'
              }}
            >
              Minimum Rating
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {[4, 3, 2, 1].map((rating) => (
                <motion.div
                  key={rating}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ListItemButton
                    onClick={() => handleRatingChange(rating)}
                    sx={{
                      borderRadius: '8px',
                      py: 1,
                      px: 2,
                      backgroundColor: tempFilters.rating === rating ? 'neutral.100' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'neutral.50'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {[...Array(rating)].map((_, i) => (
                          <StarIcon
                            key={i}
                            sx={{
                              fontSize: 16,
                              color: 'text.primary'
                            }}
                          />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <StarIcon
                            key={i + rating}
                            sx={{
                              fontSize: 16,
                              color: 'neutral.300'
                            }}
                          />
                        ))}
                      </Box>
                      <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                        & up
                      </Typography>
                    </Box>
                    <Checkbox
                      checked={tempFilters.rating === rating}
                      size="sm"
                      sx={{ pointerEvents: 'none' }}
                    />
                  </ListItemButton>
                </motion.div>
              ))}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Categories */}
          <Box sx={{ mb: 4 }}>
            <Typography
              level="title-sm"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '1rem'
              }}
            >
              Categories
            </Typography>
            <List sx={{ p: 0 }}>
              <AnimatePresence>
                {categories.map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <ListItem sx={{ p: 0, mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => handleCategoryToggle(category)}
                        sx={{
                          borderRadius: '8px',
                          py: 1,
                          px: 2,
                          backgroundColor: tempFilters.category.includes(category) 
                            ? 'neutral.100' 
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: 'neutral.50'
                          }
                        }}
                      >
                        <Typography
                          level="body-sm"
                          sx={{
                            flex: 1,
                            color: 'text.primary',
                            fontWeight: tempFilters.category.includes(category) ? 600 : 400
                          }}
                        >
                          {category}
                        </Typography>
                        <Checkbox
                          checked={tempFilters.category.includes(category)}
                          size="sm"
                          sx={{ pointerEvents: 'none' }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </List>
          </Box>
        </Box>

        {/* Footer Actions */}
        <Box
          sx={{
            p: 3,
            borderTop: '1px solid',
            borderColor: 'neutral.200',
            backgroundColor: 'background.surface'
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              sx={{
                flex: 1,
                borderRadius: '8px',
                borderColor: 'neutral.300',
                color: 'text.primary',
                '&:hover': {
                  borderColor: 'neutral.400',
                  backgroundColor: 'neutral.50'
                },
                '&:disabled': {
                  opacity: 0.5
                }
              }}
            >
              Clear All
            </Button>
            <Button
              variant="solid"
              onClick={applyFilters}
              sx={{
                flex: 1,
                borderRadius: '8px',
                backgroundColor: 'neutral.800',
                '&:hover': {
                  backgroundColor: 'neutral.700'
                }
              }}
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Drawer>
  );
};

export default Sidebar;