import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  Text,
} from 'react-native';
import {getFirstAndLastDayOfMonth} from '../../utils/getFirstAndLastDayOfMonth';
import {fetchAppointments, AppointmentType} from '../../../services/Schedule';
import {AppointmentCard} from './components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {CustomModal} from '../../components/Modal';

export const ScheduleScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const {firstDay, lastDay} = getFirstAndLastDayOfMonth();
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentType | null>(null);

  const handleCardClick = (appointment: AppointmentType) => {
    setSelectedAppointment(appointment);
    setModalVisible(true);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const fetchData = async () => {
    const startDate = firstDay;
    const endDate = lastDay;

    try {
      const data = await fetchAppointments(startDate, endDate);
      setAppointments(data);
    } catch (error) {
      console.error('Erro ao buscar os agendamentos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Aqui definimos refreshing como false para indicar que a atualização foi concluída
    }
  };
  const onRefresh = () => {
    setRefreshing(true); // Ativa o estado de atualização
    fetchData(); // Chama a função fetchData ao atualizar
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.Cliente.toLowerCase().includes(searchText.toLowerCase()),
  );
  const handleClearText = () => {
    setSearchText('');
  };

  return (
    <>
      <View>
        <View style={styles.containerInput}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por cliente"
              placeholderTextColor="#999" // Cor do placeholder
              value={searchText}
              onChangeText={handleSearch}
            />
            {searchText.length > 0 && ( // Renderiza o botão somente se houver texto no input
              <TouchableOpacity
                onPress={handleClearText}
                style={styles.clearButton}>
                <FontAwesomeIcon icon={faTimesCircle} size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#3498db']} // Cor do indicador de atualização
          />
        }>
        <View style={styles.cardContainer}>
          <View style={styles.container}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={{color: '#3498db'}}>Carregando...</Text>
              </View>
            ) : (
              filteredAppointments.map((appointment: AppointmentType) => (
                <TouchableOpacity
                  key={appointment.Codigo}
                  onPress={() => handleCardClick(appointment)}>
                  <AppointmentCard appointment={appointment} />
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <CustomModal
        visible={modalVisible}
        appointment={selectedAppointment}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'gray',
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  clearButton: {
    padding: 5,
  },
  cardContainer: {
    flex: 1,
  },
  searchInput: {
    fontSize: 14,
    width: '90%',
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: 'black',
  },
  containerInput: {
    backgroundColor: '#3498db',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    color: 'black',
    padding: 10,
  },
  container: {
    flex: 6,
  },
  text: {
    color: '#3498db',
  },
});
