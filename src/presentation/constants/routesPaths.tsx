import {
  faCalendarCheck,
  faChartLine,
  faExclamation,
  faHandHoldingDollar,
  faHandshake,
  faHeadset,
  faMagnifyingGlass,
  faPeopleGroup,
  faScrewdriverWrench,
  faToolbox,
  faUserSecret,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import {
  AttendanceScreen,
  ChargeScreen,
  CustomerScreen,
  DirectionScreen,
  EquipmentScreen,
  PendencieScreen,
  SaleScreen,
  ScheduleScreen,
  SettingScreen,
  SinisterScreen,
  SumaryScreen,
  SupervisionScreen,
} from '../screens';
import HomeScreen from '../screens/Home';

export const ROUTES_PATHS = [
  {
    path: 'Home',
    element: HomeScreen,
    title: 'Home',
    isPrivate: true,
    Permissions: [],
  },
  {
    path: 'Atendimento',
    element: AttendanceScreen,
    title: 'Atendimento',
    label: 'Atendimento',
    isPrivate: true,
    Permissions: [],
    icon: faHeadset,
  },
  {
    path: 'Sinistros',
    element: SinisterScreen,
    title: 'Sinistros',
    label: 'Sinistros',
    isPrivate: true,
    Permissions: [],
    icon: faUserSecret,
  },
  {
    path: 'Equipamentos',
    element: EquipmentScreen,
    title: 'Equipamentos',
    label: 'Equipamentos',
    isPrivate: true,
    Permissions: [],
    icon: faToolbox,
  },

  {
    path: 'Supervisao',
    element: SupervisionScreen,
    title: 'Supervisao',
    label: 'Supervisão',
    isPrivate: true,
    Permissions: [],
    icon: faMagnifyingGlass,
  },

  {
    path: 'Vendas',
    element: SaleScreen,
    title: 'Vendas',
    label: 'Vendas',
    isPrivate: true,
    Permissions: [],
    icon: faHandshake,
  },
  {
    path: 'Clientes',
    element: CustomerScreen,
    title: 'Clientes',
    label: 'Clientes',
    isPrivate: true,
    Permissions: [],
    icon: faPeopleGroup,
  },
  {
    path: 'Cobrancas',
    element: ChargeScreen,
    title: 'Cobrancas',
    label: 'Cobranças',
    isPrivate: true,
    Permissions: [],
    icon: faHandHoldingDollar,
  },

  {
    path: 'Diretoria',
    element: DirectionScreen,
    title: 'Diretoria',
    label: 'Diretoria',
    isPrivate: true,
    icon: faUserTie,

    Permissions: [],
  },
  {
    path: 'Pendencias',
    element: PendencieScreen,
    title: 'Pendencias',
    label: 'Pendências',
    isPrivate: true,
    Permissions: [],
    icon: faExclamation,
  },
  {
    path: 'Agenda',
    element: ScheduleScreen,
    title: 'Agenda',
    label: 'Agenda',
    isPrivate: true,
    Permissions: [],
    icon: faCalendarCheck,
  },

  {
    path: 'Sumario',
    element: SumaryScreen,
    title: 'Sumario',
    label: 'Sumário',
    isPrivate: true,
    Permissions: [],
    icon: faChartLine,
  },
  {
    path: 'Configuracoes',
    element: SettingScreen,
    title: 'Configuracoes',
    label: 'Configurações',
    isPrivate: true,
    Permissions: [],
    icon: faScrewdriverWrench,
  },
];
