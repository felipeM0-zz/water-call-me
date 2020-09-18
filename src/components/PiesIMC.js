import React from 'react';
import * as Progress from 'react-native-progress';
import styles from '../styles/CalcScreen';

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

export default PiesIMC;
