import { Flex, Footer, Header, Shell } from "liqid-components";
import { useState } from "react";
import "liqid-components/styles.css";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { docs } from "./data/docs";
import { ComponentPage } from "./pages/ComponentPage";

const App = () => {
  const [activeDoc, setActiveDoc] = useState(docs[0]);

  return (
    <Shell.Page
      header={
        <Header
          variant="page"
          className="p-4 flex justify-between items-center"
        >
          <span className="text-xl font-bold">Liqid Docs</span>
        </Header>
      }
      footer={
        <Footer variant="page" className="text-center text-sm text-slate-500">
          Built with Liqid
        </Footer>
      }
    >
      <div className="max-w-7xl mx-auto w-full p-6 h-full">
        <Flex gap="xl" className="h-full items-start">
          <div className="w-64 flex-shrink-0 sticky top-6">
            <Sidebar
              items={docs}
              activeItem={activeDoc}
              onSelect={setActiveDoc}
            />
          </div>
          <div className="flex-1 min-w-0">
            <ComponentPage doc={activeDoc} />
          </div>
        </Flex>
      </div>
    </Shell.Page>
  );
};

export default App;
