import styles from './page.module.css'
import UserComp from '@/container/user/userComp'

export default function Home() {
  return (
    <main className={styles.main}>
       <UserComp />
    </main>
  )
}