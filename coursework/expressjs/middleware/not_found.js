
const not_found = (req, res, next) => {
    const e = new Error('Not found');
    e.status = 404;
    next(e);
};

export default not_found;
