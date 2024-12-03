/* eslint-disable react/prop-types */
import styles from './orderSummary.module.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getUserInfo } from '../../services/auth';
import { useEffect, useState } from 'react';
const OrderSummary = ({ cartData, onClickDelivery, onClickPayment, totalAmount, isMobile }) => {
    const [addresses, setAddresses] = useState([])

    useEffect(() => {
        getAddressinfo()
    }, [])

    const getAddressinfo = async () => {
        const userInfo = await getUserInfo()
        if (!userInfo) return
        setAddresses(userInfo.data.Addresses)
    }

    const renderHeader = () => {
        if (isMobile) {
            return (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>
                        <span><IoArrowBackCircleSharp style={{ fontSize: '50px' }} color='#FC8A06' onClick={() => window.history.back()} /></span>
                        Checkout
                    </h2>
                </div>
            );
        } else {
            return <h2><span><IoMdArrowRoundBack onClick={() => window.history.back()} /></span>Your Order Details</h2>;
        }
    }

    return (
        <>
            {cartData.length > 0 ? (
                <div className={styles.container}>
                    <div className={styles.orderDetails}>
                        {renderHeader()}
                        <div className={styles.divider}>
                            {cartData.map((item, index) => (
                                <div key={index} className={styles.itemContainer} style={index === cartData.length - 1 ? { borderBottom: "none" } : null}>
                                    <div className={styles.itemImage}>
                                        <img src={item.foodInfo.image} alt={item.foodInfo.name} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h3 className={styles.itemName}>{item.foodInfo.name}</h3>
                                        <span className={styles.itemQuantity}>{item.quantity}x item</span>
                                    </div>

                                    <p className={styles.itemPrice}>₹{item.foodInfo.price * item.quantity}</p>
                                </div>
                            ))}
                            <div className={styles.orderNotes}>
                                <p>Notes</p>
                                <textarea placeholder="Add order notes" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.orderSummary}>
                        {isMobile && <h2>Delivery Address</h2>}
                        <div className={styles.deliveryAddress} onClick={onClickDelivery}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className={styles.locationIcon}>
                                    <FaLocationDot color='#FC8A06' />
                                </div>
                                <div className={styles.addressDetails}>
                                    <h3>Delivery Address</h3>
                                    {addresses.length>0 && <p>{addresses[0].address}, {addresses[0].district}, {addresses[0].state}, {addresses[0].pincode}</p>}
                                </div>
                            </div>
                            <GrFormNext color='#FC8A06' style={{ fontSize: "2.5rem" }} />
                        </div>
                        {!isMobile && <div className={styles.dividerLine}></div>}

                        {isMobile && <h2>Order Summary</h2>}
                        <div className={styles.orderInfo}>
                            <div className={styles.orderSummaryItems}>
                                <p>Items</p>
                                <p>₹{totalAmount}</p>
                            </div>
                            <div className={styles.orderSummaryItems}>
                                <p>Sales Tax</p>
                                <p>₹10</p>
                            </div>
                            {!isMobile && <div className={styles.dividerLine}></div>}

                            <div className={styles.orderSummaryItems}>
                                <h4>{`Subtotal (${cartData.length} items)`}</h4>
                                <h4>₹{totalAmount + 10}</h4>
                            </div>

                            {isMobile && <div className={styles.dividerLine}></div>}
                        </div>
                        <button className={styles.paymentButton} onClick={onClickPayment}>Choose Payment Method</button>
                    </div>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.orderDetails}>
                        {renderHeader()}
                        <h3>Your cart is empty</h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderSummary;