import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import SubmitOrder from './SubmitOrder'

const Cart = (props)=>{

    const [isOrderFormVisible,setIsOrderFormVisible] = useState(false);
    const [isDataSubmited,setIsDataSubmiting] = useState(false);
    const [wasDataSendingSucc,setWasDataSendingSucc] = useState(false);

    const orderHandler = () =>{
        setIsOrderFormVisible(true);
    }

    const ctx = useContext(CartContext);

    const hasItems = ctx.items.length > 0;

    const totalAmount = `$${Math.abs(Number(ctx.totalAmount).toFixed(2))}`;

    const removeCartItemHandler = (id) =>{
        ctx.removeItem(id);
    }

    const clearCartHandler = () =>{
        ctx.clearCart();
    }

    const addCartItemHandler = (item) =>{
        ctx.addItem({...item,amount:1})
    }

    const cartItems = ctx.items.map((cartItem)=>{
        return(<CartItem key={cartItem.id} price={cartItem.price} name={cartItem.name} amount={cartItem.amount} onRemove={removeCartItemHandler.bind(null,cartItem.id)} onAdd={addCartItemHandler.bind(null, cartItem)}/>)
    });

    const modalButtons = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.hide}>Закрыть</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Заказать</button>}
    </div>

    const submitOrderHandler = async (userData) =>{
        setIsDataSubmiting(true);
        const response = await fetch("https://react-train-http-default-rtdb.firebaseio.com/orders.json",{
            method:"POST",
            body:JSON.stringify({user:userData,order:ctx.items})
        });
        setIsDataSubmiting(false);
        if(response.ok){
            setWasDataSendingSucc(true);
            clearCartHandler();
        }
    }

    const cartModalContent = <React.Fragment>
            <ul className={styles['cart-items']}>
                {cartItems}
            </ul>
            <div className={styles.total}>
                <span>Итого:</span>
                <span>{totalAmount}</span>
            </div>
            {isOrderFormVisible && <SubmitOrder hide={props.hide} onSubmit={submitOrderHandler}/>}
            {!isOrderFormVisible && modalButtons}
    </React.Fragment>

    const DataSubmitingModalContent = <p>Отправка данных заказа</p>

    const DataSubmitedModalContent =<div className={styles.actions}><p>Ваш заказ был отправлен</p><button onClick={props.hide} className={styles['button--alt']}>Закрыть</button></div> 

    return(
        <Modal hide={props.hide}>
            {!isDataSubmited && !wasDataSendingSucc && cartModalContent}
            {isDataSubmited && !wasDataSendingSucc && DataSubmitingModalContent}
            {wasDataSendingSucc && DataSubmitedModalContent}
        </Modal>
    )
}

export default Cart;