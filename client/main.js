import Vue from 'vue';
import App from '../imports/ui/App.vue';
import VueMeteorTracker from 'vue-meteor-tracker'
import BootstrapVue from 'bootstrap-vue';
import { ReactiveVar } from 'meteor/reactive-var';
import { library, dom } from '@fortawesome/fontawesome-svg-core'

import { faPlus, faUser, faInfo, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// We are only using the user-astronaut icon
library.add(faPlus, faUser, faInfo, faTrashAlt);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
dom.watch();

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(VueMeteorTracker)
Vue.use(BootstrapVue)
Vue.use(ReactiveVar)

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});