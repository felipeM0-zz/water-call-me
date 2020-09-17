import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
// EXTERNAL COMPONENTS
import FooterTable from '../components/FooterTable';
// EXTERNAL SCRIPTS
import {convertInputsIMC} from '../scripts/converters';
// EXTERNAL STYLES
import styles from '../styles/CalcScreen';

const PrincipalScreen = () => {
  const navigation = useNavigation();

  const [inpWeight, setInpWeight] = useState('');
  const [inpHeight, setInpHeight] = useState('');
  const [disabledCalc, setDisabledCalc] = useState(true);
  const [resIMC, setResIMC] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [showRemoveIMC, setShowRemoveIMC] = useState(false);
  const [checkColor, setCheckColor] = useState('');
  const [showTxtTesult, setShowTxtResult] = useState(false);
  const [txtResultFinal, setTxtResultFinal] = useState([]);
  const [showInfoColor, setShowInfoColor] = useState(false);

  const convertNumbers = () => {
    let weight = Number(inpWeight.replace(',', '.'));
    let height = Number(inpHeight.replace(',', '.'));
    return [weight, height];
  };

  const IMCFinal = () => {
    return convertNumbers()[0] / (convertNumbers()[1] * convertNumbers()[1]);
  };

  const PiesIMC = () => {
    let colors = ['#660000', '#b30000', '#ff0000', '#ff4d4d', '#ff9999'];
    let sizes = [0.4, 0.399, 0.299, 0.249, 0.185];
    let pies = [];

    for (let i = 0; i < colors.length; i++) {
      pies.push(
        <Progress.Pie
          progress={sizes[i]}
          borderWidth={0}
          size={160}
          unfilledColor={colors[i] == '#660000' ? '#660000' : ''}
          color={colors[i]}
          style={[styles.pieGraph, {position: 'absolute'}]}
          key={i}
        />,
      );
    }

    return pies;
  };

  const verifyColorFinal = (result) => {
    let res = parseFloat(result);

    let respfinal =
      res <= 18.4
        ? ['#ff9999', 'Magreza']
        : res >= 18.5 && res <= 24.9
        ? ['#ff4d4d', 'Normal']
        : res >= 25 && res <= 29.9
        ? ['#ff0000', 'Sobrepeso']
        : res >= 30 && res <= 39.9
        ? ['#b30000', 'Obesidade']
        : ['#660000', 'Obesidade Grave'];

    setCheckColor(respfinal[0]);
    setTxtResultFinal([respfinal[0], respfinal[1]]);
  };

  const showTogether = () => {
    setResIMC(false);
    setShowResult(true);
    setShowRemoveIMC(false);
    setCheckColor('');
    setShowTxtResult(false);
    fadeOutColor();
  };

  const opacity = useState(new Animated.Value(0))[0];

  const fadeInColor = () => {
    setShowInfoColor(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutColor = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowInfoColor(false);
    });
  };

  useEffect(() => {
    showTogether();
    convertNumbers()[0] != 0 && convertNumbers()[1] != 0
      ? setDisabledCalc(false)
      : setDisabledCalc(true);
  }, [inpHeight, inpWeight]);

  return (
    <SafeAreaView style={styles.vwContent}>
      <View style={styles.headerPrincipal}>
        <Text style={[styles.txtHeaderPrincipal, styles.txtShadow]}>
          Cálculo IMC
        </Text>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => navigation.openDrawer()}
          style={styles.tchHeaderMenu}>
          <IconIon
            style={styles.txtShadow}
            name="menu"
            size={30}
            color="#31949e"
          />
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.svContent}>
        <View style={styles.vwPrimaryBox}>
          <View style={styles.vwSuperiorBox}>
            <View style={styles.vwBoxInputs}>
              <View style={styles.vwBoxInput}>
                <View style={styles.vwBoxIcon}>
                  <Text style={styles.txtTopIcon}>Peso</Text>
                  <IconMIC
                    name="anvil"
                    size={50}
                    color="#31949e"
                    style={[styles.txtShadow, styles.iconSup]}
                  />
                  <TextInput
                    maxLength={6}
                    keyboardType="numeric"
                    style={styles.inpWeight}
                    value={inpWeight}
                    onChangeText={(v) => setInpWeight(convertInputsIMC(v))}
                    placeholder="63,00"
                    placeholderTextColor="rgba(0,0,0,0.2)"
                  />
                </View>
                <View style={styles.vwBoxRightInside}>
                  <Text style={styles.txtRightInside}>Kg</Text>
                </View>
              </View>

              <View style={styles.vwBoxDivide}>
                <IconFA5 name="divide" size={35} color="#31949e" />
              </View>

              <View style={styles.vwBoxInput}>
                <View style={styles.vwBoxIcon}>
                  <Text style={styles.txtTopIcon}>Altura</Text>
                  <IconMIC
                    name="human-male-height-variant"
                    size={50}
                    color="#31949e"
                    style={[styles.txtShadow, styles.iconSup]}
                  />
                  <View>
                    <TextInput
                      maxLength={5}
                      value={inpHeight}
                      onChangeText={(v) => setInpHeight(convertInputsIMC(v))}
                      keyboardType="numeric"
                      style={styles.inpWeight}
                      placeholder="1,73"
                      placeholderTextColor="rgba(0,0,0,0.2)"
                    />
                    <View style={styles.vwNumberHeight}>
                      <Text style={styles.txtNumberHeight}>2</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.vwBoxRightInside]}>
                  <Text style={styles.txtRightInside}>m</Text>
                </View>
              </View>
            </View>

            <View style={styles.vwBtnCalc}>
              <TouchableHighlight
                onPress={() => {
                  setResIMC(true);
                  fadeInColor();
                  setTimeout(() => {
                    setShowResult(false);
                    setShowRemoveIMC(true);
                    verifyColorFinal(IMCFinal().toFixed(2));
                    setDisabledCalc(true);
                    setShowTxtResult(true);
                  }, 1050);
                }}
                disabled={disabledCalc}
                underlayColor="none"
                style={styles.tchCalc(disabledCalc)}>
                <Text style={styles.txtTchCalc(disabledCalc)}>Calcular</Text>
              </TouchableHighlight>
            </View>

            {resIMC && (
              <>
                <View style={styles.vwBoxPie}>
                  <View style={styles.vwContentPie}>
                    <Progress.Pie
                      progress={!showResult ? IMCFinal() / 100 : 0}
                      borderWidth={0}
                      indeterminate={showResult}
                      size={190}
                      unfilledColor="rgba(51,51,51,0.05)"
                      color="#31949e"
                      style={styles.pieGraph}
                    />

                    <View style={[styles.vwBackWhite, styles.vwBackWhitePies]}>
                      <PiesIMC />
                    </View>

                    <View style={styles.vwBackWhite}>
                      <Text style={styles.txtCenterPrincipal}>
                        {!showResult
                          ? 'Seu IMC\n' +
                            IMCFinal().toFixed(2).replace('.', ',')
                          : 'Aguarde'}
                      </Text>
                    </View>
                    {showRemoveIMC && (
                      <TouchableHighlight
                        onPress={() => {
                          setDisabledCalc(false);
                          showTogether();
                        }}
                        underlayColor="none"
                        style={styles.btnRemoveIMC}>
                        <IconIon name="close" size={17} color="#31949e" />
                      </TouchableHighlight>
                    )}
                  </View>
                </View>

                {showTxtTesult && (
                  <View style={styles.vwResultTxt}>
                    <Text
                      style={[
                        styles.txtResultLabel(txtResultFinal[0]),
                        styles.txtShadow,
                      ]}>
                      {txtResultFinal[1]}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      <FooterTable
        showInfoColor={showInfoColor}
        checkColor={checkColor}
        resIMC={resIMC}
        opac={opacity}
      />
    </SafeAreaView>
  );
};

export default PrincipalScreen;
