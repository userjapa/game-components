export default {
  namespaced: true,
  state: {
    exercises: [],
    toUpdate: null
  },
  getters: {
    getExercises ({ exercises }) {
      return exercises
    },
    isToUpdate ({ toUpdate }) {
      if (toUpdate !== null) return true
      else return false
    }
  },
  mutations: {
    addExercise (state, exercise) {
      state.exercises.push(exercise)
    },
    removeExercise (state, id) {
      state.exercises.splice(id, 1)
    },
    setToUpdate (state, id) {
      console.log(id);
      state.toUpdate = id
    },
    update (state, exercise) {
      state.exercises[state.toUpdate] = exercise
    }
  }
}
