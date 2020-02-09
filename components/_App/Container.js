const Container = ({ children }) => {
    return(<>
        <div className='Container'>
            { children }
        </div>
    
        <style jsx>{`
        .Container {
            width: 1127px;
            margin: 0 auto;
        }
        @media(max-width: 1200px) {
            .Container {
                width: 933px;
            }
        }
        @media(max-width: 991px) {
            .Container {
                width: 723px;
            }
        }
        @media(max-width: 767px) {
            .Container {
                width: 100%;
                margin: 0 1em; 
            }
        }
        `}</style>
    </>)
}

export default Container;