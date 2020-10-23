import React from 'react';

import {
  Heart,
  Calendar,
  Envite,
  Gift,
  Notfications,
  Messages,
  Contacts,
  Profile,
} from '../assets';

const items = [
  {
    title: 'Gostos e preferências',
    icon: <Heart height="40" width="40" />,
    route: 'PreferencesRoutes',
  },
  {
    title: 'Datas importantes',
    icon: <Calendar height="40" width="40" />,
    route: 'DateRoutes',
  },
  {
    title: 'Presentes',
    icon: <Gift height="40" width="40" />,
    route: '',
  },
  {
    title: 'Mensagens',
    icon: <Messages height="40" width="40" />,
    route: 'MessagesRoutes',
  },
  {
    title: 'Notificações',
    icon: <Notfications height="40" width="40" />,
    route: '',
  },
  {
    title: 'Convide seus amigos',
    icon: <Envite height="40" width="40" />,
    route: 'EnviteFriends',
  },
  {
    title: 'Contatos',
    icon: <Contacts height="40" width="40" />,
    route: 'Contacts',
  },
  {
    title: 'Meu Perfil',
    icon: <Profile height="40" width="40" />,
    route: 'Profile',
  },
];

export default items;
