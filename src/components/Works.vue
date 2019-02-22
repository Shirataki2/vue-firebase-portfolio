<template>
  <div>
    <h1>Works</h1>
    <v-container>
      <div class="row" >
        <v-card class="col-12 col-sm-6 col-lg-4 pl-1 pr-1 mt-2"
                v-for="(work) in works"
                :key="work.name">
          <div @click="work.dialog = true">
            <v-img :src="work.url" height="210px" style="margin: 0"/>
            <v-card-title primary-title class="col-12">
              <h2 class="text-center">{{ work.title }}</h2>
            </v-card-title>
            <v-card-text>
              {{ work.abst }}
            </v-card-text>
          </div>
          <v-dialog max-width="1000px" v-model="work.dialog">
          <v-card>
            <v-img :src="work.url" max-height="65%" :aspect-ratio="16 / 9"/>
            <v-card-title>
              <h1>
                {{ work.title }}
              </h1>
            </v-card-title>
            <v-card-text class="text-left">
              <vue-markdown :source="work.text"/>
            </v-card-text>
          </v-card>
        </v-dialog>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import firebase from 'firebase/app'
import 'firebase/storage'
import {db} from '@/main'

export default {
  name: 'Works',
  data: () => {
    return {
      works: [],
      dialog: false
    }
  },
  watch: {
    works: function () {
    }
  },
  mounted () {
    this.getWorks()
  },
  methods: {
    getWorks () {
      db.collection('works').get().then((q) => {
        q.forEach((doc) => {
          let dat = doc.data()
          dat.dialog = false
          this.works.push(dat)
        })
      })
    },
    getImgFromUrl (url) {
      if (url === '') {
        const ref = firebase.storage().ref('images/01_029.png')
        return ref.getDownloadURL().then((u) => {
          return u
        }).catch((e) => {
          console.error(e)
        })
      }
      const baseUri = 'images/'
      const ref = firebase.storage().ref(baseUri + url)
      return ref.getDownloadURL().then((u) => {
        return u
      }).catch((e) => {
        console.error(e)
      })
    }
  },
  components: { VueMarkdown }
}
</script>

<style scoped>
.v-card {
  position: relative;
  border-radius: 15px;
  box-shadow: 5px 3px 30px #0004;
  overflow: hidden;
}

.v-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(20px);
  z-index: -1;
}
</style>
