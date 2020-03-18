import {
    getBreadCrumbList,
    getMenuByRouter,
    getHomeRoute,
  } from '@/libs/utils'
  import routers from '@/router/routers'
  const { homeName } = "home"
  
  
  export default {
    namespaced: true,
    state: {
      breadCrumbList: [],
      homeRoute: {},
      tableNodataText: "暂无数据",
      totalNum: 10,
      currentPage: 1
    },
    getters: {
      menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),
    },
    mutations: {
      //面包屑导航
      setBreadCrumb (state, route) {
        state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
      },
      setHomeRoute (state, routes) {
        state.homeRoute = getHomeRoute(routes, homeName)
      },
      setTableNodataText (state, text) {
        state.tableNodataText = text
      },
      setTotalNum(state, num){
        state.totalNum = num
      },
      setCurrentPage(state, currentPage){
        state.currentPage = currentPage
      }
    },
    actions: {
      
    }
  }
  