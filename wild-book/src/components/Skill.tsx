export interface IGrade {
    name: string,
    grade: number
}

const Skill = ({ name, grade }: IGrade) => {
    return (
        <li>
            {name}
            <span className="votes">{grade}</span>
        </li>
    );
};

export default Skill;
