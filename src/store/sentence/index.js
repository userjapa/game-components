export default {
  namespaced: true,
  state: {
    exercise: {
      audios: []
    },
    toUpdate: null
  },
  getters: {
    getExercise ({ exercise }) {
      return exercise
    },
    isToUpdate({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  },
  mutations: {
    addAudio (state, audio) {
      state.exercise.audios.push(audio)
    },
    setToUpdate (state, id) {
      state.toUpdate = id
    },
    update (state, audio) {
      const index = state.toUpdate
      state.audios[index] = audio
    },
    remove (state, index) {
      state.audios.splice(index, 1)
    }
  }
}
