export function Question (props) {
    return (<>
        <input type='text' id='answer-input' onKeyUp={(e) => {
            if (e.code === 'Enter') {
                props.submitAnswer(props.answer);
            }
            }}></input>
        <button type='submit' className={'answerSubmit'} onClick={() => {props.submitAnswer(props.answer)}}>Submit</button>
    </>)
}
