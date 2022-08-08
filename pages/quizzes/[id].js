import {useRouter} from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';


export default function Quiz ( { quiz }) {
    const router = useRouter();
    const { id } = router.query;
    
    const [timer, setTimer] = useState(60);
    const [started, setStarted] = useState(false);
    const [question, setQuestion] = useState('');

    function startGame () {
        setStarted(true);
        const button = document.getElementById('begin-btn');
        button.parentElement.removeChild(button);
        generateQuestion();
        const area = document.getElementById('answer-area');
        area.innerHTML = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'answer-input';
        area.appendChild(input);
        const submit = document.createElement('button');
        button.innerHTML = 'Submit';
        area.appendChild(button);
    }

    function generateQuestion () { 
        var keys = Object.keys(quiz);
        var rand =  keys.length * Math.random() << 0;
        const capital = quiz[keys[rand]];
        const country = keys[rand];
        if(Math.round(Math.random()) === 1) {
            setQuestion('What is the capital of ' + country + '?');
        } else {
            setQuestion(capital + ' is the capital of what country?');
        }
    }

    useEffect(() => {
        if (timer === 0 || started === false) {
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
        <div id='begin-screen'>
            <button onClick={startGame} id='begin-btn'>Begin Game</button>
        </div>
        <h3>{question}</h3>
        <div id='answer-area'></div>
    </>);
}

export async function getServerSideProps( {params} ) {

    const req = await fetch (`http://localhost:3000/${params.id}.json`);

    const data = await req.json();

    return {
        props: { quiz: data },
    }
}

