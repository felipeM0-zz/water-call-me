import React, {useState, useEffect} from 'react';
import {TouchableHighlight, View, Text, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFI from 'react-native-vector-icons/Fontisto';
import SwitchSelector from 'react-native-switch-selector';
// EXTERNAL SCRIPTS
import {convertToNum} from '../scripts/converters.js';
// EXTERNAL STYLES
import styles from '../styles/BottomAlert';
import stylesB from '../styles/BallonApprox';

export default (props) => {
  const isFocused = useIsFocused();

  const [showFine, setShowFine] = useState(false);
  const [showCancel, setShowCancel] = useState(true);
  const [gender, setGender] = useState(-1);
  const [showMass, setShowMass] = useState(false);
  const [resultMass, setResultMass] = useState('');

  const selectGender = (gen, number) => (
    <IconFI
      name={gen}
      size={20}
      color={
        (number == 0 ? 'female' : number == 1 ? 'male' : null) == gen
          ? '#FFFFFF'
          : '#31949e'
      }
      style={stylesB.iconGender}
    />
  );

  const selectorMass = (num) => {
    let val =
      num == 1
        ? {
            g1: {label: '≈ 60 kg', value: 'm1'},
            g2: {label: '≈ 70 kg', value: 'm2'},
            g3: {label: '≈ 80 kg', value: 'm3'},
            g4: {label: '≈ 90 kg', value: 'm4'},
          }
        : {
            g1: {label: '≈ 50 kg', value: 'f1'},
            g2: {label: '≈ 60 kg', value: 'f2'},
            g3: {label: '≈ 70 kg', value: 'f3'},
            g4: {label: '≈ 80 kg', value: 'f4'},
          };

    return val;
  };

  const valMass = (v) => {
    let value =
      v == 'f1'
        ? 50
        : v == 'f2' || v == 'm1'
        ? 60
        : v == 'f3' || v == 'm2'
        ? 70
        : v == 'f4' || v == 'm3'
        ? 80
        : v == 'm4'
        ? 90
        : null;
    return value;
  };

  useEffect(() => {
    props.showCancel == false ? setShowCancel(false) : null;
  }, [isFocused]);

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => (showCancel ? props.closeAlert() : null)}>
      <TouchableHighlight
        underlayColor="none"
        activeOpacity={1}
        onPress={() => (showCancel ? props.closeAlert() : null)}
        style={styles.modal(props.position)}>
        <TouchableHighlight style={styles.boxBottom(props.position)}>
          <>
            <View style={styles.vwTitle}>
              <Text numberOfLines={2} style={styles.txtTitle}>
                {props.title}
              </Text>
            </View>

            <View style={stylesB.contentBody}>
              <View style={stylesB.groupBox}>
                <Text style={stylesB.subtitOption}>Defina seu gênero</Text>
                <SwitchSelector
                  onPress={(value) => {
                    setGender(
                      value == 'female' ? 0 : value == 'male' ? 1 : null,
                    );
                    setShowMass(false);
                    setShowFine(false);
                    setTimeout(() => {
                      setShowMass(true);
                    }, 250);
                  }}
                  textColor="#31949e"
                  selectedColor="#FFFFFF"
                  buttonColor="#31949e"
                  borderColor="#31949e"
                  hasPadding
                  style={stylesB.widOption}
                  options={[
                    {
                      label: 'Feminino',
                      value: 'female',
                      customIcon: selectGender('female', gender),
                    },
                    {
                      label: 'Masculino',
                      value: 'male',
                      customIcon: selectGender('male', gender),
                    },
                  ]}
                />
              </View>

              {gender != -1 && showMass && (
                <>
                  <View style={stylesB.groupBox}>
                    <Text style={stylesB.subtitOption}>
                      Qual sua massa, aproximadamente?
                    </Text>
                    <SwitchSelector
                      textColor="#31949e"
                      onPress={(v) => {
                        setResultMass(valMass(v) * 35);
                        setShowFine(true);
                      }}
                      selectedColor="#FFFFFF"
                      buttonColor="#31949e"
                      borderColor="#31949e"
                      hasPadding
                      style={stylesB.widOption}
                      options={[
                        {
                          label: selectorMass(gender).g1.label,
                          value: selectorMass(gender).g1.value,
                        },
                        {
                          label: selectorMass(gender).g2.label,
                          value: selectorMass(gender).g2.value,
                        },
                        {
                          label: selectorMass(gender).g3.label,
                          value: selectorMass(gender).g3.value,
                        },
                        {
                          label: selectorMass(gender).g4.label,
                          value: selectorMass(gender).g4.value,
                        },
                      ]}
                    />
                  </View>
                </>
              )}
            </View>

            {showFine && (
              <>
                <Text style={stylesB.txtResult}>
                  Para seu gênero e aproximação de peso recomendamos:{' '}
                  <Text style={stylesB.txtResultVal}>
                    {convertToNum(resultMass)}
                  </Text>{' '}
                  ml
                </Text>
                <View style={styles.vwButtons}>
                  <View style={styles.btnGroup}>
                    <TouchableHighlight
                      underlayColor="none"
                      activeOpacity={1}
                      onPress={() => {
                        props.onFine(convertToNum(resultMass));
                        props.closeAlert();
                      }}
                      style={[
                        styles.btnConfirm,
                        styles.btnConfirmBgc('#31949e'),
                      ]}>
                      <Text
                        style={[
                          styles.txtConfirm,
                          styles.txtConfirmColor('#FFFFFF'),
                        ]}>
                        Aceitar
                      </Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </>
            )}

            {showCancel && (
              <TouchableHighlight
                underlayColor="rgba(51,51,51,0.2)"
                onPress={() => props.closeAlert()}
                style={styles.btnClose}>
                <Icon name="close" size={25} />
              </TouchableHighlight>
            )}
          </>
        </TouchableHighlight>
      </TouchableHighlight>
    </Modal>
  );
};
