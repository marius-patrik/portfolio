import { Badge, Card, Group, Stack, Text, Title } from "liqid";
import { Link } from "wouter";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link href={`/project/${project.category}/${project.slug}`}>
      <Card
        variant="glass"
        p="lg"
        style={{
          height: "100%",
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Stack gap="sm">
          <Title order={3}>{project.name}</Title>
          <Text size="sm" dimmed>
            {project.description}
          </Text>
          <Group gap="sm" mt="auto">
            {project.techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="light" size="sm">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 3 && (
              <Badge variant="outline" size="sm">
                +{project.techStack.length - 3} more
              </Badge>
            )}
          </Group>
        </Stack>
      </Card>
    </Link>
  );
};
