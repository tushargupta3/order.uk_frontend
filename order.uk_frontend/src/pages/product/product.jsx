// HomeScreen.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import styles from './product.module.css';
// import food1 from '../../assets/food/food1.png'
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { PopularRestaurants } from '../../components/popularRestaurants/popularRestaurants';
import { useParams } from 'react-router-dom';
import SummaryCard from '../../components/SummaryCard/SummaryCard';
import MapWithInfoCard from '../../components/map/map';
// eslint-disable-next-line no-unused-vars
import { getAllRestaurants, getRestaurantById } from '../../services/restaurant';
import { InfoSection } from '../../components/infoSection/infoSection';
import { CustomerReviews } from '../../components/customerReviews/customerReviews';
import { getAllFood, searchFoodItems } from '../../services/food';
import FoodCard from '../../components/foodCard/foodCart';
import Cart from '../../components/cart/cart';
import { addItemsToCart, getCartById } from '../../services/cart';
import { BiSearch } from "react-icons/bi"


const Product = () => {
    const [restaturantById, setRestautantById] = useState([])
    const [fooditems, setFoodItems] = useState([])
    const [cartData, setCartData] = useState([])
    const [allFoodItems, setAllFoodItems] = useState([])
    const [shouldRefetchCart, setShouldRefetchCart] = useState(false);
    const [cartId, setCartId] = useState(null);
    const [query, setQuery] = useState('');

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const { id } = useParams();
    const offerCards = [
        {
            id: 1,
            image: "https://res.cloudinary.com/dgs9nsrid/image/upload/v1733174120/cuvette-food-app/Product%20page/iiq4ayzjbaqcgxag5lm2.png"
        },
        {
            id: 2,
            image: "https://res.cloudinary.com/dgs9nsrid/image/upload/v1733174121/cuvette-food-app/Product%20page/i58o0xmarpfzcwm9pwhf.png"
        },
        {
            id: 3,
            image: "https://res.cloudinary.com/dgs9nsrid/image/upload/v1733174121/cuvette-food-app/Product%20page/juh5xz06gqfj7hwhvbyx.png"
        }
    ]

    useEffect(() => {
        const getData = async () => {
            const restaturantById = await getRestaurantById(id)
            setRestautantById(restaturantById.data)
        }

        window.scrollTo(0, 0);
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const getData = async () => {
            const fooditems = await getAllFood()
            processFoodItems(fooditems.data)
            setAllFoodItems(fooditems.data)
        }
        getData()
    }, [])

    useEffect(() => {
        console.log("refetching cart")
        const getCartData = async () => {
            const cartData = await getCartById();
            setCartData(cartData.data.cart.items);
            setCartId(cartData.data.cart._id);
        };

        getCartData();
    }, [shouldRefetchCart]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const processFoodItems = (foodItems) => {
        const categories = [...new Set(foodItems.map(foodItem => foodItem.category))]

        let foodItemsByCategory = {}
        categories.map((category) => {
            foodItemsByCategory[category] = foodItems.filter((foodItem) => foodItem.category === category)
        })

        setFoodItems(foodItemsByCategory)
    }

    const addItemToCart = async (itemId) => {
        const tempCartData = cartData
        const itemIndex = tempCartData.findIndex((item) => item.foodItem === itemId);
        const foodById = allFoodItems.find((foodItem) => foodItem._id === itemId)

        if (itemIndex !== -1) {
            tempCartData[itemIndex].quantity += 1;
            await addItemsToCart({ items: tempCartData })
        } else {
            const newItem = {
                foodItem: itemId,
                foodInfo: {
                    name: foodById.name,
                    category: foodById.category,
                    description: foodById.description,
                    price: foodById.price,
                    image: foodById.image
                },
                quantity: 1
            };
            await addItemsToCart({ items: [...tempCartData, newItem] })
        }
        setShouldRefetchCart(!shouldRefetchCart)
    };

    const removeItemFromCart = async (itemId) => {
        const tempCartData = [...cartData];
        const itemIndex = tempCartData.findIndex((item) => item.foodItem === itemId);

        if (itemIndex !== -1) {
            if (tempCartData[itemIndex].quantity > 1) {
                tempCartData[itemIndex].quantity -= 1;
            } else {
                tempCartData.splice(itemIndex, 1);
            }
            setCartData(tempCartData);
            await addItemsToCart({ items: tempCartData });
        }
        setShouldRefetchCart(!shouldRefetchCart)
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(`${window.location.origin}/share/${cartId}`);
        alert("Link copied to clipboard!")
    }

    const handleSearch = async () => {
        const response = await searchFoodItems(query.trim());
        if (response.status === 200) {
            processFoodItems(response.data)
        } else {
            console.error('Search Error:', response.message);
            alert(response.message || 'An error occurred while searching.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    function capitalizeFirstLetter(string) {
        if (!string) return "";
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={styles.parentContainer}>
            {/* Header Section */}
            <Header />

            {/* Product Summary */}
            <SummaryCard restaurantData={restaturantById} />

            {/* Search Section  */}
            <div className={styles.searchHeaderConatiner}>
                <h2>All Offers from {restaturantById.name}</h2>

                <div className={styles.searchBarContainer}>
                    <div className={styles.searchBarWithIcon}>
                        <BiSearch className={styles.searchIcon} onClick={handleSearch} />
                        <input
                            type="text"
                            className={styles.searchBar}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search from menu"
                        />
                    </div>
                </div>
            </div>

            {/*Static nav bar */}
            <div className={styles.staticNav}>
                <button className={styles.active}>Offers</button>
                <button>Burgers</button>
                <button>Drinks</button>
                <button>Salads</button>
                <button>Pizzas</button>
            </div>

            <div className={styles.offerContainer}>
                {offerCards.map((card) => (
                    <div key={card.id} className={styles.offerCard}>
                        <img src={card.image} alt="offer" />
                    </div>
                ))}

            </div>

            <div className={styles.container}>
                {/* Food Items Section */}
                <div className={styles.foodItemsSection}>
                    {Object.keys(fooditems).map((category) => (
                        <div key={category} className={styles.categorySection}>
                            <h2>{capitalizeFirstLetter(category)}</h2>
                            <div className={styles.foodItems}>
                                {fooditems[category].map((foodItem) => (
                                    <FoodCard
                                        key={foodItem._id}
                                        id={foodItem._id}
                                        name={foodItem.name}
                                        price={foodItem.price}
                                        description={foodItem.description}
                                        img={foodItem.image}
                                        addItemToCart={addItemToCart}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Section */}
                {!isMobile && <div className={styles.cartContainer}>
                    {cartData.length > 0 && (
                        <Cart
                            items={cartData || []}
                            discounts={12}
                            deliveryFee={5}
                            removeItemFromCart={removeItemFromCart}
                            copyLink={copyLink}
                        />
                    )}
                </div>}
            </div>

            {/* Info Section */}
            {!isMobile && <InfoSection />}

            {/* Map */}
            <MapWithInfoCard restaurantData={restaturantById} />

            {/* Customer Reviews */}
            <CustomerReviews />

            {/* Popular Restaurants */}
            <PopularRestaurants />

            {/* Footer Section */}
            <Footer />
        </div >
    );
};

export default Product;