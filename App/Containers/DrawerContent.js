import React, { Component } from "react";
import { ScrollView, Image, BackHandler } from "react-native";
import { List, ListItem, Text, View, Content } from "native-base";

import styles from "./Styles/DrawerContentStyles";
import { Images } from "../Themes";
import { DrawerItems } from 'react-navigation';

import I18n from '../I18n';

class DrawerContent extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.drawer_header}>
					<Text style={styles.header_list_title}>{I18n.t('welcome')}</Text>
				</View>
				<Content>
					<DrawerItems {...this.props} />
				</Content>
			</View>
		);
	}
}

export default DrawerContent;
