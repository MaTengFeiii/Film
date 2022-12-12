import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from "@/views/Films";
// import Cinemas from "@/views/Cinemas";
// import Center from "@/views/Center";
import Nowplaying from "@/views/films/Nowplaying"
// import Comingsoon from "@/views/films/Comingsoon"
import Detail from "@/views/Detail"
import Search from "@/views/Search"
// import City from "@/views/City"
// import Login from "@/views/Login"
Vue.use(VueRouter) // 注册路由 ，两个全局  router-view router-link

// 配置表  路由
const routes = [{
        path: '/films',
        component: Films,
        // 嵌套路由
        children: [{
            path: '/films/nowplaying',
            component: Nowplaying
        }, {
            path: '/films/comingsoon',
            // 路由懒加载   访问该地址的时候才加载该js文件
            component: () =>
                import ('@/views/films/Comingsoon')
        }, {
            name: 'nowplaying',
            path: '/films',
            redirect: '/films/nowplaying'
        }],
    },
    {
        // 命名路由
        name: 'thisDetail',
        path: '/detail/:myId', // 动态二级路由
        component: Detail
    },
    {
        path: '/cinemas',
        component: () =>
            import ('@/views/Cinemas')
    },
    {
        path: '/cinemas/search',
        component: Search
    },
    {
        path: '/city',
        component: () =>
            import ('@/views/City')
    },
    {
        path: '/center',
        component: () =>
            import ("@/views/Center"),
        // meta 叫做路由元信息
        meta: {
            isJump: true
        },
        // 路由独享的拦截  局部拦截
        beforeEnter: (to, from, next) => {
            // console.log(to);
            if (to.meta.isJump) {
                if (localStorage.getItem('MTF')) {
                    console.log('1');
                } else {
                    // next('/login');
                    next({
                        path: '/login',
                        query: { from: to.fullPath } //作用记录从哪来的
                    })
                }
            } else {
                next();
            }
            next();
        }

    },
    {
        path: '/login',
        component: () =>
            import ('@/views/Login'),

    },
    {
        // 重定向   路径为 / 的时候  指向/films
        path: "*",
        redirect: "/films"
    }
]

const router = new VueRouter({
    // 路由模式
    mode: 'hash',
    routes
})

// 全局路由拦截（ 又称为守卫）
/* router.beforeEach((to, from, next) => {
    // console.log(to);
    if (to.meta.isJump) {
        if (localStorage.getItem('MTF')) {
            console.log('1');
        } else {
            // next('/login');
            next({
                path: '/login',
                query: { from: to.fullPath } //作用记录从哪来的
            })
        }
    } else {
        next();
    }
    next();
}) */

export default router