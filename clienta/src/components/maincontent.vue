<template>
    <div>
         <!-- Search Form -->
          <form>
            <div class="input-group mb-3">
              <input v-model="searchtxt"
                type="text"
                class="form-control"
                placeholder="Search videos across YouTube..."
                aria-label="Search videos across YouTube..."
                aria-describedby="go-button-addon"
                auto-complete="off"
                autofocus>
              <div class="input-group-append">
                <button  @click="doSearch"
                  class="btn btn-outline-secondary"
                  type="button"
                  id="go-button-addon">
                  Go!
                </button>
              </div>
            </div>
          </form>

          <!-- Video List -->
          <ul class="list-unstyled">
            <a href="JavaScript:Void(0);" @click="doDetail(index)"  class="video-link" v-for="(item, index) in items" :key="index" >
              <li class="media my-4">
                <img class="mr-3" v-bind:src="item.snippet.thumbnails.default.url" alt="Thumbnail">
                <div class="media-body">
                  <h5 class="mt-0 mb-1">{{item.snippet.title}}</h5>
                  {{item.snippet.description}}
                  <br />
                </div>
              </li>
            </a>
          </ul>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
    name:'maincontent',
    props:[],
    data() {
        return {
            searchtxt:''
        }
    },
    computed: {
      ...mapState(['items'])
    },
    methods: {
       ...mapActions(['setSnippet']),
       doDetail(index){
           console.log(index)
           //this.setidDetail(idVideo)
           this.$router.push(`/detail/${index}`)
       },
       doSearch(){
           //console.log('search')
            this.$server.get(`https://www.googleapis.com/youtube/v3/search`,{
            params : {
                key: 'AIzaSyBpQj48hBNytUD79Uc5k0iihD4p0jlyGa8',
                part: 'snippet',
                order: 'date',
                q: this.searchtxt,
                maxResults : '3'
            }
            })
            .then((result) => {
                console.log(result)
                let { data } = result
                this.setSnippet(data.items)
            }).catch((err) => {
                console.log('Invalid password')
            });
       }
    },
    created() {
        console.log('jalann')
        this.$server.get(`https://www.googleapis.com/youtube/v3/search`,{
          params : {
            key: 'AIzaSyBpQj48hBNytUD79Uc5k0iihD4p0jlyGa8',
            part: 'snippet',
            order: 'date',
            maxResults : '3'
          }
          })
        .then((result) => {
          console.log(result)
          let { data } = result
          this.setSnippet(data.items)
          //console.log(data.items)
          
        }).catch((err) => {
            console.log('Invalid password')
            //console.log(err)
        });
        //https://www.googleapis.com/youtube/v3/search?key=AIzaSyBpQj48hBNytUD79Uc5k0iihD4p0jlyGa8&part=snippet,id&order=date&maxResults=20
        
    }
}
</script>