import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styles from '../../styles/ModalConfig';
import IconI from 'react-native-vector-icons/Ionicons';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';

const FooterConfig = (props) => {
  return (
    <>
      <Text style={styles.txtTitleFooter}>Configurado até o momento...</Text>
      <View style={styles.vwContentFooter}>
        <View style={styles.vwBoxLeft}>
          <View>
            <Text style={styles.txtInfoLeft}>
              Objetivo:{' '}
              <Text style={styles.txtObjFinal(props.objFinal)}>
                {props.objFinal}{' '}
              </Text>
              {props.objFinal != 'indefinido' && (
                <IconI name="checkmark" size={18} color="#10ee10" />
              )}
            </Text>
            <Text style={styles.txtInfoLeft}>
              Quantidade:{' '}
              <Text style={styles.txtQuantFinal(props.quantFinal)}>
                {props.quantFinal}{' '}
              </Text>
              {props.quantFinal != 'indefinida' && (
                <IconI name="checkmark" size={18} color="#10ee10" />
              )}
            </Text>
            {props.resultGlass[0] && (
              <Text style={styles.txtInfoLeft}>
                Em torno de{' '}
                <Text style={styles.txtResultFinal}>
                  {props.resultGlass[1]}
                </Text>{' '}
                copos
              </Text>
            )}
          </View>
        </View>
        <View style={styles.vwBoxRight}>
          <TouchableHighlight underlayColor="none" onPress={() => {}}>
            <IconI
              name="checkmark-circle"
              size={90}
              disabled={props.Finals ? false : true}
              color={props.Finals ? '#31949e' : 'rgba(0,0,0,0.1)'}
              style={styles.txtShadow(props.Finals ? false : true)}
            />
          </TouchableHighlight>
        </View>
      </View>

      {(props.objFinal != 'indefinido' || props.quantFinal != 'indefinida') && (
        <TouchableHighlight
          onPress={() => props.restore()}
          underlayColor="none"
          style={[styles.tchRestore, styles.kitJust]}>
          <IconMIC name="restore" size={18} color="#FFFFFF" />
        </TouchableHighlight>
      )}
    </>
  );
};

export default FooterConfig;
