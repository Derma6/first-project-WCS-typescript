import express, {Request, Response} from 'express';

import cors from 'cors';

import wilderController from './controller/wilder';
import skillController from './controller/skill';
import gradeController from './controller/grade';

import dataSource from './utils';

const app = express();
const port = 3001;

app.use(express.json(), cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/wilder', wilderController.read);
app.post('/api/wilder', wilderController.create);
app.put('/api/wilder?:id', wilderController.update);
app.delete('/api/wilder?:id', wilderController.delete);

app.post('/api/wilder/add-skill', gradeController.addSkillToWilder);

app.get('/api/skill', skillController.read);
app.post('/api/skill', skillController.create);
app.put('/api/skill?:id', skillController.update);
app.delete('/api/skill?:id', skillController.delete);

app.use((req: Request, res: Response, next) => res.status(404).send('Sorry cant find that!'));

const start = async (): Promise<void> => {
    await dataSource.initialize();
    app.listen(port, () => console.log(`App listening on port ${port}`));
};

void start();
