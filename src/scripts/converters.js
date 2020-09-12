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

export {convertToNum};
