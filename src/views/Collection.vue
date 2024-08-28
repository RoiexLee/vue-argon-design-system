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
                    <card v-if="this.state===0" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Announcement @finish="updateState(1)"></Announcement>
                    </card>
                    <card v-else-if="this.state===1" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Watch @finish="updateState(2)"></Watch>
                    </card>
                    <card v-else-if="this.state===2" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <h1 class="text-center mt-3 mb-3">步骤二 回答问题</h1>
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
                        <div class="text-center mt-3 mb-3">
                            <base-button type="primary" @click="updateState(3)">准备好了</base-button>
                        </div>
                    </card>
                    <card v-else-if="this.state===3" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Question title="问题一"
                                  content="你能告诉我，在过去的生活中，你最美好的记忆或经历过的最美好的事情吗？为什么？"
                                  :key="1"
                                  @finish="updateState(4) "></Question>
                    </card>
                    <card v-else-if="this.state===4" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Question title="问题二"
                                  content="你能告诉我，在过去的生活中，你最痛苦的记忆或经历过的最痛苦的事情吗？为什么？"
                                  :key="2"
                                  @finish="updateState(5)"></Question>
                    </card>
                    <card v-else-if="this.state===5" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Question title="问题三"
                                  content="你能告诉我，在过去的生活中，你最幸福的记忆或经历过的最幸福的事情吗？为什么？"
                                  :key="3"
                                  @finish="updateState(6)"></Question>
                    </card>
                    <card v-else-if="this.state===6" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Question title="问题四"
                                  content="你能告诉我，在过去的生活中，你最激动的记忆或经历过的最激动的事情吗？为什么？"
                                  :key="4"
                                  @finish="updateState(7)"></Question>
                    </card>
                    <card v-else-if="this.state===7" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Question title="问题五"
                                  content="你能告诉我，在过去的生活中，你最悲伤的记忆或经历过的最悲伤的事情吗？为什么？"
                                  :key="5"
                                  @finish="updateState(8)"></Question>
                    </card>
                    <card v-else-if="this.state===8" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <h1 class="text-center mt-3 mb-3">步骤三 墨迹测试</h1>
                        <p>
                            根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                        </p>
                        <p>思考时间60s，回答时间180s。</p>
                        <p>例如</p>
                        <div class="text-center mt-3 mb-3">
                            <img src="img/exm/rorschach.png" alt="墨迹图" class="img-fluid rounded shadow" width="80%">
                        </div>
                        <p class="mt-1 mb-1">这张图中我觉得中间的部分像是一张面具，有点像是戏剧中的面具。</p>
                        <p class="mt-1 mb-1">
                            它的上方有类似于眼睛的图形，中间有一个倒三角形状的鼻子，以及上翘的形状似乎在暗示一个微笑。</p>
                        <p class="mt-1 mb-1">
                            周围的图形让我联想到了动物的翅膀，特别像是夜晚飞翔的蝙蝠，因为它们有一种流畅而又对称的外形。</p>
                        <p class="mt-1 mb-1">墨迹的边缘有些地方像是羽毛或者毛发般细腻，增加了一种自然的质感。</p>
                        <p class="mt-1 mb-1">而墨迹图的整体布局对称，让我感觉图中的形象在平衡中寻找着秩序。</p>
                        <p class="mt-1 mb-1">总的来说，这张图给我的感觉是既神秘又有生命力的。</p>
                        <div class="text-center mt-3 mb-3">
                            <base-button type="primary" @click="updateState(9)">开始测试</base-button>
                        </div>
                    </card>
                    <card v-else-if="this.state===9" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Rorschach title="墨迹测试一"
                                   image="img/exm/rorschach.png"
                                   :key="0"
                                   @finish="updateState(10)"></Rorschach>
                    </card>
                    <card v-else-if="this.state===10" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Rorschach title="墨迹测试二"
                                   image="img/exm/rorschach.png"
                                   :key="1"
                                   @finish="updateState(11)"></Rorschach>
                    </card>
                    <card v-else-if="this.state===11" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Rorschach title="墨迹测试三"
                                   image="img/exm/rorschach.png"
                                   :key="2"
                                   @finish="updateState(12)"></Rorschach>
                    </card>
                    <card v-else-if="this.state===12" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <h1 class="text-center mt-3 mb-3">步骤四 填写量表</h1>
                        <p>恭喜你！你已经完成了视听数据采集的基本工作，只剩下最后一步，填写一份量表的任务就完成了！</p>
                        <p>现在你需要填写一份人格问卷，它一共有60个问题，完成时间在10分钟以内。</p>
                        <p>希望你能够认真作答。填写结束之后会显示你在每个人格维度上的分数，这有助于你加深对自己的了解。</p>
                        <p>如果你准备好了，点击下面的按钮，我们就可以开始了。</p>
                        <div class="text-center mt-3 mb-3">
                            <base-button type="primary" @click="updateState(13)">准备好了</base-button>
                        </div>
                    </card>
                    <card v-else-if="this.state===13" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <Scale @finish="showModal=true"></Scale>
                    </card>
                    <modal :show.sync="showModal">
                        <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
                        <p>恭喜你已完成本数据采集任务，非常感谢你的参与与配合，人格评测结果及志愿奖励将于审核通过后发放。</p>
                        <base-button type="info" @click="exit">返回首页</base-button>
                    </modal>
                </div>
            </div>
        </div>
    </section>


</template>
<script>
import Announcement from "@/views/custom/announcement.vue";
import Watch from "@/views/custom/watch.vue";
import Question from "@/views/custom/question.vue";
import Rorschach from "@/views/custom/rorschach.vue";
import Scale from "@/views/custom/scale.vue";
import Modal from "@/components/Modal.vue";

export default {
    components: {
        Modal,
        Announcement,
        Watch,
        Question,
        Rorschach,
        Scale
    },
    methods: {
        updateState(state) {
            this.state = state;
        },
        exit() {
            this.state = 0;
            this.showModal = false;
            this.$router.push("/");
        }
    },
    data() {
        return {
            state: 0,
            showModal: false
        };
    },
};
</script>
<style>
</style>
