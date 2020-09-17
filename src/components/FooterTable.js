import React from 'react';
import {View, Animated, Text} from 'react-native';
import styles from '../styles/CalcScreen';

const FooterTable = (props) => {
  return (
    <View style={styles.vwTableInfo}>
      <View style={styles.boxRowTable}>
        {props.showInfoColor && (
          <Animated.View style={[styles.vwContentTable, {opacity: props.opac}]}>
            <Text style={styles.txtTitleTable}>Cor</Text>
            <View
              style={styles.vwColorTab(
                '#ff9999',
                props.checkColor,
                props.resIMC,
              )}
            />
            <View
              style={styles.vwColorTab(
                '#ff4d4d',
                props.checkColor,
                props.resIMC,
              )}
            />
            <View
              style={styles.vwColorTab(
                '#ff0000',
                props.checkColor,
                props.resIMC,
              )}
            />
            <View
              style={styles.vwColorTab(
                '#b30000',
                props.checkColor,
                props.resIMC,
              )}
            />
            <View
              style={styles.vwColorTab(
                '#660000',
                props.checkColor,
                props.resIMC,
              )}
            />
          </Animated.View>
        )}

        <View style={styles.vwContentTable}>
          <Text style={styles.txtTitleTable}>IMC</Text>
          <Text style={styles.txtTableInfos}>Menor que 18,4</Text>
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
  );
};

export default FooterTable;
