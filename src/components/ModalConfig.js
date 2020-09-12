import React, {useState} from 'react';
import {StyleSheet, Modal, Text, View, TouchableHighlight} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputMask} from 'react-native-masked-text';
import BallonApprox from '../components/BallonApprox';

const ModalConfig = () => {
  const [inputCalc, setInputCalc] = useState('');
  const [inputManual, setInputManual] = useState('');
  const [inputQuant, setInputQuant] = useState('');
  const [resultCalc, setResultCalc] = useState('?');
  const [resultManual, setResultManual] = useState('?');
  const [resultQuant, setResultQuant] = useState('?');
  const [disabledCalc, setDisabledCalc] = useState(true);
  const [disabledManual, setDisabledManual] = useState(true);
  const [disabledQuant, setDisabledQuant] = useState(true);
  const [showBallon, setShowBallon] = useState(false);

  const verifyFieldCalc = (num) => {
    setResultManual('?');
    setInputManual('');
    setDisabledManual(true);
    let val = Number(num.replace(',', '.'));
    num.length >= 5 && num.length <= 6
      ? (setResultCalc((val * 35).toFixed(0)), setDisabledCalc(false))
      : (setResultCalc('?'), setDisabledCalc(true));
    val == 0.0 || val == 0.0 ? setInputCalc('') : null;
  };

  const verifyFieldManual = (num) => {
    setResultCalc('?');
    setInputCalc('');
    setDisabledCalc(true);
    num.length >= 5
      ? (setResultManual(num), setDisabledManual(false))
      : (setResultManual('?'), setDisabledManual(true));
  };

  const verifyFieldQuant = (num) => {
    num.length >= 3
      ? (setResultQuant(num), setDisabledQuant(false))
      : (setResultQuant('?'), setDisabledQuant(true));
  };

  const closeAlert = () => {
    setShowBallon(false);
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => {}}>
      <View style={styles.vwContent}>
        {showBallon && (
          <BallonApprox
            closeAlert={() => closeAlert()}
            title="Por aproximação"
            visible={showBallon}
            position="center"
            onFine={(v) => {
              setInputManual(v);
              verifyFieldManual(v);
            }}
          />
        )}

        <View style={[styles.vwHeader, styles.kitJust]}>
          <TouchableHighlight
            onPress={() => {}}
            underlayColor="none"
            style={[styles.tchBack, styles.kitJust]}>
            <IconI name="chevron-back" size={35} color="#333" />
          </TouchableHighlight>
          <Text style={styles.txtConfig}>Configurações</Text>
        </View>
        <View style={styles.vwBody}>
          <View style={[styles.kitJust, styles.vwGroup]}>
            <Text style={styles.txtOption}>Objetivo com base em meu peso</Text>
            <View style={styles.vwBoxOption}>
              <View style={[styles.kitJust, styles.vwInp]}>
                <Text style={styles.txtTitleInp}>peso</Text>
                <TextInputMask
                  keyboardType="numeric"
                  options={{
                    precision: 2,
                    separator: '.',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: '',
                  }}
                  type={'money'}
                  value={inputCalc}
                  onChangeText={(txt) => {
                    setInputCalc(txt);
                    verifyFieldCalc(txt);
                  }}
                  maxLength={6}
                  style={styles.inpPeso}
                  placeholder="63,00"
                  placeholderTextColor="rgba(0,0,0,0.15)"
                />
              </View>
              <Text style={styles.txtFirstKg}>Kg</Text>
              <Text style={styles.txtFirstX}>X</Text>
              <View style={[styles.kitJust, styles.vw35ml]}>
                <TouchableHighlight onPress={() => {}} underlayColor="none">
                  <>
                    <IconFA
                      name="question-circle"
                      size={10}
                      color="#333"
                      style={[styles.txtTitleInp, styles.iconQuestion]}
                    />
                    <Text style={styles.txt35ml}>35ml</Text>
                  </>
                </TouchableHighlight>
              </View>
              <Text style={styles.txtEqual}>=</Text>
              <Text style={styles.txtFirstResult}>{resultCalc}</Text>
              <Text style={styles.txtFirstMl}>ml</Text>
            </View>
            <View>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {}}
                disabled={disabledCalc}
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  Definir {resultCalc} como objetivo
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          {/* ------------------------------ */}

          <View style={[styles.kitJust, styles.vwGroup]}>
            <Text style={styles.txtOption}>Objetivo manualmente</Text>
            <View style={styles.vwBoxOption}>
              <TextInputMask
                keyboardType="numeric"
                maxLength={5}
                type={'money'}
                options={{
                  precision: 0,
                  separator: '.',
                  delimiter: '.',
                  unit: '',
                  suffixUnit: '',
                }}
                value={inputManual}
                onChangeText={(txt) => {
                  setInputManual(txt);
                  verifyFieldManual(txt);
                }}
                style={[styles.inpPeso, styles.inpObjManual]}
                placeholder="1.800"
                placeholderTextColor="rgba(0,0,0,0.15)"
              />

              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 20,
                  color: '#31949e',
                  fontWeight: 'bold',
                }}>
                mililitros
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {}}
                disabled={disabledManual}
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  Definir {resultManual} como objetivo
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => setShowBallon(true)}
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  <IconMIC name="approximately-equal-box" size={25} />
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.kitJust, styles.vwGroup]}>
            <Text style={styles.txtOption}>Definir quantidade</Text>
            <View style={styles.vwBoxOption}>
              <TextInputMask
                type={'only-numbers'}
                value={inputQuant}
                onChangeText={(txt) => {
                  setInputQuant(txt);
                  verifyFieldQuant(txt);
                }}
                keyboardType="numeric"
                maxLength={3}
                style={[styles.inpPeso, styles.inpQuant]}
                placeholder="200"
                placeholderTextColor="rgba(0,0,0,0.15)"
              />

              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 20,
                  color: '#31949e',
                  fontWeight: 'bold',
                }}>
                mililitros
              </Text>
            </View>
            <View>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {}}
                disabled={disabledQuant}
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  Definir {resultQuant} como quantidade
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    paddingTop: 18,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
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
    paddingTop: 20,
    paddingLeft: 3,
    fontSize: 20,
    color: '#31949e',
    fontWeight: 'bold',
  },
  tchCalcOption: {
    backgroundColor: '#31949e',
    padding: 10,
    borderRadius: 3,
    borderBottomWidth: 3,
    borderColor: '#1d6970',
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCalcOption: {
    color: '#FFFFFF',
    fontSize: 17,
  },
  txtShadow: {
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowRadius: 2,
    textShadowOffset: {height: 0.5, width: -0.5},
  },
  vwGroup: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ModalConfig;
