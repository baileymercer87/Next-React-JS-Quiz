import {useRouter} from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Question } from './question';
import ReactDOM from 'react-dom';

export default function Quiz ( { quiz }) {

    const router = useRouter();
    const { id } = router.query;
    
    const [timer, setTimer] = useState(60);
    const [started, setStarted] = useState(false);
    const [question, setQuestion] = useState('');
    //const [key, setKey] = useState('');

    function startGame () {
        setStarted(true);
        const button = document.getElementById('begin-btn');
        button.parentElement.removeChild(button);

        const key = generateQuestion();

        const area = document.getElementById('answer-area');
        area.innerHTML = '';
        ReactDOM.render(<Question submitAnswer={submitAnswer} answer={key}/>, area);
    }

    function submitAnswer (params) {
        const guess = document.getElementById('answer-input').value;
        if (guess === params) {
            document.getElementsByTagName('body')[0].style.backgroundColor = 'green';
        } else {
            document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
        }
    }

    function generateQuestion () { 
        var keys = Object.keys(quiz);
        var rand =  keys.length * Math.random() << 0;
        const capital = quiz[keys[rand]];
        const country = keys[rand];
        setQuestion('What is the capital of ' + country + '?');
        return capital;
    }

    useEffect(() => {
        if (timer === 0 || started === false) {
          return;
        }
        setTimeout(() => {
          setTimer(timer - 1);
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

