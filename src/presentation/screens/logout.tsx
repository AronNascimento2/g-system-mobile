import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

export const LogoutS = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Faça o que for necessário para realizar o logout
    // Isso pode envolver limpar o AsyncStorage, redirecionar para a tela de login, etc.
    // Chame a função de logout aqui
    setShowModal(false); // Fecha o modal após o logout
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Text style={{color: 'black'}}>Sair</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Deseja sair?</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={{color: 'black'}}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
