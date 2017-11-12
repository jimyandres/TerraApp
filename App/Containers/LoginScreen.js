import React, { PropTypes } from "react";
import { View, ScrollView, Text, TextInput, TouchableOpacity, Image, Keyboard, LayoutAnimation } from "react-native";
import { connect } from "react-redux";
import Styles from "./Styles/LoginScreenStyles";
import { Images, Metrics } from "../Themes";
import LoginActions from "../Redux/LoginRedux";
import { Button, Text as NBText, Contant, Form, Item, Input, Label } from "native-base";
import I18n from '../I18n';

class LoginScreen extends React.Component {
	static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
		attemptLogin: PropTypes.func,
	};

	isAttempting = false;
	keyboardDidShowListener = {};
	keyboardDidHideListener = {};

	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			visibleHeight: Metrics.screenHeight,
			topLogo: { width: Metrics.screenWidth - 40 },
		};
		this.isAttempting = false;
	}

	componentWillReceiveProps(newProps) {
		this.forceUpdate();
		// Did the login attempt complete?
		if (this.isAttempting && !newProps.fetching) {
			this.props.navigation.goBack();
		}
	}

	componentWillMount() {
		// Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
		// TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
		this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	keyboardDidShow = e => {
		// Animation types easeInEaseOut/linear/spring
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		let newSize = Metrics.screenHeight - e.endCoordinates.height;
		this.setState({
			visibleHeight: newSize,
			topLogo: { width: 150, height: 100 },
		});
	};

	keyboardDidHide = e => {
		// Animation types easeInEaseOut/linear/spring
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({
			visibleHeight: Metrics.screenHeight,
			topLogo: { width: Metrics.screenWidth - 40 },
		});
	};

	handlePressLogin = () => {
		// const { username, password } = this.state
		// this.isAttempting = true
		// attempt a login - a saga is listening to pick it up from here.
		// this.props.attemptLogin(username, password);
		this.props.navigation.navigate("LaunchScreen");
	};

	handleChangeUsername = text => {
		this.setState({ username: text });
	};

	handleChangePassword = text => {
		this.setState({ password: text });
	};

	render() {
		const { username, password } = this.state;
		const { fetching } = this.props;
		const editable = !fetching;
		const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly;
		return (
			<ScrollView
				contentContainerStyle={{ justifyContent: "center" }}
				style={[Styles.container, { height: this.state.visibleHeight }]}
				keyboardShouldPersistTaps="always"
			>
				<Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
				<View style={Styles.formLogin}>
					<Form>
						<Item stackedLabel>
							<Input
								ref="username"
								placeholder={I18n.t('username')}
								value={username}
								editable={editable}
								keyboardType="email-address"
								returnKeyType="next"
								autoCapitalize="none"
								autoCorrect={false}
								onChangeText={this.handleChangeUsername}
								underlineColorAndroid="transparent"
								onSubmitEditing={() => this.password._root.focus()}
							/>
						</Item>
						<Item stackedLabel>
							<Input
								ref={ref => (this.password = ref)}
								placeholder={I18n.t('password')}
								value={password}
								editable={editable}
								keyboardType="default"
								returnKeyType="go"
								autoCapitalize="none"
								autoCorrect={false}
								secureTextEntry
								onChangeText={this.handleChangePassword}
								underlineColorAndroid="transparent"
								onSubmitEditing={this.handlePressLogin}
							/>
						</Item>
					</Form>
					<View style={[Styles.loginRow]}>
						<Button
							style={[Styles.loginButton]}
							full onPress={this.handlePressLogin}
							>
							<NBText>{I18n.t('signIn')}</NBText>
						</Button>
					</View>
					<View style={{ padding:15, alignItems:'center' }}>
            <Text style={[Styles.text]}>O</Text>
            <Text style={{ paddingVertical:15}}>
              ¿No tienes una cuenta?
              <Text style={[Styles.linkRegister]}>
                 {' '}Registrate
              </Text>
            </Text>
          </View>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => {
	return {
		fetching: state.login.fetching,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
