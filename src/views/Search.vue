<template>
    <div>
        <form action="/">
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                shape="round"
                background="#f0f0f0"
            />
        </form>
        <ul class="cinemas-list" v-if="value" >
                <li class="cinemas-list-item" v-for="data in computedList">
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
</template>
<script>
import  obj  from "@/util/mixinObj"
    export default{
        mixins:[obj],
        data(){
            return{
                value:''
            }
        },
        mounted(){
            if(this.$store.state.cinemasList.length===0){
                this.$store.dispatch('getCinemasData',this.$store.state.cityId)
            }else{
                // console.log('缓存');
            }
        },
        methods:{
            onSearch(val) {
                
            },
            onCancel() {
                this.$router.back();
            },
        },
        computed:{
            computedList(){
                return this.$store.state.cinemasList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase()))
            }
        }
    }
</script>
<style lang="scss" scoped>
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
</style>