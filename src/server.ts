import 'reflect-metadata';
import 'dotenv/config';
import './shared/infra/http/container';
import { config } from 'dotenv';
import { app } from './shared/infra/http/app';

config();

app.listen(process.env.PORT || 3333, () => {
  return console.log('Server started on port 3333.');
});
