const SimpleButton = ({ text, action, status }) => {
    
    function getColorFromStatus(status) {
        switch(status) {
            case 'affirmative':
                return 'rgba(60,174,163, .2)';
            case 'negative': 
                return '#fec1c6';
            default: 
                return '#f0f0f0';
        }
    }
    
    return (
        <>
            <button 
                style={{backgroundColor: getColorFromStatus(status)}}
                onClick={action}
            >{ text }</button>
            
            <style jsx>{`
            button {
                font-size: 1.2rem;
                color: rgba(0,0,0,.8);
                text-transform: uppercase;
                letter-spacing: 1px;
                border-radius: 5px;
                border: none;
                padding: 12px 20px;
                box-shadow: 0 1px 2px rgba(0,0,0,.2);
            }
            button:not(:last-child) {
                margin-right: 1rem;
            }
            `}</style>
        </>

    )
}

export default SimpleButton;