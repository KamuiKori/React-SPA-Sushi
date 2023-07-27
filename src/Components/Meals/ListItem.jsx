import React from "react"
import styles from './ListItem.module.css'
import MealItemForm from './MealItemForm'
import { useContext } from "react"
import CartContext from "../../store/cart-context"

const ListItem = (props) =>{
    const ctx = useContext(CartContext);
    const formatedPrice = `$${props.price.toFixed(2)}`

    const addToCartHandler = (amount)=>{
        ctx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        });
    }

    return(
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
            </div>
            <div className={styles.description}>
                {props.description}
            </div>
            <div className={styles.price}>
                {formatedPrice}
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}
export default ListItem