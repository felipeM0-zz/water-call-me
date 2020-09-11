import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

const ModalConfig = () => {
  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => {}}>
      <View style={styles.vwContent}>
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
                <TextInput
                  keyboardType="numeric"
                  maxLength={5}
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
              <Text style={styles.txtFirstResult}>2.205</Text>
              <Text style={styles.txtFirstMl}>ml</Text>
            </View>
            <View>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {}}
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  Definir 2.205 como objetivo
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.kitJust, styles.vwGroup]}>
            <Text style={styles.txtOption}>Objetivo manualmente</Text>
            <View style={styles.vwBoxOption}>
              <TextInput
                keyboardType="numeric"
                maxLength={5}
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
            <View>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {}}
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  Definir 1.800 como objetivo
                </Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={[styles.kitJust, styles.vwGroup]}>
            <Text style={styles.txtOption}>Definir quantidade</Text>
            <View style={styles.vwBoxOption}>
              <TextInput
                keyboardType="numeric"
                maxLength={5}
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
                style={styles.tchCalcOption}>
                <Text style={[styles.txtCalcOption, styles.txtShadow]}>
                  Definir 200 como quantidade
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
