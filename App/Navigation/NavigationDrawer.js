import React from "react";
import { DrawerNavigator, StackNavigator } from "react-navigation";
import ProductScreen from '../Containers/ProductScreen'
import HomeScreen from '../Containers/HomeScreen'
import ListviewExample from "../Containers/ListviewExample";
import CardExample from "../Containers/CardExample";
import DrawerContent from "../Containers/DrawerContent";

import styles from "./Styles/NavigationStyles";
import I18n from '../I18n';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const HomeNavigation = StackNavigator({
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        drawerLabel: I18n.t('HomeScreenDrawerLabel'),
        drawerIcon: ({ tintColor }) => (<Icon name="coffee" size={25} color="#0F6D38"/>),
      }
    },
    ProductScreen: {
      screen: ProductScreen,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      }
    },
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
  });

const DrawerRoutes = {
	HomeScreen: { screen: HomeNavigation },
	ListviewExample: { screen: ListviewExample },
	CardExample: { screen: CardExample },
}

const RouteConfigs = {
  initialRouteName: "HomeScreen",
  contentComponent: (props) => <DrawerContent {...props} />,
  contentOptions: {
    activeTintColor: '#0F6D38',
  }
}

const NavigationDrawer = DrawerNavigator(DrawerRoutes,RouteConfigs);

export default NavigationDrawer;
