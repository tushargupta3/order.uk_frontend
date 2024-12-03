import styles from './share.module.css'
import Cart from '../../components/cart/cart'
import { useEffect, useState } from 'react';
import { shareCartData } from '../../services/cart';
import { useParams } from 'react-router-dom';

const Share = () => {
    const { id } = useParams();
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        const getCartData = async () => {
            const cartData = await shareCartData(id);
            setCartData(cartData.data.cart.items);
        };

        getCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.container}>
            <Cart
                items={cartData || []}
                discounts={12}
                deliveryFee={5}
                isPublic={true}
            />
        </div>
    )
}

export default Share