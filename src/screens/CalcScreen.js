import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
// EXTERNAL SCRIPTS
import {convertInputsIMC} from '../scripts/converters';
// EXTERNAL STYLES
import styles from '../styles/CalcScreen';

const PrincipalScreen = () => {
  const navigation = useNavigation();

  const [inpWeight, setInpWeight] = useState('');
  const [inpHeight, setInpHeight] = useState('');
  const [disabledCalc, setDisabledCalc] = useState(true);
  const [resultIMC, setResultIMC] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [showRemoveIMC, setShowRemoveIMC] = useState(false);

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

  useEffect(() => {
    setResultIMC(false);
    setShowResult(true);
    setShowRemoveIMC(false);
    convertNumbers()[0] != 0 && convertNumbers()[1] != 0
      ? setDisabledCalc(false)
      : setDisabledCalc(true);
  }, [inpHeight, inpWeight]);

  return (
    <SafeAreaView style={styles.vwContent}>
      {/* HEADER */}
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
      {/* BODY CONTENT */}
      <View style={styles.vwSuperiorBox}>
        <View style={styles.vwBoxInputs}>
          <View style={styles.vwBoxInput}>
            <View style={styles.vwBoxIcon}>
              <Text style={[styles.txtTopIcon, styles.txtShadow]}>Peso</Text>
              <IconMIC
                name="anvil"
                size={50}
                color="#FFFFFF"
                style={styles.txtShadow}
              />
              <TextInput
                maxLength={6}
                keyboardType="numeric"
                style={styles.inpWeight}
                value={inpWeight}
                onChangeText={(v) => setInpWeight(convertInputsIMC(v))}
                placeholder="63,00"
                placeholderTextColor={'rgba(0,0,0,0.2)'}
              />
            </View>
            <View style={styles.vwBoxRightInside}>
              <Text style={[styles.txtRightInside, styles.txtShadow]}>Kg</Text>
            </View>
          </View>

          <View style={styles.vwBoxDivide}>
            <IconFA5
              name="divide"
              size={40}
              color="#FFFFFF"
              style={styles.txtShadow}
            />
          </View>

          <View style={styles.vwBoxInput}>
            <View style={styles.vwBoxIcon}>
              <Text style={[styles.txtTopIcon, styles.txtShadow]}>Altura</Text>
              <IconMIC
                name="human-male-height-variant"
                size={50}
                color="#FFFFFF"
                style={styles.txtShadow}
              />
              <View>
                <TextInput
                  maxLength={5}
                  value={inpHeight}
                  onChangeText={(v) => setInpHeight(convertInputsIMC(v))}
                  keyboardType="numeric"
                  style={styles.inpWeight}
                  placeholder="1,73"
                  placeholderTextColor={'rgba(0,0,0,0.2)'}
                />
                <View style={styles.vwNumberHeight}>
                  <Text style={styles.txtNumberHeight}>2</Text>
                </View>
              </View>
            </View>
            <View style={[styles.vwBoxRightInside]}>
              <Text style={[styles.txtRightInside, styles.txtShadow]}>m</Text>
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
              }, 1000);
            }}
            disabled={disabledCalc}
            underlayColor="none"
            style={styles.tchCalc(disabledCalc)}>
            <Text style={styles.txtTchCalc(disabledCalc)}>Calcular</Text>
          </TouchableHighlight>
        </View>

        {resultIMC && (
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
                    ? 'Seu IMC\n' + IMCFinal().toFixed(2).replace('.', ',')
                    : 'Calculando'}
                </Text>
              </View>
              {showRemoveIMC && (
                <TouchableHighlight
                  onPress={() => {
                    setResultIMC(false);
                    setShowResult(true);
                    setDisabledCalc(false);
                    setShowRemoveIMC(false);
                  }}
                  underlayColor="none"
                  style={styles.btnRemoveIMC}>
                  <IconIon name="close" size={17} color="#31949e" />
                </TouchableHighlight>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PrincipalScreen;
