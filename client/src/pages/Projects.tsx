import { Helmet } from "react-helmet-async";
import SiteLayout from "../components/SiteLayout";
import ProjectsComponent from "../components/ProjectsComponent";

const Projects = () => (
  <SiteLayout>
    <Helmet>
      <title>Projects | Eyinda Bright</title>
      <meta
        name="description"
        content="Things Eyinda Bright has designed, built, and shipped — from notification infrastructure to browser games."
      />
    </Helmet>
    <ProjectsComponent />
  </SiteLayout>
);

export default Projects;
