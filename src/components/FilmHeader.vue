<template>
     <ul class="tabs-bar">
            <router-link to="/films/nowplaying" custom v-slot="{navigate,isActive}">
            <span @click="navigate" :class="isActive?'underline':''">
                正在热映
            </span>    
            </router-link>
            <router-link to="/films/comingsoon" custom v-slot="{navigate,isActive}">
            <span @click="navigate" :class="isActive?'underline':''">
                即将上映
            </span>    
            </router-link>
        </ul>
</template>
<script>
    export default{
        
    }
    
</script>
<style lang="scss">
    .tabs-bar{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 3.0625rem;
        // background: white;
        display: flex;
        box-sizing: border-box;
        justify-content:space-around;
        span{
            // flex: 1;
            text-align: center;
            line-height:3.0625rem;
            font-size: .875rem;
        }
    }
    .underline{
        border-bottom: .0938rem solid #ff5f16;
    }
</style>