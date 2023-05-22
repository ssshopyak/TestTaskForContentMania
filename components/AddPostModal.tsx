import React, {FunctionComponent, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {height, width} from '../utils/screen';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';
import {createPost, sendPosts} from '../store/postSlice';
type Props = {
  modalVisible: boolean;
  setModalVisible: (active: boolean) => void;
};

const AddPostModal: FunctionComponent<Props> = ({
  modalVisible,
  setModalVisible,
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const sendPostsToServer = () => {
    dispatch(sendPosts({title: title, bodyText: body}));
    dispatch(createPost({title: title, body: body}));
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>Title</Text>
            <TextInput
              style={styles.inputs}
              editable
              multiline
              onChangeText={(text: any) => setTitle(text)}
              value={title}
            />
            <Text style={styles.textStyle}>Body</Text>
            <TextInput
              editable
              multiline
              onChangeText={(text: any) => setBody(text)}
              value={body}
              style={styles.inputs}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={sendPostsToServer}>
                <Text style={styles.textStyle}>Post</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width * 0.95,
    height: height * 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#3A4F50',
    borderRadius: 20,
    shadowColor: '#1B2223',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#1B2223',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-around',
  },
  textStyle: {
    color: '#F4FEFD',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputs: {
    borderRadius: 20,
    backgroundColor: '#1B2223',
    color: '#F4FEFD',
    margin: 15,
    padding: 15,
    height: '25%',
    width: '90%',
  },
});

export default AddPostModal;
