import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';

const port = process.env.PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(
    async (req, res) => {
        try {
            if (req.method === 'GET') {
                let file_path;
                let status = 200;

                if (req.url === '/') {
                    file_path = path.join(__dirname, 'public', 'index.html');
                }
                else if (req.url === '/about') {
                    file_path = path.join(__dirname, 'public', 'about.html');
                }
                else {
                    file_path = path.join(__dirname, 'public', '404.html');
                    status = 404;
                }

                const data = await fs.readFile(file_path);
                res.writeHead(status, 'Page Not Found', { 'Content-Type': 'text/html' });
                res.end(data);
            }
            else
                throw new Error('Method not allowed, only GET requests');

        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        }
    }
);

server.listen(port, () => { console.log(`Server running on port ${port}`); });