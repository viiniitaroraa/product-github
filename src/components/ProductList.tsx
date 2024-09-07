import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, toggleCategoryFilter, setPriceRangeFilter, setSort, setPage, filterAndSortProducts } from '../store/productsSlice';
import Placeholderimg from '../assets/images/mainbanner-bg.jpg';
import { addToCart } from '../store/cartSlice'; // Import the addToCart action
import { RootState, AppDispatch } from '../store';
import Banner from './Banner';

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
  // Add more categories if needed
];

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { filteredProducts, status, error, filters, sort, pagination } = useSelector((state: RootState) => state.products);
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
    <>
      <Banner />
      <div className="product-list">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h4 className="pt-1 pb-2">Filters:</h4>
              <div>

                {categories.map((category) => (
                  <div className="cs-checkbox" key={category}>
                    <input
                      type="checkbox"
                      value={category}
                      id={category}
                      checked={filters.categories.includes(category)}
                      onChange={handleCategoryChange}
                      className="checkbox-input"
                    />
                    <label htmlFor={category} className="checkbox-label"><span>{category.charAt(0).toUpperCase() + category.slice(1)}</span></label>
                  </div>
                ))}



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

            </div>
            <div className="col-9">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Trending Products</h4>
                <div className="sorting d-flex">
                  {/* <label>
                  Sort By:
                </label> */}
                  <select
                    value={sort}
                    onChange={(e) => dispatch(setSort(e.target.value as 'asc' | 'desc' | 'popularity'))}
                  >
                    <option value="asc">Price (Low to High)</option>
                    <option value="desc">Price (High to Low)</option>
                    <option value="popularity">Popularity</option>
                  </select>

                </div>
              </div>
              <div className="row">
                {filteredProducts.map(product => (
                  <div className="col-4">
                    <div className="card" key={product.id} title={product.title}>
                      <Link to={`/product/${product.id}`}>
                        <img src={product.image ? product.image : Placeholderimg}
                          alt={product.title} />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title" >{product.title}</h5>
                        <p className="card-text">${product.price}</p>
                        <button className="btn btn-primary sm"
                          onClick={() => handleAddToCart(product.id, 1)}
                        >Add to Cart</button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
          <div>
          </div>
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
      </div>
    </>

  );
};

export default ProductList;
