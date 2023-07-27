import React from "react"
import sushiImage from '../../Assets/115 - sushi.jpg'
import styles from './Header.module.css'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
    return(
        <React.Fragment>
            <header className={styles.header}>
                <h1>Суси муси</h1>
                <HeaderCartButton show={props.show}/>
            </header>
            <div className={styles['main-image']}>
                <img src={sushiImage} alt="main-pic" />
            </div>
        </React.Fragment>
    )
}
export default Header