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
                <div class="col-lg-4" v-if="state > 0 && state < 20">
                    <card shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="text-center border-0 mt-1 mb-1">
                        <video ref="video" width="100%" autoplay muted></video>
                    </card>
                </div>
                <div class="col-lg-8">
                    <card v-if="state === 0" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Signature @empty="showModalAnnouncement=true;"
                                   @finish="state=1; startRecording();"></Signature>
                    </card>
                    <modal :show.sync="showModalAnnouncement">
                        <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
                        <p>请在下方区域内签名。</p>
                        <base-button type="info" @click="showModalAnnouncement=false;">关闭</base-button>
                    </modal>
                    <card v-if="state === 1" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Watch @finish="state=2;"></Watch>
                    </card>
                    <card v-if="state === 2" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement @finish="state=3;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    步骤二 回答问题
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    我们将会依次询问您5个问题。在每个问题陈述完毕后，您将有30秒的时间进行思考。
                                </p>
                                <p>
                                    思考时间结束后，你将有3分钟的时间回答，时间会显示在屏幕上。你也可以点击结束按钮提前结束思考和回答时间。
                                </p>
                                <p>
                                    每个问题的答案无对错之分，不带有任何评价意义，你可以自由表达。希望您表达的尽可能详细且真实。
                                </p>
                                <p>
                                    请问你准备好了吗？
                                </p>
                            </template>
                            <template v-slot:end>
                                准备好了
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 3" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="0"
                                  :total-seconds="30"
                                  :middle-seconds="20"
                                  @finish="state=4;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题一
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最美好的记忆或经历过的最美好的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 4" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="1"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=5;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题一
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最美好的记忆或经历过的最美好的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 5" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="2"
                                  :total-seconds="30"
                                  :middle-seconds="20"
                                  @finish="state=6;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最痛苦的记忆或经历过的最痛苦的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 6" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="3"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=7;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最痛苦的记忆或经历过的最痛苦的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 7" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="4"
                                  :total-seconds="30"
                                  :middle-seconds="20"
                                  @finish="state=8;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题三
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最幸福的记忆或经历过的最幸福的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 8" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="5"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=9;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题三
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最幸福的记忆或经历过的最幸福的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 9" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="6"
                                  :total-seconds="30"
                                  :middle-seconds="20"
                                  @finish="state=10;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题四
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最悲伤的记忆或经历过的最悲伤的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 10" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="7"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=11;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题四
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最悲伤的记忆或经历过的最悲伤的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 11" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question key="8"
                                  :total-seconds="30"
                                  :middle-seconds="20"
                                  @finish="state=12;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题五
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最愤怒的记忆或经历过的最愤怒的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 12" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="9"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=13;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题五
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最愤怒的记忆或经历过的最愤怒的事情吗？为什么？</p>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 13" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement @finish="state=14;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    步骤三 墨迹测试
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <p>思考时间60s，回答时间180s。</p>
                                <p>例如</p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p class="mt-1 mb-1">这张图中我觉得中间的部分像是一张面具，有点像是戏剧中的面具。</p>
                                <p class="mt-1 mb-1">
                                    它的上方有类似于眼睛的图形，中间有一个倒三角形状的鼻子，以及上翘的形状似乎在暗示一个微笑。</p>
                                <p class="mt-1 mb-1">
                                    周围的图形让我联想到了动物的翅膀，特别像是夜晚飞翔的蝙蝠，因为它们有一种流畅而又对称的外形。</p>
                                <p class="mt-1 mb-1">墨迹的边缘有些地方像是羽毛或者毛发般细腻，增加了一种自然的质感。</p>
                                <p class="mt-1 mb-1">而墨迹图的整体布局对称，让我感觉图中的形象在平衡中寻找着秩序。</p>
                                <p class="mt-1 mb-1">总的来说，这张图给我的感觉是既神秘又有生命力的。</p>
                            </template>
                            <template v-slot:end>
                                开始测试
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 14" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="10"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=15;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试一
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 15" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="11"
                                  :total-seconds="180"
                                  :middle-seconds="120"
                                  @finish="state=16;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试一
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 16" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="12"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=17;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。</p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 17" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="13"
                                  :total-seconds="180"
                                  :middle-seconds="120"
                                  @finish="state=18;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。</p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 18" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="14"
                                  :total-seconds="60"
                                  :middle-seconds="40"
                                  @finish="state=19;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试三
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。</p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 19" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Question :key="15"
                                  :total-seconds="180"
                                  :middle-seconds="120"
                                  @finish="state=20; stopRecording();">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试三
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                            </template>
                            <template v-slot:prompt>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Question>
                    </card>
                    <card v-if="state === 20" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement @finish="state=21;">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    步骤四 填写量表
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    恭喜你！你已经完成了视听数据采集的基本工作，只剩下最后一步，填写一份量表的任务就完成了！</p>
                                <p>现在你需要填写一份人格问卷，它一共有60个问题，完成时间在10分钟以内。</p>
                                <p>
                                    希望你能够认真作答。填写结束之后会显示你在每个人格维度上的分数，这有助于你加深对自己的了解。</p>
                                <p>如果你准备好了，点击下面的按钮，我们就可以开始了。</p>
                            </template>
                            <template v-slot:end>
                                准备好了
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 21" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Scale @empty="showModalScaleEmpty=true;" @finish="showModalScaleFinish=true;"></Scale>
                    </card>
                    <modal :show.sync="showModalScaleEmpty">
                        <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
                        <p>请确保所有问题都已回答，并且分数在1到5之间。</p>
                        <base-button type="info" @click="showModalScaleEmpty=false;">关闭</base-button>
                    </modal>
                    <modal :show.sync="showModalScaleFinish">
                        <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
                        <p>
                            恭喜你已完成本数据采集任务，非常感谢你的参与与配合，人格评测结果及志愿奖励将于审核通过后发放。
                        </p>
                        <base-button type="info" @click="$router.push('/');">返回首页</base-button>
                    </modal>
                </div>
            </div>
        </div>
    </section>


</template>
<script>
import Signature from "@/views/custom/signature.vue";
import Watch from "@/views/custom/watch.vue";
import Question from "@/views/custom/question.vue";
import Scale from "@/views/custom/scale.vue";
import Modal from "@/components/Modal.vue";
import Announcement from "@/views/custom/announcement.vue";

export default {
    components: {
        Announcement,
        Modal,
        Signature,
        Watch,
        Question,
        Scale
    },
    methods: {
        async startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
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
                    const downloadLink = document.createElement("a");
                    downloadLink.href = URL.createObjectURL(blob);
                    downloadLink.download = "recording.webm";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
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
    data() {
        return {
            state: 0,
            showModalAnnouncement: false,
            showModalScaleEmpty: false,
            showModalScaleFinish: false,
            mediaRecorder: null,
            recordedChunks: []
        };
    },
};
</script>
<style>
</style>
