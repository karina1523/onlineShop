import React, { useState } from 'react';
import s from '../components/CatalogRow.module.scss';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, addToCart }) => {
    const images = product.images || [product.thumbnail];
    const discountPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate()

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className={s.catalog__card}>
            <div className={s.imageSlider}>
                <img src={images[currentIndex]} alt={product.title} />
                {images.length > 1 && (
                    <div className={s.sliderControls}>
                        <button onClick={prevImage}>&lt;</button>
                        <span>{currentIndex + 1} / {images.length}</span>
                        <button onClick={nextImage}>&gt;</button>
                    </div>
                )}
            </div>
            <h3 className={s.catalog__card_title}>{product.title}</h3>
            <p className={s.catalog__card_description}>{product.description}</p>
            <p className={s.catalog__card_price_original}>{product.price.toLocaleString()}$ </p>
            <p className={s.catalog__card_price_discount}>Discount: {product.discountPercentage}%</p>
            <p className={s.catalog__card_price_final}>Discounted price: {discountPrice}$</p>
            <p className={s.catalog__card_stock}>In stock: {product.stock}</p>
            <button className={s.catalog__card_button} onClick={() => navigate(`/products/${product.id}`)}>Details</button>
            <button className={s.catalog__card_button} onClick={() => addToCart(product)}> Add to cart</button>
        </div >
    );
};

export default ProductCard;

