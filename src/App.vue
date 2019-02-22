<template>
  <div id="app">

    <Header/>
    <v-app>
      <transition name="slide">
        <router-view/>
      </transition>
    </v-app>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticlesJS from '@/components/Particles'

export default {
  name: 'App',
  components: {ParticlesJS, Footer, Header},
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
@import './assets/styles/tomorrow-night-blue.css';
@import url('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.0/katex.min.css');
@import '../node_modules/vuetify/dist/vuetify.css';
@import './assets/easing';
@import './assets/md';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active, .slide-enter-active{
  transition: opacity .3s $easeInExpo  .4s;
}

.fade-leave-active, .slide-leave-active {
  transition: opacity .2s $easeOutQuint;
}

.fade-enter, .fade-leave-active, .slide-enter, .slide-leave-active  {
  opacity: 0;
}
@import url('https://fonts.googleapis.com/css?family=Noto+Serif+JP:600');
* {
  font-family: 'Noto Serif JP', serif;
}

.theme--light.application {
    background: #0000;
}
body {
  background: #f8f8f8ee;
  background-size: cover;
}
.application--wrap{
  min-height: 82vh;
}
@media only screen and (max-width: 600px) {
  .display-3 {
    font-size: 27px !important;
  }
}
canvas {
  width: 100%;
}
</style>
