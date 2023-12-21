import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppointmentType} from '../../../services/Schedule';
import {ScrollView} from 'react-native-gesture-handler';

interface CustomModalProps {
  visible: boolean;
  closeModal: () => void;
  selectedAppointment: AppointmentType;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  closeModal,
  selectedAppointment,
}) => {
  console.log('visivel', visible);
  console.log(selectedAppointment);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView style={{height: '90%', elevation: 1}}>
            <View style={styles.container}>
              <Text style={styles.title}>Detalhes do Agendamento</Text>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Cliente:</Text>
                <Text style={styles.info}>{selectedAppointment.Cliente}</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Código:</Text>
                <Text style={styles.info}>{selectedAppointment.Codigo}</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Técnico:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Tecnico ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.info}>{selectedAppointment.Data}</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Data de Criação:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.DataCriacao ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Endereço:</Text>
                <Text style={styles.info}>{selectedAppointment.Endereco}</Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Período:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Periodo ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Valor do Serviço:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.ValorServico ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Não Presencial:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.NãoPresencial ? 'Sim' : 'Não'}
                </Text>
              </View>

              <View style={styles.itemContainer}>
                <Text style={styles.label}>Veículo Status:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Veiculos?.Status ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Km:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Km ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Ordem:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Ordem ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Veículos :</Text>
                {selectedAppointment?.Veiculos.map((veiculo, index) => (
                  <View key={index}>
                    <Text style={styles.info}>
                      [ Código do Veículo: {veiculo.CodigoVeiculo}, Status:
                      {veiculo.Status}, Veiculo: {veiculo.Veiculo} ]
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Veículos :</Text>
                {selectedAppointment?.Veiculos.map((veiculo, index) => (
                  <View key={index}>
                    <Text style={styles.info}>
                      [ Código do Veículo: {veiculo.CodigoVeiculo}, Status:
                      {veiculo.Status}, Veiculo: {veiculo.Veiculo} ]
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Verificado:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Verificado ? 'Sim' : 'Não'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Visita Técnica:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.VisitaTecnica ? 'Sim' : 'Não'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Cliente Antigo:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.ClienteAntigo ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Custo de Deslocamento:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.CustoDeslocamento ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Serviço:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Servico ?? 'N/A'}
                </Text>
              </View>

              <View style={styles.itemContainer}>
                <Text style={styles.label}>Tipo:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Tipo ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Custos:</Text>
                <Text style={styles.info}>
                  {' '}
                  {selectedAppointment.Custos ?? 'N/A'}
                </Text>
              </View>

              <View style={styles.itemContainer}>
                <Text style={styles.label}>Valor Adicional:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.ValorAdicional ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Status de Faturamento:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.StatusFaturamento ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>Observação:</Text>
                <Text style={styles.info}>
                  {selectedAppointment.Observacao ?? 'N/A'}
                </Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  info: {
    color: 'black',
    width: '80%',
  },
  container: {
    borderRadius: 5,
    width: '70%',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    color: 'black',

    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    color: 'black',
    fontWeight: 'bold',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    width: 200,
    marginTop: 20,
    padding: 10,
    alignItems: 'center',

    alignSelf: 'center',
    backgroundColor: '#2980b9',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
