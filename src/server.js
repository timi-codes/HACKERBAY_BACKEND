import express from 'express';
import config from 'dotenv';
import cors from 'cors';
import { json } from 'body-parser';
import debug from 'debug';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import Routes from './routes';

config.config();
const app = express();
const port = process.PORT || 8000

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(json());
app.use(cors());
app.use(Routes);

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.send('Application server is running');
});

app.use((error, request, response, next) => {
  if (!error) return next();

  debug('development')(`server error : ${error}`);
  return response.status(500).send('Something broke!');
});

app.listen(port, () => {
    debug('development')(`Server is running on port ${port}`);
});

module.exports = app;

