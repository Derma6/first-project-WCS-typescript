import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import './App.css';

import AddWilderForm from './components/AddWilderForm';
import { IGrade } from './components/Skill';
import Wilder, { IWilder } from './components/Wilder';

export const easyFetch = async (url: string, callback: Dispatch<SetStateAction<IWilder[]>>) => {
    const fetchData = await fetch(url);
    const response = await fetchData.json();
    const data: IWilder[] = dataSort(await response)

    callback(data);
};

const dataSort = (dataFromAPI: []): IWilder[] => {
    return dataFromAPI.map((data: any): IWilder => {

        const grades: [] = data.grades.map((grade: {grade: number, skill: {name: string}}): IGrade => {

            return {
                name: grade.skill.name,
                grade: grade.grade
            };
        });

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            grades
        };
    });
}

function App() {
    const [wildersData, setWildersData] = useState<IWilder[]>([]);
    const [displayAddWilderForm, setDisplayAddWilderForm] = useState<boolean>(false);

    useEffect(() => {
        easyFetch('http://localhost:3001/api/wilder', setWildersData);
    }, []);

    return (
        <>
            <header>
                <div className="container">
                    <h1>Wilders Book</h1>
                </div>
            </header>
            <main className="container">
                <button
                    className="button"
                    onClick={() =>
                        setDisplayAddWilderForm(!displayAddWilderForm)
                    }
                >
                    Add new wilder
                </button>

                {displayAddWilderForm && (
                    <AddWilderForm
                        setWildersData={setWildersData}
                        setDisplayAddWilderForm={setDisplayAddWilderForm}
                    />
                )}
                <h2>Wilders</h2>
                <section className="card-row">
                    {wildersData.map((wilder, index) => {
                        return (
                            <Wilder
                                key={index}
                                id={wilder.id}
                                name={wilder.name}
                                description={wilder.description}
                                grades={wilder.grades}
                                setWildersData={setWildersData}
                            />
                        );
                    })}
                </section>
            </main>
            <footer>
                <div className="container">
                    <p>&copy; 2022 Wild Code School</p>
                </div>
            </footer>
        </>
    );
}

export default App;
