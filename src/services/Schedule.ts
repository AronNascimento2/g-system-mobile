// appointmentService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../presentation/contexts/AuthProvider';

export type AppointmentType = {
  Data: string;
  Cliente: string;
  Codigo: string;
  Tecnico?: string;
  DataCriacao?: string;
  Observacao?: string;
  NãoPresencial?: string | boolean;
  StatusFaturamento?: string;
  Veiculos?: {Status: string};
  Km?: number;
  Ordem?: number;
  ValorServico?: number;
  Verificado?: string | boolean;
  VisitaTecnica?: string | boolean;
  ClienteAntigo?: string;
  CustoDeslocamento?: number;
  Servico?: string;
  Endereco: string;
  Tipo?: string;
  Custos?: number;
  Periodo?: string;
  ValorAdicional?: number;
};

// appointmentService.ts

export const fetchAppointments = async (
  startDate: string,
  endDate: string,
  token: string | undefined, // Token JWT como parâmetro
): Promise<AppointmentType[]> => {
  const response = await fetch(
    `https://api.gsystem.com.br/api/Agendamentos?Data[Inicial]=${startDate}&Data[Final]=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Utiliza o token diretamente no cabeçalho de autorização
      },
    },
  );

  if (!response.ok) {
    throw new Error('Erro ao buscar os agendamentos');
  }

  const data = await response.json();
  console.log('Appointments', data);
  return data as AppointmentType[];
};
