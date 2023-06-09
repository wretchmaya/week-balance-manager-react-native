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
import { BalanceCalculationScreen } from './components/BalanceCalculationScreen/BalanceCalculationScreen';
import { ROUTES } from './variables/routes';
import { HomeScreenTabs } from './components/HomeScreenTabs/HomeScreenTabs';

const Stack = createNativeStackNavigator();

const App = (): JSX.Element => {
    console.log('OK');

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name={ROUTES.SCREENS.HOME}
                    component={HomeScreenTabs}
                />
                <Stack.Screen
                    name={ROUTES.SCREENS.DETAILS}
                    component={HistoryItemDetailsScreen}
                />
                <Stack.Screen
                    name={ROUTES.SCREENS.BALANCE_CALCULATION}
                    component={BalanceCalculationScreen}
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
