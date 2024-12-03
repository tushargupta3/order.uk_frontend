/* eslint-disable no-unused-vars */
// HomeScreen.js
import React, {useEffect, useState } from 'react';
import styles from './home.module.css';
import food1 from '../../assets/food_auth.png'
import Header from '../../components/header/header';
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import Footer from '../../components/footer/footer';
import { PopularRestaurants } from '../../components/popularRestaurants/popularRestaurants';
import { Hero2Section } from '../../components/hero2/hero2';
import FAQ from '../../components/FAQ/FAQ';
import Stats from '../../components/stats/stats';
import { getAllRestaurants, getRestaurantById } from '../../services/restaurant';

const cld = new Cloudinary({
    cloud: {
        //   cloudName: import.meta.env.IMAGE_CLOUD_NAME,
        cloudName: "dgs9nsrid"
    }
});
const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const popularCategoriesPath = "cuvette-food-app/Popular categories/"
    const popularCategoriesItems = [
        {
          image: `${popularCategoriesPath}/burger`,
          name: "Burgers & Fast food",
          restaurants: 5,
        },
        {
          image: `${popularCategoriesPath}/soups`,
          name: "Soups",
          restaurants: 7,
        },
        {
          image: `${popularCategoriesPath}/salads`,
          name: "Salads",
          restaurants: 3,
        },
        {
          image: `${popularCategoriesPath}/pizza`,
          name: "Pizza",
          restaurants: 22,
        },
        {
          image: `${popularCategoriesPath}/pasta`,
          name: "Pasta & Casuals",
          restaurants: 13,
        },
        {
          image: `${popularCategoriesPath}/breakfast`,
          name: "Breakfast",
          restaurants: 20,
        },
      ];
      
    const cards = [
        {
            id: 1,
            image: 'https://res.cloudinary.com/dgs9nsrid/image/upload/v1732635225/cuvette-food-app/partner.png',
            badge: 'Earn more with lower fees',
            subtitle: 'Signup as a business',
            title: 'Partner with us',
            buttonText: 'Get Started',
        },
        {
            id: 2,
            image: 'https://res.cloudinary.com/dgs9nsrid/image/upload/v1732635225/cuvette-food-app/rider.png',
            badge: 'Avail exclusive perks',
            subtitle: 'Signup as a rider',
            title: 'Ride with us',
            buttonText: 'Get Started',
        },
    ];

    const offerCards = [
        {
            id: 1,
            image: 'https://res.cloudinary.com/dgs9nsrid/image/upload/v1733170772/cuvette-food-app/home_page/zggwpmuim7sh3iimydtj.png',
            title: 'Chef Burgers London',
            discount: '-40%',
        },
        {
            id: 2,
            image: 'https://res.cloudinary.com/dgs9nsrid/image/upload/v1733170774/cuvette-food-app/home_page/bf0whlc0wfz2uz9suxh5.png',
            title: 'Grand Ai Cafe London',
            discount: '-20%',
        },
        {
            id: 3,
            image: 'https://res.cloudinary.com/dgs9nsrid/image/upload/v1733170772/cuvette-food-app/home_page/abhwp3dqskvumjnqeapq.png',
            discount: '-17%',
        },
    ]

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Header />
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>Feast Your Senses, <span>Fast and Fresh</span></h1>
                    <p>Enter a postcode to see what we deliver</p>
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="e.g. EC4R 3TE" />
                        <button>Search</button>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <img src={food1} alt="Food Delivery" />
                </div>
            </section>

            {/* Discount Offers */}
            <section className={styles.offersSection}>
                <div className={styles.categories}>
                    <h2>Up to -40% 🎉 Order.uk exclusive deals</h2>
                    <div>
                        <button>Vegan</button>
                        <button>Sushi</button>
                        <button className={styles.active}>Pizza & Fast food</button>
                        <button>others</button>
                    </div>
                </div>
                <div className={styles.cards}>
                    {offerCards.map((card) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className={styles.card}>
                            <img src={card.image} alt="Food" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Categories */}
            <section className={styles.popularCategories}>
                <h2>Order.uk Popular Categories 🤩</h2>
                <div className={styles.cards}>
                    {popularCategoriesItems.map((category) => (
                        <div key={category} className={styles.card}>
                            <AdvancedImage cldImg={cld.image(category.image)} style={{ width: "100%", height: "160px" }} />
                            <div>
                                <h4>{category.name}</h4>
                                <p>{category.restaurants} Restaurants</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Categories */}
            <PopularRestaurants title="Popular Restaurants" />

            {/* Hero 2 Section */}
            <Hero2Section />

            {/* Partner Ride Section */}
            <section className={styles.partnerRiderSection}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.cardPR}>
                        <div className={styles.imageContainer}>
                            <img src={card.image} alt={card.title} />
                            <span className={styles.badge}>{card.badge}</span>
                            <div className={styles.content}>
                                <p className={styles.subtitle}>{card.subtitle}</p>
                                <h3 className={styles.title}>{card.title}</h3>
                                <button className={styles.button}>{card.buttonText}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/*FAQ*/}
            <FAQ isMobile={isMobile}/>

            {/* About Us Section */}
            <Stats />

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Home;
