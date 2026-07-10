import { Helmet } from "react-helmet-async";
import JournalLayout from "../components/JournalLayout";
import BlogComponent from "../components/BlogComponent";

const Blog = () => (
  <JournalLayout>
    <Helmet>
      <title>Blog | Eyinda Bright</title>
      <meta
        name="description"
        content="Writing by Eyinda Bright on software he's built, problems he's debugged, and whatever else has been on his mind."
      />
    </Helmet>
    <BlogComponent />
  </JournalLayout>
);

export default Blog;
