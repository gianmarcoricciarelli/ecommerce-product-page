import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import enUS from '../src/i18n/en-US.json';

type MessageSchema = typeof enUS;

const i18n = createI18n<[MessageSchema], 'en-US'>({
    locale: 'en-US',
    messages: { 'en-US': enUS },
});
const app = createApp(App);

app.use(i18n);
app.mount('#app');
