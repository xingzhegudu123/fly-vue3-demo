const state = {
   name : window.localStorage.getItem('name') || '',
   isAdmin : window.localStorage.getItem('isAdmin') || false,

};

const action = {

};

const mutations = {
    USER_NAME(state, payload){
         state.name = payload.name;
         state.isAdmin = payload.isAdmin;
       
    } 
};

export default {
    //  区分是哪个状态管理下
    namespaced : true,
    state,
    action,
    mutations
}