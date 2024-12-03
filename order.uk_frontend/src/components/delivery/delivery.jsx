/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import styles from './delivery.module.css';
import { UserContext } from '../../contexts/userContext';
import AddAddressPopup from '../addAddressPopUp/addAddressPopUp';
import { deleteAddress } from '../../services/userInfo';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import addIcon from '../../assets/add.png'
import { getUserInfo } from '../../services/auth';

const Delivery = ({ onBack, onSetDefault, isMobile}) => {
    const [userInfo, setUserInfo] = useState({});
    const [addresses, setAddresses] = useState([]);

    const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
    const [editInfo, setEditInfo] = useState({});

    useEffect(() => {
        getAddressinfo();
    }, []);

    const getAddressinfo = async () => {
        const userInfo = await getUserInfo()
        if (!userInfo) return
        setUserInfo(userInfo.data)
        setAddresses(userInfo.data.Addresses)
    }

    const renderHeader = () => {
        if (isMobile) {
            return (
                <div style={{ display: 'flex', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>
                        <span><IoArrowBackCircleSharp style={{ fontSize: '50px', cursor: 'pointer'}} color='#FC8A06' onClick={onBack} /></span>
                        Your Addresses
                    </h2>
                </div>
            );
        } else {
            return <h2><span><IoMdArrowRoundBack style={{cursor: 'pointer'}} onClick={onBack} /></span>Your Addresses</h2>;
        }
    }

    const onRemove = async(id) => {
        const res = await deleteAddress(id);
        if(res.status === 200) {
            alert(res.message);
        } else {
            alert("Something went wrong");
        }
        getAddressinfo()
    };

    const onSaveAddress = () => {
        console.log("Address saved");
        getAddressinfo()
    };

    const onEdit = (address) => {
        setEditInfo(address);
        setShowAddAddressPopup(true);
        getAddressinfo()
    };

    const onAdd = () => {
        setEditInfo({});
        setShowAddAddressPopup(true);
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.orderDetails}>
                {renderHeader()}

                {/* Address Cards */}
                <div className={styles.cardContainer}>
                    <div className={[styles.card, styles.cardDashed].join(' ')} onClick={onAdd}>
                        <img src={addIcon} alt="add" style={{ width: '50px', height: '50px' }} />
                        <h4 style={{ fontSize: '20px', color: '#000' }}>Add Address</h4>
                    </div>
                    {userInfo &&addresses.map((address, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardHeader}>
                                <h4>{userInfo.name}</h4>
                                {index == 0 && <p>Default</p>}
                            </div>
                            <p>{address.address}, {address.district}, {address.state}, {address.pincode}</p>
                            <p>Phone Number: {address.phoneNumber}</p>
                            {address.isDefault && <div className={styles.defaultBadge}>Default</div>}
                            <div className={styles.editRemove}>
                                <span onClick={() => onEdit(address)}>Edit</span>
                                <span>|</span>
                                <span onClick={() => onRemove(address._id)}>Remove</span>
                            </div>
                        </div>
                    ))}
                </div>
                {showAddAddressPopup &&
                    <AddAddressPopup 
                        onClose={() => setShowAddAddressPopup(false)}
                        onSave={onSaveAddress}
                        editInfo={editInfo}
                    />
                }
            </div>
        </div>
    );
};

export default Delivery;