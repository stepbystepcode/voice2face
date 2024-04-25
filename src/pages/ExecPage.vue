<script setup lang="ts">
import {ref} from 'vue';
const videoRef = ref<HTMLInputElement | null>(null);
const voiceRef = ref<HTMLInputElement | null>(null);
const player = ref<HTMLVideoElement | null>(null);
const submit = async () => {
  const formData = new FormData();
  if(!voiceRef.value?.files || !videoRef.value?.files) return console.error('No files selected');
  const voice = voiceRef.value.files[0];
  const video = videoRef.value.files[0];
  formData.append('voice', voice);
  formData.append('video', video);
  try {
    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    fetch('http://sits.frpgz1.idcfengye.com/audiodrive', requestOptions)
      .then((response) => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        if (player.value) {
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
const selectVoice = () => {
  voiceRef.value?.click();
};
const selectVideo = () => {
  videoRef.value?.click();
};

</script>

<template>
  <div class="column q-pa-md q-gutter-y-md" style="flex-wrap: nowrap">
    <q-btn @click="selectVoice">选择声音文件</q-btn>
    <input type="file" name="voice" id="voice" ref="voiceRef" style="display: none">
    <q-btn @click="selectVideo">选择视频文件</q-btn>
    <input type="file" name="video" id="video" ref="videoRef" style="display: none">
    <q-btn @click="submit" color="primary">提交</q-btn>
    <video controls="true" ref="player" style="width:100%"></video>
  </div>
</template>

<style scoped>

</style>
