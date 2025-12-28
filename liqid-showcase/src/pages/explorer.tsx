import {
  IconCalculator,
  IconCalendar,
  IconCamera,
  IconChartLine,
  IconClock,
  IconDeviceGamepad2,
  IconList,
  IconMessageCircle,
  IconNote,
  IconPhone,
  IconPokeball,
  IconShoppingCart,
} from '@tabler/icons-react';
import { type AppDefinition, Explorer } from 'liqid-ui';

import { Calculator } from '../components/Apps/Calculator/Calculator';
import { Calendar } from '../components/Apps/Calendar/Calendar';
import { Camera } from '../components/Apps/Camera/Camera';
import { ClockApp } from '../components/Apps/Clock/ClockApp';
import { Eshop } from '../components/Apps/Eshop/Eshop';
import { Games } from '../components/Apps/Games/Games';
import { Messages } from '../components/Apps/Messages/Messages';
import { Notes } from '../components/Apps/Notes/Notes';
import { Phone } from '../components/Apps/PhoneWrapper/Phone';
import { Pokedex } from '../components/Apps/PokedexWrapper/Pokedex';
import { ToDoList } from '../components/Apps/ToDoList/ToDoList';
import { TradeBot } from '../components/Apps/TradeBotWrapper/TradeBot';

const customApps: AppDefinition[] = [
  {
    id: 'Phone',
    title: 'Phone',
    icon: <IconPhone size={32} />,
    Component: Phone,
  },
  {
    id: 'Messages',
    title: 'Messages',
    icon: <IconMessageCircle size={32} />,
    Component: Messages,
  },
  {
    id: 'Notes',
    title: 'Notes',
    icon: <IconNote size={32} />,
    Component: Notes,
  },
  {
    id: 'ToDoList',
    title: 'To Do List',
    icon: <IconList size={32} />,
    Component: ToDoList,
  },
  {
    id: 'Calculator',
    title: 'Calculator',
    icon: <IconCalculator size={32} />,
    Component: Calculator,
  },
  {
    id: 'Calendar',
    title: 'Calendar',
    icon: <IconCalendar size={32} />,
    Component: Calendar,
  },
  {
    id: 'Clock',
    title: 'Clock',
    icon: <IconClock size={32} />,
    Component: ClockApp,
  },
  {
    id: 'Games',
    title: 'Games',
    icon: <IconDeviceGamepad2 size={32} />,
    Component: Games,
  },
  {
    id: 'Camera',
    title: 'Camera',
    icon: <IconCamera size={32} />,
    Component: Camera,
  },
  {
    id: 'Pokedex',
    title: 'Pokedex',
    icon: <IconPokeball size={32} />,
    Component: Pokedex,
  },
  {
    id: 'Eshop',
    title: 'Eshop',
    icon: <IconShoppingCart size={32} />,
    Component: Eshop,
  },
  {
    id: 'TradeBot',
    title: 'TradeBot',
    icon: <IconChartLine size={32} />,
    Component: TradeBot,
  },
];

const ExplorerPage = () => {
  return <Explorer customApps={customApps} />;
};

export default ExplorerPage;
