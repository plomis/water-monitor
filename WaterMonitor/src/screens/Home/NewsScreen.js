
import React, { useState, useRef } from 'react';
import { NavigationEvents } from 'react-navigation';
import { SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { connect } from '../../utils/plodux';


function Screen({ navigation, dispatch }) {

  const webViewRef = useRef( null );
  const [ refresh, setRefresh ] = useState( false );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleRefresh = () => {
    setRefresh( true );
    webViewRef.current.reload();
  };

  const handleLoad = () => {
    setRefresh( false );
  };

  const handleMessage = ( event ) => {
    const data = JSON.stringify( event.nativeEvent.data );
    navigation.navigate( 'NewsInfo', data );
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }>
        <AutoHeightWebView
          ref={webViewRef}
          zoomable={false}
          onLoad={handleLoad}
          source={{ html: '<body style="height:1000px;background-color:#444">loading</body>' }}
          onMessage={handleMessage} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flex: 1
  }
});

export default connect()( Screen );
