/**
 * This is a Navigation file which is wired already with Bottom Tab Navigation.
 * If you don't like it, feel free to replace with your own setup.
 * Uncomment commented lines from return() of RootNavigation to wire Login flow
 */
import React, {useEffect} from 'react';
import {ColorValue} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';

// Hook for theme change (Light/Dark Mode)
import {useTheme} from '../theme/useTheme';
// Get Value from Keyring (Encrypted token)
import {getSecureValue} from '../utils/keyChain';
// Redux slice for updating Access Token to store
import {updateToken} from '../store/userSlice';

import {RootState} from '../store/store';

// Screens
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Tasks from '../screens/Tasks';
import NetworkExample from '../screens/NetworkExample';
import Settings from '../screens/Settings';
import ForgetPassword from '../screens/auth/Forget';
import Otp from '../screens/auth/Otp';
import ResetPassword from '../screens/auth/Reset';

// Icons for Bottom Tab Navigation
const homeIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="ios-list-sharp" size={30} color={color} />
);
const networkIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="wifi-sharp" size={24} color={color} />
);
const settingsIcon = ({color}: {color: ColorValue | number}) => (
  <Icon name="ios-settings-sharp" size={24} color={color} />
);

// Root Navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  // Copy existing token from local storage to redux store
  useEffect(() => {
    async function checkIsLogined() {
      try {
        let temp = await getSecureValue('token');
        dispatch(updateToken({token: temp}));
      } catch (e) {}
    }
    checkIsLogined();
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user.token ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.cardBg,
              borderTopColor: theme?.layoutBg,
            },
            tabBarInactiveTintColor: theme.color,
            tabBarActiveTintColor: theme.primary,
            headerStyle: {backgroundColor: theme.cardBg, height: 50},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: theme.primary,
              fontSize: 18,
              fontWeight: 'bold',
            },
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="To Do"
            component={Tasks}
            options={{
              tabBarIcon: homeIcon,
            }}
          />
          <Tab.Screen
            name="NetworkExample"
            component={NetworkExample}
            options={{
              tabBarIcon: networkIcon,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              // headerShown: false,
              tabBarIcon: settingsIcon,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{animation: 'flip'}}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{animation: 'fade_from_bottom'}}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{animation: 'fade_from_bottom'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
