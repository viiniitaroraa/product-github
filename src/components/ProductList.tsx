import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, toggleCategoryFilter, setPriceRangeFilter, setSort, setPage, filterAndSortProducts } from '../store/productsSlice';
import Placeholderimg from '../assets/images/mainbanner-bg.jpg';
import Chevron from '../assets/images/chevron.png';
import { addToCart } from '../store/cartSlice'; // Import the addToCart action
import { RootState, AppDispatch } from '../store';
import Banner from './Banner';
import Slider from 'rc-slider';

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
  const handlePriceRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setPriceRangeFilter({ minPrice: value[0], maxPrice: value[1] }));
    }
  };
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <>
      <Banner />
      <div className="product-list">
        <nav className="breadcrumb-container mb-3" aria-label="breadcrumb" >
          <div className='container'>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/">Products</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Fashion
              </li>
            </ol>
          </div>
        </nav>
        <div className="container">

          <div className="row">
            <div className="col-lg-3">
              <div className="sidebar">
                <h4 className="pt-1 pb-2">Filters:</h4>
                <div>
                  <h6>Categories</h6>
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
                <div>
                  <h6>Price Range</h6>
                  <div className="slider-container">
                    <Slider
                      range
                      min={0}
                      max={1000}
                      value={[filters.minPrice, filters.maxPrice]}
                      onChange={handlePriceRangeChange}


                    />
                  </div>
                  <div className="price-range">
                    <div className='min'>
                      <span>{filters.minPrice}</span>
                    </div>
                    <div className='max'>
                      <span>{filters.maxPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>



            </div>
            <div className="col-lg-9">
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
              {/* Conditional rendering for products or no results */}
              {filteredProducts.length === 0 ? (
                <div className='no-data'>
                  <p>No products available in this price range.</p>
                </div>
              ) : (
                <div className="row">
                  {filteredProducts.map(product => (
                    <div className="col-md-6 col-lg-4">
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
              )}
            </div>
          </div>
          <div className="pagination pb-3">
            <button
              disabled={pagination.currentPage === 1}
              className="prev"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            >
              <img src={Chevron} alt="Previous" />
            </button>

            {/* Page numbers */}
            {Array.from({ length: Math.ceil(pagination.totalItems / pagination.itemsPerPage) }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`page-number ${pagination.currentPage === pageNumber ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              disabled={pagination.currentPage === Math.ceil(pagination.totalItems / pagination.itemsPerPage)}
              className="next"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            >
              <img src={Chevron} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default ProductList;
