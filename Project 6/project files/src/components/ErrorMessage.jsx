//shows if the fetch fails or the pokemon isnt found
function ErrorMessage(props) {
    return <p className="error-msg">{props.message}</p>;
}

export default ErrorMessage;
