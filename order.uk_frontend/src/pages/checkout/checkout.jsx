// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import styles from './checkout.module.css';
import { getCartById } from '../../services/cart';
import Header from '../../components/header/header';
import { PopularRestaurants } from '../../components/popularRestaurants/popularRestaurants';
import Footer from '../../components/footer/footer';
import OrderSummary from '../../components/orderSummary/orderSummary';
import Delivery from '../../components/delivery/delivery';
import Payment from '../../components/payment/payment';

const Checkout = () => {
    const [cartData, setCartData] = useState([]);
    const [activeStep, setActiveStep] = useState("OrderSummary");
    const [totalAmount, setTotalAmount] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const getCartData = async () => {
            const cartData = await getCartById();
            setCartData(cartData.data.cart.items);

            let totalAmount = cartData.data.cart.items.reduce((total, item) => {
                return total + (item.foodInfo.price * item.quantity);
            }, 0);
        
            //applying discount and delivery charge
            totalAmount = totalAmount - 12 + 5;
            console.log(totalAmount)
            setTotalAmount(totalAmount);
        };

        getCartData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

    const renderComponent = () => {
        switch (activeStep) {
            case "OrderSummary":
                return <OrderSummary
                        cartData={cartData}
                        onClickDelivery={() => setActiveStep("Delivery")}
                        onClickPayment={() => setActiveStep("Payment")}
                        totalAmount={totalAmount}
                        isMobile={isMobile}
                    />;
            case "Delivery":
                return <Delivery onBack={() => setActiveStep("OrderSummary")} isMobile={isMobile} />;
            case "Payment":
                return <Payment onBack={() => setActiveStep("OrderSummary")} cartData={cartData} totalAmount={totalAmount+10} isMobile={isMobile} />;
            default:
                return <OrderSummary cartData={cartData} onNext={() => setActiveStep("Delivery")} />;
        }
    };

    return (
        <div className={styles.parentContainer}>
            <Header hideCart={true}/>
            {renderComponent()}
            {!isMobile && activeStep === "OrderSummary" && <PopularRestaurants/>}
            {!isMobile && <Footer/>}
        </div>
    );
};

export default Checkout;