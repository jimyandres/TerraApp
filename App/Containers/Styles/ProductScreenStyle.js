import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'
const entryBorderRadius = 8;
const win = Dimensions.get('window');
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  slide: {
    height: 250,
  },
  header: {
    backgroundColor: Colors.primary,
  },
  image: {
    flex: 1,
    width: win.width -10,
    height: win.height,
    borderRadius: 8,
  },
  imageContainer: {
    height: 200,
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  },
  linkProducer: {
    fontSize: 15,
    color: '#0F6D38',
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
