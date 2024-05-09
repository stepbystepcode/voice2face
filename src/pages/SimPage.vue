<script setup lang="ts">
import {ref} from 'vue';
const text = ref<string>('');
const videoRef = ref<HTMLInputElement | null>(null);
const voiceRef = ref<HTMLInputElement | null>(null);
const player = ref<HTMLVideoElement | null>(null);
const submit = async () => {
  const formData = new FormData();
  if(!voiceRef.value?.files || !videoRef.value?.files) return console.error('No files selected');
  const video = videoRef.value.files[0];
  formData.append('video', video);
  const voice = voiceRef.value.files[0];
  formData.append('voice', voice);
  formData.append('text', text.value);
  formData.append('language', language.value);
  formData.append('gender',gender.value);
  try {
    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    fetch('http://sits.frpgz1.idcfengye.com/textdrive', requestOptions)
      .then((response) => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        if (player.value) {
          player.value.style.visibility = 'visible';
          player.value.src = url;
          player.value.load();
        }
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'download.mp4';
        document.body.appendChild(a);
        a.click();
        // window.URL.revokeObjectURL(url);
        // a.parentNode.removeChild(a);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
};
const selectVideo = () => {
  videoRef.value?.click();
};
const options=[
{
    label: '汉语',
    value: 'chinese'
  },
  {
    label: '英语',
    value: 'english'
  },
];
const genderOpts=[
    '男','女'
];
const language=ref('english');
const gender=ref('男');
const selectVoice = () => {
  voiceRef.value?.click();
};

</script>

<template>
  <div class="column q-pa-md q-gutter-y-md" style="flex-wrap: nowrap">
    <q-input v-model="text" label="输入文本" />
    <q-select v-model="language" :options="options" label="选择语言" />
    <q-select v-model="gender" :options="genderOpts" label="选择性别" />
    <q-btn @click="selectVoice">选择声音文件</q-btn>
    <input type="file" name="voice" id="voice" ref="voiceRef" style="display: none">
    <q-btn @click="selectVideo">选择视频文件</q-btn>
    <input type="file" name="video" id="video" ref="videoRef" style="display: none">
    <q-btn @click="submit" color="primary">提交</q-btn>
    <video controls="true" ref="player" style="width:100%;visibility: hidden"></video>
  </div>
</template>

<style scoped>

</style>
