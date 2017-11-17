import React from "react";
import { DrawerNavigator } from "react-navigation";
import HomeScreen from '../Containers/HomeScreen'
import ListviewExample from "../Containers/ListviewExample";
import CardExample from "../Containers/CardExample";
import DrawerContent from "../Containers/DrawerContent";

import styles from "./Styles/NavigationStyles";

const DrawerRoutes = {
  	HomeScreen: { screen: HomeScreen },
		ListviewExample: { screen: ListviewExample },
		CardExample: { screen: CardExample },
	}

const RouteConfigs = {
  initialRouteName: "HomeScreen",
  contentComponent: (props) => <DrawerContent {...props} />,
  contentOptions: {
    activeTintColor: '#0F6D38',
    itemsContainerStyle: {
      marginVertical: 2,
    },
  }


}

const NavigationDrawer = DrawerNavigator(DrawerRoutes,RouteConfigs);

export default NavigationDrawer;
