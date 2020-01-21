const Container = ({ children }) => {
    return (
    <div className='Container'>
        { children }
    
    <style jsx>{`
    
        .Container {
            margin: 0 auto;
            width: 80%;
            max-width: 1127px
        }

    `}</style>
    </div> );
}

export default Container;