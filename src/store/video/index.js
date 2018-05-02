export default {
  namespaced: true,
  state: {
    video: {
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      interruptions: []
    },
    toUpdate: null
  },
  mutations: {
    setVideo (state, video) {
      state.video = video
    },
    addInterruption (state, interruption) {
      state.video.interruptions.push(interruption)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    edit (state, interruption) {
      const id = state.toUpdate
      state.video.interruptions[id] = interruption
    },
    remove (state, id) {
      state.video.interruptions.splice(id, 1)
    }
  },
  getters: {
    getVideo (state) {
      return state.video
    },
    getVideoInterruptions (state) {
      return state.video.interruptions
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  }
}
