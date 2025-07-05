import styles from "@/styles/CategoriesPage.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Card from "@/components/modules/Card"
const Categories = ({ data }) => {

    const router = useRouter()
    const [query, setQuery] = useState({ difficulty: "", time: "" })

    const changeHandler = (e) => {
        setQuery({ ...query, [e.target.name]: e.target.value })
    }

    const searchHandler = () => {
        router.push({ pathname: "/categories", query }) 
    }
    useEffect(()=>{
        const {difficulty,time} = router.query
        if (query.difficulty!==difficulty || query.time!==time){
            setQuery({difficulty,time})
        }
    },[])

    return (
        <div className={styles.container}>
            <h2>Categories</h2>
            <div className={styles.subContainer}>
                <div className={styles.select}>
                    <select value={query.difficulty} name="difficulty" onChange={changeHandler}>
                        <option value={""}>Difficulty</option>
                        <option value={"Easy"}>Easy</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"Hard"}>Hard</option>
                    </select>
                    <select value={query.time} name="time" onChange={changeHandler}>
                        <option value={""}>Cooking Time</option>
                        <option value={"More"}>More Than 30 Min</option>
                        <option value={"Less"}>Less Than 30 Min</option>
                    </select>
                    <button onClick={searchHandler}>Search</button>
                </div>
                <div className={styles.cards}>
                    {!data.length ? <img src="/images/search.png" alt="search"></img> : data.map(food=>(<Card {...food}></Card>))}
                    
                </div>
            </div>
        </div>
    )
}

export default Categories

export async function getServerSideProps(context) {
    const { query: { difficulty, time } } = context
    const res = await fetch("http://localhost:4000/data")
    const data = await res.json()

    const filteredData = data.filter(item => {
        const DifficultyResult = difficulty
            ? item.details.filter(detail =>
                detail.Difficulty && detail.Difficulty === difficulty
            )
            : item.details

        const TimeResult = time
            ? item.details.filter(detail => {
                const cookingTime = detail["Cooking Time"] || ""
                const [TimeDetail] = cookingTime.split(" ")
                const num = parseInt(TimeDetail)
                if (isNaN(num)) return false
                if (time.toLowerCase() === "less" && num <= 30) {
                    return true
                } else if (time.toLowerCase() === "more" && num > 30) {
                    return true
                }
                return false
            })
            : item.details

        return DifficultyResult.length && TimeResult.length
    })

    return {
        props: { data: filteredData }
    }
}
