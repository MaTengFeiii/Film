<template>
        <div class="films-list">
            <!-- 轮播图 -->
            <swiper></swiper>
            <film-header class="sticky"></film-header>
            <router-view></router-view>
            <foot></foot>
        </div>
</template>
<script>
    import Vue from "vue"
    import swiper from "@/components/Swiper.vue"
    import filmHeader from "@/components/FilmHeader.vue"
    import foot from "@/components/Foot.vue"
    Vue.component('swiper',swiper) 
    Vue.component('filmHeader',filmHeader) 
    export default{
        components:{
            foot
        },
    }
    

</script>
<style lang="scss" scoped>
    .films-list{
        width: 100%;
        // height: 100%;
    }
    /* .swiper{
        width: 100%;
        height: 11.25rem;
        // background:blue
    } */
    .sticky{
        position: sticky;
        top:-0.0625rem;
        background: white;
        z-index: 1;
    }
</style>