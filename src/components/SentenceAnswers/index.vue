<template>
<div class="item-border">

  <div class="container align-items-start wrap">
    <div class="flex-basis-300 flex-grow-1 item margin-10 item-border">
      <div v-for="(ex, index) in audios" :ref="`audio${index}`" :class="{
            disabled: !ex.answered,
            success: (ex.answered && checkAnswer(ex.answers)),
            failed: (ex.answered && !checkAnswer(ex.answers))
          }" @click="viewCurrent(ex, index)">
        <SentenceAudio :audio="ex" />
      </div>
    </div>

    <div class="item margin-10 item-border flex-basis-300 flex-grow-1 list-content">
      <div v-for="(aswr, index) in current.answers" @click="selectAnswer(aswr, $event.target)" :ref="`answer${index}`" :class="{ right: checkRight(aswr, current), wrong: checkWrong(aswr, current) }">
        <input type="radio" name="aswrs" value="" :id="'aswr-audio-' + index" class="margin-right-10" :checked="current.answered && aswr.selected">
        <label :for="'aswr-audio-' + index">{{ aswr.text }}</label>
      </div>
    </div>
  </div>
  <div>
    <button @click="setCurrent(audios)" v-if="current.answered && !ended" class="btn btn-primary">Next</button>
    <p v-if="ended">You've finished!</p>
  </div>
</div>
</template>
<script>
import SentenceAudio from '../../components/SentenceAudio'

export default {
  name: "Answers",
  data() {
    return {
      current: {
        answers: [],
        answered: false
      },
      ended: false,
      currentIndex: null,
      oldIndex: null
    }
  },
  methods: {
    setCurrent(audios) {
      for (const index in audios) {
        if (!audios[index].answered) {
          setTimeout(() => {
            this.$refs[`audio${index}`][0].classList.remove('disabled')
          }, 0)
          this.checkCurrent(index)
          break
        } else {
          if (parseInt(index) === (audios.length - 1)) {
            this.ended = 'true'
            this.current = audios[index]
          }
        }
      }
    },
    selectAnswer(answer, el) {
      if (!this.current.answered) {
        answer.selected = true
        const elAudio = this.$refs[`audio${this.currentIndex}`][0]
        if (answer.correct) {
          el.classList.add('right')
          elAudio.classList.add('success')
        } else {
          el.classList.add('wrong')
          elAudio.classList.add('failed')
          const correctIndex = this.current.answers.findIndex(x => x.correct)
          this.$refs[`answer${correctIndex}`][0].classList.add('right')
        }
        this.current.answered = true
      }
    },
    resetBackground() {
      const right = document.querySelector('.right')
      const wrong = document.querySelector('.wrong')
      if (right) right.classList.remove('right')
      if (wrong) wrong.classList.remove('wrong')
    },
    checkRight (answer, audio) {
      if (answer.correct && audio.answered) return true
      else return false
    },
    checkWrong(answer, audio) {
      if (answer.selected && !answer.correct && audio.answered) return true
      else return false
    },
    checkAnswer(answers) {
      const selectedIndex = answers.findIndex(x => x.selected)
      if (selectedIndex >= 0) {
        if (answers[selectedIndex].correct) return true
      }
      return false
    },
    checkCurrent(index) {
      index = parseInt(index)
      if (this.oldIndex === null) this.oldIndex = index
      else this.oldIndex = this.currentIndex
      this.currentIndex = index
      if (!(this.oldIndex === index)) this.resetBackground()
      this.current = this.audios[index]
    },
    viewCurrent(audio, index) {
      if (audio.answered && this.audios[this.currentIndex].answered) this.checkCurrent(index)
    },
    checkSelected(audio) {
      const index = audio.answers.findIndex(x => x.selected)
      if (index >= 0) return true
      else return false
    }
  },
  props: [
    'audios'
  ],
  components: {
    SentenceAudio
  },
  watch: {
    audios: function () {
      this.ended = false
      this.setCurrent(this.audios)
    }
  },
  mounted () {
    this.setCurrent(this.audios)
  }
}
</script>
<style lang="scss" scoped>
.list-content {
    text-align: left;
    display: block;
    > div {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
