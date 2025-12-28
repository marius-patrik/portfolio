import { Route, Switch } from "wouter";
import {
  Shell,
  Header,
  Footer,
  Box,
  Stack,
  Title,
  Text,
  Flex,
} from "liqid";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";

const App = () => {
  return (
    <Shell.Page
      header={
        <Header variant="page" p="md">
          <Flex justify="between" align="center">
            <Title order={4}>Portfolio</Title>
          </Flex>
        </Header>
      }
      footer={
        <Footer variant="page">
          <Text size="sm" dimmed align="center">
            Built with Liqid
          </Text>
        </Footer>
      }
    >
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/project/:category/:slug">
          <ProjectDetail />
        </Route>
        <Route>
          <Box p="xl">
            <Stack gap="md" align="center">
              <Title order={2}>404 - Page Not Found</Title>
              <Text variant="link" component="a" href="/">
                Return to Home
              </Text>
            </Stack>
          </Box>
        </Route>
      </Switch>
    </Shell.Page>
  );
};

export default App;

