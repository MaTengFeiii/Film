<template>
    <div class="Cinemas">
        <cinemas-header></cinemas-header>
        <div class="cinema-list-tag">
            <label class=""></label>
            <label class=""></label>
            <label class=""></label>
        </div>
        <div class="cinema-layer"></div>
        <div class="cinemas-list-wrap" :style="{
            height:height
        }">
            <ul class="cinemas-list">
                <li class="cinemas-list-item" v-for="data in cinemasList">
                    <div class="cinema-info-left">
                        <span class="cinemas-name">
                            {{data.name}}
                        </span>
                        <span class="cinemas-address">
                            {{data.address}}
                        </span>
                    </div>
                    <div class="cinema-info-right">
                        <span class="cinema-lowPrice">
                            ￥{{data.lowPrice/100}}起
                        </span>
                        <span class="cinemas-gpsAddress">
                            距离未知
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <foot></foot>
        <!-- <div class="footer-footer"></div> -->
    </div>
</template>
<script>
    import Vue from "vue"
    import CinemasHeader from "@/components/CinemasHeader.vue"
    // import http from "@/util/http"
    import BetterScroll from "better-scroll"
    import foot from "@/components/Foot.vue"
    import { DropdownMenu, DropdownItem } from 'vant';
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);
    import { mapState,mapActions } from "vuex";
    export default{
        components:{
            CinemasHeader,
            foot
        },
        data(){
            return{
                // datalist:[],
                height:'0px'
            }
        },
        computed:{
            // 将vuex的state状态映射到计算属性这里方便调用
            /* 相当于
                cinemasList(){
                    return ...
                } 
            */
            ...mapState(['cinemasList','cityId','cityname'])
        },
        methods:{
            ...mapActions(['getCinemasData']),
            
        }
        ,
        mounted(){
            this.height=document.documentElement.clientHeight -document.querySelector('.Foot').offsetHeight-document.querySelector('.cinema-layer').offsetHeight+'px'

            // 分发
            if(this.cinemasList.length===0){
                this.getCinemasData(this.cityId).then((res)=>{
                    this.$nextTick(()=>{
                        new BetterScroll('.cinemas-list-wrap',{
                            scrollbar:{
                                fade:true
                            }
                        })
                    })
                })
            }else{
                this.$nextTick(()=>{
                    new BetterScroll('.cinemas-list-wrap',{
                        scrollbar:{
                            fade:true
                        }
                    })
                })
            }
            /* http({
                url:`/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=2756676`,
                headers:{
                    "X-Host": "mall.film-ticket.cinema.list"
                }
            }).then(res=>{
                // console.log(res.data.data.cinemas);
                this.datalist=res.data.data.cinemas
                this.$nextTick(()=>{
                    new BetterScroll('.cinemas-list-wrap',{
                        scrollbar:{
                            fade:true
                        }
                    })
                })
            }) */
        },
        
    }
</script>
<style lang="scss" scoped>
    .Cinemas{
        width: 100%;
    .cinema-list-tag{
        width: 100%;
        height: 3.125rem;
        position: fixed;
        top: 2.75rem;
        left: 0;
        display: flex;
        label{
            flex: 1;
            height: 100%;
        }
        z-index: 1;
        background: white;
    }
    .cinema-layer{
        width: 100%;
        height: 5.875rem;
        position: relative;
        top: 0;
        left: 0;
    }
    .cinemas-list-wrap{
        // width: 100%;
        overflow-y: hidden;
        position: relative;
        .cinemas-list{
            margin: 0;
            padding: 0;
            width: 100%;
            display: flex;
            flex-direction:column;
            .cinemas-list-item{
                width: 100%;
                height: 4.7188rem;
                padding: .9375rem;
                box-sizing: border-box;
                display: flex;
                .cinema-info-left{
                    width: 17.5rem;
                    padding-right: .9375rem;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    .cinemas-name{
                        width: 100%;
                        font-size: .9375rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .cinemas-address{
                        width: 100%;
                        font-size: .75rem;
                        color: #797d82;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        margin-top: 5px;
                        box-sizing: border-box;
                    }
                }
                .cinema-info-right{
                    width: 4.375rem;
                    display: flex;
                    flex-direction: column;
                    .cinema-lowPrice{
                        color: #ff5f16;
                        font-size: .9375rem;
                        text-align: center;
                    }
                    .cinemas-gpsAddress{
                        font-size: 11px;
                        color: #797d82;
                        text-align: center;
                        margin-top: 5px;
                        box-sizing: border-box;
                    }
                }
            }
        }
    }
}
.footer-footer{
        width: 100%;
        height: 3.0625rem;
        position: relative;
        bottom: 0;
    }
</style>
