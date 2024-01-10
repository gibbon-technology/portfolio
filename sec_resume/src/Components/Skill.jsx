export default ({ skill }) => {
  return (
    <ul className="skill">
      <li>{skill.title}</li>
      <ul className="sec">
        {skill.items.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </ul>
  );
};
