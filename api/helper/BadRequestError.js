class RequestError extends Error{

    constructor(message) {
		super();
        this.message = message;
        this.statusCode = 400;
    }
    handleErrorMessage = (req, res) => {
        res.status(this.statusCode).json({
            message: this.message
        });
    };

};

module.exports = RequestError;