import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    width: 250,
    height: 250,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    // backgroundColor: Colors.ricePaper,
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: Colors.coal,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'flex-start',
    color: Colors.primary,
    textAlign: 'left',
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header: {
    backgroundColor: Colors.primary,
  },
  header_list: {
    height: 200,
    elevation: 4,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header_list_image: {
    position: 'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0
  },
  header_list_logo: {
    width: 80,
    height: 80,
  },
  header_list_text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_list_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  header_list_sub: {
    fontSize: 15,
    color: 'white'
  },
  content_header_list: {
      width: '100%',
  },
  content_list_title: {
    marginTop: 15,
    fontSize: 20
  },
})
