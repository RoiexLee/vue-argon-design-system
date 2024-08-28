<template>
    <section>
        <h1 class="text-center mt-3 mb-3">{{ this.title }}</h1>
        <p>
            根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
        </p>
        <div class="text-center mt-3 mb-3">
            <img :src="this.image" alt="墨迹图像" class="img-fluid rounded shadow">
        </div>
        <div v-if="this.rorschachState===0">
            <p>现在你有60秒的时间可以思考。</p>
            <div class="text-center mt-3 mb-3">
                <Timer :total-seconds="60" :key="0" @finish="updateRorschachState"></Timer>
                <base-button type="primary" @click="updateRorschachState">结束思考</base-button>
            </div>
        </div>
        <div v-else-if="this.rorschachState===1">
            <p>现在你有180秒的时间可以回答。</p>
            <div class="text-center mt-3 mb-3">
                <Timer :total-seconds="180" :key="1" @finish="updateRorschachState"></Timer>
                <base-button type="primary" @click="updateRorschachState">结束回答</base-button>
            </div>
        </div>
    </section>
</template>
<script>

import Timer from "@/views/custom/timer.vue";

export default {
    name: "Rorschach",
    components: {
        Timer
    },
    methods: {
        updateRorschachState() {
            if (this.rorschachState === 0) {
                this.rorschachState = 1;
            } else if (this.rorschachState === 1) {
                this.$emit("finish");
            }
        }
    },
    props: {
        title: {
            type: String,
            default: "墨迹图像"
        },
        image: {
            type: String,
            default: "img/exm/rorschach.png"
        }
    },
    data() {
        return {
            rorschachState: 0,
            timerKey: 0
        }
    }
}
</script>
<style>

</style>