<template>
    <div class="city">
        <div class="header">
            <van-nav-bar title="当前城市 -" >
                <template #left v-on:click="goback">
                    <van-icon name="cross" color="#000" size="24" @click="goback"/>
                </template>
            </van-nav-bar>
        </div>
        <div class="search">
            <van-search
                v-model="value"
                show-action
                placeholder="输入城市名或拼音"
                @search="onSearch"
                @click="(isShow=true)"
                >
                <template #action>
                    <div @click="onCancel" v-show="isShow">取消</div>
                </template>
            </van-search>
        </div>
        <div class="citylist">
            <van-index-bar 
            :index-list="computedList"
            :sticky-offset-top="98"
            @select="handleIndexBar"
            >
                <div v-for="data in citylist" :key="data.type">
                    <van-index-anchor :index="data.type">{{data.type}}</van-index-anchor>
                    <van-cell :title="item.name" v-for="item in data.list" :key="item.name" @click="handleClick(item)" />   
                </div>
            </van-index-bar>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import http from '@/util/http';
import  obj  from "@/util/mixinObj"
import { IndexBar, IndexAnchor,NavBar,Search,Toast } from 'vant';
Vue.use(NavBar,IndexBar,IndexAnchor,Search);
    export default{
        mixins:[obj],
        data(){
            return{
                citylist:[],
                value:'',
                isShow:false
            }
        },
        computed:{
            computedList(){
                /* var letterlist=[]
                this.citylist.forEach(item=>{
                    letterlist.push(item.type)
                })
                return letterlist */
                return this.citylist.map(item=>item.type)
            }
        },
        mounted(){
            http({
                url:`/gateway?k=8822404`,
                headers:{
                   'X-Host': 'mall.film-ticket.city.list'
                }
            }).then(res=>{
                // console.log(res.data.data.cities);
                this.citylist=this.renderCity(res.data.data.cities)
                // console.log(this.citylist);
                
            })
        },
        methods:{
            renderCity(list){
                var letterlist=[]
                var citylist=[]
                // 首字母数组
                for(var i=65;i<91;i++){
                    letterlist.push(String.fromCharCode(i))
                }
                // 通过遍历首字母，没遍历一个首字母就过滤出对应的城市
                letterlist.forEach(letter => {
                    var cityname=list.filter(item=>item.pinyin.substring (0,1).toUpperCase()===letter)
                    cityname.length && citylist.push({
                        type:letter,
                        list:cityname
                    })
                });
                return citylist
            },
            handleClick(data){
                // console.log(data);
                // 传统多页面进行传值
                // 1.location.href='#/cinemas?cityname='+data.name
                // 2.cookie,localStorage

                // 单页面方案
                // 1.中间人模式
                // 2.bus事件总线 $on,$emit
                
                // vuex-状态管理模式
                /* this.$store.state.cityname=data.name
                this.$store.state.cityId=data.cityId
                直接提交风险大，不知道是谁改的
                需要通过mutation,交给mutation统一修改 */
                // console.log(data.cityId);
                this.$store.commit('changeCityName',data.name)
                this.$store.commit('changeCityId',data.cityId)
                this.$router.push('/cinemas')
            },
            handleIndexBar(data){
                Toast(data)
            },
            goback(){
                this.$router.push({name:'nowplaying'})
            },
            onSearch(val) {
                Toast(val);
            },
            onCancel() {
                this.isShow=false
            },

        }
    }
</script>
<style lang="scss" scoped>
    .city{
        width: 100%;
        height: 41.6875rem;
        background: #f4f4f4;
       .header{
        width: 100%;
        height: 2.875rem;
        position: fixed;
        z-index: 100;
        top: 0;
        transition: all .5s;
       }
       .search{
        width: 100%;
        height: 3.375rem;
        position: fixed;
        z-index: 100;
        top: 2.75rem;

       }
       .citylist{
        width: 100%;
        height: 35.4375rem;
        padding-top: 6.25rem;
        overflow: auto;
        
       }
       ::-webkit-scrollbar{
         display: none;
        }
    }
</style>