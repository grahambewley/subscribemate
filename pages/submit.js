import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Container from '../components/_App/Container';

const INIT_SOURCE = {
    name: '',
    type: '',
    website: '',
    authorName: ''
}

const Submit = () => {

    const [source, setSource] = React.useState(INIT_SOURCE);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

    React.useEffect(() => {
        if(showSuccessMessage) {
            window.setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
        }
    }, [showSuccessMessage])

    function handleSourceUpdate(e) {

        const updateSource = source;
        updateSource[`${e.target.name}`] = e.target.value;

        console.log("New source object is, ", updateSource);
        setSource(updateSource);
    }

    async function handleSourceSubmit(e) {
        e.preventDefault();
        if( source.name !== '' && source.type !== '' && source.website !== '' && source.authorName !== '') {

            const url = `${baseUrl}/api/source`;
            const payload = { source };
            const response = await axios.post(url, payload);

            if(response.status == 201) {
                document.getElementById("submissionForm").reset();
                setShowSuccessMessage(true);
            }

        } else {
            alert("Please fill out the required form fields");
        }
    }

    return (<>
        <Container>
             <div className='FormContainer'>
                <h1>Submit a Source</h1>
                <p>We're working on filling out our database of sources so we can help more users discover great newsletters, podcasts, and blogs. If you have a favorite source that isn't yet listed in our database, please let us know about them below. New sources are added daily!</p>

                <form id='submissionForm' onSubmit={handleSourceSubmit}>
                    <div className='FormInput'>
                        <label htmlFor='type'>Source Type:</label>
                        <select
                            name='type'
                            id='type'
                            required
                            onChange={handleSourceUpdate}>
                            <option value="" disabled selected>Select One</option>
                            <option value='newsletter'>Newsletter</option>
                            <option value='podcast'>Podcast</option>
                            <option value='blog'>Blog</option>
                        </select>
                    </div>
                    <div className='FormInput'>
                        <label htmlFor='name'>Source Name:</label>
                        <input
                            name='name'
                            id='name'
                            onChange={handleSourceUpdate}/>
                    </div>
                    <div className='FormInput'>
                        <label htmlFor='website'>Website:</label>
                        <input
                            name='website'
                            id='website'
                            onChange={handleSourceUpdate}/>
                    </div>
                    <div className='FormInput'>
                        <label htmlFor='authorName'>Author Name:</label>
                        <input
                            name='authorName'
                            id='authorName'
                            onChange={handleSourceUpdate}/>
                    </div>
                    <button className='SubmitButton' type='submit'>Submit</button>
                </form>
                { showSuccessMessage ? 
                <div className='SuccessMessage'>
                    <p>Thank you, your submission was successful. We'll add it to our database shortly.</p>
                </div>
                : null }
             </div>
        </Container>
        <style jsx>{`
        .FormContainer {
            max-width: 768px;
            margin: 6rem auto 0 auto;
            padding: 3rem;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 1px 1px rgba(0,0,0,.03),
                        0 2px 2px rgba(0,0,0,.03),
                        0 4px 4px rgba(0,0,0,.03);
        }

        #submissionForm {
            margin-top: 2rem;
        }
        .FormInput {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .FormInput label {
            margin-left: 5px;
            margin-bottom: 5px;
        }
        .FormInput input,
        .FormInput select {
            font-size: 1.2rem;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #f8f8f8;
        }
        .FormInput input {
            width: 100%;
        }
        .FormInput input:focus,
        .FormInput select:focus {
            outline: none;
        }
        .FormInput:not(:last-child) {
            margin-bottom: 2rem;
        }

        .SubmitButton {
            padding: 8px 16px;
            border-radius: 200px;
            background-color: rgba(60,174,163);
            font-size: 1.2rem;
            text-transform: uppercase;
            font-weight: 100;
            color: white;
            letter-spacing: 1px;
            transition: all .15s;
        }
        .SubmitButton:hover {
            transform: translateY(-3px);
            box-shadow: 0 3px 6px rgba(0,0,0,.08);
            background-color: rgba(60,174,163, .9);
        }
        .SuccessMessage {
            padding: 1rem;
            border-radius: 10px;
            margin-top: 2rem;
            width: 100%;
            background-color: rgba(60,174,163, .2);
            color: rgb(60,174,163);
        }

        @media(max-width: 767px) {
            .FormContainer {
                margin: 1rem auto 0 auto;
                padding: 2rem;
            }
        }
        `}</style>
    </>);
}

export default Submit;