const Form = ({ header, instruction, onSubmit, children, error }) => {
    return (<>
        <div className='FormContainer'>
            <div className='FormHeaderContainer'>
                <h1 className='FormHeader'>{ header }</h1>
            </div>
            { error ? 
            <div className='FormErrorContainer'>
                { error }
            </div>
            : null }
            <div className='FormBodyContainer'>
                <p className='FormInstruction'>{ instruction }</p>
                <form onSubmit={ onSubmit }>
                    { children }
                </form>
            </div>
        </div>
        <style jsx>{`
        .FormContainer {
            max-width: 640px;
            margin: 4rem auto 0 auto;
            background-color: white;
            overflow: hidden;
            border-radius: 10px;
            box-shadow: 0 1px 1px rgba(0,0,0,.04),
                        0 2px 2px rgba(0,0,0,.04),
                        0 4px 4px rgba(0,0,0,.04),
                        0 8px 8px rgba(0,0,0,.04);
        }
        .FormHeaderContainer {
            background-color: #3DAEA3;
            color: white;
            padding: 2rem 3rem;
            border: 1px solid rgba(60,174,163,.1); 
        }
        .FormHeader {
            
        }
        .FormErrorContainer {
            padding: 1rem 3rem;
            background-color: rgba(204, 41, 54, .2);
            border-bottom: 1px solid rgba(204, 41, 54, .2);
            color: rgba(0,0,0,.9);
        }
        .FormBodyContainer {
            padding: 2rem 3rem;
        }
        .FormInstruction {
            margin-bottom: 1rem;
        }
        `}</style>
    </>);
}

export default Form;

export const FormInput = ({ id, name, value, type, placeholder, label, onChange, warningText }) => {

    function handleInputFocus(e) {
        // When an input is focused, add the LabelPopped class to pop the label up
        const inputParent = e.target.parentElement;
        inputParent.classList.add('LabelPopped');    
    }
    function handleInputBlur(e) {
        // When an input is un-focused, IF the value of the input is empty, remove the LabelPopped class
        // ...otherwise do nothing, leaving the label popped
        const inputParent = e.target.parentElement;
        if(!e.target.value) {
            inputParent.classList.remove('LabelPopped');
        }
    }

    return (<>
        <div className='FormInput'>
            { warningText ? 
            <span className='FormInputWarningText'>{ warningText }</span>
            : null }
            <input 
                id={ id } 
                name={ name } 
                value={ value }
                type={ type } 
                placeholder={ placeholder }
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                onChange={ onChange } />
            <label htmlFor={ id }>{ label }</label>
        </div>

        <style jsx>{`
        .FormInput {
            display: flex;
            flex-direction: column-reverse;
            margin-bottom: .5rem;
        }
        .FormInput input {
            border: 1px solid #ddd;
            background-color: #fbfbfb;
            border-radius: 5px;
            padding: .75rem;
            z-index: 2;
        }
        .FormInput input:focus {
            outline: none;
            border: 1px solid rgba(60,174,163,.3);
        }
        .FormInput input::placeholder {
            transition: all .2s;
        }
        .FormInput input:focus::placeholder {
            opacity: 0;
        }
        .FormInput label {
            margin: 0 0 5px .75rem;
            transform: translateY(100%);
            opacity: 0;
            transition: all .25s;
        }
        .FormInput.LabelPopped label {
            transform: translateY(0);
            opacity: .7;
        }
        .FormInputWarningText {
            margin: 3px 0 0 .75rem;
            color: rgba(255,0,0,.5);
            font-size: .9rem;
        }
        `}</style>
    </>)
}

export const FormSelect = ({ children, id, name, value, options, label, onChange, warningText  }) => {

    const optionElements = options.map(option => {
        return (
            <option
                disabled={option.disabled}
                selected={option.selected}
                value={option.value}>{ option.text }</option>

        )
    })

    return (<>
        <div className='FormInput'>
            { warningText ? 
            <span className='FormInputWarningText'>{ warningText }</span>
            : null }
            <select 
                id={ id } 
                name={ name } 
                value={ value }
                onFocus={handleInputFocus} 
                onBlur={handleInputBlur}
                onChange={ onChange } >
                
                { optionElements }
            </select>
            <label htmlFor={ id }>{ label }</label>
        </div>

        <style jsx>{`
        .FormInput {
            display: flex;
            flex-direction: column-reverse;
            margin-bottom: .5rem;
        }
        .FormInput input {
            border: 1px solid #ddd;
            background-color: #fbfbfb;
            border-radius: 5px;
            padding: .75rem;
            z-index: 2;
        }
        
        .FormInput label {
            margin: 0 0 5px .75rem;
            transform: translateY(100%);
            opacity: 0;
            transition: all .25s;
        }
        .FormInput.LabelPopped label {
            transform: translateY(0);
            opacity: .7;
        }
        .FormInputWarningText {
            margin: 3px 0 0 .75rem;
            color: rgba(255,0,0,.5);
            font-size: .9rem;
        }
        `}</style>
    </>)
}

export const FormSubmit = ({ children, disabled }) => {
    return (<>
        <button type='submit' className='FormSubmit' disabled={disabled}>{ children }</button>
        <style jsx>{`
        .FormSubmit {
            margin-top: 1rem;
            border-radius: 5px;
            border: 1px solid rgba(60,174,163,.1);
            padding: .75rem 1.5rem;
            background-color: rgba(60,174,163);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 1.2rem;
            color: white;
            transition: all .2s;
        }
        .FormSubmit:focus {
            outline: none;
        }
        .FormSubmit:disabled {
            background-color: rgba(60,174,163, .4);
        }
        .FormSubmit:hover:not([disabled]) {
            background-color: rgba(60,174,163,.75);
            transform: translateY(-3px);
            box-shadow: 0 2px 6px rgba(0,0,0,.2);
        }

        `}</style>
    </>)
}

export const FormButton = ({ children, disabled, onClick }) => {
    return (<>
        <button 
            className='FormButton' 
            disabled={disabled}
            onClick={onClick}
            >{ children }</button>
        <style jsx>{`
        .FormButton {
            border-radius: 5px;
            border: 1px solid rgba(60,174,163,.1);
            padding: .75rem 1.5rem;
            background-color: rgba(60,174,163);
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 1.2rem;
            color: white;
            transition: all .2s;
        }
        .FormButton:focus {
            outline: none;
        }
        .FormButton:disabled {
            background-color: rgba(60,174,163, .4);
        }
        .FormButton:hover:not([disabled]) {
            background-color: rgba(60,174,163,.75);
            transform: translateY(-3px);
            box-shadow: 0 2px 6px rgba(0,0,0,.2);
        }

        `}</style>
    </>)
}

export const FormBottomCta = ({ children }) => {
    return (<>
        <div className='FormBottomCtaContainer'>
            { children }
        </div>
        <style jsx>{`
        .FormBottomCtaContainer {
            background-color: rgba(60,174,163,.1);
            padding: 1rem 3rem;
            margin: 2rem -3rem -2rem -3rem;
            border-top: 1px solid rgba(60,174,163,.15);
            text-align: center;
        }
        .FormBottomCtaContainer > a {
            color: red;
            font-weight: bold;
        }
        `}</style>
    </>);
}