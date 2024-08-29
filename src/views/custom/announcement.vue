<template>
    <section>
        <h1 class="text-center mt-3 mb-3">欢迎参加我们的实验</h1>
        <p>
            您好，我们是合肥工业大学计算机与信息学院媒体计算实验室的研究团队，欢迎参加我们的实验。现在我来简单告知您实验的流程和相关信息。
        </p>
        <p>
            本实验目的是采集不同被试的多种模态数据，实验分为两个阶段。
        </p>
        <p>
            第一个阶段有三个小任务，分别是观看视频片段、回答5个开放式问题和观看墨迹图，在这个过程中需要根据指示进行反应，并且全程会对您进行录音和录像。
        </p>
        <p>
            第二个阶段是填写一份心理学量表，数据采集全过程请您尽量保持放松的状态，按照真实情况回答问题。
        </p>
        <p>
            在整个实验过程中，您有随时退出实验的自由，同时，我们会对您的信息和数据进行隐私保护，数据仅用于科研用途。
        </p>
        <p class="font-weight-bold">
            如果您已充分了解本数据采集的相关信息并愿意进行数据采集工作，请在下方区域内签名。
        </p>
        <div class="text-center mt-3 mb-3">
            <base-input v-model="username" placeholder="请输入您的姓名"></base-input>
            <canvas ref="signatureCanvas" style="border: 2px solid #000000" width="500" height="200"></canvas>
            <div class="mt-3 mb-3">
                <base-button type="secondary" @click="clearSignature">清除</base-button>
                <base-button type="primary" @click="saveSignature">确定</base-button>
            </div>
        </div>
        <modal :show.sync="showModal">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>请在下方区域内签名。</p>
            <base-button type="info" @click="showModal=false">关闭</base-button>
        </modal>
    </section>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
    name: "Announcement",
    components: {
        Modal
    },
    methods: {
        setupCanvas() {
            this.context.strokeStyle = "#000000";
            this.context.lineWidth = 2;
            this.context.lineCap = "round";

            this.$refs.signatureCanvas.addEventListener("mousedown", this.startDrawing);
            this.$refs.signatureCanvas.addEventListener("mousemove", this.draw);
            this.$refs.signatureCanvas.addEventListener("mouseup", this.stopDrawing);
            this.$refs.signatureCanvas.addEventListener("mouseleave", this.stopDrawing);

            this.drawName();
        },
        startDrawing(event) {
            this.isDrawing = true;
            this.context.beginPath();
            this.context.moveTo(event.offsetX, event.offsetY);
        },
        draw(event) {
            if (!this.isDrawing) {
                return;
            }
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
        },
        stopDrawing() {
            if (!this.isDrawing) {
                return;
            }
            this.isDrawing = false;
            this.context.closePath();
        },
        clearSignature() {
            this.context.clearRect(0, 0, this.$refs.signatureCanvas.width, this.$refs.signatureCanvas.height);
            this.drawName();
        },
        saveSignature() {
            const canvas = this.$refs.signatureCanvas;
            const isEmpty = !this.context.getImageData(0, 0, canvas.width, canvas.height).data.some(value => value !== 0);

            if (isEmpty) {
                this.showModal = true;
            } else {
                const dataURL = canvas.toDataURL();
                // 这里可以将签名图像数据上传到服务器或者其他处理
                this.$emit("finish");
            }
        },
        drawName() {
            if (this.username) {
                const canvasWidth = this.$refs.signatureCanvas.width;
                const canvasHeight = this.$refs.signatureCanvas.height;
                this.context.clearRect(0, 0, canvasWidth, canvasHeight);

                this.context.textAlign = "center";
                this.context.textBaseline = "middle";

                let fontSize = 50;
                this.context.font = `${fontSize}px Arial`;

                while (this.context.measureText(this.username).width > canvasWidth - 20) {
                    fontSize--;
                    this.context.font = `${fontSize}px Arial`;
                }

                this.context.fillStyle = "#000000";
                this.context.fillText(this.username, canvasWidth / 2, canvasHeight / 2);
            }
        }
    },
    watch: {
        username() {
            this.clearSignature();
        }
    },
    data() {
        return {
            isDrawing: false,
            context: null,
            username: "",
            showModal: false
        }
    },
    mounted() {
        const canvas = this.$refs.signatureCanvas;
        this.context = canvas.getContext("2d");
        this.setupCanvas();
    },
}
</script>

<style>
</style>
