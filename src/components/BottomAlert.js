import React, {useState, useEffect} from 'react';
import {TouchableHighlight, View, Text, Modal} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
// import {translate} from '../locales';
// IMAGES JSON
// import success from '../images/JSON/success.json';
import completed from '../images/JSON/cicle-completed.json';
import timedrink from '../images/JSON/time-drinkwater.json';
import historic from '../images/JSON/historic.json';
import caution from '../images/JSON/caution.json';
// STYLES
import styles from '../styles/BottomAlert';

export default (props) => {
  const isFocused = useIsFocused();

  const [showConfirm, setShowConfirm] = useState(true);
  const [showCancel, setShowCancel] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showKeep, setShowKeep] = useState(false);
  const [showDrink, setShowDrink] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [particles, setParticles] = useState(false);

  useEffect(() => {
    props.showConfirm == false ? setShowConfirm(false) : null;
    props.showCancel == false ? setShowCancel(false) : null;
    props.showHistory ? setShowHistory(true) : null;
    props.showKeep ? setShowKeep(true) : null;
    props.showDrink ? setShowDrink(true) : null;
    props.showNew ? setShowNew(true) : null;
    props.particles ? setParticles(true) : null;
  }, [isFocused]);

  const returnIcon = () => {
    let icon =
      props.icon == 'historic'
        ? historic
        : props.icon == 'time-drink'
        ? timedrink
        : props.icon == 'completed'
        ? completed
        : props.icon == 'caution'
        ? caution
        : props.icon == 'think'
        ? think
        : null;
    return icon;
  };

  const corInfo = () => {
    let req = props.icon == 'caution',
      bgc = req ? '#c22f47' : '#90ee90',
      txt = req ? '#FFFFFF' : '#006400';
    return [bgc, txt];
  };

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
            {props.icon != null && (
              <View style={styles.vwIcon}>
                <Lottie
                  source={returnIcon()}
                  autoPlay
                  loop={props.loop == null ? true : props.loop}
                />
              </View>
            )}
            {particles && (
              <View style={[styles.vwIcon, {position: 'absolute'}]}>
                <Lottie
                  source={require('../images/JSON/particles.json')}
                  autoPlay
                  loop={false}
                />
              </View>
            )}
            <View style={styles.vwContent(showConfirm)}>
              <Text numberOfLines={5} style={styles.txtContent}>
                {props.text}
              </Text>
            </View>
            {showConfirm && (
              <View style={styles.vwButtons}>
                <View style={styles.btnGroup}>
                  <TouchableHighlight
                    underlayColor="none"
                    activeOpacity={1}
                    onPress={() => props.onConfirm()}
                    style={[
                      styles.btnConfirm,
                      styles.btnConfirmBgc(corInfo()[0]),
                    ]}>
                    <Text
                      style={[
                        styles.txtConfirm,
                        styles.txtConfirmColor(corInfo()[1]),
                      ]}>
                      Confirmar
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}

            {showDrink && (
              <TouchableHighlight
                underlayColor="none"
                activeOpacity={1}
                onPress={() => props.drinkWater()}
                style={[styles.btnConfirm, styles.btnConfirmBgc('#31949e')]}>
                <Text
                  style={[
                    styles.txtConfirm,
                    styles.txtConfirmColor('#FFFFFF'),
                  ]}>
                  Já bebi, adicione!
                </Text>
              </TouchableHighlight>
            )}

            {showNew && (
              <TouchableHighlight
                underlayColor="none"
                activeOpacity={1}
                onPress={() => props.drinkWater()}
                style={[styles.btnConfirm, styles.btnConfirmBgc('#31949e')]}>
                <Text
                  style={[
                    styles.txtConfirm,
                    styles.txtConfirmColor('#FFFFFF'),
                  ]}>
                  Agendar novo ciclo
                </Text>
              </TouchableHighlight>
            )}

            {showHistory && (
              <View style={styles.vwButtons}>
                <View style={styles.btnGroup}>
                  <TouchableHighlight
                    underlayColor="none"
                    activeOpacity={1}
                    onPress={() => props.clearHist()}
                    style={[
                      styles.btnConfirm,
                      styles.btnConfirmBgc('#d92e2e'),
                    ]}>
                    <Text
                      style={[
                        styles.txtConfirm,
                        styles.txtConfirmColor('#FFFFFF'),
                      ]}>
                      Limpar
                    </Text>
                  </TouchableHighlight>

                  {showKeep && (
                    <TouchableHighlight
                      underlayColor="none"
                      activeOpacity={1}
                      onPress={() => {}}
                      style={[
                        styles.btnConfirm,
                        styles.btnConfirmBgc('#31949e'),
                      ]}>
                      <Text
                        style={[
                          styles.txtConfirm,
                          styles.txtConfirmColor('#FFFFFF'),
                        ]}>
                        Manter
                      </Text>
                    </TouchableHighlight>
                  )}
                </View>
              </View>
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
