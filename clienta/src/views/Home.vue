<template>
<div>
  <navbar></navbar>

  <!-- Content -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-7">
        <div class="mt-4">
          <maincontent></maincontent>
        </div>
      </div>

      <div class="col-xl-5">
        <detailcontent v-if="$route.params.id!=undefined"></detailcontent>   
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import navbar from '@/components/navbar.vue'
import maincontent from '@/components/maincontent.vue'
import detailcontent from '@/components/detailcontent.vue'

import { mapState, mapActions } from 'vuex';
/* eslint-disable */
export default {
  name: 'home',
  components: {
    navbar,
    maincontent,
    detailcontent
  },
  data () {
    return {
      email: '',
      password: '',    
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    ...mapActions(['logout', 'checkToken','getuser']),
 
  },
  created () {
      console.log('cek token')
      this.checkToken()
      this.getuser()
    }


}
</script>
