import React from 'react';
import { TabRouter, createNavigator, createNavigationContainer, addNavigationHelpers } from 'react-navigation';

import Profile from '../Screen/Profile'
import Community from '../Screen/Main.js'
import Promotions from '../Screen/Promotions'
import Notifications from '../Screen/Notifications'
import AnswersPage from '../Screen/AnswersPage.js'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';

const CustomTabBar = ({ navigation }) => {

  const { routes } = navigation.state;
  return (
    <View style={styles.tabContainer}>
      {routes.map(route => (
        <TouchableOpacity
          onPress={() => navigation.navigate(route.routeName)}
          style={styles.tab}
          key={route.routeName}
        >
          <View>
            <Icon name={icon[route.routeName]} size={40} color='white'/>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CustomTabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} />
      <ActiveScreen
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
      />
    </View>
  );
};

const CustomTabRouter = TabRouter(
  {
    Profile:{
      screen: Profile
    },
    Community: {
      screen: Community,
    },
    Promotions: {
      screen: Promotions,
    },
    Notifications: {
      screen: Notifications
    }
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Community',
  }
);

const NavigatorRoot = createNavigationContainer(
  createNavigator(CustomTabRouter)(CustomTabView)
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#35D0C1',
  },
  tabContainer: {
    flexDirection: 'row',
    height: 48,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
});

const icon = {
  Profile: 'face',
  Community: 'account-multiple',
  Promotions: 'ios-megaphone',
  Notifications:'bell-outline'
}
export default NavigatorRoot;
