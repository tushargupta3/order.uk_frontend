// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./infoSection.module.css";

export function InfoSection() {
  return (
    <section className={styles.infoSection}>
      <div className={styles.deliveryInfo}>
        <h2>
          <span role="img" aria-label="delivery">
            🚚
          </span>
          Delivery information
        </h2>
        <p>
          <strong>Monday:</strong> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Tuesday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Wednesday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Thursday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Friday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Saturday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Sunday:</strong> 8:00 AM–12:00 AM
        </p>
        <p>Estimated time until delivery: 20 min</p>
      </div>

      <div className={styles.contactInfo}>
        <h2>
          <span role="img" aria-label="contact">
            ☎️
          </span>
          Contact information
        </h2>
        <p>
          If you have allergies or other dietary restrictions, please contact the
          restaurant. The restaurant will provide food-specific information upon
          request.
        </p>
        <p>
          <strong>Phone number:</strong> +934443-43
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href="http://mcdonalds.uk/" target="_blank" rel="noopener noreferrer">
            http://mcdonalds.uk/
          </a>
        </p>
      </div>

      <div className={styles.operationalTimes}>
        <h2>
          <span role="img" aria-label="clock">
            ⏰
          </span>
          Operational Times
        </h2>
        <p>
          <strong>Monday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Tuesday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Wednesday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Thursday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Friday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Saturday:</strong> 8:00 AM–3:00 AM
        </p>
        <p>
          <strong>Sunday:</strong> 8:00 AM–3:00 AM
        </p>
      </div>
    </section>
  );
}