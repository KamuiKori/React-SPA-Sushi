import Card from '../Layout/Card';
import styles from './MealList.module.css'
import ListItem from './ListItem';
import { useEffect,useState } from 'react';

  
const MealList = (props) =>{

  const [meals,setMeals] = useState([])
  const [isLoading,setIsLoading] = useState(false);
  const [httpErrorMessage,setHttpErrorMessage] = useState();

    useEffect(()=>{
      setIsLoading(true);
      const fetchMeals = async() =>{
        const response = await fetch("https://react-train-http-default-rtdb.firebaseio.com/meals.json");
        if(!response.ok){
          throw new Error("Получение данных не получилось")
        }
        const responseData = await response.json();
        const loadedMeals = [];

        for(const key in responseData){
          loadedMeals.push({
            id:key,
            name:responseData[key].name,
            description:responseData[key].description,
            price:Number(responseData[key].price)
          })
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      }
      try{
        fetchMeals().catch((err)=>{setIsLoading(false);setHttpErrorMessage(err.message)});
      }
      catch(err){
        setIsLoading(false);
        setHttpErrorMessage(err.message);
      }
    },[]);

    if(isLoading){
      return <section className={styles.loading}><p>Загрузка данных...</p></section>
    }
    if(httpErrorMessage){
      return <section className={styles.loading}><p>{httpErrorMessage}</p></section>
    }


    const mealList = meals.map(meal =><ListItem name={meal.name} key={meal.id} id={meal.id} description={meal.description} price={meal.price}></ListItem>)


    return(
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    )
}

export default MealList