import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from "liqid";
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { getProjectBySlug, type ProjectCategory } from "../data/projects";

export const ProjectDetail = () => {
  const { category, slug } = useParams<{
    category: string;
    slug: string;
  }>();
  const [readmeContent, setReadmeContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const project = getProjectBySlug(
    (category as ProjectCategory) || "code",
    slug || "",
  );

  useEffect(() => {
    if (!project) {
      setLoading(false);
      setError("Project not found");
      return;
    }

    // Try to fetch README from the public folder
    // In a real implementation, READMEs should be copied to public/readmes at build time
    const readmePath = `/readmes/${project.category}/${project.slug}.md`;

    fetch(readmePath)
      .then((res) => {
        if (!res.ok) throw new Error("README not found");
        return res.text();
      })
      .then((text) => {
        setReadmeContent(text);
        setLoading(false);
      })
      .catch(() => {
        // If README not found in public, show a message
        setReadmeContent(
          `# ${project.name}\n\n${project.description}\n\n## Tech Stack\n\n${project.techStack.join(", ")}`,
        );
        setLoading(false);
        setError(
          "Full README not available. Displaying project summary instead.",
        );
      });
  }, [project]);

  if (!project) {
    return (
      <Box p="xl">
        <Stack gap="md" align="center">
          <Title order={2}>Project Not Found</Title>
          <Link href="/">
            <Button mt="md">Back to Home</Button>
          </Link>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack gap="lg">
      <Flex justify="between" align="center">
        <Link href="/">
          <Button variant="text">← Back to Projects</Button>
        </Link>
      </Flex>

      <Stack gap="md">
        <Title order={1}>{project.name}</Title>
        <Text size="lg">{project.description}</Text>

        <Group gap="sm">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="light" size="md">
              {tech}
            </Badge>
          ))}
        </Group>
      </Stack>

      <Divider />

      <Card variant="glass" p="lg">
        {loading ? (
          <Text>Loading README...</Text>
        ) : error ? (
          <Stack gap="sm">
            <Text size="sm" style={{ color: "rgb(217 119 6)" }}>
              {error}
            </Text>
            <Box
              p="md"
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.875rem",
                fontFamily: "monospace",
                backgroundColor: "rgb(241 245 249)",
                overflowX: "auto",
              }}
            >
              {readmeContent}
            </Box>
          </Stack>
        ) : (
          <Box
            p="md"
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "0.875rem",
              fontFamily: "monospace",
              backgroundColor: "rgb(241 245 249)",
              overflowX: "auto",
            }}
          >
            {readmeContent}
          </Box>
        )}
      </Card>
    </Stack>
  );
};
