import { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import { CssBaseline, Box, Typography } from '@mui/joy';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './components/SearchBar';
import PromptChips from './components/PromptChips';
import LoadingAnimation from './components/LoadingAnimation';
import ProductGrid from './components/ProductGrid';
import Sidebar from './components/Sidebar';

// Custom grayscale theme
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: '#fafafa',
          surface: '#ffffff',
          popup: '#ffffff'
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#666666',
          tertiary: '#999999'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717'
        },
        primary: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#cccccc',
          400: '#999999',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#000000'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        }
      }
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        }
      }
    }
  }
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: [0, 1000],
    rating: 0
  });

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299.99",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Minimalist Desk Lamp",
      price: "$89.99",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: "$449.99",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Ceramic Coffee Mug Set",
      price: "$34.99",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "Leather Messenger Bag",
      price: "$159.99",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center"
    }
  ];

  // API call function
  const callSearchAPI = async (queryText) => {
    try {
      console.log('Calling API with query:', queryText);
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryText
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      // Transform API response to match UI expectations
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error calling search API:', error);
      // Return mock data as fallback for demo purposes
      console.log('Using mock data as fallback');
      return mockProducts.map(product => ({
        name: product.name,
        img: product.image,
        price: product.price.replace('$', ''),
        brand: 'Mock Brand',
        avg_rating: product.rating.toString()
      }));
    }
  };

  // Function to get concatenated query from selected prompts
  const getConcatenatedQuery = () => {
    const selectedPromptTexts = searchHistory
      .filter(prompt => prompt.selected)
      .map(prompt => prompt.text);
    console.log('Selected prompts:', selectedPromptTexts);
    const concatenatedQuery = selectedPromptTexts.join(' ');
    console.log('Concatenated query:', concatenatedQuery);
    return concatenatedQuery;
  };

  // Function to trigger API call with current selection
  const triggerSearch = async () => {
    const concatenatedQuery = getConcatenatedQuery();
    if (!concatenatedQuery.trim()) {
      console.log('No selected prompts, skipping search');
      return;
    }

    console.log('Triggering search with concatenated query:', concatenatedQuery);
    setIsLoading(true);
    try {
      const apiResults = await callSearchAPI(concatenatedQuery);
      setProducts(apiResults);
    } catch (error) {
      console.error('Search failed:', error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    console.log('Handling search for query:', query);
    setSearchQuery(query);
    setHasSearched(true);
    
    // Add to search history if not already exists, with selected: true by default
    const existingPrompt = searchHistory.find(item => item.text === query);
    if (!existingPrompt) {
      const newPrompt = {
        id: Date.now(),
        text: query,
        selected: true // Default to selected
      };
      console.log('Adding new prompt to history:', newPrompt);
      
      // Update search history first
      const updatedHistory = [...searchHistory, newPrompt];
      setSearchHistory(updatedHistory);
      
      // Then get concatenated query from the updated history
      const selectedTexts = updatedHistory
        .filter(prompt => prompt.selected)
        .map(prompt => prompt.text);
      const concatenatedQuery = selectedTexts.join(' ');
      
      console.log('Concatenated query with new prompt:', concatenatedQuery);
      
      // Search with concatenated query
      setIsLoading(true);
      try {
        const apiResults = await callSearchAPI(concatenatedQuery);
        setProducts(apiResults);
      } catch (error) {
        console.error('Search failed:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('Query already exists, triggering search with current selection');
      // Query already exists, just trigger search with current selection
      triggerSearch();
    }
  };

  const updatePrompt = (id, newText) => {
    console.log('Updating prompt ID:', id, 'with new text:', newText);
    setSearchHistory(prev => {
      const updated = prev.map(prompt => 
        prompt.id === id ? { ...prompt, text: newText } : prompt
      );
      console.log('Updated search history after edit:', updated);
      return updated;
    });
    // Trigger search after updating
    setTimeout(() => {
      console.log('Triggering search after prompt update');
      triggerSearch();
    }, 100);
  };

  const deletePrompt = (id) => {
    console.log('Deleting prompt ID:', id);
    setSearchHistory(prev => {
      const updated = prev.filter(prompt => prompt.id !== id);
      console.log('Updated search history after delete:', updated);
      return updated;
    });
    setSelectedPrompts(prev => prev.filter(promptId => promptId !== id));
    // Trigger search after deleting
    setTimeout(() => {
      console.log('Triggering search after prompt deletion');
      triggerSearch();
    }, 100);
  };

  const togglePromptSelection = (id) => {
    console.log('Toggling selection for prompt ID:', id);
    setSearchHistory(prev => {
      const updated = prev.map(prompt => {
        if (prompt.id === id) {
          console.log(`Toggling prompt "${prompt.text}" from ${prompt.selected} to ${!prompt.selected}`);
          return { ...prompt, selected: !prompt.selected };
        }
        return prompt;
      });
      console.log('Updated search history:', updated);
      return updated;
    });
    // Trigger search after toggling
    setTimeout(() => {
      console.log('About to trigger search after toggle');
      triggerSearch();
    }, 100);
  };

  // Effect to handle initial search trigger when search history has items
  useEffect(() => {
    if (hasSearched && searchHistory.length > 0) {
      const hasSelectedPrompts = searchHistory.some(prompt => prompt.selected);
      if (hasSelectedPrompts && products.length === 0 && !isLoading) {
        triggerSearch();
      }
    }
  }, [searchHistory, hasSearched]);

  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.body' }}>
        {/* Main Content */}
        <motion.div
          layout
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header / Search Section */}
          <motion.div
            layout
            animate={{
              paddingTop: hasSearched ? '2rem' : '8rem',
              paddingBottom: hasSearched ? '2rem' : '4rem',
            }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {!hasSearched && (
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: hasSearched ? 0 : 1, y: hasSearched ? -20 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '3rem', textAlign: 'center' }}
              >
                <Typography 
                  level="h1" 
                  sx={{ 
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 300,
                    color: 'text.primary',
                    mb: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Find Anything
                </Typography>
                <Typography 
                  level="body-lg" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '1.1rem',
                    fontWeight: 400
                  }}
                >
                  Describe what you're looking for and let AI find the perfect products
                </Typography>
              </motion.div>
            )}

            <SearchBar 
              onSearch={handleSearch}
              hasSearched={hasSearched}
              onSidebarToggle={() => setShowSidebar(!showSidebar)}
            />
          </motion.div>

          {/* Prompt Chips */}
          <AnimatePresence>
            {hasSearched && searchHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ padding: '0 2rem', marginBottom: '2rem' }}
              >
                <PromptChips 
                  prompts={searchHistory}
                  onUpdatePrompt={updatePrompt}
                  onDeletePrompt={deletePrompt}
                  onToggleSelection={togglePromptSelection}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '4rem 0'
                }}
              >
                <LoadingAnimation />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <AnimatePresence>
            {!isLoading && products.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ flex: 1, padding: '0 2rem 4rem' }}
              >
                <ProductGrid products={products} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sidebar */}
        <Sidebar 
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </Box>
    </CssVarsProvider>
  );
}

export default App;
