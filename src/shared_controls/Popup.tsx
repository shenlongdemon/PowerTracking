import {Modal, View, StyleSheet} from 'react-native';
import * as React from 'react';

const Popup = ({modalVisible, children}) => {
  return (
    <Modal animationType="fade" visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(43,83,99,0.27)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    alignSelf: 'center',
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
