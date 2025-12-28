import { Title, Divider, Stack, Grid } from "liqid";
import { codeProjects, hardwareProjects } from "../data/projects";
import { ProjectCard } from "../components/ProjectCard";

export const Home = () => {
  return (
    <Stack gap="2xl">
      {/* Code Projects Section */}
      <section>
        <Title order={1} mb="lg">
          Code Projects
        </Title>
        <Grid cols={3} gap="lg">
          {codeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </section>

      <Divider />

      {/* Hardware Projects Section */}
      <section>
        <Title order={1} mb="lg">
          Hardware Projects
        </Title>
        <Grid cols={3} gap="lg">
          {hardwareProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </section>
    </Stack>
  );
};

