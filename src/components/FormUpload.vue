<template>
    <div style="margin-left: 36vw">
        <van-uploader v-model="fileList" accept=".jpg,.jpeg,.png" max-count="1" :after-read="toUploadFile"></van-uploader>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import useUploadFile from '@/utils/uploadFile';
import { uploadFile } from '@/api/index'
const fileList = ref([]);

const { getMd5ByFIle, generateChunks, getFormData } = useUploadFile();

const toUploadFile = async () => {
    try {
        const file = fileList.value[0].file;
        const { md5, suffix } = await getMd5ByFIle(file);
        const chunks = generateChunks(file, md5, suffix);
        console.log(chunks);
        const concurrentChunks = 3;
        const promises = [];
        while(chunks.length){
            const requests = chunks.splice(0, concurrentChunks).map(chunk => getFormData(chunk)).map(formData => uploadFile({file:formData}));
            promises.push(Promise.all(requests));
        }
        let res = await Promise.all(promises);
        console.log(res);
    } catch (e) {
        console.log(e);
    }

}

</script>

<style lang=''>

</style>