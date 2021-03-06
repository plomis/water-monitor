
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableWithoutFeedback, Image } from 'react-native';
import { Button, Icon, Toast } from '@ant-design/react-native';
import { NavigationEvents } from 'react-navigation';
import Tabs from '../../components/Tabs';
import { connect } from '../../utils/plodux';
import logo from '../../assets/svg/logo.png';


const tabs = [{
  title: '密码登录',
  value: 'userName'
}, {
  title: '验证码登录',
  value: 'phoneNumber'
}];


function Screen({ dispatch, navigation, loading, counter, restSeconds, mode, version }) {

  const [ userName, handleUsernameChange ] = useState( '' );
  const [ password, handlePasswordChange ] = useState( '' );
  const [ phoneNumber, handlePhoneNumberChange ] = useState( '' );
  const [ valiCode, handleValiCodeChange ] = useState( '' );
  const [ passwordVisible, handlePasswordVisibleChange ] = useState( false );

  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handlePwdVisibleChange = () => {
    handlePasswordVisibleChange( !passwordVisible );
  };

  const handleTabChange = ({ value }) => {
    dispatch({
      type: 'login.update',
      payload: {
        mode: value
      }
    });
  };

  const handleValiCode = () => {
    if ( !phoneNumber ) {
      Toast.fail( '必须填写手机号码！' );
    } else if ( restSeconds === 0 ) {
      dispatch({
        type: 'login.getVertifyCode',
        payload: {
          mobileNo: phoneNumber
        }
      });
    }
  };

  const handleSubmit = () => {
    if ( mode === 'userName' && ( !userName || !password )) {
      Toast.fail( !userName ? '必须填写用户名！' : '必须填写密码！' );
    } else if ( mode === 'phoneNumber' && ( !phoneNumber || !valiCode )) {
      Toast.fail( !phoneNumber ? '必须填写手机号码！' : '必须填写验证码！' );
    } else {
      dispatch({
        type: 'login.login',
        mode,
        callback: () => navigation.navigate( 'Stack' ),
        payload: mode === 'userName' ? {
          userCode: userName,
          password
        } : {
          mobileNo: phoneNumber,
          vertifyCode: valiCode
        }
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: 'login.update',
      payload: {
        mode: tabs[0].value
      }
    });
    if ( restSeconds > 0 && !counter ) {
      dispatch({
        type: 'login.update',
        payload: {
          counter: setInterval(() => {
            dispatch({ type: 'login.decrease' });
          }, 1000 )
        }
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.login}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={{ flex: 1 }} />
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image style={styles.logoImage} resizeMode="cover" source={logo} />
        </View>
        <View style={styles.form}>
          <Tabs
            onChange={handleTabChange}
            tabBarTextStyle={styles.tebBarText}
            tabBarActiveTextColor="#0B8EE9"
            swipeable={false}
            useOnPan={false}
            tabs={tabs}>
            <View style={styles.item}>
              <View style={styles.inputItem}>
                <TextInput
                  editable
                  value={userName}
                  style={styles.input}
                  textContentType="username"
                  placeholder="请输入用户名"
                  placeholderTextColor="#D6D6D6"
                  onChangeText={ userName => handleUsernameChange( userName )} />
              </View>
              <View style={styles.inputItem}>
                <TextInput
                  editable
                  secureTextEntry={!passwordVisible}
                  value={password}
                  style={styles.input}
                  textContentType="password"
                  placeholder="请输入密码"
                  placeholderTextColor="#D6D6D6"
                  onChangeText={ password => handlePasswordChange( password )} />
                <TouchableWithoutFeedback onPress={handlePwdVisibleChange}>
                  <View style={styles.eye}>
                    <Icon name={!passwordVisible ? 'eye-invisible' : 'eye'} color="#A3A3A3" size={18} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.item}>
              <View style={styles.inputItem}>
                <TextInput
                  editable
                  value={phoneNumber}
                  style={styles.input}
                  textContentType="telephoneNumber"
                  placeholder="请输入手机号"
                  placeholderTextColor="#D6D6D6"
                  onChangeText={ telephoneNumber => handlePhoneNumberChange( telephoneNumber )} />
              </View>
              <View style={styles.inputItem}>
                <TextInput
                  editable
                  value={valiCode}
                  style={styles.input}
                  textContentType="oneTimeCode"
                  placeholder="请输入验证码"
                  placeholderTextColor="#D6D6D6"
                  onChangeText={ valiCode => handleValiCodeChange( valiCode )} />
                <TouchableWithoutFeedback onPress={handleValiCode}>
                  <View style={styles.valiCode}>
                    <Text style={styles.valiCodeText}>{restSeconds > 0 ? `${restSeconds}s后再次发送` : '获取验证码'}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </Tabs>
          <Button
            type="primary"
            disabled={(
              loading || (( !userName || !password ) && mode === 'userName' ) ||
              (( !valiCode || !phoneNumber ) && mode === 'phoneNumber' )
            )}
            style={styles.loginButton}
            onPress={handleSubmit}>
            登录
          </Button>
        </View>
      </View>
      <View style={styles.about}>
        <View><Text style={styles.aboutText}>Thingspower</Text></View>
        <View><Text style={styles.aboutText}>ver {version}</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 500,
    alignItems: 'center'
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    flex: 0,
    height: 100,
    width: 100,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  tebBarText: {
    fontSize: 18
  },
  form: {
    height: 300,
    marginHorizontal: 24,
    overflow: 'hidden'
  },
  item: {
    marginTop: 24
  },
  loginButton: {
  },
  inputItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D6D6D6',
    marginBottom: 8
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 48,
    paddingHorizontal: 8
  },
  about: {
    flex: 1,
    marginBottom: 16,
    justifyContent: 'flex-end'
  },
  aboutText: {
    textAlign: 'center',
    color: '#D6D6D6'
  },
  eye: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valiCode: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valiCodeText: {
    fontSize: 16,
    color: '#0B8EE9'
  }
});

export default connect(({ login, global }) => {
  return {
    loading: login.loading,
    counter: login.counter,
    restSeconds: login.restSeconds,
    mode: login.mode,
    version: global.version
  };
})( Screen );
