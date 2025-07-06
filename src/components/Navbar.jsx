import React from 'react';
import logo from '/public/logo.png';
import s from './Navbar.module.scss';
import Search from '../helpers/Search';
import { Link } from 'react-router-dom';

const Navbar = ({ searchValue, setSearchValue, cartItems, setCartItems }) => {

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    return (
        <div className={s.navbar}>
            <div className={s.navbar__left}>
                <Link to='/'>
                    <img src={logo} alt="logo" className={s.navbar__left_logo} />
                </Link>
                <Link to='/' className={s.navbar__left_title}>Online Shop</Link>
            </div>

            <div className={s.navbar__right}>
                <Search
                    value={searchValue}
                    onChange={setSearchValue}
                    cartItems={cartItems}
                    onSearch={() => {
                        setSearchValue('')
                    }}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                />
            </div>
        </div>
    );
};

export default Navbar;



