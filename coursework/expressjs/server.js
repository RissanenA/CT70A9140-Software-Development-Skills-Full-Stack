import express from 'express';
import path from 'path';
import posts from './routes/posts.js';
import logger from './middleware/logger.js';
import error from './middleware/error.js';
import not_found from './middleware/not_found.js';
import { loadEnvFile } from 'process';

loadEnvFile('./.env');

const app = express();
const PORT = process.env.PORT || 8000;
const src = path.join(import.meta.dirname, 'public/')

app.use(expressValidator());

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

// public as static directory
app.use(express.static(src));

app.use('/api/posts', posts);

app.use(not_found);
app.use(error);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
