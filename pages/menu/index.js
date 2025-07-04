import Card from "@/components/modules/Card"
import styles from "@/styles/MenuPage.module.css"
const Menu = ({data}) => {
  return (
    <>
        <div className={styles.container}> 
            <h2>Menu</h2>
            <div className={styles.subContainer}>
                {
                    data.map(food=>(
                        <Card key={food.id} {... food}></Card>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Menu

export async function getStaticProps() {
    const res = await fetch ("http://localhost:4000/data")
    const data = await res.json()
    return {
        props : {data},
        revalidate:10,
    }
}