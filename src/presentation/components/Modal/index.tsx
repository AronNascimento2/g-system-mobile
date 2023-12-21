import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AppointmentType} from '../../../services/Schedule';

interface CustomModalProps {
  visible: boolean;
  closeModal: () => void;
  appointment: AppointmentType;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  closeModal,
  appointment,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Compromisso</Text>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Data:</Text>
              <Text style={styles.info}>{appointment.Data}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Cliente:</Text>
              <Text style={styles.info}>{appointment.Cliente}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Código:</Text>
              <Text style={styles.info}>{appointment.Codigo}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Técnico:</Text>
              <Text style={styles.info}>{appointment.Tecnico ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Data de Criação:</Text>
              <Text style={styles.info}>
                {appointment.DataCriacao ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Observação:</Text>
              <Text style={styles.info}>{appointment.Observacao ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Não Presencial:</Text>
              <Text style={styles.info}>
                {appointment.NãoPresencial ? 'Sim' : 'Não'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Status de Faturamento:</Text>
              <Text style={styles.info}>
                {appointment.StatusFaturamento ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Veículo Status:</Text>
              <Text style={styles.info}>
                {appointment.Veiculos?.Status ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Km:</Text>
              <Text style={styles.info}>{appointment.Km ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Ordem:</Text>
              <Text style={styles.info}>{appointment.Ordem ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Valor do Serviço:</Text>
              <Text style={styles.info}>
                {appointment.ValorServico ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Verificado:</Text>
              <Text style={styles.info}>
                {appointment.Verificado ? 'Sim' : 'Não'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Visita Técnica:</Text>
              <Text style={styles.info}>
                {appointment.VisitaTecnica ? 'Sim' : 'Não'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Cliente Antigo:</Text>
              <Text style={styles.info}>
                {appointment.ClienteAntigo ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Custo de Deslocamento:</Text>
              <Text style={styles.info}>
                {appointment.CustoDeslocamento ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Serviço:</Text>
              <Text style={styles.info}>{appointment.Servico ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Endereço:</Text>
              <Text style={styles.info}>{appointment.Endereco}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Tipo:</Text>
              <Text style={styles.info}>{appointment.Tipo ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Custos:</Text>
              <Text style={styles.info}> {appointment.Custos ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Período:</Text>
              <Text style={styles.info}>{appointment.Periodo ?? 'N/A'}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Valor Adicional:</Text>
              <Text style={styles.info}>
                {appointment.ValorAdicional ?? 'N/A'}
              </Text>
            </View>
          </View>
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
  },
  container: {
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2980b9',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});
