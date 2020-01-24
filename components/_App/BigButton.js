const BigButton = ({ text, link, onClick }) => {
    return (<>
    {link ? <button onClick={onClick}>{text}</button>
        : <a href={link}><button>{text}</button></a> }

    <style jsx>{`
        button {
            border-radius: 7px;
            border: none;
            padding: 14px 30px;
            background-color: #00B5AD;
            font-size: 1.4rem;
            color: white;
        }
    `}</style>
    </>)
}

export default BigButton;