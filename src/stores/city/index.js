const state = {
    cityName : window.localStorage.getItem('nowNm') || '北京',
    id : window.localStorage.getItem('nowId') || 1,

};

const action = {

};

const mutations = {
    CITY_INFO(state, payload){
         state.cityName = payload.nm;
         state.id = payload.id;
    } 
};

export default {
    //  区分是哪个状态管理下
    namespaced : true,
    state,
    action,
    mutations
}