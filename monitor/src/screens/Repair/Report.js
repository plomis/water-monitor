
import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import WebView from 'react-native-webview';
import { ACTIVE_OPACITY, HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor/app`;

function ReportHome({ dispatch, navigation, accessToken }) {

  const url = navigation.getParam( 'url' );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };


  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <WebView
        zoomable={false}
        source={{ uri: basename + url + `&token=${encodeURIComponent( accessToken )}` }}
        style={styles.webview}
        dataDetectorTypes="none"
        hideKeyboardAccessoryView
        applicationNameForUserAgent="Thingspower/1.0.0" />
    </View>
  );
}

ReportHome.navigationOptions = ({ navigation }) => {

  const handleShowActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: [ '刷新', '取消' ],
      cancelButtonIndex: 1
    }, ( buttonIndex ) => {
      if ( buttonIndex === 0 ) {
        // webviewRef.current.reload();
      }
    });
  };

  return {
    title: '报修',
    headerRight: (
      <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={handleShowActionSheet}>
        <Icon name="share-alt" size={20} color="#047FFE" style={{ marginRight: 16 }} />
      </TouchableOpacity>
    ),
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate( 'Home' )} />
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webview: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  }
});


const Report = createStackNavigator({
  ReportHome: {
    screen: connect(({ global }) => {
      return {
        accessToken: global.accessToken
      }
    })( ReportHome )
  }
}, {
  initialRouteName: 'ReportHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});


export default Report;
