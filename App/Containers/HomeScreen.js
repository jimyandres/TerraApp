import React, { Component, PropTypes } from 'react'
import { BackHandler, Alert, FlatList, Image, ListView, View } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, Title, Icon, Footer, FooterTab, Card, CardItem, ListItem } from 'native-base'
import { connect } from "react-redux";
import HomeActions from "../Redux/HomeRedux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import ConvertToMoney from "../Transforms/ConvertToMoney"

import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/HomeScreenStyle'
// import styles from './Styles/ListviewGridExampleStyles'

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

  _keyExtractor = (item, index) => item.idPublicacion;

  renderRow = ({item}) => {
    return (
      <Card>
        <CardItem cardBody>
          <Image
          style={{ resizeMode: "cover", height: 125, flex: 1}}
            source={{ uri: item.fotos[0].url }}
          />
        </CardItem>
        <CardItem style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={[styles.boldLabel]}>{item.nombre}</Text>
            <Text note style={[styles.label]}>$ {ConvertToMoney(item.precioEmpaque, 2, ',', '.')}</Text>
          </View>
          <Text note numberOfLines={2}>{item.descripcion}</Text>
        </CardItem>
      </Card>
    )
  }

  componentWillReceiveProps(newProps) {
		// Did the products fetch attempt complete?
		if (this.isAttempting && !newProps.fetching) {
			if (newProps.error) {
        if (newProps.error.status === 'failed') {
          Alert.alert('Error', newProps.error.message, [{text: 'OK'}])
        }
      }
		}
	}

  // Used for friendly AlertMessage
  // returns true if the dataSource is empty
  noRowData () {
    return !this.props.data || this.props.data.products.total === 0;
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })

    this.isAttempting = true
    this.props.fetchProducts();
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

        <Content padder>
          <Text>Productos Disponibles</Text>

          <FlatList
            data={products}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderRow}
            ListEmptyComponent={<AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />}
            contentContainerStyle={styles.listContent}
            numColumns={2} />
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
