import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  kitJust: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vwContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  vwHeader: {
    flexDirection: 'row',
    height: 60,
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  tchBack: {
    position: 'absolute',
    left: 0,
    height: 60,
    width: 60,
  },
  tchRestore: {
    position: 'absolute',
    left: 0,
    paddingRight: 3,
    paddingBottom: 2,
    backgroundColor: '#31949e',
    borderBottomRightRadius: 25,
    width: 40,
    height: 40,
  },
  txtConfig: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#333',
  },
  txtOption: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inpPeso: {
    height: 45,
    width: 75,
    borderWidth: 3,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    borderRadius: 15,
    textAlign: 'center',
    borderColor: '#31949e',
    padding: 10,
    fontSize: 17,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  inpObjManual: {
    width: 120,
  },
  inpQuant: {
    width: 80,
  },
  txtTitleInp: {
    color: 'rgba(0,0,0,0.15)',
    fontWeight: 'bold',
  },
  vwBoxOption: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconQuestion: {
    alignSelf: 'flex-end',
  },
  positionIconQuestion: {
    position: 'absolute',
    top: -5,
  },
  txt35ml: {
    fontSize: 20,
    color: '#31949e',
    fontWeight: 'bold',
  },
  vw35ml: {
    paddingTop: 8,
  },
  vwInp: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  txtFirstKg: {
    alignSelf: 'center',
    paddingTop: 18,
    fontSize: 20,
    color: '#31949e',
    fontWeight: 'bold',
  },
  txtFirstX: {
    alignSelf: 'center',
    paddingTop: 20,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 15,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  txtEqual: {
    alignSelf: 'center',
    paddingTop: 18,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 25,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  txtFirstResult: {
    alignSelf: 'center',
    paddingTop: 18,
    fontSize: 25,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  txtFirstMl: {
    alignSelf: 'center',
    paddingTop: 18,
    paddingLeft: 3,
    fontSize: 20,
    color: '#31949e',
    fontWeight: 'bold',
  },
  tchCalcOption: (disabled) => ({
    backgroundColor: disabled ? 'rgba(0,0,0,0.05)' : '#31949e',
    padding: 10,
    borderRadius: 3,
    borderBottomWidth: 3,
    borderColor: disabled ? 'rgba(0,0,0,0.1)' : '#1d6970',
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  txtCalcOption: (disabled) => ({
    color: disabled ? 'rgba(0,0,0,0.15)' : '#FFFFFF',
    fontSize: 17,
  }),
  txtShadow: (disabled) => ({
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: disabled ? 0 : 2,
    textShadowOffset: {height: 0.5, width: -0.5},
  }),
  vwGroup: {
    marginTop: 20,
    marginBottom: 20,
  },
  txtMili: {
    marginLeft: 5,
    fontSize: 20,
    color: '#31949e',
    fontWeight: 'bold',
  },
  vwContentManual: {
    flexDirection: 'row',
  },
  vwFooter: {
    height: 150,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    padding: 10,
    alignItems: 'center',
  },
  txtTitleFooter: {
    fontSize: 16,
    color: '#31949e',
    fontWeight: 'bold',
  },
  vwContentFooter: {
    flexDirection: 'row',
    height: '80%',
  },
  vwBoxLeft: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInfoLeft: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  txtObjFinal: (obj) => ({
    fontSize: obj != 'indefinido' ? 18 : 14,
    color: obj != 'indefinido' ? '#31949e' : 'rgba(0,0,0,0.25)',
  }),
  txtQuantFinal: (obj) => ({
    fontSize: obj != 'indefinida' ? 18 : 14,
    color: obj != 'indefinida' ? '#31949e' : 'rgba(0,0,0,0.25)',
  }),
  txtResultFinal: {
    fontSize: 18,
    color: '#31949e',
  },
  vwBoxRight: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svConfig: {
    flex: 1,
  },
  TTP: {
    borderRadius: 3,
    borderLeftWidth: 3,
    borderColor: '#1d6970',
  },
  txtContentTTP: {
    textAlign: 'justify',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowRadius: 2,
    textShadowOffset: {height: 1, width: -1},
    paddingRight: 5,
  },
  tchKnowMoreTTP: {
    backgroundColor: '#1d6970',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
    paddingRight: 7,
    paddingLeft: 7,
    alignSelf: 'flex-end',
  },
  txtKnowMoreTTP: {
    color: '#FFFFFF',
    fontSize: 11,
  },
});

export default styles;
