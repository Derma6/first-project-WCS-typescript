import { Request, Response } from 'express';

import dataSource from '../utils'

import Wilder from '../entity/Wilder';
import Grade from '../entity/Grade';
import Skill from '../entity/Skill';

const wilderController = {
    create: async (req: Request, res: Response): Promise<void> => {
        try {
            const wilder = new Wilder()
            wilder.name = req.body.name;
            wilder.description = req.body.description
            
            await dataSource.getRepository(Wilder).save(wilder);
            
            req.body.grades.map(async (grade: {wilderName: string, skillName: string, grade: number}) => {                  
                const skill = await dataSource.getRepository(Skill).findOneBy({name: grade.skillName})

                const newGrade = new Grade()
                newGrade.wilder = wilder
                if(skill !== null) newGrade.skill = skill
                newGrade.grade = grade.grade

                await dataSource.getRepository(Grade).save(newGrade);

             });

            res.status(201).send('Created wilder');
        } catch (err) {
            res.send('Error while creating wilder');
        }
    },
    read: async (req: Request, res: Response): Promise<void> => {
        try {
            const data = await dataSource.getRepository(Wilder).find({
                relations: {
                    grades: {
                        skill: true,
                    },
                },
            });
            res.status(201).send(data);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    update: async (req: any, res: Response): Promise<void> => {
        
        try {
            await dataSource
                .getRepository(Wilder)
                .update(req.query.id, req.body);

            res.send('Wilder updated !');
        } catch (err) {
            res.send(err);
        }
    },
    delete: async (req: any, res: Response): Promise<void> => {
        try {
            await dataSource
                .getRepository(Wilder)
                .delete(req.query.id);

                res.send('Wilder deleted!');
        } catch (err) {
            res.send(err);
        }
    },
};

export default wilderController