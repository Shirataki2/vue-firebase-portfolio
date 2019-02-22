<template>
  <div>
    <loading :active.sync="isLoading"
             :is-full-page="fullPage"></loading>
    <v-btn primary @click="authWithGoogle()" v-if="!isAuth">
      Sign in With Google
    </v-btn>
    <div v-if="isAuth">
      <h1>Admin Page</h1>
      <v-container>
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header" class="l">新規投稿/投稿修正</div>
            <v-card>
              <div class="container">
                <div class="row">
                  <v-text-field label="投稿ID" hint="空白で自動生成,既存の記事を入力でデータの取得" class="col-10" v-model="id"></v-text-field>
                  <v-btn @click="fetchArticle" class="col-1 mr-5 ml-5 pl-2">検索</v-btn>
                  <v-text-field label="Title" class="col-12" v-model="title"></v-text-field>
                  <v-textarea class="col-xs-12 col-md-6 md" rows="18" v-model="txt" label="本文"></v-textarea>
                  <vue-markdown class="col-xs-12 col-md-6 md preview" :source="txt"/>
                  <div class="col-6">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="-20"
                      :return-value.sync="upload"
                      lazy
                      transition="scale-transition"
                      full-width
                      min-width="290px"
                      style="left: 0;top: 0;"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="upload"
                        label="投稿日"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="upload" no-title scrollable reactive>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu.save(upload)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div class="col-6">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="-20"
                      :return-value.sync="update"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="update"
                        label="更新日"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="update" no-title scrollable reactive>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu2.save(update)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-card>
            <v-btn secondary class="col-4 offset-4" @click="submit">投稿</v-btn>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header" class="l">新規作品/作品修正</div>
                        <v-card>
              <div class="container">
                <div class="row">
                  <v-text-field label="作品ID" hint="空白で自動生成,既存の作品を入力でデータの取得" class="col-10" v-model="w_id"></v-text-field>
                  <v-btn @click="fetchWork" class="col-1 mr-5 ml-5 pl-2">検索</v-btn>
                  <v-text-field label="Title" class="col-12" v-model="w_title"></v-text-field>
                  <v-text-field class="col-12" v-model="w_abst" label="概要"></v-text-field>
                  <v-text-field class="col-12" v-model="w_tag" label="タグ"></v-text-field>
                  <div class="col-12">
                    <div class="row">
                      <upload-btn :fileChangedCallback="fileChanged" title="UPLOAD" class="col-2"></upload-btn>
                      <p class="col-9 mt-3">{{ w_fname }}</p>
                    </div>
                  </div>
                  <v-textarea class="col-12 col-md-6 md" rows="18" v-model="w_txt" label="紹介文"></v-textarea>
                  <vue-markdown class="col-12 col-md-6 md preview" :source="w_txt"/>
                  <div class="col-12">
                    <v-menu
                      ref="menu3"
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="-20"
                      :return-value.sync="upload3"
                      lazy
                      transition="scale-transition"
                      full-width
                      min-width="290px"
                      style="left: 0;top: 0;"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="upload3"
                        label="作成日"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="upload3" no-title scrollable reactive>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu3 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu3.save(upload3)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </div>
            </v-card>
            <v-btn secondary class="col-4 offset-4" @click="submitWork">投稿</v-btn>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header" class="l">スキル管理</div>
            <v-card>
              <v-card-text>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Skills</v-toolbar-title>
                  <v-divider class="mx-3" inset vertical/>
                  <v-spacer/>
                  <v-dialog v-model="dialog" max-width="600px">
                    <v-btn color="primary" class="mb-2" slot="activator">Add</v-btn>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Edit</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm8 md8>
                              <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm4 md4>
                              <v-text-field v-model="editedItem.per" label="Percentage"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <v-text-field v-model="editedItem.c1" label="Highlight"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <v-text-field v-model="editedItem.c2" label="Background"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <chrome-picker v-model="c1" :value="c1" @input="updateValue1"/>
                            </v-flex>
                            <v-flex xs12 sm6>
                              <chrome-picker v-model="c2" :value="c2" @input="updateValue2"/>
                            </v-flex>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                            </v-card-actions>
                          </v-layout>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
                <v-data-table :headers="headers" :items="skills" class="elevation-2">
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.name}}</td>
                    <td class="test-xs-right">{{props.item.per}}</td>
                    <td class="test-xs-right">{{props.item.c1}}</td>
                    <td class="test-xs-right">{{props.item.c2}}</td>
                    <td class="justify-center layout px-0">
                      <v-icon small class="mr-2" @click="editItem(props.item)">
                        edit
                      </v-icon>
                      <v-icon small @click="deleteItem(props.item)">
                        delete
                      </v-icon>
                    </td>
                  </template>
                  <template slot="no-data">
                    <h5>スキル未登録</h5>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header" class="l">ログアウト</div>
            <v-card>
              <v-card-text class="text-center">
                <v-btn class="center text-center" @click="logout()">Log out</v-btn>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import VueMarkdown from 'vue-markdown'
import 'firebase/auth'
import 'firebase/storage'
import {db} from '@/main'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import UploadButton from 'vuetify-upload-button'
import { Chrome } from 'vue-color'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
export default {
  name: 'Admin',
  data () {
    return {
      upload: new Date().toISOString().substr(0, 10),
      upload3: new Date().toISOString().substr(0, 10),
      update: new Date().toISOString().substr(0, 10),
      isAuth: false,
      txt: '',
      w_txt: '',
      title: '',
      w_title: '',
      w_url: '',
      w_fname: '',
      w_abst: '',
      w_tag: '',
      modal: false,
      menu: false,
      menu2: false,
      menu3: false,
      id: null,
      w_id: null,
      isLoading: true,
      fullPage: true,
      dialog: false,
      editedItem: {
        name: '',
        per: 0,
        c1: '',
        c2: ''
      },
      defaultItem: {
        name: '',
        per: 0,
        c1: '',
        c2: ''
      },
      skills: [],
      headers: [
        {
          text: 'Skill',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {text: '習得度', value: 'per'},
        {text: '色メイン', value: 'c1'},
        {text: '色サブ', value: 'c2'},
        {text: 'Actions', value: 'name', sortable: false}
      ],
      editedIndex: -1,
      c1: '',
      c2: ''
    }
  },
  created () {
    this.checkAuth()
  },
  mounted () {
    this.getSkills()
  },
  methods: {
    authWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return firebase.auth().signInWithPopup(provider).then((res) => {
            this.checkAuth()
          })
        }).catch((err) => {
          console.error(err)
        })
    },
    fileChanged (file) {
      const storageRef = firebase.storage().ref()
      const imgRef = storageRef.child(`images/${file.name}`)
      this.w_fname = file.name
      imgRef.put(file).then(() => {
      }).then(() => {
        imgRef.getDownloadURL().then((url) => {
          this.w_url = url
        })
      })
    },
    checkAuth () {
      const baseUri = 'https://us-central1-portfolio-30d0b.cloudfunctions.net/'
      firebase.auth().onAuthStateChanged((user) => {
        if (user === null) {
          this.isLoading = false
          this.isAuth = false
          return
        }
        axios.post(baseUri + 'isAdmin', {'email': user.email}).then((res) => {
          if (res.status === 202) {
            this.isAuth = true
            this.isLoading = false
          } else {
            this.isLoading = false
            this.isAuth = false
          }
        }).catch((err) => {
          const status = err.response.status
          switch (status) {
            case 400:
              alert(`${status}エラー! 変なメソッド送ってない？`)
              break
            case 401:
              alert(`${status}エラー! 認証が必要だよ！`)
              break
            case 500:
              alert(`${status}エラー! サーバーを治すよ！`)
              break
            case 403:
              alert(`${status}エラー! 多分承認されてないよ！`)
              break
            case 404:
              alert(`${status}エラー! 中に誰もいませんよ！`)
              break
            case 405:
              alert(`${status}エラー! GET送ったりしてない？`)
              break
            default:
              alert(`不明なエラー!どうにもできないです．．．`)
          }
          this.logout()
        })
      })
    },
    submit () {
      db.collection('items').doc(this.id === null ? this.makeid() : this.id).set({
        title: this.title,
        source: this.txt,
        updated_at: new Date(this.update),
        post_at: new Date(this.upload)
      })
        .then(function () {
          alert('データは正しく作成/更新されました')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    submitWork () {
      db.collection('works').doc(`${this.w_id === null ? this.makeid() : this.w_id}`).set({
        title: this.w_title,
        text: this.w_txt,
        tag: this.w_tag,
        abst: this.w_abst,
        url: this.w_url,
        date: new Date(this.upload3)
      })
        .then(function () {
          alert('データは正しく作成/更新されました')
        })
        .catch(function (error) {
          console.error('Error writing work: ', error)
        })
    },
    makeid () {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return text
    },
    fetchArticle () {
      if (this.id === null) {
        alert('IDを入力して下さい')
        return
      }
      db.collection('items').doc(this.id).get().then((doc) => {
        if (doc.exists) {
          this.title = doc.data().title
          this.txt = doc.data().source
          this.upload = new Date(doc.data().post_at.seconds * 1000).toISOString().substr(0, 10)
        } else {
          alert('データは見つかりませんでした')
        }
      })
    },
    fetchWork () {
      if (this.w_id === null) {
        alert('IDを入力して下さい')
        return
      }
      db.collection('works').doc(this.w_id).get().then((doc) => {
        if (doc.exists) {
          this.w_title = doc.data().title
          this.w_tag = doc.data().tag
          this.w_abst = doc.data().abst
          this.w_txt = doc.data().text
        } else {
          alert('データは見つかりませんでした')
        }
      })
    },
    parseTimestamp: (ts) => {
      const d = new Date(ts.seconds * 1e3)
      return `${d.getFullYear()}年${d.getUTCMonth() + 1}月${d.getUTCDate()}日`
    },
    logout: () => {
      firebase.auth().signOut().then(() => {
        alert('ログアウトしました')
        this.$router.push('/')
      })
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.skills[this.editedIndex], this.editedItem)
      } else {
        this.skills.push(this.editedItem)
      }
      this.submitSkills()
      this.close()
    },
    editItem (item) {
      this.editedIndex = this.skills.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.skills.indexOf(item)
      if (confirm('削除してもよろしいですか?')) {
        this.skills.splice(index, 1)
        db.collection('skills').doc(item.name).delete().then(() => {
          console.log('skills deleted')
        }).catch((err) => {
          console.error(err)
        })
      }
    },
    submitSkills () {
      this.skills.forEach((skill) => {
        skill.per = parseInt(skill.per)
        db.collection('skills').doc(skill.name).set(skill).then(() => {
          console.log('skills updated')
        }).catch((err) => {
          console.error(err)
        })
      })
    },
    getSkills () {
      db.collection('skills').get().then((q) => {
        q.forEach((doc) => {
          this.skills.push(doc.data())
        })
      })
    },
    updateValue1 () {
      this.editedItem.c1 = this.c1.hex
    },
    updateValue2 () {
      this.editedItem.c2 = this.c2.hex
    }
  },
  components: { VueMarkdown, Loading, 'chrome-picker': Chrome, 'upload-btn': UploadButton }
}
</script>

<style scoped>
.v-menu, .v-menu>*{
  top: 50px !important;
  left: 10px !important;;
}
.l {
  color: black;
}
.preview {
  height: 37vh;
  overflow: auto;
}
</style>
