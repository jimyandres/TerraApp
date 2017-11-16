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
  }
})
