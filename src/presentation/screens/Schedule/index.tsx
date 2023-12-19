import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getFirstAndLastDayOfMonth} from '../../utils/getFirstAndLastDayOfMonth';
import {fetchAppointments} from '../../../services/Schedule';

export const ScheduleScreen: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const {firstDay, lastDay} = getFirstAndLastDayOfMonth();

  const fetchData = async () => {
    const startDate = firstDay;
    const endDate = lastDay;

    try {
      const data = await fetchAppointments(startDate, endDate);
      setAppointments(data);
    } catch (error) {
      console.error('Erro ao buscar os agendamentos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
        Agendamentos do mês:
      </Text>
      {appointments.map((appointment: any, index: number) => (
        <View key={index} style={{marginBottom: 5}}>
          <Text>{appointment.Cliente}</Text>
        </View>
      ))}
    </View>
  );
};
