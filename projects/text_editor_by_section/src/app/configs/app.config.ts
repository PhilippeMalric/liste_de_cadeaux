import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig: any = {
  N: 100,
  SPECTRUM: [
    // "rgb(222,237,250)"
    'rgb(176,212,243)',
    'rgb(128,186,236)',
    'rgb(77,158,228)',
    'rgb(38,137,223)',
    'rgb(0,116,217)',
    'rgb(0,106,197)'
    // "rgb(0,94,176)"
    // "rgb(0,82,154)"
    // "rgb(0,60,113)"
  ],
  routes: {
    login: 'login',
    signup: 'signup',
    heroes: 'heroes',
    enjeux: 'enjeux',
    presence: 'presence',
    profil: 'profil',
    collier: 'collier',
    about: 'about',
    error404: '404'
  },
  votesLimit: 1,
  topEnjeuxLimit: 10,
  topHeroesLimit: 5,
  snackBarDuration: 3000,
  repositoryURL: 'https://github.com/PhilippeMalric/toudeparole.git',
  sentryDSN: 'https://75a52f7d42f044efa1602e73c1f60a5a@sentry.io/1447956'
};
