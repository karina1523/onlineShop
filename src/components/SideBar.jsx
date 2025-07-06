import React, { useEffect, useState } from 'react';
import s from '../components/SideBar.module.scss';

const SideBar = ({ onCategorySelect, onSortChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => {
                const categoryNames = data.map(item =>
                    typeof item === 'string' ? item : item.name || item.slug
                );
                setCategories(['All products', ...categoryNames]);
            })
            .catch(err => {
                console.error('Error', err);
                setCategories([]);
            });
    }, []);


    return (
        <aside className={s.sideBar}>
            <h3 className={s.sideBar__title}>Category</h3>
            <ul className={s.sideBar__menu}>
                {categories.map((category) => (
                    <li
                        key={category}
                        className={s.sideBar__menu_item}
                        onClick={() => onCategorySelect(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>


            <div className={s.sortBlock}>
                <label htmlFor="sort" className={s.sortLabel}>Sort:</label>
                <select
                    id="sort"
                    className={s.sortSelect}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="">By default</option>
                    <option value="title">By name</option>
                    <option value="price">By price</option>
                    <option value="stock">By quantity</option>
                </select>
            </div>
        </aside>
    );
};

export default SideBar;

