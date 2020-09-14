import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Tooltip} from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles/ModalConfig';

const ManualQuant = (props) => {
  return (
    <View style={[styles.kitJust, styles.vwGroup]}>
      <Text style={styles.txtOption}>Definir quantidade</Text>
      <View style={styles.vwBoxOption}>
        <TextInputMask
          type={'only-numbers'}
          value={props.valueInput}
          onChangeText={(txt) => {
            props.stInput(txt);
            props.verifyQuant(txt);
          }}
          keyboardType="numeric"
          maxLength={3}
          style={[styles.inpPeso, styles.inpQuant]}
          placeholder="200"
          placeholderTextColor="rgba(0,0,0,0.15)"
        />

        <Tooltip
          backgroundColor="#31949e"
          overlayColor="rgba(250, 250, 250, 0.85)"
          height={125}
          width={180}
          closeOnlyOnBackdropPress={true}
          containerStyle={styles.TTP}
          popover={
            <View>
              <View>
                <Text style={styles.txtContentTTP}>
                  Defina uma quantidade de água. Esse valor informará a
                  quantidade de água que você deverá ingerir a cada ciclo
                  (notificação).
                </Text>
              </View>
            </View>
          }>
          <>
            <IconFA
              name="question-circle"
              size={10}
              color="#333"
              style={[
                styles.txtTitleInp,
                styles.iconQuestion,
                styles.positionIconQuestion,
              ]}
            />
            <Text style={styles.txtMili}>mililitros</Text>
          </>
        </Tooltip>
      </View>
      <View>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => props.ManualQuant(props.result)}
          disabled={props.disabled}
          style={styles.tchCalcOption(props.disabled)}>
          <Text
            style={[
              styles.txtCalcOption(props.disabled),
              styles.txtShadow(props.disabled),
            ]}>
            Definir {props.result} como quantidade
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ManualQuant;
