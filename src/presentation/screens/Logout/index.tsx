import {faSignOut} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {useAuth} from '../../contexts/AuthProvider';

export const LogoutModal = () => {
  const [showModal, setShowModal] = useState(false);
  const {signOut} = useAuth();

  const handleLogout = () => {
    signOut();
    setShowModal(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOut} style={styles.icon} />
          <Text style={styles.title}>Sair</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Deseja sair?</Text>
            <View style={styles.wrapperButtons}>
              <TouchableOpacity
                style={styles.buttonCancel}
                onPress={() => setShowModal(false)}>
                <Text style={styles.textCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.text}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
  },
  wrapperButtons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    marginTop: 20,
    color: '#fff',
  },
  buttonCancel: {
    height: 40,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  textCancel: {
    color: '#3498db',
  },
  text: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginRight: 15,
    padding: 10,
  },
  icon: {
    fontSize: 20,
    color: '#555',
  },
});
