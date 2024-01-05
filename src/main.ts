import type { Component } from 'vue';

import { createApp } from 'vue';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import enUS from '../src/i18n/en-US.json';
import './style.css';

type MessageSchema = typeof enUS;

const i18n = createI18n<[MessageSchema], 'en-US'>({
    locale: 'en-US',
    messages: { 'en-US': enUS },
});
const app = createApp(App as Component);

app.use(i18n);
app.mount('#app');
