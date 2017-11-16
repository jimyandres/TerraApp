import React, { Component, PropTypes } from 'react'
import { BackHandler, Alert, FlatList, Image, ListView, View } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, Title, Icon, Footer, FooterTab, Card, CardItem, ListItem } from 'native-base'
import { connect } from "react-redux";
import HomeActions from "../Redux/HomeRedux";
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

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

  // _renderProduct = ({ item }) => {
  //   return (
  //     <Card style={{ flex: 0 }}>
  //       <CardItem header>
  //         <Image
  //           style={{ resizeMode: "cover", height: 100, flex: 1 }}
  //           source={{ uri: item.fotos[0].url }}
  //         />
  //       </CardItem>
  //       <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
  //         <Text style={styles.h6}>{item.nombre}</Text>
  //         <Text note style={styles.text}>${item.precioEmpaque}</Text>
  //       </CardItem>
  //       <CardItem>
  //         <Text style={styles.description}>{item.descripcion}</Text>
  //       </CardItem>
  //     </Card>
  //   );
  // };

  constructor(props) {
		super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2

    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    // Datasource is always in state
    this.state = {
      dataSource: ds.cloneWithRows(props.data)
    }

		this.isAttempting = false;
	}
  // <Image
  // style={{ resizeMode: "cover", height: 100, flex: 1 }}
  // source={{ uri: item.fotos[0].url }}
  // />
  // <View>
  //   <Text style={styles.boldLabel}>{item.nombre}</Text>
  //   <Text note style={styles.label}>${item.precioEmpaque}</Text>
  //   <Text style={styles.description}>{item.descripcion}</Text>
  // </View>
  renderRow (item) {
    return (
        <Card style={styles.row}>
          <CardItem cardBody>
            <Image
            style={{ resizeMode: "cover", height: 150, flex: 1}}
              source={{ uri: item.fotos[0].url }}
            />
          </CardItem>
          <CardItem style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text note style={[styles.label, { alignItems: 'flex-start',justifyContent: 'flex-start' }]}>${item.precioEmpaque}</Text>
            <Text style={[styles.boldLabel, { alignItems: 'flex-start', justifyContent: 'flex-start' }]}>{item.nombre}</Text>
          </CardItem>
        </Card>
    )
  }

  componentWillReceiveProps(newProps) {
		// this.forceUpdate();
    if (newProps.data) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.data)
      })
    }
		// Did the login attempt complete?
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
    return this.state.dataSource.getRowCount() === 0
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
    return (
      <Container>
        <Header>
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
          <AlertMessage title='Nothing to See Here, Move Along' show={this.noRowData()} />
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            pageSize={15}
            enableEmptySections
          />
        </Content>

      </Container>
    )
  }
}

// <FlatList data={this.props.data} keyExtractor={product => product.idPublicacion} renderItem={this._renderProduct} pageSize={15} />
const mapStateToProps = state => {
	return {
		fetching: state.home.fetching,
    error: state.home.error,
    data: state.home.data ? state.home.data.products.data : []
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchProducts: () => dispatch(HomeActions.homeRequest()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
