import { Helmet } from "react-helmet-async";
import JournalLayout from "../components/JournalLayout";
import ProjectsComponent from "../components/ProjectsComponent";

const Projects = () => (
  <JournalLayout>
    <Helmet>
      <title>Projects | Eyinda Bright</title>
      <meta
        name="description"
        content="Things Eyinda Bright has designed, built, and shipped — from notification infrastructure to browser games."
      />
    </Helmet>
    <ProjectsComponent />
  </JournalLayout>
);

export default Projects;
