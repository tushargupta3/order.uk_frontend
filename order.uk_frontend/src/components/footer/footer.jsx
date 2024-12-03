// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./footer.module.css";
import appStoreImg from "../../assets/app_store.png";
import playStoreImg from "../../assets/play_store.png";

import Instagram from "../../assets/Instagram.png";
import Facebook from "../../assets/Facebook.png";
import Snapchat from "../../assets/Snapchat.png";
import TikTok from "../../assets/TikTok.png";

const Footer = () => {
  return (
    <footer>
      <div className={styles.topSection}>
        <div className={styles.logoAndApps}>
          <img src="/logo.png" alt="logo" className={styles.logo} />
          <div className={styles.appLinks}>
            <img src={appStoreImg} alt="App Store" />
            <img src={playStoreImg} alt="Google Play" />
          </div>
          <p>
            Company # 490039-445, Registered with House of companies.
          </p>
        </div>

        <div className={styles.newsletter}>
          <h3>Get Exclusive Deals in your Inbox</h3>
          <div className={styles.subscribe}>
            <input type="email" placeholder="youremail@gmail.com" />
            <button>Subscribe</button>
          </div>
          <p>we won’t spam, read our <a href="/email-policy">email policy</a></p>
          <div className={styles.socialIcons}>
            <img src={Facebook} alt="facebook"/>
            <img src={Instagram} className="instagram"/>
            <img src={TikTok} className="tiktok"/>
            <img src={Snapchat} className="snapchat"/>
          </div>
        </div>

        <div className={styles.links}>
          <div>
            <h3>Legal Pages</h3>
            <a href="/terms">Terms and conditions</a>
            <a href="/privacy">Privacy</a>
            <a href="/cookies">Cookies</a>
            <a href="/modern-slavery">Modern Slavery Statement</a>
          </div>
          <div>
            <h3>Important Links</h3>
            <a href="/help">Get help</a>
            <a href="/add-restaurant">Add your restaurant</a>
            <a href="/sign-up">Sign up to deliver</a>
            <a href="/business-account">Create a business account</a>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        <div className={styles.bottomLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/pricing">Pricing</a>
          <a href="/do-not-sell">Do not sell or share my personal information</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;