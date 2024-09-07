import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, toggleCategoryFilter, setPriceRangeFilter, setSort,setPage, filterAndSortProducts } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice'; // Import the addToCart action
import { RootState, AppDispatch } from '../store';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredProducts, status, error, filters, sort, pagination  } = useSelector((state: RootState) => state.products);
  const { products } = useSelector((state: RootState) => state.products);

  const [quantityError, setQuantityError] = useState<string | null>(null);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(filterAndSortProducts());
  }, [dispatch, filters, sort, pagination.currentPage, status]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleCategoryFilter(e.target.value));
    dispatch(filterAndSortProducts());
  };


  const handleAddToCart = (productId: number, quantity: number) => {
    if (quantity < 1) {
      setQuantityError('Quantity must be at least 1');
    } else {
      const product = products.find(p => p.id === productId);
      if (product) {
        dispatch(addToCart({ ...product, quantity }));
        setQuantityError(null); // Clear any previous errors
      } else {
        setQuantityError('Product not found');
      }
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(filterAndSortProducts());
  };
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      
      <div>
      <div>
          <h3>Category:</h3>
         
          <label>
            <input
              type="checkbox"
              value="electronics"
              checked={filters.categories.includes('electronics')}
              onChange={handleCategoryChange}
            />
            Electronics
          </label>
          <label>
            <input
              type="checkbox"
              value="jewelery"
              checked={filters.categories.includes('jewelery')}
              onChange={handleCategoryChange}
            />
            Jewelery
          </label>
          <label>
            <input
              type="checkbox"
              value="men's clothing"
              checked={filters.categories.includes("men's clothing")}
              onChange={handleCategoryChange}
            />
            Men's Clothing
          </label>
          <label>
            <input
              type="checkbox"
              value="women's clothing"
              checked={filters.categories.includes("women's clothing")}
              onChange={handleCategoryChange}
            />
            Women's Clothing
          </label>
        </div>
        
        <label>
          Price Range:
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => dispatch(setPriceRangeFilter({ minPrice: Number(e.target.value), maxPrice: filters.maxPrice }))}
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => dispatch(setPriceRangeFilter({ minPrice: filters.minPrice, maxPrice: Number(e.target.value) }))}
          />
        </label>
        
        <label>
          Sort By:
          <select
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value as 'asc' | 'desc' | 'popularity'))}
          >
            <option value="asc">Price (Low to High)</option>
            <option value="desc">Price (High to Low)</option>
            <option value="popularity">Popularity</option>
          </select>
        </label>
      </div>
      
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
             <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            </Link>
            <button
              onClick={() => handleAddToCart(product.id, 1)} // For simplicity, assuming quantity is 1
            >Add to Cart</button> {/* Add to Cart Button */}
          
          </li>

        ))}
      </ul>
      <div>
        <button
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange(pagination.currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {pagination.currentPage} of {Math.ceil(pagination.totalItems / pagination.itemsPerPage)}</span>
        <button
          disabled={pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
          onClick={() => handlePageChange(pagination.currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
