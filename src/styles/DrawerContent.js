import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  vwHeaderDrawer: {
    height: 70,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  txtHeaderDrawer: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333333',
  },
  lblDrawerOptions: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  tchPrefs: {
    marginRight: 10,
    marginLeft: 10,
  },
  vwDarkTheme: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 5,
  },
  tchReset: {
    alignItems: 'center',
    backgroundColor: '#333',
    width: '60%',
    alignSelf: 'center',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderRadius: 4,
    marginBottom: 25,
  },
  txtReset: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  vwSection: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
    marginBottom: 5,
    paddingBottom: 5,
  },
  txtPreferences: {
    color: '#333',
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  vwContent: {
    flex: 1,
  },
});

export default styles;
