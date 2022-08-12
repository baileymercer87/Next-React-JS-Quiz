export function Question (props) {
    return (<>
        <input type='text' id='answer-input'></input>
        <button type='submit' onClick={() => {props.submitAnswer(props.answer)}}>Submit</button>
    </>)
}
