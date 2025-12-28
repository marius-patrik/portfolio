import { Divider, Grid, Stack, Title } from "liqid";
import { ProjectCard } from "../components/ProjectCard";
import { codeProjects, hardwareProjects } from "../data/projects";

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
