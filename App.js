import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import LoginPage from './src/views/loginPage';
import Mydashboard from "./src/views/dashboard/mydashboard";
import Setting from "./src/views/setting";
import CCTVPage from "./src/views/Cctv";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Login' component={LoginPage} />
          <Stack.Screen name='mydashboard' component={Mydashboard} />
          <Stack.Screen name='CCTV' component={CCTVPage} />
          <Stack.Screen name='Setting' component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
