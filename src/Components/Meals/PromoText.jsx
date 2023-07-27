import styles from './PromoText.module.css'
const  PromoText = ()=>{
    return(
        <section className={styles['promo-text']}>
            <h2>Онлайн ресторан японской кухни</h2>
            <p>
                Суси муси - это онлайн суши-бар, в котором вы можете попробовать любимые суши и роллы, а так же другие блюда национальной японской кухни.
            </p>
            <p>
                Свежесть наших продуктов придают нашим блюдам особенный вкус.
            </p>
        </section>
    )
}

export default PromoText