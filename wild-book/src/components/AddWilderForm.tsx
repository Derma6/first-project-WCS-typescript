import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { easyFetch } from '../App';
import AddSkillForm from './AddSkillForm';
import { IWilder } from './Wilder';


export interface IPossibleSkill {
    id: number,
    name: string,
}
export interface ISkillToWilder {
    wilderName: string,
    skillName: string,
    grade: string
}

interface Props {
    setWildersData: Dispatch<SetStateAction<IWilder[]>>,
    setDisplayAddWilderForm: Dispatch<SetStateAction<boolean>>
}

const AddWilderForm = ({ setWildersData, setDisplayAddWilderForm }: Props) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [skills, setSkills] = useState<ISkillToWilder[]>([]);

    console.log(name);
    console.log(description);
    console.log(skills);
    
    const [possibleSkill, setPossibleSkill] = useState<IPossibleSkill[]>([]);

    useEffect(() => {
        const easyFetch = async (url: string) => {
            const fetchData = await fetch(url);
            const response = await fetchData.json();
        
            setPossibleSkill(response);
        };

        easyFetch('http://localhost:3001/api/skill');
    }, []);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const postData = async () => {
                        try {
                            await fetch('http://localhost:3001/api/wilder', {
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                method: 'POST',
                                body: JSON.stringify({ name, description, grades: skills }),
                            });
                        } catch {
                            alert('Une erreur est survenu.');
                        } finally {
                            await easyFetch(
                                'http://localhost:3001/api/wilder',
                                setWildersData
                                );
                            setDisplayAddWilderForm(false);
                        }
                    };
                    postData();
                }}
            >
                <div>
                    <h3>Nouveau Wilder</h3>
                    <input
                        type="text"
                        // value={name}
                        placeholder={'Name'}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <textarea
                        name="description"
                        id="description"
                        cols={30}
                        rows={10}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <div className="add-skill-title-bloc">
                        <h3>Ajouter des skills</h3>
                        <button
                            className="button"
                            type="button"
                            onClick={() => {
                                setSkills([
                                    ...skills,
                                    { wilderName: name, skillName: '', grade: "5" },
                                ]);
                            }}
                        >
                            +
                        </button>
                    </div>
                    {skills.map((obj, index) => {
                        return (
                            <AddSkillForm
                                key={index}
                                possibleSkill={possibleSkill}
                                index={index}
                                skills={skills}
                                setSkills={setSkills}
                            />
                        );
                    })}
                </div>
                <button className="button" type="submit">
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AddWilderForm;
