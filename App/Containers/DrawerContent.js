import React, { Component } from "react";
import { ScrollView, Image, BackHandler } from "react-native";
import { List, ListItem, Text, View, Content } from "native-base";

import styles from "./Styles/DrawerContentStyles";
import { Images } from "../Themes";
import { DrawerItems } from 'react-navigation';

class DrawerContent extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image source={Images.logoDark} style={styles.logo} />
				<Content>
					<DrawerItems {...this.props} />
				</Content>
			</View>
		);
	}
}

export default DrawerContent;
