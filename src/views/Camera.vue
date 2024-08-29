<template>
    <div>
        <video ref="video" autoplay></video>
        <button @click="startRecording">Start Recording</button>
        <button @click="stopRecording">Stop Recording</button>
        <a :href="downloadLink" download="recording.webm" v-if="downloadLink">Download Video</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mediaRecorder: null,
            recordedChunks: [],
            downloadLink: null
        };
    },
    methods: {
        async startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                this.$refs.video.srcObject = stream;

                this.mediaRecorder = new MediaRecorder(stream);
                this.recordedChunks = [];

                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.recordedChunks.push(event.data);
                    }
                };

                this.mediaRecorder.onstop = () => {
                    const blob = new Blob(this.recordedChunks, {type: "video/webm"});
                    this.downloadLink = URL.createObjectURL(blob);
                };

                this.mediaRecorder.start();
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        },
        stopRecording() {
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
            }
        },
    },
};
</script>
<style>
</style>
