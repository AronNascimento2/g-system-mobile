import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {getFirstAndLastDayOfMonth} from '../../utils/getFirstAndLastDayOfMonth';
import {fetchAppointments} from '../../../services/Schedule';
import {useAuth} from '../../contexts/AuthProvider';
import {SplashScreen} from '../SplashScreen/Splash';

export const ScheduleScreen: React.FC = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const {firstDay, lastDay} = getFirstAndLastDayOfMonth();
  const {authData} = useAuth(); // Obtém os dados de autenticação do contexto

  const fetchData = async () => {
    const startDate = firstDay;
    const endDate = lastDay;

    try {
      const data = await fetchAppointments(
        startDate,
        endDate,
        authData?.JWT?.Token,
      ); // Passa o token JWT na chamada da função
      setAppointments(data);
    } catch (error) {
      console.error('Erro ao buscar os agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authData]); // Atualiza ao mudar o estado de autenticação

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {appointments.map((appointment: any) => (
          <View key={appointment.Codigo} style={styles.appointment}>
            <View style={styles.cardContainer}>
              <View style={styles.nameContainer}>
                <View style={styles.nameCodeContainer}>
                  <Text style={styles.clientName}>{appointment.Cliente}</Text>
                  <Text style={styles.codigo}>{appointment.Codigo}</Text>
                </View>
              </View>
              <View style={styles.containerInfos}>
                <View style={styles.appointment}>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.title}>Serviço:</Text>
                    <Text style={styles.info}>{appointment.Servico}</Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.title}>Data:</Text>
                    <Text style={styles.info}>{appointment.Data}</Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.title}>Período:</Text>
                    <Text style={styles.info}>{appointment.Periodo}</Text>
                  </View>
                </View>
                <View style={styles.appointment}>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.title}>Técnico:</Text>
                    <Text style={styles.info}>{appointment.Tecnico}</Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.title}>Ordem:</Text>
                    <Text style={styles.info}>{appointment.Ordem}</Text>
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.title}>Endereço:</Text>
                    <Text style={styles.info}>{appointment.Endereco}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    color: 'black',
  },
  nameCodeContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  container: {
    flex: 1,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  nameContainer: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  appointment: {
    width: '100%',

    marginBottom: 5,
  },
  cardContainer: {
    height: 250,
    width: '100%',
    borderColor: 'lightgray',
    display: 'flex',
    backgroundColor: '#fff',
    marginBottom: 5,
    elevation: 50, // Adiciona uma sombra
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#fff',
  },
  codigo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  horizontal: {
    flex: 1,
    justifyContent: 'center',
  },
  containerInfos: {
    display: 'flex',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  info: {
    color: 'black',
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
