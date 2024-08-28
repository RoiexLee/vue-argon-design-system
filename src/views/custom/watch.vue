<template>
    <section>
        <h1 class="text-center mt-3 mb-3">步骤一 观看视频</h1>
        <video controls ref="video" width="100%" @pause="updatePlayState(0)" @play="updatePlayState(1)"
               @ended="updatePlayState(2)"
               class="text-center mt-3 mb-3">
            <source src="videos/trailer.mp4" type="video/mp4">
        </video>
        <div class="text-center mt-3 mb-3">
            <base-button type="primary" @click="updateVideo" v-if="this.playState === 0">
                播放
            </base-button>
            <base-button type="primary" @click="updateVideo" v-else-if="this.playState === 1">
                暂停
            </base-button>
            <base-button type="primary" @click="updateVideo" v-else-if="this.playState === 2">
                下一步
            </base-button>
        </div>
    </section>
</template>
<script>
export default {
    name: "Watch",
    data() {
        return {
            playState: 0
        }
    },
    methods: {
        updatePlayState(state) {
            this.playState = state;
        },
        updateVideo() {
            const video = this.$refs.video;
            if (this.playState === 0) {
                video.play();
            } else if (this.playState === 1) {
                video.pause();
            } else if (this.playState === 2) {
                this.$emit("finish");
            }
        }
    }
}
</script>
<style>
</style>