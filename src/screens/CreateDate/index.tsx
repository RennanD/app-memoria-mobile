import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header, PageTitle } from './styles';

import NewContactDate from './NewContactDate';
import WithContactDate from './WithContactDate';

interface Routes {
  key: string;
  title: string;
}

const CreateDate: React.FC = () => {
  const initilLayout = { width: Dimensions.get('window').width };

  const [indexTab, setIndexTab] = useState(0);
  const [routes] = useState<Routes[]>([
    { key: 'first', title: 'Novo contato' },
    { key: 'second', title: 'Contato existente' },
  ]);

  const renderScene = SceneMap({
    first: NewContactDate,
    second: WithContactDate,
  });

  return (
    <>
      <Header>
        <MaterialCommunityIcons name="calendar-month" size={48} color="#fff" />
        <PageTitle>Datas importantes</PageTitle>
      </Header>
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            activeColor="#65c4b0"
            inactiveColor="#ccc"
            indicatorStyle={{ backgroundColor: '#65c4b0' }}
            style={{ backgroundColor: '#fff' }}
          />
        )}
        navigationState={{ index: indexTab, routes }}
        renderScene={renderScene}
        onIndexChange={setIndexTab}
        initialLayout={initilLayout}
      />
    </>
  );
};

export default CreateDate;
