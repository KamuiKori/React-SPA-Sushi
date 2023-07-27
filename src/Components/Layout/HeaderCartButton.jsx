import CartIcon from "../Cart/CartIcon"
import styles from "./HeaderCartButton.module.css"
import { useContext, useEffect, useState } from "react"
import cartContext from "../../store/cart-context"

const HeaderCartButton = (props) =>{

    const [buttonIsAnim,setButtonAnim] = useState(false);

    const ctx = useContext(cartContext)

    const cartItemsNumber = ctx.items.reduce((currentValue, item)=>{
        return currentValue + item.amount
    },0)

    const buttonClasses = `${styles.button} ${buttonIsAnim ? styles.bump:""}`

    useEffect(()=>{
        if(ctx.items.length === 0){
            return;
        }
        setButtonAnim(true);

        const timer = setTimeout(()=>{setButtonAnim(false)},300)

        return ()=>{
            clearTimeout(timer);
        }
    },[ctx.items])

    return(
        <button className={buttonClasses} onClick={props.show}>
            <span className={styles.icon}><CartIcon/></span>
            <span>Корзина</span>
            <span className={styles.badge}>{cartItemsNumber}</span>
        </button>
    )
}

export default HeaderCartButton