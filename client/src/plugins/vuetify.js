import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    "primary": "#37474f",
    "secondary": "#1565c0",
    "accent": "#e91e63",
    "error": "#d32f2f",
    "info": "#536dfe",
    "success": "#00bfa5",
    "warning": "#ff9800"
  }
})