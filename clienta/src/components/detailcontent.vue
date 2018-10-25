<template>
    <div>
        <!-- Player and Detail -->
        <div class="mt-4">
            <div class="card mb-2" style="width: 100%;">
                <div class="card-body">
                    <h5 class="card-title">YouTube Player goes here</h5>
                    <p class="card-text">
                      <img v-bind:src="items[$route.params.id].snippet.thumbnails.high.url">
                      </p>
                </div>
            </div>
            <strong>{{items[$route.params.id].snippet.title}}</strong>&nbsp;
            <button v-if="isLogin" @click="doLike(items[$route.params.id].id.videoId)" class="btn btn-sm btn-primary">Like this Video!</button><br />
            <br />
            <pre class="card">{{ items[$route.params.id].snippet.description }}</pre>
            <br />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex';
export default {
    name: 'maincontent',
    props: [],
    data() {
        return {

        }
    },
    computed: {
        ...mapState(['items','isLogin'])
        },
    methods: {
        ...mapActions(['getuser']),
        doLike(idvideo){
            console.log(idvideo)
            let token =localStorage.getItem('token')
            this.$server({
                url:  `/users/likes`,
                method: 'POST',
                data:{
                    id: idvideo,
                },
                headers: {
                    token: token,
                }
            })
            this.getuser()
        }
    },
    created() {

    }
}
</script>