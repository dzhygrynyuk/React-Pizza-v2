import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const categories = ['Meat', 'Vegetarian', 'Grill', 'Spicy', 'Cheese'];
const availableTypes = ['thin', 'traditional'];

const SinglePizza: React.FC = () => {
    const [pizzaData, setPizzaData] = React.useState<{
        imageUrl: string,
        name: string,
        category: number,
        price: number,
        sizes: number[],
        types: number[],
    }>();
    let { id } = useParams();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`http://localhost:3001/pizzas/${id}`);
                setPizzaData(data);
            } catch (error) {
                alert('Error requesting data!');
                console.error(error);
            }
        }

        fetchPizza();
    }, []);

    if( !pizzaData ){
        return(
            <div className="container">
                <span>Loading...</span>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="single-pizza">
                <div className="single-pizza__img">
                    <img src={pizzaData.imageUrl} alt="Pizza image" />
                </div>
                <div className="single-pizza__info">
                    <h2>{pizzaData.name}</h2>
                    <div className="single-pizza__info-item">Category: {categories[pizzaData.category]}</div>
                    <div className="single-pizza__info-item">Price: ${pizzaData.price}</div>
                    <div className="single-pizza__info-item">Sizes: {pizzaData.sizes.map(item => `${item} cm, `)}</div>
                    <div className="single-pizza__info-item">Types: {pizzaData.types.map(item => `${availableTypes[item]}, `)}</div>
                </div>
            </div>
        </div>
    );
}

export default SinglePizza;