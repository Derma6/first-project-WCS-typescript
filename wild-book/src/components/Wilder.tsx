import { Dispatch, SetStateAction } from 'react';
import { easyFetch } from '../App';
import blank_profile from '../assets/blank_profile.png';
import Skill, { IGrade } from './Skill';

export interface IWilder {
    id: number,
    name: string,
    description: string,
    grades: IGrade[],
}

export interface Props extends IWilder {
    setWildersData: Dispatch<SetStateAction<IWilder[]>>
}

const Wilder = ({id, name, description, grades, setWildersData }: Props) => {
    return (
        <article className="card">
            <button
                className="button"
                onClick={() => {
                    const easyDelete = async () => {
                        try {
                            await fetch(
                                `http://localhost:3001/api/wilder?id=${id}`,
                                {
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    method: 'DELETE',
                                }
                            );
                        } catch {
                            alert('Une erreur est survenu.');
                        } finally {
                                easyFetch('http://localhost:3001/api/wilder', setWildersData);
                        }
                    };
                    easyDelete();
                }}
            >
                X
            </button>
            <img src={blank_profile} alt="Jane Doe Profile" />
            <h3>{name}</h3>
            <p>{description}</p>
            <h4>Wild Skills</h4>
            <ul className="skills">
                {grades.map((data: IGrade, index) => {
                    return (
                        <Skill
                            key={index}
                            name={data.name}
                            grade={data.grade}
                        />
                    );
                })}
            </ul>
        </article>
    );
};

export default Wilder;