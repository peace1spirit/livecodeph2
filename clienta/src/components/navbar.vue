<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
            <a class="navbar-brand" href="#">Vuedio</a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <!-- use .active on .nav-item if you want to highlight current link -->
                <li class="nav-item">
                    <a href="JavaScript:Void(0);" class="nav-link">
                    Trending
                    </a>
                </li>
                <li class="nav-item">
                    <a href="JavaScript:Void(0);" class="nav-link">
                    Liked Videos <span class="badge badge-info" v-if="currentuser!=null" > {{ currentuser.iduser.likes.length }}</span>
                    </a>
                </li>
                </ul>
                <ul class="navbar-nav ml-auto"> 

                    <li class="nav-item" v-if="!isLogin">
                        <input type="text" placeholder="email" v-model="email">
                    </li>
                    <li class="nav-item" v-if="!isLogin">
                        <input type="password" placeholder="password" v-model="password">
                    </li>          
                    <li class="nav-item" v-if="!isLogin">
                        <a href="JavaScript:Void(0);" class="btn btn-primary" @click="doLogin">Login</a>
                    </li>
                
                    <li class="nav-item" v-if="isLogin">
                        <a href="JavaScript:Void(0);" class="btn btn-danger"  @click="doLogout">Logout</a>
                    </li>
                
                </ul>
            </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
/* eslint-disable */
export default {
    name:'navbar',
    props:[],
    data () {
        return {
            email: '',
            password: '',    
        }
    },
    computed: {
        ...mapState(['isLogin','currentuser'])
    },
    methods: {
        ...mapActions(['setLogin','logout','getuser']),
        clearLogin(){
            this.email = ''
            this.password = ''
        },
        doLogout(){
            this.logout();
        },
        doLogin() {
            this.$server.post(`users/login`,{
                email: this.email, 
                password: this.password
                })
            .then(({data}) => {
                console.log(data)
                if(data.token){
                    localStorage.setItem('token', data.token)
                    this.setLogin(data.user) 
                    this.getuser()
                    this.clearLogin()
                }
        }).catch((err) => {
            console.log('Invalid password')
            //console.log(err)
        });
        }
    }
}
</script>