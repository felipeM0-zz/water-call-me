import React, {useEffect, useState} from 'react';
import {Modal, Text, View, TouchableHighlight, ScrollView} from 'react-native';
import IconI from 'react-native-vector-icons/Ionicons';
// EXTERNAL COMPONENTS
import BallonApprox from '../components/BallonApprox';
import BottomAlert from '../components/BottomAlert';
import CalcObjective from '../components/ModalConfigComps/CalcObjective';
import ManualObjective from '../components/ModalConfigComps/ManualObjective';
import ManualQuant from '../components/ModalConfigComps/ManualQuant';
import FooterConfig from '../components/ModalConfigComps/FooterConfig';
// EXTERNAL STYLES
import styles from '../styles/ModalConfig';

const ModalConfig = (props) => {
  const [inputCalc, setInputCalc] = useState('');
  const [inputManual, setInputManual] = useState('');
  const [inputQuant, setInputQuant] = useState('');
  const [resultCalc, setResultCalc] = useState('?');
  const [resultManual, setResultManual] = useState('?');
  const [resultQuant, setResultQuant] = useState('?');
  const [disabledCalc, setDisabledCalc] = useState(true);
  const [disabledManual, setDisabledManual] = useState(true);
  const [disabledQuant, setDisabledQuant] = useState(true);
  const [showBallon, setShowBallon] = useState(false);
  const [objFinal, setObjFinal] = useState('indefinido');
  const [quantFinal, setQuantFinal] = useState('indefinida');
  const [resultGlass, setResultGlass] = useState([false, '']);
  const [showRestoreAlert, setShowRestoreAlert] = useState(false);
  const [showInit, setShowInit] = useState(false);

  const verifyFieldCalc = (num) => {
    setResultManual('?');
    setInputManual('');
    setDisabledManual(true);
    let val = Number(num.replace(',', '.'));
    num.length >= 5 && num.length <= 6
      ? (setResultCalc((val * 35).toFixed(0)), setDisabledCalc(false))
      : (setResultCalc('?'), setDisabledCalc(true));
    val == 0.0 || val == 0.0 ? setInputCalc('') : null;
  };

  const verifyFieldManual = (num) => {
    setResultCalc('?');
    setInputCalc('');
    setDisabledCalc(true);
    num.length >= 5
      ? (setResultManual(num), setDisabledManual(false))
      : (setResultManual('?'), setDisabledManual(true));
  };

  const verifyFieldQuant = (num) => {
    num == undefined
      ? (setInputQuant(''), setResultQuant('?'), setDisabledQuant(true))
      : num.length >= 3
      ? (setResultQuant(num), setDisabledQuant(false))
      : (setResultQuant('?'), setDisabledQuant(true));
  };

  const verifyFinals = () => {
    return objFinal != 'indefinido' && quantFinal != 'indefinida'
      ? true
      : false;
  };

  const ResetThisScreen = () => {
    verifyFieldCalc('');
    verifyFieldManual('');
    verifyFieldQuant();
    setObjFinal('indefinido');
    setQuantFinal('indefinida');
  };

  useEffect(() => {
    if (verifyFinals()) {
      let i = 1,
        originalQnt = parseInt(quantFinal),
        qnt = parseInt(quantFinal);
      while (qnt <= parseFloat(objFinal.replace('.', ''))) {
        qnt += originalQnt;
        i++;
      }
      setResultGlass([true, i]);
    } else {
      setResultGlass([false, '']);
    }
  }, [objFinal, quantFinal]);

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={() => {}}>
      <View style={styles.vwContent}>
        <View style={[styles.vwHeader, styles.kitJust]}>
          <TouchableHighlight
            onPress={() => props.closeConfig()}
            underlayColor="none"
            style={[styles.tchBack, styles.kitJust]}>
            <IconI name="chevron-back" size={35} color="#333" />
          </TouchableHighlight>
          <Text style={styles.txtConfig}>Configurações</Text>
        </View>
        <ScrollView style={styles.svConfig}>
          <View>
            <CalcObjective
              CalcObj={(v) => setObjFinal(v)}
              result={resultCalc}
              disabled={disabledCalc}
              valueInput={inputCalc}
              stInput={(v) => setInputCalc(v)}
              verifyCalc={(v) => verifyFieldCalc(v)}
            />

            {/* ------------------------------ */}

            <ManualObjective
              ManualObj={(v) => setObjFinal(v)}
              result={resultManual}
              disabled={disabledManual}
              valueInput={inputManual}
              stInput={(v) => setInputManual(v)}
              verifyManual={(v) => verifyFieldManual(v)}
              showApprox={() => setShowBallon(true)}
            />

            {/* ------------------------------ */}

            <ManualQuant
              ManualQuant={(v) => setQuantFinal(v)}
              result={resultQuant}
              disabled={disabledQuant}
              valueInput={inputQuant}
              stInput={(v) => setInputQuant(v)}
              verifyQuant={(v) => verifyFieldQuant(v)}
            />
          </View>
        </ScrollView>
        <View style={styles.vwFooter}>
          <FooterConfig
            objFinal={objFinal}
            quantFinal={quantFinal}
            resultGlass={[resultGlass[0], resultGlass[1]]}
            Finals={verifyFinals()}
            restore={() => setShowRestoreAlert(true)}
            initWater={() => setShowInit(true)}
          />
        </View>

        {showBallon && (
          <BallonApprox
            closeAlert={() => setShowBallon(false)}
            title="Por aproximação"
            visible={showBallon}
            onFine={(v) => {
              setInputManual(v);
              verifyFieldManual(v);
            }}
          />
        )}

        {showInit && (
          <BottomAlert
            visible={showInit}
            icon="gears"
            title="Confirmar início"
            text="Confirme se deseja realmente iniciar os ciclos conforme estas configurações"
            closeAlert={() => setShowRestoreAlert(false)}
            onConfirm={() => {
              // InitConfig();
              setShowInit(false);
              props.closeConfig();
              props.initCicles();
            }}
          />
        )}

        {showRestoreAlert && (
          <BottomAlert
            visible={showRestoreAlert}
            icon="caution"
            title="Resetar configurações"
            text="Confirme se deseja realmente resetar as configurações desta tela"
            closeAlert={() => setShowRestoreAlert(false)}
            onConfirm={() => {
              ResetThisScreen();
              setShowRestoreAlert(false);
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export default ModalConfig;
