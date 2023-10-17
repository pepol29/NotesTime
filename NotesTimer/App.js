import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CriarNota from './CriarNota';
import Inicio from './Inicio'
import Timer from './Timer'



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>    
      <Tab.Navigator>
        <Tab.Screen name="Inicio" component={Inicio}/>
        <Tab.Screen name="Criar" component={CriarNota}/>
        <Tab.Screen name="Timer" component={Timer}/>
      </Tab.Navigator>
    </NavigationContainer>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cor: {
    backgroundColor: '#FFFFF0'
  }
});
