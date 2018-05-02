<template>
  <div>
    <div class="player">

      <div class="image">
        <img :src="audio.img">
      </div>

      <audio ref="audio"
             :src="audio.src"
             @playing="isPlaying = true"
             @pause="isPlaying = false"
             @loadeddata="loadedData($event.target)"
             @timeupdate="timeUpdated($event.target)" />

      <div class="inpt margin-10">
        <input type="range"
               v-model="time"
               :max="duration"
               step="0.000001"
               @change="timeChanged(time)"
               @input="timeChanged(time)" />
      </div>

      <div class="volume margin-10" style="width: 100px">
        <input type="range" v-model="volume" step="0.001" @change="changeVolume(volume)" @input="changeVolume(volume)" max="1">
      </div>

      <button class="btn" @click="play()" v-if="!isPlaying" :disabled="!loaded">
          <font-awesome-icon :icon="iconPlay" />
      </button>
      <button class="btn" @click="pause()" v-else :disabled="!loaded">
          <font-awesome-icon :icon="iconPause" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player {
  width: 100%;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
    .image {
      width: 50px;
      height: 50px;
      background: red;
      img {
        width: 100%;
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
    }

    .inpt {
      width: 100%;
    }
    input {
      width: 100%;
      margin: 0 auto;
    }
}
.failed {
  .player {
    // background-color: red;
    box-shadow: 0 0 0 2px red;
  }
}

.success {
  .player {
    // background-color: green;
    box-shadow: 0 0 0 2px green;
  }
}

</style>


<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlay'
import faPause from '@fortawesome/fontawesome-free-solid/faPause'

export default {

  name: "AudioPlayer",
  components: {
    FontAwesomeIcon
  },
  computed: {
    iconPlay () {
      return faPlay
    },
    iconPause () {
      return faPause
    }
  },
  data () {
    return {
      loaded: false,
      isPlaying: false,
      duration: 0,
      volume: 0.5,
      time: 0,
      answers: []
    }
  },
  methods: {
    play () {
      this.$refs['audio'].play()
    },
    pause () {
      this.$refs['audio'].pause()
    },
    loadedData (audio) {
      this.duration = audio.duration
      this.loaded = true
      if (this.autoplay) audio.play()
    },
    timeChanged (time) {
      this.$refs['audio'].currentTime = time
    },
    timeUpdated (audio) {
      this.time = audio.currentTime
    },
    changeVolume(volume) {
     this.$refs['audio'].volume = volume
   },
  },
  props: [
    'audio',
    'autoplay'
  ],
  watch: {
    'audio.src': function () {
      this.loaded = false
      this.duration = 0
      this.$refs['audio'].load()
    }
  }
}
</script>
