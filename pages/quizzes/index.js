import Head from 'next/head';
export default function QuizList () {
    const quiz_array = [["eurocap", "eurocap.json"]];

    return (<div>
        <Head>
            <title>Quiz homepage</title>
            <link rel="stylesheet" href="/styles/home.css"></link>
        </Head>
        <header>
            <h1>General Knowledge Quiz</h1>
            <h2>Select your quiz option from below:</h2>
        </header>
        <section>
            {quiz_array.map((quiz) => {
                return <p>{quiz[0]}</p>
            })}
            <p>hello</p>
        </section>
    </div>);
}