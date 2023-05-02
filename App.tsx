/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryItemDetailsScreen } from './components/HistoryDetailsScreen/HistoryDetailsScreen';
import { TEXT } from './variables/text';
import { MainScreen } from './components/MainScreen/MainScreen';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
    console.log('OK');

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={TEXT.APP.SCREENS.MAIN}
                    component={MainScreen}
                />
                <Stack.Screen
                    name={TEXT.APP.SCREENS.DETAILS}
                    component={HistoryItemDetailsScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
export default Root;
