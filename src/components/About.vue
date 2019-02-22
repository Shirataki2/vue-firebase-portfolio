<template>
  <div class="about">
    <h1>About</h1>
    <img src="../assets/Japan-flag.png" v-on:click.prevent="handleClick_changeLanguage('ja')" width="25">
    <img src="../assets/United-kingdom-flag.png" v-on:click.prevent="handleClick_changeLanguage('en')" width="25">
    <v-container>
      <v-card class="row">
        <div class="text-left col-12 about">
          <h3 class="pt-3">{{ $t('message.profile') }}</h3>
          <h4 class="pt-3">{{ $t('message.name') }}</h4>
          <p class="pt-3">{{ $t('message.univ') }}</p>
          <hr>
          <h3 class="pt-3">{{ $t('message.job') }}</h3>
          <div v-for="job in $t('message.jobs')" class="row" :key="job.at">
            <span class="text-right col-3 mr-4 mt-2">{{ job.duration }}</span>
            <span  class="ml-4 text-left col-7">
              <h5>{{ job.at }}</h5>
              <p class="gray--text">{{ job.as }}</p>
            </span>
          </div>
        </div>
        <div class="text-left col-12">
          <hr>
          <h3 class="pt-3">{{ $t('message.skills') }}</h3>
        </div>
        <div class="container">
          <div class="row">
            <v-card
              class="col-6 col-md-4 col-lg-2"
              v-for="(skill, idx) in skills"
              :key="skill.name"
            >
              <Skill
                :per="skill.per"
                :highlight-color="skill.c1"
                :non-high-light-color="skill.c2"
                :width="185"
                :height="185"
                :label="skill.name"
                :chartId='"chart-" + idx'
              />
            </v-card>
          </div>
        </div>

      </v-card>
    </v-container>
  </div>
</template>

<script>
import PieChart from '@/components/items/Pie.js'
import Skill from '@/components/items/Skill'
import {db} from '@/main'

export default {
  name: 'About',
  components: {Skill, PieChart},
  data () {
    return {
      skills: []
    }
  },
  mounted () {
    this.getSkills()
  },
  methods: {
    handleClick_changeLanguage (lang) {
      this.$i18n.locale = lang
    },
    getSkills () {
      db.collection('skills').get().then((q) => {
        q.forEach((doc) => {
          this.skills.push(doc.data())
        })
      })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
.about {
  min-height: 18vh;
}
h2{
  font-size: 40px;
}
h3{
  font-size: 33px;
}
h4{
  font-size: 26px;
}
h5{
  font-size: 22px;
}
h6{
  font-size: 19px;
}

p{
  font-size: 16px;
}
.cent {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
