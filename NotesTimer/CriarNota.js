import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const CriarNota = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (props.initialNote) {
      setTitle(props.initialNote.title);
      setDescription(props.initialNote.description);
    }
  }, [props.initialNote]);

  const saveNote = () => {
    // Envie os dados da nota para a função pai para salvar ou atualizar a nota
    props.onSaveNote({
      title,
      description,
    });

    // Limpe os campos e feche o modal
    setTitle('');
    setDescription('');
    props.onCloseModal();
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Criar/Editar Nota</Text>
        <TextInput
          style={styles.input}
          placeholder="Título da Nota"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição da Nota"
          onChangeText={(text) => setDescription(text)}
          value={description}
          multiline
        />
        <Button title="Salvar" onPress={saveNote} />
        <Button title="Cancelar" onPress={props.onCloseModal} color="red" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  noteItem: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
   
  },
  noteTitle: {
    fontSize: 18,
  },
  noteDescription: {
    fontSize: 16,
  },
});

export default CriarNota;
