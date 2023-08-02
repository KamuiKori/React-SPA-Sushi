import styles from './SubmitOrder.module.css'
import { useRef,useState } from 'react';

const isInputValid = (inputValue) =>inputValue.trim() != "";

const SubmitOrder = (props)=>{

    const nameInputRef = useRef();
    const cityInputRef = useRef();
    const addressInputRef = useRef();

    const[formValidity,setFormValidity] = useState({
        nameValid:true,
        cityValid:true,
        addressValid:true
    });

    const confirmOrderHandler = (event) =>{
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;

        const isEnteredNameValid = isInputValid(enteredName)
        const isEnteredCityValid = isInputValid(enteredCity)
        const isEnteredAddressValid = isInputValid(enteredAddress)

        setFormValidity({
            nameValid:isEnteredNameValid,
            cityValid:isEnteredCityValid,
            addressValid:isEnteredAddressValid
        });

        const isFormValid = isEnteredNameValid && isEnteredCityValid && isEnteredAddressValid

        if(!isFormValid){
            return;
        }
        else{
            props.onSubmit({userName:enteredName,userCity:enteredCity,userAddress:enteredAddress});
        }
    };

    const nameStyles = `${styles.control} ${formValidity.nameValid?"":styles.invalid}`
    const cityStyles = `${styles.control} ${formValidity.cityValid?"":styles.invalid}`
    const addressStyles = `${styles.control} ${formValidity.addressValid?"":styles.invalid}`


    return(
        <form className={styles.form} onSubmit={confirmOrderHandler}>
            <div className={nameStyles}>
                <label htmlFor="name">Введите имя</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formValidity.nameValid && <p>Введите имя</p>}
            </div>
            <div className={cityStyles}>
                <label htmlFor="city">Введите город</label>
                <input type="text" id="city" ref={cityInputRef}/>
                {!formValidity.cityValid && <p>Введите город</p>}
            </div>
            <div className={addressStyles}>
                <label htmlFor="address">Введите адрес</label>
                <input type="text" id="address" ref={addressInputRef}/>
                {!formValidity.addressValid && <p>Введите адрес</p>}
            </div>
            <div className={styles.actions}>
                <button className={styles.submit}>Подтвердить заказ</button>
                <button type='button' onClick={props.hide}>Отменить заказ</button>
            </div>
        </form>
    )
}
export default SubmitOrder