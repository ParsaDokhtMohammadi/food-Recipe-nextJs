import { useRouter } from 'next/router';
import styles from "@/styles/DetailsPage.module.css"
import Location from '@/components/icons/Location';
import Dollar from '@/components/icons/Dollar';

const Details = ({ data }) => {
    const router = useRouter()
    if (router.isFallback) {
        return (
            <h2>loading page...</h2>
        )
    }
    const { id, name, price, discount, intoduction, details, ingredients, recipe } = data


    return (
        <div className={styles.container}>
            <h2>details</h2>
            <div className={styles.subContainer}>
                <div className={styles.banner}>
                    <img src={`/images/${id}.jpeg`} alt={name}></img>
                    <div>
                        <h3>{name}</h3>
                        <span className={styles.location}>
                            <Location></Location>
                            {details[0].Cuisine}
                        </span>
                        <span className={styles.price}>
                            <Dollar></Dollar>
                            {discount ? (price * (100 - discount)) / 100 : price}$
                        </span>
                        {discount ? (<span className={styles.discount}>{discount}% OFF</span>) : null}

                    </div>
                </div>
                <div className={styles.intoduction}>
                    <p>{intoduction}</p>
                </div>
                <div className={styles.details}>
                    <h4>Details</h4>
                    <ul>
                        {details.map((detail, index) => (
                            <li key={index}>
                                <p>{Object.keys(detail)[0]}</p>
                                <span>{Object.values(detail)[0]}</span>
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div className={styles.details}>
                        <h4>Ingredients</h4>
                        <ul>
                            {ingredients.map((item , index)=>(
                                <li key={index}>
                                    <p>{item}</p>
                                </li>
                            ))}
                        </ul>
                </div>
                <div className={styles.recipe}>
                    <h4>Recipe</h4>
                    {recipe.map((item , index)=>(
                        <div key={index} className={index % 2 ? styles.odd : styles.even}>
                            <span>{index+1}</span>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
                <button>Add to Cart</button>
            </div>
        </div>
    );
};




export default Details;

export async function getStaticPaths() {
    const response = await fetch(`${process.env.BASE_URL}/data`);
    const json = await response.json();
    const data = json.slice(0, 7);

    const paths = data.map((food) => ({
        params: { id: food.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const response = await fetch(`${process.env.BASE_URL}/data/${params.id}`);
    const data = await response.json();
    if (!data.name) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            data,
        }, 
        revalidate: 60*60,
    };
}
