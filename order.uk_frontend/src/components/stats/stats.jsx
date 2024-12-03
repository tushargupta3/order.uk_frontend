import styles from './stats.module.css'

export default function Stats () {
    return (
        <div className={styles.faqStats}>
            <div className={styles.faqStat}>
                <div className={styles.faqStatValue}>546+</div>
                <div className={styles.faqStatLabel}>Registered Riders</div>
            </div>
            <div className={styles.faqStat}>
                <div className={styles.faqStatValue}>789,900+</div>
                <div className={styles.faqStatLabel}>Orders Delivered</div>
            </div>
            <div className={styles.faqStat}>
                <div className={styles.faqStatValue}>690+</div>
                <div className={styles.faqStatLabel}>Restaurants Partnered</div>
            </div>
            <div className={styles.faqStat} style={{border: 'none'}}>
                <div className={styles.faqStatValue}>17,457+</div>
                <div className={styles.faqStatLabel}>Food Items</div>
            </div>
        </div>
    )
}