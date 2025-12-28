import { Card, Divider, Stack, Text, Title } from "liqid-components";
import type { ComponentDoc } from "../data/docs";

interface ComponentPageProps {
  doc: ComponentDoc;
}

export const ComponentPage = ({ doc }: ComponentPageProps) => {
  return (
    <Stack gap="xl">
      <Stack gap="md">
        <Title order={1}>{doc.title}</Title>
        <Text variant="lead">{doc.description}</Text>
      </Stack>

      <Divider />

      <Stack gap="md">
        <Title order={3}>Usage</Title>
        <Card variant="flat" className="bg-black/20 overflow-hidden">
          <pre className="p-4 overflow-x-auto text-sm font-mono text-white">
            {doc.usage}
          </pre>
        </Card>
      </Stack>

      <Stack gap="md">
        <Title order={3}>Props</Title>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/70">
                <th className="p-3 font-medium">Prop</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Default</th>
                <th className="p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((prop) => (
                <tr
                  key={prop.name}
                  className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                >
                  <td className="p-3 font-mono text-teal-300">{prop.name}</td>
                  <td className="p-3 font-mono text-purple-300">{prop.type}</td>
                  <td className="p-3 font-mono opacity-70">{prop.default}</td>
                  <td className="p-3 opacity-90">{prop.description}</td>
                </tr>
              ))}
              {doc.props.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center opacity-50">
                    No props available for this component.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Stack>
    </Stack>
  );
};
