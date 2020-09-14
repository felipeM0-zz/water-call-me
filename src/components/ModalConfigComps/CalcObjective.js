import React from 'react';
import {View, Text, TouchableHighlight, Linking} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Tooltip} from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {convertToNum} from '../../scripts/converters';
import styles from '../../styles/ModalConfig';

const CalcObjective = (props) => {
  return (
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
            value={props.valueInput}
            onChangeText={(txt) => {
              props.stInput(txt);
              props.verifyCalc(txt);
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
          <Tooltip
            backgroundColor="#31949e"
            overlayColor="rgba(250, 250, 250, 0.85)"
            height={110}
            width={180}
            closeOnlyOnBackdropPress={true}
            containerStyle={styles.TTP}
            popover={
              <View>
                <View>
                  <Text style={styles.txtContentTTP}>
                    O cálculo feito é 35 ml de água multiplicado pelo peso
                    corporal de cada um.
                  </Text>
                </View>
                <TouchableHighlight
                  style={styles.tchKnowMoreTTP}
                  underlayColor="none"
                  onPress={() =>
                    Linking.openURL(
                      'https://www.conquistesuavida.com.br/noticia/agua-na-medida-certa-aprenda-a-calcular-corretamente-a-sua-hidratacao_a2245/1#:~:text=O%20c%C3%A1lculo%20feito%20%C3%A9%2035,dia%20(aproximadamente%2014%20copos).',
                    )
                  }>
                  <Text style={styles.txtKnowMoreTTP}>Saiba mais</Text>
                </TouchableHighlight>
              </View>
            }>
            <>
              <IconFA
                name="question-circle"
                size={10}
                color="#333"
                style={[styles.txtTitleInp, styles.iconQuestion]}
              />
              <Text style={styles.txt35ml}>35ml</Text>
            </>
          </Tooltip>
        </View>
        <Text style={styles.txtEqual}>=</Text>
        <Text style={styles.txtFirstResult}>{convertToNum(props.result)}</Text>
        <Text style={styles.txtFirstMl}>ml</Text>
      </View>
      <View>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => props.CalcObj(convertToNum(props.result))}
          disabled={props.disabled}
          style={styles.tchCalcOption(props.disabled)}>
          <Text
            style={[
              styles.txtCalcOption(props.disabled),
              styles.txtShadow(props.disabled),
            ]}>
            Definir {convertToNum(props.result)} como objetivo
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CalcObjective;
