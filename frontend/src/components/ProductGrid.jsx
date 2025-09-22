import { Box, Card, Typography, IconButton } from '@mui/joy';
import { motion } from 'framer-motion';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

const ProductCard = ({ product, index }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ height: '100%' }}
    >
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: 'neutral.200',
          backgroundColor: 'background.surface',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            borderColor: 'neutral.300',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            transform: 'translateY(-4px)'
          }
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '100%', // 1:1 aspect ratio
            overflow: 'hidden',
            backgroundColor: 'neutral.50'
          }}
        >
          {/* Product Image */}
          <motion.img
            src={product.img || product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            animate={{
              scale: isHovered ? 1.05 : 1,
              opacity: imageLoaded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Image Loading Placeholder */}
          {!imageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'neutral.100'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '24px',
                  height: '24px',
                  border: '2px solid #e5e5e5',
                  borderTop: '2px solid #999',
                  borderRadius: '50%'
                }}
              />
            </Box>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <IconButton
                variant="solid"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle add to cart
                }}
                sx={{
                  backgroundColor: 'common.white',
                  color: 'text.primary',
                  borderRadius: '12px',
                  minHeight: 48,
                  minWidth: 48,
                  '&:hover': {
                    backgroundColor: 'neutral.50',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </motion.div>
          </motion.div>

          {/* Favorite Button */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 2
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton
                variant="plain"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFavorite(!isFavorite);
                }}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  minHeight: 36,
                  minWidth: 36,
                  color: isFavorite ? 'danger.500' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: 'common.white',
                    color: isFavorite ? 'danger.600' : 'text.primary'
                  }
                }}
              >
                {isFavorite ? (
                  <FavoriteIcon sx={{ fontSize: 18 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        {/* Product Info */}
        <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            level="title-md"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'text.primary',
              mb: 1,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
            {/* <Rating
              value={product.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'text.primary'
                },
                '& .MuiRating-iconEmpty': {
                  color: 'neutral.300'
                }
              }}
            /> */}
            <Typography
              level="body-xs"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              ({product.avg_rating || product.rating || 0})
            </Typography>
          </Box>

          {/* Brand */}
          {product.brand && (
            <Typography
              level="body-sm"
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
                mb: 1
              }}
            >
              {product.brand}
            </Typography>
          )}

          <Typography
            level="title-lg"
            sx={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'text.primary',
              mt: 'auto'
            }}
          >
            ${parseFloat(product.price / 88 || '0').toFixed(2)}
          </Typography>
        </Box>
      </Card>
    </motion.div>
  );
};

const ProductGrid = ({ products }) => {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '2rem' }}
      >
        <Typography
          level="h2"
          sx={{
            fontSize: '1.75rem',
            fontWeight: 600,
            color: 'text.primary',
            mb: 1,
            textAlign: 'center'
          }}
        >
          Perfect Matches for You
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            fontSize: '1rem'
          }}
        >
          {products.length} products found
        </Typography>
      </motion.div>

      {/* Products Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(3, 1fr)'
          },
          gap: { xs: 2, md: 3 },
          mb: 4
        }}
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id || `${product.name}-${index}`}
            product={product}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductGrid;