import Router, { useRouter } from "next/router";
import Link from "next/link";

const SubmitMissing = () => {

    const router = useRouter();
    function isActive(route) {
        return route === router.pathname;
    }

    return (<>
        <div className='SubmitContainer' style={isActive('/submit') ? {display: 'none'} : null}>
            <p>Are We Missing a Source?</p>
            <Link href='/submit'><button>Submit It</button></Link>
        </div>

        <style jsx>{`
        .SubmitContainer {
            position: fixed;
            bottom: 15px;
            right: 15px;
            display: flex;
            align-items: center;
            z-index: 100;
            padding: 6px 6px 6px 12px;
            background-color: #77c6c5;
            border-radius: 200px;
        }

        .SubmitContainer p {
            margin: 0 1rem 0 0;
            line-height: 1;
            color: white;
        }
        .SubmitContainer button {
            border: none;
            margin: 0;
            background-color: #3DAEAC;
            border-radius: 200px;
            color: white;
            padding: 5px 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: .9rem;
        }

        @media(max-width: 767px) {
            .SubmitContainer {
                display: none;
            }
        }
        `}</style>
        </>
    );      
}

export default SubmitMissing;