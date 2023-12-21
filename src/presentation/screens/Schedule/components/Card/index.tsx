import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {AppointmentType} from '../../../../../services/Schedule';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {CustomModal} from '../../../../components/Modal';

interface AppointmentCardProps {
  appointments: AppointmentType;
  handleRowClickCard: () => void;
  searchText: string;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointments,
  searchText,
  handleRowClickCard,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [displayedAppointments, setDisplayedAppointments] = useState<
    AppointmentType[]
  >([]);

  useEffect(() => {
    // Define os 50 primeiros itens dos agendamentos para exibição inicial
    setDisplayedAppointments(appointments.slice(0, 50));
  }, [appointments]);

  const openModal = appointment => {
    setSelectedAppointment(appointment);
    handleRowClickCard(appointment);
  };

  const closeAndClearModal = () => {
    setSelectedAppointment(null);
  };
  return (
    <>
      {displayedAppointments
        ?.filter(appointment =>
          appointment.Cliente.toLowerCase().includes(searchText.toLowerCase()),
        )
        .map(appointment => (
          <TouchableHighlight
            key={appointment.Codigo}
            onPress={() => openModal(appointment)}
            underlayColor="#ccc">
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
                    <Text
                      style={[styles.info, styles.address]}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {appointment.Endereco}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        ))}
      {selectedAppointment !== null && (
        <CustomModal
          selectedAppointment={selectedAppointment}
          visible={selectedAppointment !== null} // Alteração aqui
          closeModal={closeAndClearModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  address: {
    flex: 1,
  },
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
    elevation: 5,
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
