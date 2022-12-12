<template>
   <div class="header">
        <van-nav-bar title="影院" @click-left="handleLeft" @click-right="handleRight">
            <template #left >
                {{$store.state.cityname}}
                <van-icon name="arrow-down" color="#000" size="12" />
            </template>
            <template #right>
                <van-icon name="search" size="24" color="#000" />
            </template>
        </van-nav-bar>
   </div>
</template>
<script>
    import Vue from 'vue'; 
    import { NavBar } from 'vant';
    Vue.use(NavBar)
    import { mapMutations } from "vuex";

    export default{
        data(){
            return{
                value:''
            }
        },
        methods:{
            /* 新写法 */
            ...mapMutations(['clearCinemasList']),
            handleLeft(){this.$router.push('/city')
                // this.$store.commit('clearCinemasList')
                
                this.clearCinemasList()
            },
            handleRight(){
                this.$router.push('/cinemas/search')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .header{
        width: 100%;
        height: 2.75rem;
        position:fixed;
        left: 0;
        top: 0;
        z-index: 1;
        background: white;
        .van-nav-bar__text{
            color: #000;
        }
    }
</style>