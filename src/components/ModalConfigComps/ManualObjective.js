import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Tooltip} from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import {convertToNum} from '../../scripts/converters';
import styles from '../../styles/ModalConfig';

const ManualObjective = (props) => {
  return (
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
          value={props.valueInput}
          onChangeText={(txt) => {
            props.stInput(txt);
            props.verifyManual(txt);
          }}
          style={[styles.inpPeso, styles.inpObjManual]}
          placeholder="1.800"
          placeholderTextColor="rgba(0,0,0,0.15)"
        />
        <Tooltip
          backgroundColor="#31949e"
          overlayColor="rgba(250, 250, 250, 0.85)"
          height={190}
          width={185}
          closeOnlyOnBackdropPress={true}
          containerStyle={styles.TTP}
          popover={
            <View>
              <Text style={styles.txtContentTTP}>
                Defina um valor manual como seu objetivo. Esse valor irá
                determinar os ciclos que você fará até chegar ao fim dele. Use o
                botão <IconMIC name="approximately-equal-box" size={15} />{' '}
                abaixo caso queira definir o objetivo por aproximação, que
                iremos lhe recomendar alguns objetivos.
              </Text>
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
      <View style={styles.vwContentManual}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => props.ManualObj(convertToNum(props.result))}
          disabled={props.disabled}
          style={styles.tchCalcOption(props.disabled)}>
          <Text
            style={[
              styles.txtCalcOption(props.disabled),
              styles.txtShadow(props.disabled),
            ]}>
            Definir {props.result} como objetivo
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => props.showApprox()}
          style={styles.tchCalcOption(false)}>
          <Text style={[styles.txtCalcOption(false), styles.txtShadow(false)]}>
            <IconMIC name="approximately-equal-box" size={25} />
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default ManualObjective;
