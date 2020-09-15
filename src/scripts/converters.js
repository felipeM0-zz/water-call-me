import {MaskService} from 'react-native-masked-text';

const convertToNum = (val) => {
  let value = MaskService.toMask('money', val, {
    precision: 0,
    separator: '.',
    delimiter: '.',
    unit: '',
    suffixUnit: '',
  });

  return val == '?' ? '?' : value;
};

const convertInputsIMC = (val) => {
  let value = MaskService.toMask('money', val, {
    precision: 2,
    separator: ',',
    delimiter: ',',
    unit: '',
    suffixUnit: '',
  });

  return val == '0,00' || val == '0,0' ? '' : value;
};

export {convertToNum, convertInputsIMC};
