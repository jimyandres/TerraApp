import React, { Component, PropTypes } from 'react'
import { BackHandler, Alert, FlatList, Image, ListView, View } from 'react-native'
import {
  Content,
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Text,
  Title,
  Icon,
  Footer,
  FooterTab,
  Card,
  CardItem,
  ListItem,
  StatusBar
} from 'native-base'
import { connect } from "react-redux";
import HomeActions from "../Redux/HomeRedux";

import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  static propTypes = {
		dispatch: PropTypes.func,
		fetching: PropTypes.bool,
	};

  isAttempting = false;

  constructor(props) {
		super(props);

		this.isAttempting = false;
	}

  renderHeader = () => {
    const image_header = 'http://www.terraquimbaya.com/img/ImagenesTerra/DSCN7055.JPG';
    const availability = this.noRowData() ? 'No hay productos diponibles en este momento' : 'Productos disponibles';
    return (
      <View style={styles.content_header_list}>
        <View style={styles.header_list}>
          <Image style={styles.header_list_image} source={{ uri: image_header }} />
          <View style={styles.header_list_text}>
            <Image style={styles.header_list_logo} source={require('../Images/logo_white.png')} />
            <Text style={styles.header_list_title}>Terra Quimbaya</Text>
            <Text style={styles.header_list_sub}>Bienvenido</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', paddingBottom: 15}}>
          <Text style={styles.content_list_title}>{ availability }</Text>
        </View>
      </View>);
  }

  renderRow ({ item, index }) {
    return (
        <Card style={styles.row}>
          <CardItem cardBody>
            <Image
            style={{ resizeMode: "cover", height: 125, flex: 1}}
              source={{ uri: item.fotos[0].url }}
            />
          </CardItem>
          <CardItem style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text note style={[styles.label, { alignItems: 'flex-start',justifyContent: 'flex-start' }]}>${item.precioEmpaque}</Text>
            <Text style={[styles.boldLabel, { alignItems: 'flex-start', justifyContent: 'flex-start' }]}>{item.nombre}</Text>
            <Text note numberOfLines={2}>{item.descripcion}</Text>
          </CardItem>
        </Card>
    )
  }

  componentWillReceiveProps(newProps) {
		// Did the products fetch attempt complete?
		if (this.isAttempting && !newProps.fetching) {
      this.isAttempting = false
			if (newProps.error) {
        if (newProps.error.status === 'failed') {
          Alert.alert('Error', newProps.error.message, [{text: 'OK'}])
        }
      }
		}
	}

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData = () => {
    return !this.props.data || this.props.data.products.total === 0
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

    this.isAttempting = true
    this.props.fetchProducts();
  }

  renderItem({ item, index }) {
    return <Text style={styles.row}>{item.nombre}</Text>;
  }

  render () {
    const products = this.props.data ? this.props.data.products.data : []
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />

        </Header>

        <Content>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={products}
            numColumns={2}
            renderItem={this.renderRow}
            ListEmptyComponent={<AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />}
          />

        </Content>

      </Container>
    )
  }
}

const mapStateToProps = state => {
	return {
		fetching: state.home.fetching,
    error: state.home.error,
    data: state.home.data ? state.home.data : null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => dispatch(HomeActions.homeRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
