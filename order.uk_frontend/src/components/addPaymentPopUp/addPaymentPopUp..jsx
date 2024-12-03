/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "./addPaymentPopUp.module.css";

const AddPaymentPopUp = ({ isEdit, cardDetails, onClose, onSave, onRemove }) => {
    const [cardNumber, setCardNumber] = useState(cardDetails?.cardNumber || "");
    const [expiration, setExpiration] = useState(cardDetails?.expiration || "");
    const [cvc, setCvc] = useState(cardDetails?.cvc || "");
    const [name, setName] = useState(cardDetails?.name || "");
    const [errorMessage, setErrorMessage] = useState("");

    const validateForm = () => {
        // Regular expressions for validation
        const cardNumberPattern = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
        const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
        const cvcPattern = /^[0-9]{3}$/;

        // Validation checks
        if (!cardNumber || !cardNumberPattern.test(cardNumber)) {
            return "Please enter a valid card number in the format XXXX XXXX XXXX 1234.";
        }
        if (!expiration || !expirationPattern.test(expiration)) {
            return "Please enter a valid expiration date in the format MM/YY.";
        }
        if (!cvc || !cvcPattern.test(cvc)) {
            return "Please enter a valid 3-digit CVC.";
        }
        if (!name) {
            return "Please enter the name on the card.";
        }
        return ""; 
    };

    const handleSave = () => {
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }
        const id = cardDetails?.id;
        const updatedDetails = { cardNumber, expiration, cvc, name };
        if (id) {
            updatedDetails.id = id;
        }
        onSave(updatedDetails);
        onClose();
    };

    const handleCardRemove = () => {
        onRemove(cardDetails.id);
        onClose();
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <h2>{isEdit ? "Edit Payment Method" : "Add Payment Method"}</h2>
                    <span className={styles.closeIcon} onClick={onClose}>X</span>
                </div>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <div className={styles.formGroup}>
                    <label>Card Number</label>
                    <input
                        type="text"
                        placeholder="XXXX XXXX XXXX 1234"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Expiration</label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>CVC</label>
                    <input
                        type="text"
                        placeholder="XXX"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Name on Card</label>
                    <input
                        type="text"
                        placeholder="Name on Card"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.buttonGroup}>
                    {isEdit && <button className={styles.removeButton} onClick={handleCardRemove}>
                        Remove
                    </button>}
                    <div>
                        <button className={styles.cancelButton} onClick={onClose}>
                            Cancel
                        </button>
                        <button className={styles.saveButton} onClick={handleSave}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPaymentPopUp;
