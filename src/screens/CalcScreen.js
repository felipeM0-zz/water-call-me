import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
// EXTERNAL SCRIPTS
import {convertInputsIMC} from '../scripts/converters';
// EXTERNAL STYLES
import styles from '../styles/CalcScreen';

const PrincipalScreen = (props) => {
  const navigation = useNavigation();

  const [inpWeight, setInpWeight] = useState('');
  const [inpHeight, setInpHeight] = useState('');
  const [disabledCalc, setDisabledCalc] = useState(true);
  const [resultIMC, setResultIMC] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [showRemoveIMC, setShowRemoveIMC] = useState(false);
  const [checkedColor, setCheckedColor] = useState('');
  const [showTable, setShowTable] = useState(true);
  const [showTxtTesult, setShowTxtResult] = useState(false);
  const [txtResultFinal, setTxtResultFinal] = useState('');

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

    setCheckedColor(respfinal[0]);
    setTxtResultFinal(respfinal[1]);
  };

  useEffect(() => {
    setResultIMC(false);
    setShowResult(true);
    setShowRemoveIMC(false);
    setCheckedColor('');
    setShowTxtResult(false);
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
      <ScrollView style={{width: '100%'}}>
        <View
          style={{
            justifyContent: 'flex-start',
            width: '100%',
            alignItems: 'center',
            flex: 1,
          }}>
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
                    onFocus={() => setShowTable(false)}
                    onBlur={() => setShowTable(true)}
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
                      onFocus={() => setShowTable(false)}
                      onBlur={() => setShowTable(true)}
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
                  setResultIMC(true);
                  setTimeout(() => {
                    setShowResult(false);
                    setShowRemoveIMC(true);
                    verifyColorFinal(IMCFinal().toFixed(2));
                    setDisabledCalc(true);
                    setShowTxtResult(true);
                  }, 1000);
                }}
                disabled={disabledCalc}
                underlayColor="none"
                style={styles.tchCalc(disabledCalc)}>
                <Text style={styles.txtTchCalc(disabledCalc)}>Calcular</Text>
              </TouchableHighlight>
            </View>

            {resultIMC && (
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
                          setResultIMC(false);
                          setShowResult(true);
                          setDisabledCalc(false);
                          setShowRemoveIMC(false);
                          setCheckedColor('');
                          setShowTxtResult(false);
                        }}
                        underlayColor="none"
                        style={styles.btnRemoveIMC}>
                        <IconIon name="close" size={17} color="#31949e" />
                      </TouchableHighlight>
                    )}
                  </View>
                </View>

                {showTxtTesult && (
                  <View
                    style={{
                      backgroundColor: '#31949e',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 7,
                      elevation: 3,
                      paddingRight: 15,
                      paddingLeft: 15,
                      borderRadius: 25,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#FFFFFF',
                      }}>
                      {txtResultFinal}
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {showTable && (
        <View style={styles.vwTableInfo}>
          <View style={styles.boxRowTable}>
            <View style={styles.vwContentTable}>
              <Text style={styles.txtTitleTable}>Cor</Text>
              <View
                style={styles.vwColorTable('#ff9999', checkedColor, resultIMC)}
              />
              <View
                style={styles.vwColorTable('#ff4d4d', checkedColor, resultIMC)}
              />
              <View
                style={styles.vwColorTable('#ff0000', checkedColor, resultIMC)}
              />
              <View
                style={styles.vwColorTable('#b30000', checkedColor, resultIMC)}
              />
              <View
                style={styles.vwColorTable('#660000', checkedColor, resultIMC)}
              />
            </View>
            <View style={styles.vwContentTable}>
              <Text style={styles.txtTitleTable}>IMC</Text>
              <Text style={styles.txtTableInfos}>Menor que 18,5</Text>
              <Text style={styles.txtTableInfos}>Entre 18,5 e 24,9</Text>
              <Text style={styles.txtTableInfos}>Entre 25 e 29,9</Text>
              <Text style={styles.txtTableInfos}>Entre 30 e 39,9</Text>
              <Text style={styles.txtTableInfos}>Maior que 40</Text>
            </View>
            <View style={styles.vwContentTable}>
              <Text style={styles.txtTitleTable}>Classificação</Text>
              <Text style={styles.txtTableInfos}>Magreza</Text>
              <Text style={styles.txtTableInfos}>Normal</Text>
              <Text style={styles.txtTableInfos}>Sobrepeso</Text>
              <Text style={styles.txtTableInfos}>Obesidade</Text>
              <Text style={styles.txtTableInfos}>Obesidade Grave</Text>
            </View>
            <View style={styles.vwContentTable}>
              <Text style={styles.txtTitleTable}>Obesidade</Text>
              <Text style={styles.txtTableInfos}>0º</Text>
              <Text style={styles.txtTableInfos}>0º</Text>
              <Text style={styles.txtTableInfos}>1º</Text>
              <Text style={styles.txtTableInfos}>2º</Text>
              <Text style={styles.txtTableInfos}>3º</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PrincipalScreen;
