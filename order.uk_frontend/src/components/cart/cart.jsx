/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo } from "react";
import styles from "./cart.module.css";
import { MdDeleteForever } from "react-icons/md";
import cartImg from "../../assets/cart.png";
import { IoShareSocialOutline } from "react-icons/io5";

const Cart = ({ items, discounts, deliveryFee, removeItemFromCart, isPublic, copyLink }) => {
  const total = useMemo(() => {
    return Object.values(items).reduce((acc, item) => {
      return acc + item.foodInfo.price * item.quantity;
    }, 0);
  }, [items]);

  useEffect(() => {
    console.log("Cart component reloaded");
  }, [items]);

  return (
    <div className={styles.cart}>
      {/* Title Section */}
      {!isPublic &&
        <div className={styles.shareContatiner}>
          <IoShareSocialOutline className={styles.shareIcon} />
          <p>Share this cart with your friends</p>
          <button className={styles.shareCart} onClick={copyLink}>
            Copy link
          </button>
        </div>
      }
      <div className={styles.titleContainer}>
        <img src={cartImg} alt="cart" className={styles.cartImg} />
        <h2 className={styles.title}>My Basket</h2>
      </div>

      {/* Cart Items */}
      <div className={styles.items}>
        {Object.values(items).map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.itemDetails}>
              <span className={styles.quantity}>{`${item.quantity}x`}</span>
              <span className={styles.name}>{item.foodInfo.name}</span>
              <span className={styles.extra}>{item.foodInfo.description}</span>
            </div>
            <span className={styles.price}>
              ₹{(item.foodInfo.price * item.quantity).toFixed(2)}
            </span>
            {!isPublic && <MdDeleteForever
              className={styles.delete}
              onClick={() => removeItemFromCart(item.foodItem)}
            />}
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className={styles.summary}>
        <div className={styles.row}>
          <span>Sub Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span>Discounts:</span>
          <span className={styles.discount}>-₹{discounts.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span>Delivery Fee:</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className={styles.total}>
          <span>Total to pay</span>
          <span>₹{(total - discounts + deliveryFee).toFixed(2)}</span>
        </div>
      </div>

      {/* Actions Section */}
      <div className={styles.actions}>
        <button className={styles.freeItem}>Choose your free item</button>
        <div className={styles.couponInput}>
          <input type="text" placeholder="Apply Coupon Code here" />
          <button>Apply</button>
        </div>
        <div className={styles.deliveryOptions}>
          <button className={styles.deliveryTime}>Delivery Starts @ ₹150</button>
          <button className={styles.collectionTime}>
            Collection Starts @ ₹120
          </button>
        </div>
        <button
          className={isPublic ? styles.checkoutDisabled : styles.checkout}
          onClick={() => window.location.href = "/checkout"}
          disabled={isPublic}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;