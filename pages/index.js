import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const quiz_array = [["eurocap", "eurocap.json", "eurocap.png"]];
    return (<div>
        <Head>
            <title>Quiz homepage</title>
        </Head>
        <header className={styles.header}>
            <h1 className={styles.h1}>General Knowledge Quiz</h1>
            <h2>Select your quiz option from below:</h2>
        </header>
        <section className={styles.section}>
            <ul className={styles.list}>
            {quiz_array.map((quiz) => {
                return <li className={styles.listItem} key={quiz[2]}>{quiz[0]}</li>
            })}
            </ul>
        </section>
    </div>);
}
