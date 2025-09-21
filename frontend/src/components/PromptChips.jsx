import { useState } from 'react';
import { Box, Chip, Checkbox, IconButton, Input } from '@mui/joy';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const PromptChips = ({ prompts, onUpdatePrompt, onDeletePrompt, onToggleSelection }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [hoveredId, setHoveredId] = useState(null);

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      onUpdatePrompt(editingId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: '100%', mx: 'auto' }}>
      <AnimatePresence mode="popLayout">
        {prompts.map((prompt) => (
          <motion.div
            key={prompt.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onHoverStart={() => setHoveredId(prompt.id)}
            onHoverEnd={() => setHoveredId(null)}
            style={{ position: 'relative' }}
          >
            {editingId === prompt.id ? (
              // Editing mode
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  border: '2px solid #333',
                  borderRadius: '20px',
                  padding: '4px 8px',
                  minWidth: '200px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                }}
              >
                <Checkbox
                  checked={prompt.selected}
                  onChange={() => onToggleSelection(prompt.id)}
                  size="sm"
                  sx={{ mr: 1 }}
                />
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  variant="plain"
                  autoFocus
                  sx={{
                    flex: 1,
                    border: 'none',
                    fontSize: '0.875rem',
                    py: 0.5,
                    px: 0.5,
                    backgroundColor: 'transparent',
                    '&::before': { display: 'none' },
                    '--Input-focusedThickness': '0px',
                    '& input': {
                      padding: 0,
                      fontSize: '0.875rem'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
                  <IconButton
                    size="sm"
                    variant="plain"
                    onClick={saveEdit}
                    disabled={!editText.trim()}
                    sx={{
                      minHeight: 24,
                      minWidth: 24,
                      borderRadius: '50%',
                      color: 'success.600',
                      '&:hover': {
                        backgroundColor: 'success.50'
                      },
                      '&:disabled': {
                        color: 'neutral.400'
                      }
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="sm"
                    variant="plain"
                    onClick={cancelEditing}
                    sx={{
                      minHeight: 24,
                      minWidth: 24,
                      borderRadius: '50%',
                      color: 'danger.600',
                      '&:hover': {
                        backgroundColor: 'danger.50'
                      }
                    }}
                  >
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </motion.div>
            ) : (
              // Display mode
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
              >
                <Chip
                  variant={prompt.selected ? 'solid' : 'outlined'}
                  color={prompt.selected ? 'primary' : 'neutral'}
                  startDecorator={
                    <Checkbox
                      checked={prompt.selected}
                      onChange={() => onToggleSelection(prompt.id)}
                      size="sm"
                      sx={{ 
                        mr: 0.5,
                        '& input': { 
                          transform: 'scale(0.85)' 
                        }
                      }}
                    />
                  }
                  sx={{
                    py: 1,
                    px: 2,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    borderRadius: '20px',
                    backgroundColor: prompt.selected ? 'neutral.800' : 'background.surface',
                    borderColor: prompt.selected ? 'neutral.800' : 'neutral.200',
                    color: prompt.selected ? 'common.white' : 'text.primary',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: prompt.selected ? 'neutral.700' : 'neutral.50',
                      borderColor: prompt.selected ? 'neutral.700' : 'neutral.300',
                    },
                    pr: hoveredId === prompt.id ? 8 : 2,
                  }}
                >
                  {prompt.text}
                </Chip>

                {/* Hover controls */}
                <AnimatePresence>
                  {hoveredId === prompt.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        // position: 'absolute',
                        // right: '8px',
                        // top: '50%',
                        // transform: 'translateY(-50%)',
                        display: 'flex',
                        gap: '2px',
                        zIndex: 10
                      }}
                    >
                      <IconButton
                        size="sm"
                        variant="plain"
                        onClick={() => startEditing(prompt.id, prompt.text)}
                        sx={{
                          minHeight: 20,
                          minWidth: 20,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: 'text.secondary',
                          border: '1px solid',
                          borderColor: 'neutral.200',
                          '&:hover': {
                            backgroundColor: 'common.white',
                            color: 'primary.600',
                            borderColor: 'primary.200'
                          }
                        }}
                      >
                        <EditIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="plain"
                        onClick={() => onDeletePrompt(prompt.id)}
                        sx={{
                          minHeight: 20,
                          minWidth: 20,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: 'text.secondary',
                          border: '1px solid',
                          borderColor: 'neutral.200',
                          '&:hover': {
                            backgroundColor: 'common.white',
                            color: 'danger.600',
                            borderColor: 'danger.200'
                          }
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 12 }} />
                      </IconButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default PromptChips;