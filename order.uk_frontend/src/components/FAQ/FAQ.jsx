/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './FAQ.module.css';
import placeOrder from "../../assets/placeOrder.png"
import trackOrder from "../../assets/trackProgress.png"
import getOrder from "../../assets/getOrder.png"

// eslint-disable-next-line react/prop-types
const FAQ = ({isMobile}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  

  const handleQuestionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'How does Order.UK work?',
      answer: 'Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'Order.UK accepts a variety of payment methods, including credit/debit cards, digital wallets, and cash on delivery.',
    },
    {
      question: 'Can I track my order in real-time?',
      answer: 'Yes, you can track the status of your order with delivery time updates through the Order.UK website or mobile app.',
    },
    {
      question: 'Are there any special discounts or promotions available?',
      answer: 'Order.UK frequently offers special discounts and promotions to our valued customers. Check our website or app for the latest offers.',
    },
    {
      question: 'Is Order.UK available in my area?',
      answer: `Order.UK's service coverage is constantly expanding. Enter your location on our website to see if we're available in your area.`,
    },
  ];

  const imgIcons = [
    {
      title: 'Place an Order!',
      icon: placeOrder,
      subtitle: 'Place order through our website or mobile app',
    },
    {
      title: 'Track Progress',
      icon: trackOrder,
      subtitle: 'You can track your order status with delivery time',
    },
    {
      title: 'Get Your Order',
      icon: getOrder,
      subtitle: 'Receive your order at a lightning fast speed!',
    }
  ]

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h2 className={styles.header}>Know more about us!</h2>
        <div className={styles.nav}>
          <span className={`${styles.navItem} ${styles.active}`}>Frequent Questions</span>
          <span className={styles.navItem}>Who we are?</span>
          <span className={styles.navItem}>Partner Program</span>
          <span className={styles.navItem}>Help & Support</span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.questions}>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`${styles.questionItem} ${activeIndex === index ? styles.activeQuestion : ''}`}
              onClick={() => handleQuestionClick(index)}
            >
              {item.question}
            </div>
          ))}
        </div>
        <div className={styles.answerSection}>
          <div className={styles.answerIconContainer}>
            {imgIcons.map((item, index) => (
              <div key={index} className={styles.answerItem}>
                <h3 className={styles.title}>{item.title}</h3>
                <img src={item.icon} alt={item.title} className={styles.icon} />
                <p className={styles.subtitle}>{item.subtitle}</p>
              </div>
            ))}
          </div>
          {activeIndex !== null && <p className={styles.answer}>{faqData[activeIndex].answer}</p>}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ;