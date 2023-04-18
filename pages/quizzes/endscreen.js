export function Endscreen (props) {
    return (<>
        <h3>Quiz Over!</h3>
        <h3><br/>Your final score was: {props.score}!</h3>
        <button type='submit' className={'answerSubmit'} onClick={() => {props.startGame()}}>Start Quiz Again</button>
    </>)
}
