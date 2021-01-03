//Configuración del servidor express//
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

const { get } = require('http');
//Conexión a la base de datos MongoDB//
mongoose.Promise = global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbAlex';
mongoose.connect(dbUrl, { useCreateIndex: true, useNewUrlParser: true }).then(mongoose => console.log('Conectando a la BD en el puerto 27017')).catch(err => console.log(err));

const app = express();
// Le indico que estamos trabajando en modo desarrollo//
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router);
//Que se utilice el puerto y sino va 4000//
app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});