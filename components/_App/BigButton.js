const BigButton = ({ text, link, onClick }) => {
    return (<>
    {link ? <button onClick={onClick}>{text}</button>
: <a href={link}><button>{text}</button></a> }

    <style jsx>{`
        button {
            border-radius: 500px;
            border: none;
            padding: 14px 30px;
            background-color: navy;
            font-size: 1.4rem;
            color: white;
        }
    `}</style>
    </>)
}

export default BigButton;