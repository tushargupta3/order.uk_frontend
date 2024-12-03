/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './payment.module.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { deleteItemFromCart } from '../../services/cart';
import walletIcon from '../../assets/wallet.png'
import { GrFormNext } from "react-icons/gr";
import sucessIcon from "../../assets/sucess.png"
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getUserInfo } from '../../services/auth';
import AddPaymentPopUp from '../addPaymentPopUp/addPaymentPopUp.';
import { addPaymentMethod } from '../../services/userInfo';
const Payment = ({ onBack, cartData, totalAmount, isMobile }) => {
    const [paid, setPaid] = useState(false);
    const [cardData, setCardData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        getPaymentData();
    }, [])

    const getPaymentData = async () => {
        const userInfo = await getUserInfo()
        if (!userInfo) return
        setCardData(userInfo.data.paymentMethods)
    }

    const renderHeader = () => {
        if (isMobile) {
            return (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>
                        <span><IoArrowBackCircleSharp style={{ fontSize: '50px' }} color='#FC8A06' onClick={onBack} /></span>
                        Choose and Pay
                    </h2>
                </div>
            );
        } else {
            return <h2><span><IoMdArrowRoundBack onClick={onBack} /></span>Choose and Pay</h2>;
        }
    }

    const resetCart = async () => {
        await deleteItemFromCart();
    }

    const onPay = () => {
        setPaid(true);
        resetCart();
    }

    const handleCardSave = async (updatedDetails) => {
        const res = await addPaymentMethod(updatedDetails)
        if (res.status === 200) {
            alert(res.message)
            getPaymentData()
        } else {
            alert("Something went wrong")
        }
    };

    const foodNames = cartData.map(item => item.foodInfo.name);

    return (
        <div className={styles.container}>
            {!paid && <>
                <div className={styles.paymentMethods}>
                    {renderHeader()}
                    <div className={styles.paymentOptions}>
                        <div className={styles.paymentOptionDiv}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <img src={walletIcon} alt="wallet" style={{ width: '50px', height: '50px' }} />
                                <p>Wallet<br /><span>Available balance ₹320</span></p>
                            </div>
                            <GrFormNext color='#FC8A06' style={{ fontSize: "1rem" }} />
                        </div>

                        {cardData.map((method) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className={styles.paymentOptionDiv}>
                                <div className={styles.paymentOptionContent}>
                                    <img src={walletIcon} alt="wallet" className={styles.paymentOptionImg} />
                                    <p>{method?.name}</p>
                                </div>
                                <input type="radio" name="paymentOption" className={styles.paymentOptionRadio} />
                            </div>
                        ))}

                        <div className={styles.paymentOptionDiv} onClick={() => setIsPopupOpen(true)}>
                            <div
                                className={styles.paymentOptionContent}
                                style={{ padding: '15px', paddingLeft: '20px'}}
                            >
                                <p style={{ fontWeight: '100', cursor: 'pointer' }}>+ Add Debit Card</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.paymentSummary}>
                    <div className={styles.amount}>
                        <p>Amount to be paid</p>
                        <p style={{ fontWeight: 'bold', color: '#000' }}>₹{totalAmount}</p>
                    </div>
                    <div className={styles.dividerLine} />
                    <button className={styles.paymentButton} onClick={onPay}>Proceed Payment</button>
                </div>
            </>}
            {paid && <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <div className={styles.sucessContainer}>
                        <img src={sucessIcon} alt="sucess" className={styles.sucessIcon} />
                        <h4>Order Placed Successfully</h4>
                        <p>Your order is confirmed and on its way. Get set to savor your chosen delights!</p>
                        <div>
                            {foodNames && foodNames.map((foodName, index) => (
                                <p key={index}>{foodName}</p>
                            ))}
                            <button className={styles.paymentButton} onClick={() => window.location.href = '/'}>Back to Home</button>

                        </div>
                    </div>
                </div>
            </>}

            {isPopupOpen && (
                <AddPaymentPopUp
                    isEdit={false}
                    cardDetails={{}}
                    onClose={() => setIsPopupOpen(false)}
                    onSave={handleCardSave}
                />
            )}
        </div>
    );
};

export default Payment;