import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FullHistoryTab } from '../FullHistoryTab/FullHistoryTab';
import { ROUTES } from '../../variables/routes';
import { MainTab } from '../MainTab/MainTab';

const Tab = createBottomTabNavigator();

export const HomeScreenTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name={ROUTES.TABS.MAIN} component={MainTab} />
            <Tab.Screen
                name={ROUTES.TABS.FULL_HISTORY}
                component={FullHistoryTab}
            />
        </Tab.Navigator>
    );
};
