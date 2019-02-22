<template>
  <div>
    <v-container>
    <v-card class="row backdrop-blur">
    <h1 class="col-12 md display-2 pb-2 mt-4">{{ title }}</h1>
      <span class="col-12 gray--text md mb-4">投稿: {{ upload }}/更新: {{ update }}</span>
      <hr>
      <vue-markdown :source="detail" class="md text-left col-12"/>
    </v-card>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/main'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Detail',
  data: () => {
    return {
      id: null,
      detail: '',
      title: '',
      update: '',
      upload: ''
    }
  },
  mounted () {
    this.id = this.$route.params.id
    db.collection('items').doc(this.id).get().then((doc) => {
      if (doc.exists) {
        let raw = `${doc.data().source}`
        this.detail = raw.replace(/\\n/g, '\n')
        this.title = doc.data().title
        this.update = this.parseTimestamp(doc.data().updated_at)
        this.upload = this.parseTimestamp(doc.data().post_at)
      } else {
        this.detail = 'Document Not Found'
      }
    })
  },
  methods: {
    parseTimestamp: (ts) => {
      const d = new Date(ts.seconds * 1e3)
      return `${d.getFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`
    }
  },
  components: { VueMarkdown }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Serif+JP:400');
.md, .md.display-2 {
  font-family: 'Noto Serif JP', serif !important;
}

.v-card {
  margin: 30px auto;
  position: relative;
  padding: 10px 5px;
  line-height: 1.5;
  border-radius: 10px;
  background-color: #fff8;
  width: 95%;
  box-shadow: 5px 3px 20px #0003;
  overflow: hidden;
}

.v-card::before {
  filter: blur(15%);
  content: '';
  margin: -35px;
  background-size: cover;
  position: absolute;
  opacity: 0.2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}
*{
  color: #000000ee;
}
/* slightly transparent fallback */
.backdrop-blur {
  background-color: rgba(255, 255, 255, .8);
}

/* if backdrop support: very transparent and blurred */
@supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
  .backdrop-blur {
    background-color: rgba(255, 255, 255, .5);
    -webkit-backdrop-filter: blur(2em);
    backdrop-filter: blur(2em);
  }
}
</style>
