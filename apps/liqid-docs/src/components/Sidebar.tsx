import { Card, Stack, Text } from "liqid-components";
import type { ComponentDoc } from "../data/docs";

interface SidebarProps {
  items: ComponentDoc[];
  activeItem: ComponentDoc;
  onSelect: (item: ComponentDoc) => void;
}

export const Sidebar = ({ items, activeItem, onSelect }: SidebarProps) => {
  return (
    <Stack gap="md">
      {items.map((item) => (
        <div
          key={item.title}
          onClick={() => onSelect(item)}
          className="cursor-pointer transition-transform active:scale-95"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(item);
            }
          }}>
          <Card
            variant={
              activeItem.title === item.title ? "glass-highlight" : "glass"
            }>
            <Stack gap="sm">
              <Text variant="body" weight="bold">
                {item.title}
              </Text>
              <div className="text-xs opacity-70 truncate">
                {item.description}
              </div>
            </Stack>
          </Card>
        </div>
      ))}
    </Stack>
  );
};
