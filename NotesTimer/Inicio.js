import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,TouchableOpacity, StyleSheet,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import CriarNota from './CriarNota';
import { useNavigation } from '@react-navigation/native';


const Inicio = () => {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingNoteIndex, setEditingNoteIndex] = useState(null);
  const navigation = useNavigation();

  const startTimer = () => {
    navigation.navigate('Timer');
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const editNote = (index) => {
    setEditingNoteIndex(index);
    toggleModal();
  };

  const updateNote = (editedNote) => {
    const updatedNotes = [...notes];
    updatedNotes[editingNoteIndex] = editedNote;
    setNotes(updatedNotes);
    toggleModal();
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };
    const carregarDados = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const items = await AsyncStorage.multiGet(keys);

        const parsedItems = items.map(([key, value]) => ({
          id: key,
          ...JSON.parse(value),
        }));

        setData(parsedItems);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      }
    };
    

    useFocusEffect(
      React.useCallback(() => {
        carregarDados();
      }, [])
    );

  

  // const renderItem = ({ item }) => (
  //   <View style={styles.container}>
  //     <TouchableOpacity
  //     style={styles.notes}
  //       onPress={() => navigation.navigate('Visualizar', { item })}
  //     >
  //       <Text style={styles.text} numberOfLines={1}>Título: {item.titulo}</Text>
  //       <Text style={styles.text} numberOfLines={2}>Descrição: {item.descricao}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Suas Notas</Text>
      
      
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (
          <View style={styles.notes}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDescription}>{item.description}</Text>
            <Button title="Editar" onPress={() => editNote(index)} />
            <Button title="Excluir" onPress={() => deleteNote(index)} color="red" />
            <Button title="Iniciar Timer" onPress={startTimer} color='gray'/>
          </View>
        )}
      />

      <View style={styles.button}>
      <Button title="Adicionar Nota" onPress={toggleModal} style={styles.button} color='red' />
      </View>

      <CriarNota
        visible={isModalVisible}
        onSaveNote={editingNoteIndex !== null ? updateNote : addNote}
        onCloseModal={toggleModal}
        initialNote={editingNoteIndex !== null ? notes[editingNoteIndex] : null}
      />
    </View>
  );
};

export default Inicio;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'orange'
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  noteDescription: {
    fontSize: 16,
  },
  notes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 70,
    margin: 20,
    height: 280,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, 
    flex: 1,
    flexDirection: 'column', // Distribui itens horizontalmente
    justifyContent: 'space-between',
    
  },
  text:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor:'red',
    color:'orange',
    width: 250
  },
  button:{
    alignItems:'flex-end',
   
  }
  
});
