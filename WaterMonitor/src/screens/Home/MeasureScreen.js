
import React, { useContext } from 'react';
import { NavigationEvents, ThemeContext } from 'react-navigation';
import { Text, ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { List } from '@ant-design/react-native';
import { HEADER_LARGE_HEIGHT, ThemeConstants } from '../../components/constants';
import { connect } from '../../utils/plodux';


const Item = List.Item;

const data = [{
  title: '水利大厦1层用水',
  dosage: 26
}, {
  title: '水利大厦2层用水',
  dosage: 26
}, {
  title: '水利大厦3层用水',
  dosage: 26
}, {
  title: '水利大厦4层用水',
  dosage: 26
}, {
  title: '水利大厦5层用水',
  dosage: 26
}, {
  title: '水利大厦6层用水',
  dosage: 26
}, {
  title: '水利大厦7层用水',
  dosage: 26
}, {
  title: '水利大厦8层用水',
  dosage: 26
}, {
  title: '水利大厦9层用水',
  dosage: 26
}, {
  title: '水利大厦10层用水',
  dosage: 26
}, {
  title: '水利大厦11层用水',
  dosage: 26
}, {
  title: '水利大厦12层用水',
  dosage: 26
}, {
  title: '水利大厦13层用水',
  dosage: 26
}];

function Screen({ dispatch, navigation }) {

  const theme = useContext( ThemeContext );
  const statusBarHeight = getStatusBarHeight();
  const handleWillFocus = () => {
    dispatch({
      type: 'statusBar.update',
      payload: {
        barStyle: 'dark-content'
      }
    });
  };

  const handleInfo = ( item ) => () => {
    navigation.navigate( 'MeasureInfo', {
      title: item.title,
      data: item
    });
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <View style={[ styles.header, {
        height: statusBarHeight + HEADER_LARGE_HEIGHT,
        backgroundColor: ThemeConstants[theme].backgroundColor,
        borderColor: ThemeConstants[theme].borderTopColor,
        borderBottomWidth: 0.5,
        zIndex: 1
      }]}>
        <View style={styles.headerItem}>
          <Text style={styles.title}>表具总数</Text>
          <View style={styles.content}>
            <Text style={styles.value}>320</Text>
            <Text style={styles.unit}>个</Text>
          </View>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.title}>在线</Text>
          <View style={styles.content}>
            <Text style={styles.value}>320</Text>
            <Text style={styles.unit}>个</Text>
          </View>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.title}>在线率</Text>
          <View style={styles.content}>
            <Text style={styles.value}>320</Text>
            <Text style={styles.unit}>%</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {}} />
        }>
        <List>
          {data.map(( item ) => {
            const { title, dosage } = item;
            const extra = (
              <View style={styles.extra}>
                <View style={styles.extraWrap}>
                  <Text style={styles.extraValue}>{dosage}</Text>
                  <Text style={styles.extraUnit}>吨</Text>
                </View>
              </View>
            );
            return (
              <Item key={title} extra={extra} arrow="horizontal" onPress={handleInfo( item )}>
                <View style={styles.itemTitle}>
                  <View style={styles.dot} />
                  <Text style={styles.itemTitleText}>{title}</Text>
                </View>
              </Item>
            );
          })}
        </List>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F1F3FD'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 64
  },
  headerItem: {
    flex: 0,
    width: '33.33%',
    height: HEADER_LARGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    height: 18,
    lineHeight: 18,
    fontSize: 14,
    color: '#878c9a',
    marginBottom: 12
  },
  content: {
    flexDirection: 'row'
  },
  value: {
    height: 18,
    lineHeight: 18,
    fontSize: 18,
    color: '#595e6d',
    marginRight: 2
  },
  unit: {
    fontSize: 12,
    color: '#595e6d',
    marginTop: 2
  },
  extra: {
    flex: 1,
    alignItems: 'flex-end',
  },
  extraWrap: {
    flex: 0,
    padding: 6,
    width: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: 'rgba(80, 88, 247, 0.3)'
  },
  extraValue: {
    fontSize: 12,
    color: '#5058f7',
    marginRight: 4
  },
  extraUnit: {
    fontSize: 12,
    color: '#5058f7'
  },
  itemTitle: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemTitleText: {
    color: '#595e6d'
  },
  dot: {
    flex: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: '#00cc00'
  }
});

export default connect()( Screen );
