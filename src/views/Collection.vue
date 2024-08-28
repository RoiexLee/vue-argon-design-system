<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <div class="text-center">
                            <h1>欢迎参加我们的实验</h1>
                        </div>
                        <div>
                            <p>
                                您好，我们是合肥工业大学计算机与信息学院媒体计算实验室的研究团队，欢迎参加我们的实验。现在我来简单告知您实验的流程和相关信息。</p>
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
                        </div>
                        <div class="signature-container text-center">
                            <canvas ref="signatureCanvas" class="signature-canvas" style="border: 2px solid #000000"
                                    width="200%" height="100%"></canvas>
                            <div class="signature-controls mt-3">
                                <base-button type="secondary" @click="clearSignature">清除</base-button>
                                <base-button type="primary" @click="saveSignature">确定</base-button>
                            </div>
                        </div>
                    </card>
                </div>

            </div>
        </div>
    </section>


</template>
<script>
export default {
    data() {
        return {
            isDrawing: false,
            context: null
        };
    },
    mounted() {
        const canvas = this.$refs.signatureCanvas;
        this.context = canvas.getContext("2d");
        this.setupCanvas();
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
        },
        startDrawing(event) {
            this.isDrawing = true;
            this.context.beginPath();
            this.context.moveTo(event.offsetX, event.offsetY);
        },
        draw(event) {
            if (!this.isDrawing) return;
            this.context.lineTo(event.offsetX, event.offsetY);
            this.context.stroke();
        },
        stopDrawing() {
            if (!this.isDrawing) return;
            this.isDrawing = false;
            this.context.closePath();
        },
        clearSignature() {
            this.context.clearRect(0, 0, this.$refs.signatureCanvas.width, this.$refs.signatureCanvas.height);
        },
        saveSignature() {
            const dataURL = this.$refs.signatureCanvas.toDataURL();
            console.log("Signature data URL:", dataURL);
            // 这里可以将签名图像数据上传到服务器或者其他处理
        }
    }
};
</script>
<style>
</style>
