import { Header } from "liqid-components";
import { Clock } from "./Clock";

export const DesktopHeader = () => {
  return (
    <Header className="system-overlay-10 w-screen">
      <Clock />
    </Header>
  );
};
