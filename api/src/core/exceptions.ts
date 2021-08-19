interface BaseErrorProps {
    message?: string;
}

export class BaseError extends Error {
    constructor({ message } : BaseErrorProps = {}) {
        super(message);
    }
}

export class ObjectDoesNotExist extends BaseError {
    message = 'This object does not exists.'
}