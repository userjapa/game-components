import Vue from 'vue'
import Vuex from 'vuex'

import video from "./video"
import sentence from "./sentence"
import dialog from "./dialog"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    video,
    sentence,
    dialog
  }
})
