import { Dispatch, SetStateAction } from 'react';
import styles from '../styles/AddSkillForm.module.css';
import { IPossibleSkill, ISkillToWilder } from './AddWilderForm';

interface Props {
    possibleSkill: IPossibleSkill[],
    index: number,
    skills: ISkillToWilder[],
    setSkills: Dispatch<SetStateAction<ISkillToWilder[]>>

}

const AddSkillForm = ({ possibleSkill, index, skills, setSkills }: Props) => {

    return (
        <div className={styles.container}>
            <select
                name=""
                id=""
                onChange={(e) => {
                    const newSkills = skills.map((data, i) => {
                        if (i === index) {
                            return { ...data, skillName: e.target.value };
                        }
                        return data;
                    });

                    setSkills(newSkills);
                }}
            >
                <option value="">--add skill--</option>
                {possibleSkill.map((skill, index) => {
                    return (
                        <option key={index} value={skill.name}>
                            {skill.name}
                        </option>
                    );
                })}
            </select>
            <input
                type="range"
                min="0"
                max="10"
                defaultValue="5"
                onChange={(e) => {
                    const newSkills = skills.map((data, i) => {
                        if (i === index) {
                            return { ...data, grade: e.target.value};
                        }
                        return data;
                    });

                    setSkills(newSkills);
                }}
            ></input>
        </div>
    );
};

export default AddSkillForm;
