<template>
  <q-page style="background:#efefef;padding-top: 1px">
    <div class="box-warp">
    <q-btn flat style="grid-row-end: span 2;" @click="router.push('/exec')"><img :src="icon1" alt="icon" style="width: 5rem;height: 5rem">以声动人</q-btn>
    <q-btn flat @click="router.push('/exec')"><img :src="icon2" alt="icon">文语共舞</q-btn>
    <q-btn flat @click="router.push('/exec')"><img :src="icon3" alt="icon">模拟音墨</q-btn>
    </div>
<nav class="fun-warp">
  <div v-for="(item,i) in list" :key="i"><img :src="`/f${i+1}.svg`" alt=""><span>{{item}}</span></div>
</nav>

  </q-page>
</template>

<script setup lang="ts">
import icon1 from '../assets/1.svg'
import icon2 from '../assets/2.svg'
import icon3 from '../assets/3.svg'
import {useRouter} from 'vue-router';
const router = useRouter();
const list = [ '助力听障', '音乐驱动', '多语言学习', '在线教育支持', '助力新科技', '人工智能']
defineOptions({
  name: 'IndexPage'
});

</script>
