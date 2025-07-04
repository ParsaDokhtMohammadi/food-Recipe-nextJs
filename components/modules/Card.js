import styles from "./Card.module.css"
import Location from "../icons/Location"
import Dollar from "../icons/Dollar"
import Link from "next/link"
const Card = (props) => {
    const {id , name , price , details , discount} = props
    return (
    <div className={styles.container}>
        <img src={`/images/${id}.jpeg`} alt={name}></img>
        <div className={styles.details}>
            <h4>{name}</h4>
            <div>
                <Location></Location>
                {details[0].Cuisine}
            </div>
        </div>
        <div className={styles.price}>
            <Dollar></Dollar>
            {discount ?(<span className={styles.discount}>
                {(price*(100-discount))/100}
            </span>): (<span>{price}</span>)}
            {discount ? <div className={styles.badge}>{discount}%</div>:null}
        </div>
        <Link href={`/menu/${id}`}>see details</Link>
    </div>
  )
}

export default Card