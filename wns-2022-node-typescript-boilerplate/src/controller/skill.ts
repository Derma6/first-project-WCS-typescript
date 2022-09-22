import { Request, Response } from 'express';

import dataSource from '../utils'
import Skill from '../entity/Skill';

const skillController = {
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            await dataSource.getRepository(Skill).save(req.body);
            res.status(201).send('Created Skill');
        } catch (err: any) {
            if (err.errno === 19) {
                res.send(
                    'This skill already exist. The name should be unique.'
                );
                return;
            }

            res.send(err);
        }
    },
    read: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await dataSource.getRepository(Skill).find();
            res.status(201).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    update: async (req: any, res: Response): Promise<void> => {
        try {
            await dataSource
                .getRepository(Skill)
                .update(req.query.id, req.body);

            res.send('Skill updated !');
        } catch (err) {
            res.send(err);
        }
    },
    delete: async (req: any, res: Response): Promise<void> => {
        try {
            const data = await dataSource
                .getRepository(Skill)
                .delete(req.query.id);

            if (data.affected === 0) {
                res.status(404).send('Skill not found');
            } else {
                res.send('Skill deleted!');
            }
        } catch (err) {
            res.send(err);
        }
    },
};

export default skillController