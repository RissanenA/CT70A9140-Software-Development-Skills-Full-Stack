import { createServer } from 'http';
const PORT = process.env.PORT;

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Jim Doe' },
];

// logger middleware
const logger_middleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// JSON middleware
const json_middleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

// route handler for GET /api/users
const get_users_handler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
};

// route handler for GET /api/users/id
const get_user_by_id_handler = (req, res) => {
    const id = req.url.split('/').at(-1);
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
        res.write(JSON.stringify(user));
    }
    else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: 'User not found' }));
    }
    res.end();
};

// route handler for POST /api/users
const post_users_handler = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const new_user = JSON.parse(body);
        users.push(new_user);
        res.statusCode = 201;
        res.write(JSON.stringify(new_user));
        res.end();
    });
};

// route not found handler
const not_found_handler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'Route not found' }));
    res.end();
};

const server = createServer(
    (req, res) => {
        logger_middleware(req, res, () => {
            json_middleware(req, res, () => {
                if (req.url === '/api/users' && req.method === 'GET') {
                    get_users_handler(req, res);
                }
                else if (req.url === '/api/users' && req.method === 'POST') {
                    post_users_handler(req, res);
                }
                else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
                    get_user_by_id_handler(req, res);
                }
                else {
                    not_found_handler(req, res);
                }
            })
        })
    }
);

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
