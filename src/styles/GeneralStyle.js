import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerPrincipal: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderColor: 'rgba(49, 148, 158,0.1)',
  },
  txtHeaderPrincipal: {
    fontSize: 25,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    color: '#31949e',
  },
  txtShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
  },
  tchHeaderMenu: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
