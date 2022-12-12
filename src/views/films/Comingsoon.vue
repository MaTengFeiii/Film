<template>
    <div class="comingsoon-bar">
        <van-list v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad" class="comingsoon-list">
            <van-cell v-for="data in DataList" :key="data.filmId" @click="handleChangePage(data.filmId)" class="comingsoon-item">
                <div class="films-wrap">
                    <div class="films-poster">
                        <img :src="data.poster">
                    </div>
                    <div class="films-info">
                        <div class="film-title film-over">
                            <span class="filmName">{{ data.name }}</span>
                            <span class="filmType">{{ data.filmType.name }}</span>
                        </div>

                        <div class="film-title film-over">
                            <span class="label" v-if="data.actors">
                                主演：{{data.actors | actorsFilter}}
                            </span>
                        </div>

                        <div class="film-title film-over">
                            <span class="label">上映日期：{{data.premiereAt | dataFilter}}</span>
                        </div>
                    </div>
                    <div class="film-buy">
                        预购
                    </div>
                </div>
            </van-cell>
        </van-list>
        <div class="footer-footer"></div>
    </div>
</template>
<script >
// import axios from "axios"
import Vue from 'vue'
import moment from 'moment'
import http from '@/util/http'
import { List } from 'vant';
Vue.use(List);
Vue.filter('actorsFilter',(data)=>{
    return data.map(item=>item.name).join(' ')
})
Vue.filter('dataFilter',(data)=>{
    moment.locale('zh-cn');
    if (moment(data*1000).format('YYYY')!==moment().format('YYYY')) {
        return moment(data*1000).format(' ddd YYYY年MM月DD日')
    }
    return moment(data*1000).format('ddd MM月DD日')
    /* moment.locale();
    const week=['周日','周一','周二','周三','周四','周五','周六']
    // console.log(week[moment(data*1000).day()]);
    let day=week[moment(data*1000).day()]
    let year=''
    if (moment(data*1000).format('YYYY')!==moment().format('YYYY')) {
        year=' '+moment(data*1000).format('YYYY')+'年'
    }
    return day+year+moment(data*1000).format('MM月DD日') */
})
export default {
    data() {
        return {
            DataList: [],
            actors: {},
            loading: false,
            finished: false,
            Page:1,
            total:0
        }

    },
    mounted() {
        http({
            url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=5054461`,
            headers: {
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            // console.log(res.data.data.films);
            this.DataList=[...this.DataList,...res.data.data.films]
            this.total=res.data.data.total
        })

    },
    methods: {
        handleChangePage(Id) {
            this.$router.push(`/detail/${Id}`)
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
                    url:`/gateway?cityId=310100&pageNum=${this.Page}&pageSize=10&type=2&k=5054461`,
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
.comingsoon-bar {
    margin: 0;
    padding: 0;
    margin-top: .625rem;
    width: 100%;
    height: auto;
}

.comingsoon-list {
    margin: 0;
    padding: 0;
    width: 100%;
    .comingsoon-item{
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
    padding-right: 0.9375rem;
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

.footer-footer {
    width: 100%;
    height: 3.0625rem;
    position: relative;
    bottom: 0;
}
</style>