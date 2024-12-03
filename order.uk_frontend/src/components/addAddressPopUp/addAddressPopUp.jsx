/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styles from './addAddressPopUp.module.css';
import { addAddress, updateAddress } from '../../services/userInfo';
import { IoLocationOutline } from "react-icons/io5";

const AddAddressPopup = ({ onClose, onSave, editInfo }) => {
    const [state, setState] = useState(editInfo ? editInfo.state : '');
    const [city, setCity] = useState(editInfo ? editInfo.district : '');
    const [pinCode, setPinCode] = useState(editInfo ? editInfo.pincode : '');
    const [phone, setPhone] = useState(editInfo ? editInfo.phoneNumber : '');
    const [fullAddress, setFullAddress] = useState(editInfo ? editInfo.address : '');
    // eslint-disable-next-line no-unused-vars
    const [fromEdit, setFromEdit] = useState(Object.keys(editInfo).length ? true : false);
    
    const handleSubmit = async () => {
        if (!phone || !fullAddress || !state || !city || !pinCode) {
            alert('Please fill out all fields.');
            return;
        }

        const address = {
            address: fullAddress,
            state: state,
            district: city,
            pincode: pinCode,
            phoneNumber: phone,
            default: false
        };
        let res = ""

        if (fromEdit) {
            res = await updateAddress(editInfo._id, address)
        } else {
            res = await addAddress(address)
        }
        if (res.status == 200) {
            alert(res.message)
            onSave();
        } else {
            alert(res.message)
        }
        onClose();
    };

    return (
        <div className={styles.popupOverlay} onClick={onClose}>
            <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                <h3><span><IoLocationOutline /></span>&nbsp;Add Address</h3>
                <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City/District"
                        />
                    </div><div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            placeholder="Pin Code"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
                <div className={styles.inputGroupFullWidth}>
                    <textarea
                        value={fullAddress}
                        onChange={(e) => setFullAddress(e.target.value)}
                        placeholder="Enter full address"
                    ></textarea>
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={handleSubmit} className={styles.saveButton}>Save</button>
                    {/* <button onClick={onClose} className={styles.cancelButton}>Cancel</button> */}
                </div>
            </div>
        </div>
    );
};

export default AddAddressPopup;