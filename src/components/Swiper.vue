<template>
     <div class="swiper" >
            <!-- <div class="swiper-wrapper" :key="dataList.length" v-if="status">
                <div class="swiper-slide" v-for="item in dataList"  >
                    <img :src="item.poster" />
                </div>
            </div> -->
            <!-- 如果需要分页器 -->
            <!-- <div class="swiper-pagination" ></div> -->
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#0f0">
                <van-swipe-item class="swiper-slide" v-for="item in dataList" >
                    <img :src="item.poster" :title="item.name" />
                </van-swipe-item>
            </van-swipe>
    </div>
</template>

<script>
    /* import Swiper from "swiper/bundle"
    import 'swiper/swiper.min.css';
    import 'swiper/swiper-bundle.css' */
    import Vue from 'vue';
    import { Swipe, SwipeItem } from 'vant';
    Vue.use(Swipe);
    Vue.use(SwipeItem);
    import http from "@/util/http";
    export default{
        data(){
            return{
                dataList:[],
                status:false,
            }
        },
                mounted() {
                    /* setTimeout(() => {
                        this.dataList = ['/images/万圣节的新娘.jpg', 'images/哥你好.jpg', '/images/万里归途.jpg','/images/扫黑行动.png']
                    }, 1000); */
                    http({
                        url:'/gateway?cityId=310100&pageNum=1&pageSize=5&type=1&k=3511802',
                        headers:{
                            'X-Host': 'mall.film-ticket.film.list'
                        }
                    })
                    .then(res=>{
                        // console.log(res.data.data.films);
                        this.dataList=res.data.data.films
                        // console.log(this.dataList);
                        this.status=true

                    })
                },
                /* updated() {
                    new Swiper('.swiper', {
                                direction: 'horizontal', // 垂直切换选项vertical
                                loop: true, // 循环模式选项
                                autoplay: true,
                                autoplay: {
                                    delay: 1000
                                },
                                // 如果需要分页器
                                pagination: {
                                    el: '.swiper-pagination',
                                },

                            })
                } */
    }

    
</script>

<style lang="scss" scoped>
.swiper{
        width: 100%;
        height: 13.125rem;
        .my-swipe .van-swipe-item {
        height: 13.125rem;
        width: 100%;
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
      }
      .van-swipe__track{
        width: 100%;
        height: 100%;
      }
}
    .swiper-slide{
        width: 100%;
        overflow-y: hidden;
        img{
            // position: relative;
            width: 100%;
            transform: translateY(-10rem);
        }
    }
</style>