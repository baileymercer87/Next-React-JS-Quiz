import {useRouter} from 'next/router';

import Head from 'next/head';

export default function Home ( { quiz }) {
    const router = useRouter();
    const { id } = router.query;

    return (<>
        <Head>
            <title>{quiz.Germany}{quiz.Spain}</title>
        </Head>
        <h1>HELLO {quiz.England}</h1> 
        <p>{quiz.France}</p>
    </>);
}

export async function getServerSideProps( {params} ) {

    const req = await fetch (`http://localhost:3000/${params.id}.json`);

    const data = await req.json();

    return {
        props: { quiz: data },
    }
}