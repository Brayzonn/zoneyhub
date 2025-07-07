import {
  TypescriptIcon,
  JavascriptIcon,
  ReactIcon,
  TailwindIcon,
  NodeIcon,
  ExpressIcon,
  MongoDBIcon,
  PostgreSQLIcon,
  DockerIcon,
} from "./Icons";
const Skills = () => {
  const skills = [
    {
      name: "TypeScript",
      icon: TypescriptIcon,
    },
    {
      name: "JavaScript",
      icon: JavascriptIcon,
    },
    {
      name: "React",
      icon: ReactIcon,
    },

    {
      name: "Tailwind",
      icon: TailwindIcon,
    },
    {
      name: "Node.js",
      icon: NodeIcon,
    },
    {
      name: "Express",
      icon: ExpressIcon,
    },
    {
      name: "MongoDB",
      icon: MongoDBIcon,
    },
    {
      name: "PostgreSQL",
      icon: PostgreSQLIcon,
    },
    {
      name: "Docker",
      icon: DockerIcon,
    },
  ];

  return (
    <div
      className={`py-[2rem] w-full min-h-[400px] flex flex-col items-start justify-start space-y-[0.30rem] transition-all duration-1000 ease-out transform`}
    >
      <div className="flex flex-col space-y-1">
        <h2 className="font-mono text-left font-[500] text-[25px]">Skills</h2>
      </div>

      <div className="w-full mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-start">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-16 h-16 mb-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              {skill.icon}
            </div>
            <span className="text-sm font-mono text-gray-500 text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
