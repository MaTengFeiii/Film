<template>
        <ul class="Foot">
            <!-- vue-router 声明式导航   属性tag在路由3版本之前使用没问题
                <router-link to="/films" tag="li">电影</router-link>

                <router-link to="/cinemas" tag="li">影院</router-link>

                <router-link to="/center" tag="li">我的</router-link>
             -->
            
            <!-- 在4版本之后写法  custom属性：自定义的意思-->
            <router-link to="/films" custom v-slot="{navigate,isActive}">
                <li @click="navigate" :class="isActive?'router-link-active':''">
                    <i class="iconfont icon-dianying"></i>
                    <span>电影</span>
                </li>    
            </router-link>
            <router-link to="/cinemas" custom v-slot="{navigate,isActive}">
                <li @click="navigate" :class="isActive?'router-link-active':''">
                    <i class="iconfont icon-yingyuan"></i>
                    <span>影院</span>
                </li>    
            </router-link>
            <router-link to="/center" custom v-slot="{navigate,isActive}">
                <li @click="navigate" :class="isActive?'router-link-active':''">
                    <i class="iconfont icon-wode"></i>
                    <span>我的</span>
                </li>    
            </router-link>

        </ul>
</template>
<script>
import '../assets/电影/iconfont.css'
    export default{
        data(){
            return{
                footerlist:[]
            }
        }
    }
</script>
<style lang="scss" scoped>

    .Foot{
        height: 3rem;
        width: 100%;
        margin: 0;
        padding: 0;
        list-style-type: none;
        position: fixed;
        bottom: -0.0625rem;
        display: flex;
        background:white;
        box-sizing: border-box;
        li{
            line-height: 1.5625rem;
            font-size: .75rem;
            // border:.0625rem solid black;
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            i{
                font-size: 25px;
            }
            span{
                font-size: 12px;
                line-height: 10px;
            }
        }
        .router-link-active{
            color: #ff5f16;
        }
    }
</style>