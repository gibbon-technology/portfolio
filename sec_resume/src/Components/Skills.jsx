import skill_list from "../skills.js";
import Skill from "./Skill.jsx";

export default () => {
  return (
    <div className="skills">
      {skill_list.map((skill, index) => {
        return <Skill key={index} skill={skill} />;
      })}
    </div>
  );
};
