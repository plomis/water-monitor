
import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import loadLocalResource from 'react-native-local-resource'
import f2Html from '../../../../assets/pages/f2.html';
import jstpl from '../../../../assets/pages/chart1.html';


function Chart({ data, type }) {

  const webViewRef = useRef( null );
  const source = Platform.OS === 'ios' ? f2Html : 'file:///android_asset/src/assets/pages/f2.html';
  const dataString = JSON.stringify( data.map(( itemData ) => ({
    name: type === 'hour'
      ? `${moment( itemData.dayHour, 'YYYY-MM-DD HH' ).format( 'H' )}时`
      : type === 'day' ? `${moment( itemData.day, 'YYYY-MM-DD' ).format( 'D' )}日`
      : `${moment( itemData.yearMonth, 'YYYY-MM' ).format( 'M' )}月`,
    value: itemData.dosage
  })));

  const handleLoad = () => {
    loadLocalResource( jstpl ).then(( jstpl ) => {
      webViewRef.current.injectJavaScript( jstpl );
      webViewRef.current.injectJavaScript( `
        chartApi.renderChart(${dataString});
      ` );
    });
  };

  useEffect(() => {
    webViewRef.current.injectJavaScript( `
      chartApi.changeData(${dataString});
    ` );
  }, [data]);

  // RNFS.readDir( RNFS.MainBundlePath )
  return (
    <WebView
      ref={webViewRef}
      incognito
      allowFileAccess
      scalesPageToFit
      javaScriptEnabled
      // startInLoadingState
      saveFormDataDisabled
      hideKeyboardAccessoryView
      startInLoadingState={false}
      cacheEnabled={false}
      domStorageEnabled={false}
      allowsLinkPreview={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      allowsBackForwardNavigationGestures={false}
      scrollEnabled={false}
      thirdPartyCookiesEnabled={false}
      overScrollMode="never"
      dataDetectorTypes="none"
      originWhitelist={['*']}
      // renderLoading={() => <Loading />}
      // injectedJavaScript={injectedJavascript}
      style={{ flex: 1, height: 220 }}
      source={source}
      onLoad={handleLoad} />
  );
}

export default Chart;