import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Router from "next/router";

export default function Home() {
  const quiz_array = [["European Capital Cities", "eurocap", "euro-background.png"], ["World Capital Cities", "eurocap", "world-background.png"], ["Asian Capital Cities", "asiacap", "asia-background.png"]]; 

  function handleSelection (selection) {
    const { pathname } = Router;
    if (pathname === "/") {
      Router.push("/quizzes/" + selection);
    }
  }
  return (<div>
    <Head>
      <title>Quiz homepage</title>
    </Head>
      <header className={styles.header}>
        <h1 className={styles.h1}>General Knowledge Quiz</h1>
        <h2>Select the quiz you would like to start from the list below!</h2>
      </header>
      <section className={styles.section}>
        <ul className={styles.list}>
          {quiz_array.map((quiz) => {
             return <li className={styles.listItem} onClick={event => handleSelection(quiz[1])}><img className={styles.menuImage} src={quiz[2]} alt='error'></img><p className={styles.listItemText}>{quiz[0]}</p></li>
          })}
        </ul>
     </section>
   </div>);
}
