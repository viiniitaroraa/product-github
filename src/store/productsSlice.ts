import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    categories: string[];
    minPrice: number;
    maxPrice: number;
  };
  sort: 'asc' | 'desc' | 'popularity';
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  status: 'idle',
  error: null,
  filters: {
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
  },
  sort: 'asc',
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  },
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
      toggleCategoryFilter(state, action) {
        const category = action.payload;
        const index = state.filters.categories.indexOf(category);
        if (index === -1) {
          state.filters.categories.push(category);
        } else {
          state.filters.categories.splice(index, 1);
        }
      },
      setPriceRangeFilter(state, action) {
        state.filters.minPrice = action.payload.minPrice;
        state.filters.maxPrice = action.payload.maxPrice;
      },
      setSort(state, action) {
        state.sort = action.payload;
      },
      setPage(state, action) {
        state.pagination.currentPage = action.payload;
      },
      filterAndSortProducts(state) {
        let filtered = state.products.filter(product => 
          (state.filters.categories.length === 0 || state.filters.categories.includes(product.category)) &&
          product.price >= state.filters.minPrice &&
          product.price <= state.filters.maxPrice
        );
  
        if (state.sort === 'asc') {
          filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (state.sort === 'desc') {
          filtered = filtered.sort((a, b) => b.price - a.price);
        } else if (state.sort === 'popularity') {
          // Implement popularity sort if applicable
        }
  
        state.pagination.totalItems = filtered.length;
        const startIndex = (state.pagination.currentPage - 1) * state.pagination.itemsPerPage;
        const endIndex = startIndex + state.pagination.itemsPerPage;
        state.filteredProducts = filtered.slice(startIndex, endIndex);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.products = action.payload;
          state.filteredProducts = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to fetch products';
        });
    },
  });
  

export const { toggleCategoryFilter, setPriceRangeFilter, setSort, setPage, filterAndSortProducts } = productsSlice.actions;

export default productsSlice.reducer;
