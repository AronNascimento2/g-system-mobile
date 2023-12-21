import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AppointmentType} from '../../../../services/Schedule';

interface AppointmentCardProps {
  appointment: AppointmentType;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.clientName}>{appointment.Cliente}</Text>
        <Text style={styles.codigo}>{appointment.Codigo}</Text>
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
  );
};

const styles = StyleSheet.create({
  nameCodeContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  nameContainer: {
    height: 60,
    padding: 10,
    flexDirection: 'column',
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
    elevation: 50,
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
    padding: 10,

    display: 'flex',
  },
  title: {
    color: '#2980b9',
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
