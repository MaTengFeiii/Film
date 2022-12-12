<template>
    <div class="film" >
        <div :class="allShow?'film-view visibility':'film-view '" v-show="!allShow">
            <div class="film-header" v-scroll="44">
                <div class="goback" @click="goback">
                    <img src="/return.png" />
                </div>
                <span class="title">{{data.name}}</span>
            </div>
            <div class="film-poster">
                <img :src="data.poster" />
            </div>
            <div class="film-detail">
                <div class="col">
                    <div class="film-name">
                        <span class="name" >{{data.name}}</span>
                        <span class="item" v-if="data.item">{{data.item.name}}</span>
                    </div>
                    <div class="film-grade" v-if="data.grade">
                        <span class="grade" >{{data.grade}}</span>分
                    </div>
                </div>
                <div class="film-category" v-if="data.category">
                    {{data.category.replaceAll('|',' | ')}}
                </div>
                <div class="film-premiere-time" v-if="data.premiereAt">
                    {{data.premiereAt | premiereAtFilter}}上映
                </div>
                <div class="film-nation-runtime">
                    {{data.nation}} | {{data.runtime}}分钟
                </div>
                <div :class="isShow?'film-stynopsis hidden':'film-stynopsis'">
                   {{data.synopsis}}
                </div>
                <div class="toggle">
                    <img src="/images/toggle.png" :class="isShow?'reverse':''" @click="handleClick" />
                </div>
            </div>
            <div class="actors">
                <div class="actors-title-bar">演职人员</div>
                <div class="photos">
                    <ul class="row-scroll-items-nav">
                        <li v-for="(value,index) in data.actors" :key="index">
                            <div class="actors-item">
                                <div class="actors-img">
                                    <img :src="value.avatarAddress" />
                                </div>
                                <span class="actors-name" >{{value.name}}</span>
                                <span class="actors-role" >{{value.role}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="stills" v-if="data.photos">
                <div class="stills-title-bar">
                    <span class="stills-title-text">剧照</span>
                    <span class="stills-to-all" @click="allShow=true" >全部({{data.photos.length}})></span>
                </div>
                <div class="stills-photos">
                    <ul class="stills-scroll">
                        <li  v-for="(photo,index) in data.photos">
                           <div class="stills-photos-list" @click="handlePreview(index)"> 
                                <img :src="photo"  />
                            </div>
                            
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-footer"></div>
            <div class="buy">
                选座购票
            </div>
        </div>
        <div :class="allShow?'album-zone ':'album-zone visibility'" v-show="allShow" @click="">
            <div class="album-title" >
                <van-nav-bar :title="'剧照'+'（'+photosLength+'）'" >
                    <template #left>
                        <van-icon name="arrow-left" color="#000" size="20" @click="onClickLeft" />
                    </template>
                </van-nav-bar>
            </div>
            <div class="all-photos">
                <div class="photo-context" v-for="(photo,index) in data.photos" @click="handlePreview(index)">
                    <img :src="photo" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from "axios";
import moment from "moment"
import  Vue  from "vue"
import http from '@/util/http'
import  obj  from "@/util/mixinObj"
import { ImagePreview,NavBar } from 'vant'
Vue.use(NavBar)


Vue.filter('premiereAtFilter',(data)=>{
    return moment(data*1000).format('YYYY-MM-DD')
})
Vue.directive('scroll',{
    inserted(el,binding){
        window.onscroll=()=>{
            if ((document.documentElement.scrollTop||document.body.scrollTop)>binding.value) {
                el.style.background='white'
                el.children[1].style.color='black'
            }else{
                el.style.background='transparent'
                el.children[1].style.color='transparent'
            }
        }
    },
    unbind(){
        window.onscroll=null
    }
})
    export default{
        // 混入
        mixins:[obj],
        data(){
            return{
                filmId:0,
                data:{},
                actors:{},
                isShow:false,
                allShow:false,
                photosLength:0
            }
        },
        created(){
            // this.$route  拿到当前匹配的路由
            // console.log(this.$route.params.myId);
            this.filmId=this.$route.params.myId
            // console.log(this.filmId);
        },
        mounted(){
            
            http({
                url:'/gateway?filmId='+this.filmId+'&k=7726072',
                // url:`https://m.maizuo.com/gateway?filmId=${this.filmId}&k=7726072`,
                headers:{
                    'X-Host': 'mall.film-ticket.film.info'
                }
            })
                .then(res=>{
                // console.log(res.data.data.film);
                this.data={...res.data.data.film}
                // console.log(this.data);
                this.actors={...this.data.actors}
                // console.log(this.actors);
                // this.photosLength=this.data.photos.length
            })

        },
        methods:{
            goback(){
                // this.$router.push({name:'nowplaying'})
                this.$router.back();
            },
            handleClick(){
                this.isShow=!this.isShow
                
            },
            handlePreview(index) {
                // console.log(index);
                ImagePreview({
                    images: this.data.photos,
                    startPosition:index,
                    closeable: true,
                    closeIconPosition:'top-left',
                });
            },
            onClickLeft(){
                this.allShow=!this.allShow
            }
        },
        
    }
</script>

<style lang="scss" scoped>
    $width:100%;
    
    .film{
        width: $width;
        height: 100%;
        background: #f4f4f4;
       .film-view{
        width: 100%;
        background: white;
       }
    }
    .film-header{
        width: $width;
        height: 2.75rem;
        position: fixed;
        z-index: 100;
        top: 0;
        transition: all .5s;
        .goback{
            width: 1.875rem;
            height: 1.875rem;
            border-radius: 1.875rem;
            opacity: .6;
            background: white;
            position: absolute;
            left: .3125rem;
            top: .3125rem;
            z-index: 1;
        }
        .title{
            position: absolute;
            width: 100%;
            height: 100%;text-align: center;
            line-height: 2.75rem;
            font-size: 1.0625rem;
            color: transparent;
        }
        img{
            width: 1.875rem;
            height: 1.875rem;
        }
    }
    .film-poster{
        width: $width;
        height: 13.125rem;
        overflow-y: hidden;
        img{
            width:$width;
            height: auto;
            
            position: relative;
            transform: translateY(-10rem);
        }
    }

    $height:1.2188rem;
    .film-detail{
        width: $width;
        // height: 11.875rem;
        padding: .9375rem;
        padding-top: .75rem;
        box-sizing: border-box;
        background: white;
        .col{
            width: $width;
            height: 1.6875rem;
            display: flex;
            justify-content:space-between;
            .film-name{
                flex: 7;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                .name{
                    font-size: 1.125rem;
                }
                .item{
                    margin-left: .3125rem;
                    font-size: .5625rem;
                    color: white;
                    background:#d2d6dc;
                }
            }
            .film-grade{
                flex: 3;
                font-size: .75rem;
                text-align: end;
                color: #ffb232;
                .grade{
                    font-size: 1.125rem;
                    font-style: italic;
                }
            }
        }
        .film-category,.film-premiere-time,.film-nation-runtime{
            width: $width;
            height: $height;
            font-size: .8125rem;
            color: #797d82;
            margin-top: .25rem;
        }
        .film-stynopsis{
            width: $width;
            max-height: 2.375rem;
            font-size: .8125rem;
            color: #797d82;
            margin-top: .75rem;
            box-sizing: border-box;
            overflow: hidden;
            line-height: 1.125rem;
            position: relative;
            transition: max-height .5s ;
        }
        
        .toggle{
            width: 1.25rem;
            height: 1rem;
            margin: auto;
            
            img{
                width: .5rem;
                height: .25rem;
            }
        }
    }
    .actors{
        width:$width;
        height: 12rem;
        margin-top: .625rem;
        background:#ffffff;
        box-sizing: border-box;
        .actors-title-bar{
            width: $width;
            height:3.2813rem;
            padding: .9375rem;
            box-sizing: border-box;
        }
        .photos{
            width: 23.4375rem;
            height: 8.1875rem;
            overflow-x:hidden;
            .row-scroll-items-nav{
                margin: 0;
                padding-left: .9375rem;
                width: auto;
                height: 100%;
                display: flex;
                overflow:auto;
                
                .actors-item{
                    width: 5.3125rem;
                    height: 100%;
                    margin-right: .625rem;
                    display:flex;
                    flex-direction: column;
                    font-size: .75rem;
                    text-align: center;
                    .actors-img{
                        width: 5.3125rem;
                        height: 5.3125rem;
                        overflow:hidden;
                        img{
                            width: 5.3125rem;
                            height: 7.0625rem;
                            transform: translateY(-0.9375rem);
                            
                        }
                    }
                    .actors-name{
                        width: 5.3125rem;
                        height: 1.125rem;
                        padding-top:.625rem ;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .actors-role{
                        width: 5.3125rem;
                        height: 1.125rem;
                        color: #797d82;
                        overflow: hidden;
                    }
                }
            }
        }
    }
    .stills{
        width: $width;
        margin: .625rem 0rem;
        height: 11.0625rem;
        background: #ffffff;
        .stills-title-bar{
            width: $width;
            height: 3.875rem;
            padding: .9375rem;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            .stills-to-all{
                font-size: .8125rem;
                color: #797d82;
            }
        }
        .stills-photos{
            width: $width;
            height:6.25rem;
            .stills-scroll{
                margin: 0;
                padding-left: .9375rem;
                width: $width;
                overflow: auto;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                
                .stills-photos-list{
                    width: 9.375rem !important;
                    height: 100%;
                    margin-right: .625rem;
                    overflow-y: hidden;
                    position: relative;
                    img{
                        width: 100%;
                        height: auto;
                    }
                }
            }
        }
    }
    ::-webkit-scrollbar{
        display: none;
    }
    .footer-footer{
        width: 100%;
        height: 3.0625rem;
        position: relative;
        bottom: 0;
    }
    .buy{
        width: 100%;
        height: 3.0625rem;
        color: white;
        background: #FF5F16;
        position: fixed;
        bottom: -0.125rem;
        left: 0;
        text-align: center;
        line-height: 3.0625rem;
    }
    .album-zone{
        width: 100%;
        height: 41.6875rem;
        background: white;
        position: absolute;
        top:0;
        left: 0;
        z-index: 10;
       .album-title{
        width: 100%;
        height: 2.875rem;
       }
       .all-photos{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 38.8125rem;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        box-sizing: border-box;
        .photo-context{
            width: 7.7538rem;
            height: 7.7538rem;
            img{
                width: 7.7538rem;
                height: 7.7538rem;
            }
        }
       }
    }

    .hidden{
        max-height: 12.5rem !important;
    }
    .reverse{
        transform: rotate(0.5turn);
    }
    .visibility{
        visibility: hidden;
    }
    
</style>
