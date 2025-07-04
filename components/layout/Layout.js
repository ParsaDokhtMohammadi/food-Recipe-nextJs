import Link from "next/link"
import styles from "./Layout.module.css"
const Layout = ({children}) => {
  return (
    <>
    <header className={styles.header}>
        <div className={styles.left}>
            <Link href='/'>MyFood</Link>
        </div>
        <div className={styles.right}>
            <Link href="/menu">Menu</Link>
            <Link href="/categories">Categories</Link>
        </div>
    </header>
    <div className={styles.container}>{children}</div>
    <footer className={styles.footer}>
        <a href="https://github.com/ParsaDokhtMohammadi/" target="_blank" rel="norefferer">Parsa dokht mohammadi  </a>
        nextJs | foodRecipe project &copy;
    </footer>
    </>
  )
}

export default Layout