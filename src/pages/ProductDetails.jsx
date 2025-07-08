import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from '../pages/ProductDetails.module.scss';
import VantaBackground from '../components/VantaBackground';
import Loader from '../components/Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        const fakeReviews = [
          {
            rating: 5,
            comment: 'Absolutely love it! Great quality and fast delivery.',
            date: '2025-04-21T10:11:00.000Z',
            reviewerName: 'Emily Clark'
          },
          {
            rating: 4,
            comment: 'Good product overall. Worth the price.',
            date: '2025-05-13T15:42:00.000Z',
            reviewerName: 'Liam Johnson'
          },
          {
            rating: 3,
            comment: 'It’s decent but could be better.',
            date: '2025-06-02T12:01:00.000Z',
            reviewerName: 'Sofia Ramirez'
          }
        ];

        data.reviews = fakeReviews;
        setProduct(data);
      });
  }, [id]);

  if (!product) return <div className={s.loading}><Loader /></div>;

  const images = product.images || [product.thumbnail];
  const discountPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

  const nextImage = () => setCurrentImg((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImg((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <VantaBackground />
      <div className={s.container}>
        <div className={s.card}>
          <button className={s.backBtn} onClick={() => window.history.back()}>
            ← Back
          </button>

          <div className={s.imageSection}>
            <img src={images[currentImg]} alt={product.title} className={s.image} />
            {images.length > 1 && (
              <div className={s.controls}>
                <button className={s.controls_btn} onClick={prevImage}>&lt;</button>
                <span className={s.controls_text}>{currentImg + 1} / {images.length}</span>
                <button className={s.controls_btn} onClick={nextImage}>&gt;</button>
              </div>
            )}
          </div>

          <div className={s.info}>
            <h1 className={s.title}>{product.title}</h1>
            <p className={s.description}>{product.description}</p>

            <div className={s.price}>
              <span className={s.old}>Original Price: ${product.price}</span>
              <span className={s.discount}>Discount: {product.discountPercentage}% OFF</span>
              <span className={s.final}>Now: ${discountPrice}</span>
            </div>

            <p className={s.brand}><strong>Brand:</strong> {product.brand}</p>
            <p className={s.rating}><strong>Rating:</strong> ⭐ {product.rating}</p>
          </div>
        </div>

        <div className={s.reviews}>
          <h2>Customer Reviews</h2>
          {product.reviews.map((r, i) => (
            <div key={i} className={s.review}>
              <div className={s.reviewTop}>
                <span className={s.name}>{r.reviewerName}</span>
                <span className={s.date}>{new Date(r.date).toLocaleDateString()}</span>
              </div>
              <div className={s.stars}>⭐ {r.rating}</div>
              <p className={s.comment}>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
