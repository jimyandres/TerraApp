import React, { Component } from 'react'
import { BackHandler, View, Image, Dimensions, StatusBar } from 'react-native'
import { Content, Container, Header, Left, Right, Body, Button, Text, Title, Icon } from 'native-base'
import { connect } from 'react-redux'

import I18n from '../I18n';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';

// Styles
import styles from './Styles/ProductScreenStyle';
import Colors from '../Themes/Colors';

const { width, height } = Dimensions.get('window');

class ProductScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      size: { width, height },
      slider1ActiveSlide: 1,
      slider1Ref: null
    };
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true
    })
  }

  renderImagesCarousel = ({item, index}, parallaxProps) => {
    // console.error(item.image);
      return (
        <View style={styles.slide}>
          <Image style={styles.image} source={{ uri: item.image }} />
        </View>
      );
    }

  render () {
    const {goBack} = this.props.navigation;
    const arrayImages = [
      {
        "image": "https://terra-quimbaya-storage.s3-us-west-2.amazonaws.com/products/1443887620/1443887620_2017_10_01_015529_0.jpeg"
      },
      {
        "image": "https://terra-quimbaya-storage.s3-us-west-2.amazonaws.com/products/1443887620/1443887620_2017_10_01_015529_1.jpeg"
      },
      {
        "image": "https://terra-quimbaya-storage.s3-us-west-2.amazonaws.com/products/1443887620/1443887620_2017_10_01_015529_2.jpeg"
      }
    ];
    const { slider1ActiveSlide, slider1Ref } = this.state;
    return (
      <Container>
        <Header style={styles.header}>
          <StatusBar backgroundColor={Colors.primaryStatusBar} />
          <Left>
            <Button
              transparent
              onPress={() => goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>ProductScreen</Title>
          </Body>
          <Right />

        </Header>

        <Content style={{ paddingTop: 5 }}>
          <View style={{height: 250, alignItems: 'center'}}>
            <Carousel
              ref={(c) => { if (!this.state.slider1Ref) { this.setState({ slider1Ref: c }); } }}
              data={arrayImages}
              renderItem={this.renderImagesCarousel}
              sliderWidth={this.state.size.width }
              itemWidth={this.state.size.width - 10}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
              autoplayDelay={5000}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
          </View>

          <Pagination
            dotsLength={arrayImages.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor="#0F6D38"
            dotStyle={styles.paginationDot}
            inactiveDotColor="#000"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref}
            tappableDots={!!slider1Ref}
          />

          <View style={{ paddingHorizontal: 10}}>
            <Text style={{ paddingVertical:15}}>
              {I18n.t('by')}
              <Text style={[styles.linkProducer]}>
                 {', '}*Productor*
              </Text>
            </Text>

            <Text style={styles.productName}>
               *Nombre producto*
            </Text>

            <View>
              <Text>*Calificacion*</Text>
            </View>

            <Text>*Precio*</Text>

          </View>

        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen)
