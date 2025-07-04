import Banner from "@/components/modules/Banner"
import styles from "../styles/HomePage.module.css"
import Attributes from "@/components/modules/Attributes"
import Definition from "@/components/modules/Definition"
import Companies from "@/components/modules/Companies"
import Instruction from "@/components/modules/Instruction"
import Guide from "@/components/modules/Guide"
import Restrictions from "@/components/modules/Restrictions"
const HomePage = () => {
  return (
    <div className={styles.container}>
        <Banner></Banner>
        <Attributes></Attributes>
        <Definition></Definition>
        <Companies></Companies>
        <Instruction></Instruction>
        <Guide></Guide>
        <Restrictions></Restrictions>
    </div>
  )
}

export default HomePage