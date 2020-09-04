import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

export default () => {
  useState(() => {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  const testPush = () => {
    PushNotification.localNotification({
      title: 'Chegou a hora!',
      message: 'Hora de beber mais água!',
    });
  };

  const cancelPush = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  const testTimePush = () => {
    PushNotification.localNotificationSchedule({
      message: 'Hora de beber mais água!',
      date: new Date(Date.now() + 5 * 1000),
      // repeatType: 'minute',
      // repeatTime: 1,
      allowWhileIdle: true,
      soundName: 'water'
      // date: new Date(Date.now() + 10 * 1000), // in 10 secs
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableHighlight
        onPress={() => testPush()}
        style={styles.btnNotification}>
        <Text style={styles.txtNotification}>Receber notificações</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => cancelPush()}
        style={[styles.btnNotification, {backgroundColor: '#ff0000'}]}>
        <Text style={styles.txtNotification}>Cancelar notificações</Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => testTimePush()}
        style={[styles.btnNotification, {backgroundColor: '#99ee90'}]}>
        <Text style={styles.txtNotification}>Tempo - notificações (10s)</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNotification: {
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    padding: 5,
    paddingRight: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#800080',
    elevation: 5,
  },
  txtNotification: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
