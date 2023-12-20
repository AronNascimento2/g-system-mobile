import {
  faCalendarCheck,
  faChartLine,
  faExclamation,
  faHandHoldingDollar,
  faHandshake,
  faHeadset,
  faMagnifyingGlass,
  faPeopleGroup,
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
    isPrivate: true,
    Permissions: [],
    icon: faHeadset,
  },
  {
    path: 'Sinistros',
    element: SinisterScreen,
    title: 'Sinistros',
    isPrivate: true,
    Permissions: [],
    icon: faUserSecret,
  },
  {
    path: 'Equipamentos',
    element: EquipmentScreen,
    title: 'Equipamentos',
    isPrivate: true,
    Permissions: [],
    icon: faToolbox,
  },

  {
    path: 'Supervisao',
    element: SupervisionScreen,
    title: 'Supervisao',
    isPrivate: true,
    Permissions: [],
    icon: faMagnifyingGlass,
  },

  {
    path: 'Vendas',
    element: SaleScreen,
    title: 'Vendas',
    isPrivate: true,
    Permissions: [],
    icon: faHandshake,
  },
  {
    path: 'Clientes',
    element: CustomerScreen,
    title: 'Clientes',
    isPrivate: true,
    Permissions: [],
    icon: faPeopleGroup,
  },
  {
    path: 'Cobrancas',
    element: ChargeScreen,
    title: 'Cobrancas',
    isPrivate: true,
    Permissions: [],
    icon: faHandHoldingDollar,
  },

  {
    path: 'Diretoria',
    element: DirectionScreen,
    title: 'Diretoria',
    isPrivate: true,
    icon: faUserTie,

    Permissions: [],
  },
  {
    path: 'Pendencias',
    element: PendencieScreen,
    title: 'Pendencias',
    isPrivate: true,
    Permissions: [],
    icon: faExclamation,
  },
  {
    path: 'Agenda',
    element: ScheduleScreen,
    title: 'Agenda',
    isPrivate: true,
    Permissions: [],
    icon: faCalendarCheck,
  },

  {
    path: 'Sumario',
    element: SumaryScreen,
    title: 'Sumario',
    isPrivate: true,
    Permissions: [],
    icon: faChartLine,
  },
];
