<template>
  <div>
  <div>
    <h1>Diary</h1>
  </div>
    <v-container>
      <v-flex xs12>
        <v-card v-for="post in posts.slice((page-1)*pagelen, (page)*pagelen)" :key="post.id">
          <router-link :to="getDetailLink(post.id)">
            <v-card-title primary-title>
              <div>
                <div class="h2 text-left">{{ post.title }}</div>
                <h6 class="grey--text text-left">
                <font-awesome-icon icon="sync-alt"></font-awesome-icon>
                {{ parseTimestamp(post.updated_at) }}
                <font-awesome-icon icon="pen-nib" class="ml-3"></font-awesome-icon>
                {{ parseTimestamp(post.post_at) }}
                </h6>
              </div>
            </v-card-title>
          </router-link>

        </v-card>
        <v-spacer class="mt-4"/>
        <v-pagination v-model="page" :length="getpagelen()"/>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'Works',
  data: () => {
    return {
      posts: [],
      page: 1,
      pagelen: 10
    }
  },
  mounted () {
    db.collection('items').get().then((q) => {
      q.forEach((doc) => {
        let dat = doc.data()
        dat.id = doc.id
        this.posts.push(dat)
      })
      this.posts = this.sortArray(this.posts)
    })
  },
  methods: {
    parseTimestamp: (ts) => {
      const d = new Date(ts.seconds * 1000)
      return `${d.getFullYear()} ${d.getMonth() + 1}/${d.getDate()}`
    },
    getDetailLink: (id) => {
      return `/diary/${id}`
    },
    sortArray: (arr) => {
      function compare (a, b) {
        if (a.updated_at > b.updated_at) {
          return -1
        }
        if (a.updated_at < b.updated_at) {
          return 1
        }
        return 0
      }

      return arr.sort(compare)
    },
    getpagelen: function () {
      return Math.round(this.posts.length / this.pagelen)
    }
  }
}
</script>

<style scoped lang="scss">
a {
  color: #000000ef;
  text-decoration: none;
}
.v-card {
  margin: 30px auto;
  position: relative;
  padding: 10px 5px;
  background: hsla(0, 0%, 100%, .3);
  font-size: 20px;
  font-family: 'Lora', serif;
  line-height: 1.5;
  border-radius: 10px;
  width: 95%;
  box-shadow: 5px 3px 30px #0004;
  overflow: hidden;
}

.v-card::before {
  content: '';
  margin: -35px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(20px);
  z-index: -1;
}
</style>
