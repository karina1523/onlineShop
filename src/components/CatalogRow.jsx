import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from '../components/CatalogRow.module.scss';
import ProductCard from './ProductCard';
import Loader from '../components/Loader';
import NotFound from '../helpers/NotFound';

const ITEMS_PER_PAGE = 12;

const CatalogRow = ({ category, sortType, searchValue = '', addToCart }) => {
    const [products, setProducts] = useState({
        data: [],
        error: '',
        loading: true,
    });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            const url =
                category && category !== 'All products'
                    ? `https://dummyjson.com/products/category/${encodeURIComponent(category)}`
                    : 'https://dummyjson.com/products?limit=100';

            setProducts({ data: [], error: '', loading: true });

            try {
                const response = await axios.get(url);
                setProducts({
                    data: response.data.products || [],
                    error: '',
                    loading: false,
                });
                setCurrentPage(1); // сброс страницы при смене категории
            } catch (error) {
                console.error(error);
                setProducts({ data: [], error: <NotFound />, loading: false });
            }
        };

        fetchProducts();
    }, [category]);

    // Сортировка
    const sortedData = [...products.data].sort((a, b) => {
        if (sortType === 'title') return a.title.localeCompare(b.title);
        if (sortType === 'price') return a.price - b.price;
        if (sortType === 'stock') return a.stock - b.stock;
        return 0;
    });

    // Фильтрация по поиску
    const filteredData = sortedData.filter(product =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Пагинация
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const nextPage = () => setCurrentPage(p => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage(p => Math.max(p - 1, 1));

    return (
        <div className={s.catalogWrapper}>
            {products.error && <div className={s.error}>{products.error}</div>}
            {products.loading ? (
                <Loader />
            ) : (
                <>
                    <div className={s.catalog}>
                        {paginatedData.length > 0 ? (
                            paginatedData.map(product => (
                                <ProductCard key={product.id} product={product} addToCart={addToCart} />
                            ))
                        ) : (
                            <p className={s.noResults}><NotFound /></p>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className={s.pagination}>
                            <button onClick={prevPage} disabled={currentPage === 1}>
                                &larr; Back
                            </button>
                            <span>{currentPage} / {totalPages}</span>
                            <button onClick={nextPage} disabled={currentPage === totalPages}>
                                Forward &rarr;
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CatalogRow;







