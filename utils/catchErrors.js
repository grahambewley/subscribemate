function catchErrors(error, displayError) {
    let errorMsg;

    // Determine error message based on what sort of error it is - based on properties on the error

    // If error.response is provided, the request was made via axios 
    // and server responded with a status code that is not in the range of 2XX
    if (error.response) {
        errorMsg = error.response.data;
        console.error("Error response", errorMsg);

        // Cloudinary-specific image upload error has this property
        if(error.response.data.error) {
            errorMsg = error.response.data.error.message;
        }
    } 
    // If error.request is provided, the request was made but no response was received
    else if (error.request) {
        errorMsg = error.request;
        console.error("Error request", errorMsg);
    }
    // Something else happened in making the request that triggered an error
    else {
        errorMsg = error.message;
        console.error("Error message", errorMsg);
    }
    // Function being sent in so that we can spit the error message back out to the component
    displayError(errorMsg);
}

export default catchErrors;