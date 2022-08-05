import {useRouter} from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';


export default function Quiz ( { quiz }) {
    const router = useRouter();
    const { id } = router.query;

    const [timer, setTimer] = useState(60);
    const [started, setStarted] = useState(false);


    function giveQuestion () {
        setStarted(true);
        console.log('function');
    }

    useEffect(() => {
        if (timer === 0 || started === false) {
            console.log('if state');
          return;
        }
        setTimeout(() => {
          setTimer(timer - 1);
          console.log('timer');
        }, 1000);
      }, [timer, started]);

    return (<>
        <Head>
            <title></title>
        </Head>
        <h1>HELLO</h1>
        <h2>{timer}</h2>
        <button onClick={giveQuestion}>Begin Quiz</button>
    </>);
}

export async function getServerSideProps( {params} ) {

    const req = await fetch (`http://localhost:3000/${params.id}.json`);

    const data = await req.json();

    return {
        props: { quiz: data },
    }
}

