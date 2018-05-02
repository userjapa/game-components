import Vue from 'vue'
import Vuex from 'vuex'

import video from "./video"
import sentence from "./sentence"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    video,
    sentence
  }
})
