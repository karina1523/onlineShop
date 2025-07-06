import { useState } from 'react';
import s from '../pages/Catalog.module.scss';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import CatalogRow from '../components/CatalogRow';

const Catalog = () => {
    const [selectedCategory, setSelectedCategory] = useState('All products');
    const [sortType, setSortType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <section className={s.catalog}>
            <div className={s.container}>
                <Navbar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    
                />
                <div className={s.catalog__content}>
                    <SideBar onCategorySelect={setSelectedCategory} onSortChange={setSortType} />
                    <div className={s.catalog__right}>
                        <h2 className={s.catalog__content_title}>{selectedCategory}</h2>
                        <CatalogRow
                            category={selectedCategory}
                            sortType={sortType}
                            searchValue={searchValue}
                            addToCart={addToCart}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Catalog;


