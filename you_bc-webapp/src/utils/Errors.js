export const ExceedMaxItemsError = function (message) {
    this.name = 'ExceedMaxItemsError';
    this.message = message || '';
    this.stack = (new Error()).stack;
};

ExceedMaxItemsError.prototype = new Error();
ExceedMaxItemsError.prototype.constructor = ExceedMaxItemsError;