import colors from 'colors';

// logging middleware
const logger = (req, res, next) => {
    const method_colors = {
        GET: 'green',
        POST: 'blue',
        PUT: 'yellow',
        DELETE: 'red',
    };
    const color = method_colors[req.method] || 'white';

    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]);
    next();
};

export default logger;
