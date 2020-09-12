import React, {useState} from 'react';
import {Modal, Text, View, TouchableHighlight, ScrollView} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputMask} from 'react-native-masked-text';
// EXTERNAL COMPONENTS
import BallonApprox from '../components/BallonApprox';
// EXTERNAL STYLES
import styles from '../styles/ModalConfig';
import {convertToNum} from '../scripts/converters';

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
  const [objFinal, setObjFinal] = useState('indefinido');
  const [quantFinal, setQuantFinal] = useState('indefinida');

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

  const verifyFinals = () => {
    return objFinal != 'indefinido' && quantFinal != 'indefinida'
      ? true
      : false;
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
        <ScrollView style={{flex: 1}}>
          <View>
            <View style={[styles.kitJust, styles.vwGroup]}>
              <Text style={styles.txtOption}>
                Objetivo com base em meu peso
              </Text>
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
                <Text style={styles.txtFirstResult}>
                  {convertToNum(resultCalc)}
                </Text>
                <Text style={styles.txtFirstMl}>ml</Text>
              </View>
              <View>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => setObjFinal(convertToNum(resultCalc))}
                  disabled={disabledCalc}
                  style={styles.tchCalcOption(disabledCalc)}>
                  <Text
                    style={[
                      styles.txtCalcOption(disabledCalc),
                      styles.txtShadow(disabledCalc),
                    ]}>
                    Definir {convertToNum(resultCalc)} como objetivo
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

                <Text style={styles.txtMili}>mililitros</Text>
              </View>
              <View style={styles.vwContentManual}>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => setObjFinal(convertToNum(resultManual))}
                  disabled={disabledManual}
                  style={styles.tchCalcOption(disabledManual)}>
                  <Text
                    style={[
                      styles.txtCalcOption(disabledManual),
                      styles.txtShadow(disabledManual),
                    ]}>
                    Definir {resultManual} como objetivo
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => setShowBallon(true)}
                  style={styles.tchCalcOption(false)}>
                  <Text
                    style={[
                      styles.txtCalcOption(false),
                      styles.txtShadow(false),
                    ]}>
                    <IconMIC name="approximately-equal-box" size={25} />
                  </Text>
                </TouchableHighlight>
              </View>
            </View>

            {/* ------------------------------ */}

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

                <Text style={styles.txtMili}>mililitros</Text>
              </View>
              <View>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => setQuantFinal(resultQuant)}
                  disabled={disabledQuant}
                  style={styles.tchCalcOption(disabledQuant)}>
                  <Text
                    style={[
                      styles.txtCalcOption(disabledQuant),
                      styles.txtShadow(disabledQuant),
                    ]}>
                    Definir {resultQuant} como quantidade
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.vwFooter}>
          <Text style={styles.txtTitleFooter}>
            Configurado até o momento...
          </Text>

          <View style={styles.vwContentFooter}>
            <View style={styles.vwBoxLeft}>
              <View>
                <Text style={styles.txtInfoLeft}>
                  Objetivo:{' '}
                  <Text style={styles.txtObjFinal(objFinal)}>{objFinal} </Text>
                  {objFinal != 'indefinido' && (
                    <IconI name="checkmark" size={18} color="#10ee10" />
                  )}
                </Text>
                <Text style={styles.txtInfoLeft}>
                  Quantidade:{' '}
                  <Text style={styles.txtQuantFinal(quantFinal)}>
                    {quantFinal}{' '}
                  </Text>
                  {quantFinal != 'indefinida' && (
                    <IconI name="checkmark" size={18} color="#10ee10" />
                  )}
                </Text>
              </View>
            </View>
            <View style={styles.vwBoxRight}>
              <TouchableHighlight underlayColor="none" onPress={() => {}}>
                <IconI
                  name="checkmark-circle"
                  size={90}
                  disabled={verifyFinals() ? false : true}
                  color={verifyFinals() ? '#31949e' : 'rgba(0,0,0,0.1)'}
                  style={styles.txtShadow(verifyFinals() ? false : true)}
                />
              </TouchableHighlight>
            </View>
          </View>
          {(objFinal != 'indefinido' || quantFinal != 'indefinida') && (
            <TouchableHighlight
              onPress={() => console.log('foi')}
              underlayColor="none"
              style={[styles.tchRestore, styles.kitJust]}>
              <IconMIC name="restore" size={18} color="#FFFFFF" />
            </TouchableHighlight>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfig;
