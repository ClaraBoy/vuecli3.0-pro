<template>
  <div>
    <div class="event-card">
      <div class="date-box" v-if="isdemos==='lists2'">
        <div class="date">
          {{items.menudate.split('-')[2]}}
          <div class="month">
            {{items.menudate.split('-')[1]}}月 {{items.menudate.split('-')[0]}}
          </div>
        </div>
      </div>
      <div class="date-box" v-if="isdemos==='lists'">
        <div class="date">
          {{items.menucomment}}
          <div class="month">
           评论
          </div>
        </div>
      </div>
      <div class="event-body" @click="but()">
        <div class="event-name">
          {{items.menutitle}}
        </div>
        <div class="event-price">
          <div class="adult">
            <br><br>
            <i class="fa fa-male" aria-hidden="true">作者:{{items.applicationid}}</i>
          </div>
        </div>
      </div>
      <div class="social-media">
        <div class="facebook">
          <i class="fa fa-facebook" aria-hidden="true">访问量</i>
        </div>
        <div class="twitter">
          <i class="fa fa-twitter" aria-hidden="true">{{items.menured}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo2item",
  props:{
    items:Object,
    isdemos:""
  },
  methods:{
    but(){
      this.$router.push({
        path:"/Details",
        query:{menutitle:this.items.menutitle,applicationid:this.items.applicationid},
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
.msgdemo{
  text-align: center;
  margin: 0 auto;
}
body {
  font-family: 'Roboto', sans-serif;
  background: #F7F7F7;
}

.event-card {
  background-color: white;
  width: 95%;
  height: 110px;
  display: flex;
  margin-bottom: 18px;
  &:hover {
    animation-name: card-hover;
    animation-duration: 0.25s;
    //animation-timing-function: ease-in;
    animation-fill-mode: forwards;
    cursor: pointer;
  }
  &:hover .event-image {
    animation-name: image-hover;
    animation-duration: 0.25s;
    animation-fill-mode: forwards;
  }
  &:hover .event-name {
    text-decoration: underline;
  }
}

.date-box {
  background:#FB5353;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: inherit;
  margin-left: 1%;
  .date {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 3.3rem;
    .month {
      font-size: 1.2rem !important;
    }
  }
}

.event-image {
  width: 120px;
  height: inherit;
  background-size: cover;
  background-repeat: no-repeat;
}

.event-body {
  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  font-size: 15px;
  .event-name {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 1.3rem;
    font-weight: bold;
    color: #202020;
    margin-bottom: 3px;
    height: 50px;
  }
  .location {
    color: grey;
    font-weight: 300;
  }
  .event-price {
    display: flex;
    position: relative;
    color: grey;
    height: 100%;
    div {
      position: absolute;
      align-self: flex-end;
      margin-right: 16px;
      //display: inline-block;
      i {
        margin-right: 5px;
      }
    }
    >.adult {
      left: 85px;
    }
    >.child:hover {
      .tooltiptext {
        visibility: visible;
      }
    }
    >.adult:hover {
      .tooltiptext {
        visibility: visible;
      }
    }
  }
}
.social-media {
  display: flex;
  width: 70px;
  height: inherit;
  flex-direction: column;
  border-left: 1px solid #F7F7F7;
  div {
    display: flex;
    width: inherit;
    height: inherit;
    align-items: center;
    justify-content: center;
    color: grey;
  }
  >.facebook:hover {
    color: black;
  }
  >.twitter:hover {
    color: black;
  }
}
//Tooltip
.tooltiptext {
  //display: inline-block;
  justify-content: center;
  align-self: center;
  position: absolute;
  bottom: 20px;
  visibility: hidden;
  background: black;
  z-index: 10;
  padding: 8px;
  border-radius: 6px;
  color: white;
}
//Animation on mouse-over
@keyframes card-hover {
  from {box-shadow: 0px 0px 0px #CBCBCB;}
  to {box-shadow: 3px 3px 5px #CBCBCB;}
}
@keyframes image-hover {
  from {opacity: 1;}
  to {opacity: 0.8;}
}
</style>
