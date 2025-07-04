import styles from "@/styles/MenuPage.module.css"
const Menu = ({data}) => {
  return (
    <>

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