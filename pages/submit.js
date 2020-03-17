import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import Container from '../components/_App/Container';
import Form, { FormInput, FormSubmit, FormBottomCta } from '../components/_App/Form';
import { FormSelect } from 'semantic-ui-react';

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
            console.log("Source: ", source);
            alert("Please fill out the required form fields");
        }
    }

    return (<>
        <Container>
            <Form 
                id='submissionForm'
                header='Submit a Source'
                instruction="We're working on filling out our database of sources so we can help more users discover great news content. If you have a favorite source that isn't yet listed in our database, please let us know about them below."
                onSubmit={handleSourceSubmit}>
                    
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
                <FormInput
                    id='source-name-input' 
                    name='name' 
                    type='text' 
                    placeholder='Source Name' 
                    onChange={handleSourceUpdate}
                    label='Source Name' />
                <FormInput
                    id='source-website-input' 
                    name='website' 
                    type='text' 
                    placeholder='Source Website' 
                    onChange={handleSourceUpdate}
                    label='Source Website' />
                <FormInput
                    id='source-author-input' 
                    name='authorName' 
                    type='text' 
                    placeholder='Source Author' 
                    onChange={handleSourceUpdate}
                    label='Source Author' />
                
                <FormSubmit>Submit</FormSubmit>
                { showSuccessMessage ?  
                <FormBottomCta>Submission successful, thank you for your contribution!</FormBottomCta>
                : null }
            </Form>
        </Container>
    </>);
}

export default Submit;