import { Request, Response } from 'express';

import dataSource from '../utils';

import Wilder from '../entity/Wilder';
import Skill from '../entity/Skill';
import Grade from '../entity/Grade';

const gradeController = {
    addSkillToWilder: async (req: Request, res: Response): Promise<void> => {
            try {
                const wilder = await dataSource
                    .getRepository(Wilder)
                    .findOneBy({ name: req.body.wilderName });

                const skill = await dataSource
                    .getRepository(Skill)
                    .findOneBy({ name: req.body.skillName });

                if (wilder !== null && skill !== null) {
                    const newGrade = new Grade()

                    newGrade.wilder = wilder
                    newGrade.skill = skill
                    newGrade.grade = req.body.grade

                    await dataSource.getRepository(Grade).save(newGrade);

                    res.send('Skill added to wilder');
                }
            } catch (err) {
                console.log(err);

                res.send('error while adding to wilder');
            }
    },
};

export default gradeController