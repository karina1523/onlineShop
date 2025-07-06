import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from '../pages/Home.module.scss'
import VantaBackground from '../components/VantaBackground'

const Home = () => {
    const navigate = useNavigate()

    return (
        <>
            <VantaBackground />
            <div className={s.box}>
                <h1 className={s.box__title}>Welcome to our online store!</h1>
                <p className={s.box__text1}>Your best online shopping adventure starts here! We've gathered the most popular and high-quality products for you — from everyday essentials to unique finds.</p>
                <p className={s.box__text2}>Don't waste time — the best deals are already waiting for you!
                    Your new favorite item might be just one click away.</p>
                <button
                    className={s.box__btn}
                    onClick={() => navigate('/catalog')}
                >
                    Go to products.
                </button>
            </div>
        </>

    )
}

export default Home
