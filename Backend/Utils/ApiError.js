class ApiError extends Error {
    constructor (statusCode, message="Something went wrong PLease, Try Again") {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
};

export { ApiError };