const Projects = () => {
    const projects = [
      {
        id: 1,
        title: "MEDHUB",
        description: "A brief description of what this project does, the problems it solves, and what you learned while building it.",
        image: "/api/placeholder/800/500",
        link: "https://med-hub-hazel.vercel.app",
        tech: ["React", "Node.js", "MongoDB"]
      },
      {
        id: 2,
        title: "LINKLY",
        description: "Description of your second project showcasing different skills and technologies you've mastered.",
        image: "/api/placeholder/800/500", 
        link: "https://linklyy.vercel.app/",
        tech: ["Next.js", "Tailwind", "Firebase"]
      },
      {
        id: 3,
        title: "Another Project",
        description: "Description of your second project showcasing different skills and technologies you've mastered.",
        image: "/api/placeholder/800/500", 
        link: "https://anotherproject.com",
        tech: ["Next.js", "Tailwind", "Firebase"]
      },
      {
        id: 4,
        title: "Another Project",
        description: "Description of your second project showcasing different skills and technologies you've mastered.",
        image: "/api/placeholder/800/500", 
        link: "https://anotherproject.com",
        tech: ["Next.js", "Tailwind", "Firebase"]
      },
    ];
  
    return (
      <div className='py-[2rem] w-full min-h-[400px] flex flex-col items-start justify-start space-y-[0.30rem]'>
        <div className="flex flex-col space-y-1">
          <h2 className='font-mono text-left font-[500] text-[25px]'>Projects</h2>
          <p className='sans tracking-wide text-left font-[400] text-[15px] mt-1 max-w-[650px]'>
            As a Full-stack developer, I've built projects combining intuitive interfaces with robust backend systems, developing practical skills in web development and data management. I'm constantly expanding my capabilities and working on exciting new applications. Here are some of the projects I've worked on:
          </p>
        </div>
  
        {/* Projects grid */}
        <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="w-full rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-gradient-to-br from-[#1A1A1A] to-[#252525]"
            >
              {/* Project image */}
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              {/* Project content */}
              <div className="p-5">
                <h3 className="font-mono text-lg font-medium mb-2 text-white">{project.title}</h3>
                <p className="text-sm mb-4 text-gray-300">{project.description}</p>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-[#2A2A2A] rounded-md text-xs font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Visit site link */}
                <a 
                  href={project.link} 
                  target="_blank" 
             
                  className="inline-block font-mono text-sm py-2 px-4 bg-gradient-to-r from-[#2A2A2A] to-[#333333] text-white rounded-md hover:from-[#333333] hover:to-[#3A3A3A] transition-colors duration-300"
                >
                  Visit Site →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Projects;