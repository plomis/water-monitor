
import React, { useState } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Platform } from 'react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import WebView from 'react-native-webview';
import { HOST } from '../../components/constants';
import { connect } from '../../utils/plodux';


const basename = `${HOST}/water/monitor/app`;

function WebPagetHome({ dispatch, navigation }) {

  const url = navigation.getParam( 'url' )
  const [ loading, setLoading ] = useState( true );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleLoad = () => {
    setLoading( false );
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <WebView
        zoomable={false}
        onLoad={handleLoad}
        source={{ uri: basename + url }}
        style={styles.webview}
        dataDetectorTypes="none"
        mixedContentMode="always"
        hideKeyboardAccessoryView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        applicationNameForUserAgent="Thingspower/1.0.0"
        nativeConfig={{ props: { webContentsDebuggingEnabled: true, mixedContentMode: 'always' }}} />
      {loading ? <ActivityIndicator toast text="正在加载" /> : null}
    </View>
  );
}

WebPagetHome.navigationOptions = ({ navigation }) => {

  const title = navigation.getParam( 'title' );
  const back = navigation.getParam( 'back' );
  return {
    title,
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate( back )} />
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


export default createStackNavigator({
  WebPagetHome: {
    screen: connect()( WebPagetHome )
  }
}, {
  initialRouteName: 'WebPagetHome',
  headerLayoutPreset: 'center',
  defaultNavigationOptions: Platform.OS === 'ios' ? {} : {
    headerForceInset: { top: getStatusBarHeight() }
  }
});
