<template>
    <div class="nowplaying-bar">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad" class="nowplaying-list">
            <van-cell v-for="data in DataList" :key="data.filmId" @click="handleChangePage(data.filmId)" class="nowplaying-item">
                <div class="films-wrap">
                    <div class="films-poster">
                        <img :src="data.poster">
                    </div>
                    <div class="films-info">
                        <div class="film-title film-over">
                            <span class="filmName">{{data.name}}</span>
                            <span class="filmType">{{data.filmType.name}}</span>
                        </div>
                        <div class="film-title film-over" :class="data.grade?'':'hidden'">
                            <span class="label">观众评分</span>
                            <span class="grade">{{data.grade}}</span>
                        </div>

                        <div class="film-title film-over">
                            <span class="label">
                                主演：{{data.actors | actorsFilter}}
                            </span>
                        </div>

                        <div class="film-title film-over">
                            <!-- <span class="label">{{detail(data.filmId)}}</span> -->
                            <span class="label">{{data.nation}} | {{data.runtime}}分钟</span>
                        </div>
                    </div>
                    <div class="film-buy">
                        购票
                    </div>
                </div>
            </van-cell>
        </van-list>
        <div class="footer-footer"></div>
    </div>
</template>
<script >
import http from "@/util/http";
// import axios from "axios";
import Vue from 'vue'
import { List } from 'vant';
Vue.use(List);
Vue.filter('actorsFilter',(data)=>{
    if(data===undefined) return '暂无主演'
    return data.map(item=>item.name).join(' ')
})
export default{
    data(){
        return{
            DataList: [],
            loading: false,
            finished: false,
            Page:1,
            total:0
        }

    },
    mounted() {
        http({
            url:`/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=3511802`,
            headers:{
                'X-Host': 'mall.film-ticket.film.list'
            }
        })
        .then(res=>{
            // console.log(res.data.data.films);
            this.DataList=[...this.DataList,...res.data.data.films]
            // console.log(this.DataList.length);
            // 记录电影数组总长度
            this.total=res.data.data.total
            // console.log('this.DataList');
            // console.log(this.total);
        })
    },
    methods: {
        handleChangePage(myId){
            this.$router.push({
                name:'thisDetail',
                params:{
                    myId
                }
            })
        },
        onLoad() {
            // console.log(this.DataList.length);
            console.log('onLoad');
            // 没有数据就关闭请求
            if (this.DataList.length===this.total&&this.DataList.length!==0) {
                this.finished=true
                // console.log(this.DataList.length,this.total);
                return
            }
            
                this.Page++
                // 异步更新数据
                http({
                    url:`/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.Page}&pageSize=10&type=1&k=3511802`,
                    headers:{
                        'X-Host': 'mall.film-ticket.film.list'
                    }
                })
                .then(res=>{
                    // console.log(res.data.data.films);
                    this.DataList=[...this.DataList,...res.data.data.films]
                     // 加载状态结束
                    this.loading = false;
                    
                })
            },
    },
    
}
</script>
<style lang="scss" scoped>
    .nowplaying-bar{
        margin: 0;
        padding: 0;
        margin-top:.625rem ;
        width:100%;
        height: auto;
        background: #fff;
    }
    .nowplaying-list{
        margin: 0;
        padding: 0;
        width: 100%;
        .nowplaying-item{
            width: 100%;
            height: 7.75rem;
            font-size: .875rem;
            line-height: 1.5rem;
        }
    }  
        .films-wrap {
            width: 100%;
            height: 6.5rem;
            // padding: .9375rem;
            // padding-left: 0rem;
            padding-right: .9375rem;
            display: flex;
        }
        
        .films-poster {
            width: 4.125rem;
            height: 5.875rem;
        }
        
        .films-poster>img {
            width: 100%;
        }
        
        .films-info {
            width: 13.0625rem;
            height: 5.125rem;
            padding: 0rem .625rem;
        }
        .hidden{
            visibility:hidden;
        }
        .film-over {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        
        .film-title {
            width: 13.0625rem;
            height: 1.375rem;
        }
        
        .filmName {
            font: 1rem Tahoma, Helvetica, Arial, sans-serif;
            font-family: Microsoft YaHei, Tahoma, Helvetica, Arial, sans-serif;
        }
        
        .filmType {
            background: #d2d6dc;
            color: #fff;
            font-size: .5625rem;
        }
        
        .label {
            font-size: .8125rem;
            color: #797d82;
            font: .8125rem Tahoma, Helvetica, Arial, sans-serif;
        }
        
        .grade {
            color: #ffb232;
            font-size: .875rem;
        }
        
        .film-buy {
            width: 3.125rem;
            height: 1.5625rem;
            color: #ff5f16;
            text-align: center;
            line-height: 1.5625rem;
            border: .0625rem solid #ff5f16;
            position: relative;
            top: 2.1875rem;
            box-sizing: border-box;
            border-radius: .1875rem;
            font-size: .8125rem;
        }
    .footer-footer{
        width: 100%;
        height: 3.0625rem;
        position: relative;
        bottom: 0;
    }
</style>