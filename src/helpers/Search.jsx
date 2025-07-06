import React, { useState } from 'react';
import '../helpers/search.css';
import { FaTrashAlt } from "react-icons/fa";

const Search = ({ value, onChange, onSearch, cartItems, removeFromCart, updateQuantity }) => {
    const [basketOpen, setBasketOpen] = useState(false);
    const handleSearch = () => {
        if (value.trim()) {
            onSearch(value);
            onChange('');
        }
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const getDiscountPrice = (item) =>
        (item.price * (1 - item.discountPercentage / 100)).toFixed(2);

    return (
        <div className="search-cart-wrapper">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onClick={handleSearch}
                />
                <button className="search-btn">
                    <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#fff" strokeWidth="2" />
                        <path d="M21 21L16.65 16.65" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            <button className="basket-btn" onClick={() => setBasketOpen(prev => !prev)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3H5L6 6M7 13H17L20 6H6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="20" r="1.5" fill="#fff" />
                    <circle cx="17" cy="20" r="1.5" fill="#fff" />
                </svg>
                {totalItems > 0 && (
                    <span className="cart-count">{totalItems}</span>
                )}
            </button>

            {basketOpen && (
                <div className="cart-dropdown">
                    {cartItems.length === 0 ? (
                        <p>🛒 Your cart is currently empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img className='cart-item-img' src={item.thumbnail} alt={item.title} />
                                <div className="cart-item-text">
                                    <h2 className='cart-item-name'>{item.title}</h2>
                                    <p className='cart-item-price'>{getDiscountPrice(item)}$</p>
                                    <div className="cart-item-quantity">
                                        <button className='cart-item-btn red' onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>−</button>
                                        <span className='cart-item-quantity'>{item.quantity}</span>
                                        <button className='cart-item-btn green' onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button
                                    className="cart-item-trash"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;


