<template>
  <div id="main">
    <div class="content_list_show" v-if="isshowDom">
      <Header title="喵喵电影"/>

      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{ $store.state.city.cityName }}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowPlaying" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/comingSoon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>

      <keep-alive>
        <router-view/>
      </keep-alive>
      <TabBar/>
    </div>

    <router-view name="detail"/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import { messageBox } from "@/components/JS";

// import Header from "@/components/Header";

export default {
  name: "Movie",
  components: {
    Header,
    TabBar
  },
  data() {
    return {
      isshowDom: true
    };
  },

  mounted() {
    // this.bus.$on('isshow',data=>{
    //   console.log(data);
    //      this.isshowDom = data;
    // });
    setTimeout(() => {
      this.axios.get("/api/getLocation").then(res => {
        var msg = res.data.msg;

        if (msg === "ok") {
          // 调用函数--弹窗
          var nm = res.data.data.nm;
          var id = res.data.data.id;

          if (this.$store.state.city.id == id) {
            return; // 如果已经是当前城市则不弹窗
          }
          messageBox({
            title: "定位",
            content: nm,
            cancel: "取消",
            ok: "切换定位",
            handleCannel() {},
            handleOk() {
              // 切换城市
              window.localStorage.setItem("nowNm", nm);
              window.localStorage.setItem("nowId", id);
              window.location.reload();
            }
          });
        }
      });
    }, 3000);
  }
};
</script>

<style scoped>
#content {
  height: auto;
  bottom: 50px;
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
}
.movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
  top: 50px;
  position: fixed;
  left: 0;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
/* .movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
} */

.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}

.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>

