import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'

const Cart = (props)=>{

    const ctx = useContext(CartContext);

    const hasItems = ctx.items.length > 0;

    const totalAmount = `$${Math.abs(ctx.totalAmount.toFixed(2))}`;

    const removeCartItemHandler = (id) =>{
        ctx.removeItem(id);
    }

    const addCartItemHandler = (item) =>{
        ctx.addItem({...item,amount:1})
    }

    const cartItems = ctx.items.map((cartItem)=>{
        return(<CartItem key={cartItem.id} price={cartItem.price} name={cartItem.name} amount={cartItem.amount} onRemove={removeCartItemHandler.bind(null,cartItem.id)} onAdd={addCartItemHandler.bind(null, cartItem)}/>)
    });


    return(
        <Modal hide={props.hide}>
            <ul className={styles['cart-items']}>
                {cartItems}
            </ul>
            <div className={styles.total}>
                <span>Итого:</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']}onClick={props.hide}>Закрыть</button>
                {hasItems && <button className={styles.button}>Заказать</button>}
            </div>
        </Modal>
    )
}

export default Cart;