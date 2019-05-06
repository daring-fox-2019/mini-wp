new Vue ({
  el: '#app',
  components: {
    wysiwyg: vueWysiwyg.default.component,
  },
  data: {
    text: '',
    drawer: null,
    items: [
      { title: 'List of Articles', icon: 'create' },
      { title: 'Display Articles', icon: 'short_text' }
    ],
    clouds: [
      { title: 'Storage', icon: 'storage' },
      { title: 'Drive', icon: 'keyboard' }
    ],
    accounts: [
      { title: 'Settings', icon: 'settings' },
      { title: 'Privacy and Account', icon: 'security' }
    ]
  }
});
