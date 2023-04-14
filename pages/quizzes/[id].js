import {useRouter} from 'next/router';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { Question } from './question';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from "react-dom";

export default function Quiz ( { quiz }) {

    const router = useRouter();
    const { id } = router.query;
    
    const [timer, setTimer] = useState(60);
    const [started, setStarted] = useState(false);
    const [question, setQuestion] = useState('');
    const [score, setScore] = useState(0);

    function startGame () {
        setStarted(true);
        const button = document.getElementById('begin-btn');
        button.parentElement.removeChild(button);
        document.getElementById('playerScore').style.visibility = 'visible';
        newQuestion();
    }

    function newQuestion (params) {
        const key = generateQuestion();

        const area = document.getElementById('answer-area');
        unmountComponentAtNode(area);
        ReactDOM.render(<Question submitAnswer={submitAnswer} answer={key}/>, area);
        document.getElementById('answer-input').focus();
        if (params) {
            area.appendChild(params);
        }
    }

    function submitAnswer (params) {
        console.log(score)
        const guess = document.getElementById('answer-input').value;
        if (guess.toLowerCase() === params.toLowerCase()) {
            document.getElementsByTagName('body')[0].style.backgroundColor = 'green';
            newQuestion();
            console.log(score);
            setScore(12);
            console.log(score);
        } else {
            document.getElementsByTagName('body')[0].style.backgroundColor = 'red';
            const wrongText = document.createElement('h3');
            wrongText.innerHTML = `Incorrect - The correct answer was ${params}!`
            newQuestion(wrongText);
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
            const area = document.getElementById('answer-area');
            unmountComponentAtNode(area);
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
        <body className={'answerBody'}>
            <h1>Geography Quiz</h1>
            <h2 className={'answerTitle'}>{timer}</h2>
            <div id='begin-screen'>
                <button onClick={startGame} id='begin-btn'>Begin Game</button>
            </div>
            <h3>{question}</h3>
            <div id='answer-area'></div>
            <h3 id='playerScore'>Score: {score}</h3>
        </body>
    </>);
}

export async function getServerSideProps( {params} ) {

    const req = await fetch (`http://localhost:3000/${params.id}.json`);

    const data = await req.json();

    return {
        props: { quiz: data },
    }
}

