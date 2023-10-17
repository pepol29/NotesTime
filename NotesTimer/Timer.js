import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Timer = ({ navigation }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Tempo decorrido: {seconds} segundos</Text>
      <Button
        title="Voltar para a Lista de Notas"
        onPress={() => navigation.navigate('Inicio')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
  },
});

export default Timer;
