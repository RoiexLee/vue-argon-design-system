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
                <div class="col-lg-4 text-center" v-if="state >= 1 && state <= 23">
                    <card shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="text-center border-0 mt-1 mb-1">
                        <video ref="video" width="100%" autoplay muted></video>
                    </card>
                    <card shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Timer :totalSeconds="timer.totalSeconds" :middleSeconds="timer.middleSeconds"
                               @middle="updateButton" @finish="updateState(state+1)" ref="timer"></Timer>
                    </card>
                </div>
                <modal :show.sync="showModal">
                    <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
                    <p>{{ message }}</p>
                    <base-button type="info" @click="showModal=false">关闭</base-button>
                </modal>
                <div class="col-lg-8">
                    <card v-if="state === 0" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Signature @empty="showModal=true; message=messages.messageSignatureEmpty"
                                   @finish="(value) => {updateState(1, value)}"></Signature>
                    </card>
                    <card v-if="state === 1" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Watch @finish="updateState(2)"></Watch>
                    </card>
                    <card v-if="state === 2" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(3)">
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
                        <Announcement :showButton="showButton" @finish="updateState(4)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题一
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最美好的记忆或经历过的最美好的事情吗？为什么？</p>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 4" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(5)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题一
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你最美好的记忆或经历过的最美好的事情吗？为什么？</p>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 5" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(6)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你有过什么不愉快或悲伤的记忆吗？为什么？</p>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 6" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(7)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你能告诉我，在过去的生活中，你有过什么不愉快或悲伤的记忆吗？为什么？</p>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 7" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(8)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题三
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你最近过得怎么样？发生了什么，你的心情怎么样？</p>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 8" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(9)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题三
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你最近过得怎么样？发生了什么，你的心情怎么样？</p>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 9" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(10)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题四
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你对现在正在做的这件事感觉如何？</p>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 10" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(11)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题四
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你对现在正在做的这件事感觉如何？</p>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 11" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(12)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题五
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你的生活中有什么你想改变的吗？</p>
                                <p>现在你有30秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 12" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(13)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    问题五
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>你的生活中有什么你想改变的吗？</p>
                                <p>现在你有60秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 13" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(14)">
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
                                    <img src="img/exm/rorschach0.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>这张图中我觉得中间的部分像是一张面具，有点像是戏剧中的面具。</p>
                                <p>
                                    它的上方有类似于眼睛的图形，中间有一个倒三角形状的鼻子，以及上翘的形状似乎在暗示一个微笑。
                                </p>
                                <p>
                                    周围的图形让我联想到了动物的翅膀，特别像是夜晚飞翔的蝙蝠，因为它们有一种流畅而又对称的外形。
                                </p>
                                <p>墨迹的边缘有些地方像是羽毛或者毛发般细腻，增加了一种自然的质感。</p>
                                <p>而墨迹图的整体布局对称，让我感觉图中的形象在平衡中寻找着秩序。</p>
                                <p>总的来说，这张图给我的感觉是既神秘又有生命力的。</p>
                            </template>
                            <template v-slot:end>
                                开始测试
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 14" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(15)">
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
                                    <img src="img/exm/rorschach1.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 15" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(16)">
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
                                    <img src="img/exm/rorschach1.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 16" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(17)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。</p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach2.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 17" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(18)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试二
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。</p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach2.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 18" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(19)">
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
                                    <img src="img/exm/rorschach3.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 19" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(20)">
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
                                    <img src="img/exm/rorschach3.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 20" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(21)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试四
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach4.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 21" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(22)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试四
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach4.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 22" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(23)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试五
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach5.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有60秒的时间可以思考。</p>
                            </template>
                            <template v-slot:end>
                                结束思考
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 23" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(24)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    墨迹测试五
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    根据给出的墨迹图像，描述所看见的东西，说出您看到了什么，包括颜色、形状和可能的情感或故事，让您联想到某个特定的物体、事件或感觉。
                                </p>
                                <div class="text-center mt-3 mb-3">
                                    <img src="img/exm/rorschach5.png" alt="墨迹图" class="img-fluid rounded shadow"
                                         width="80%">
                                </div>
                                <p>现在你有180秒的时间可以回答。</p>
                            </template>
                            <template v-slot:end>
                                结束回答
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 24" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Announcement :showButton="showButton" @finish="updateState(25)">
                            <template v-slot:title>
                                <h1 class="text-center mt-3 mb-3">
                                    步骤四 填写量表
                                </h1>
                            </template>
                            <template v-slot:content>
                                <p>
                                    恭喜你！你已经完成了视听数据采集的基本工作，只剩下最后一步，填写一份量表的任务就完成了！
                                </p>
                                <p>现在你需要填写一份人格问卷，它一共有60个问题，完成时间在 10 分钟以内。</p>
                                <p>
                                    希望你能够认真作答。填写结束之后会显示你在每个人格维度上的分数，这有助于你加深对自己的了解。
                                </p>
                                <p>如果你准备好了，点击下面的按钮，我们就可以开始了。</p>
                            </template>
                            <template v-slot:end>
                                准备好了
                            </template>
                        </Announcement>
                    </card>
                    <card v-if="state === 25" shadow header-classes="bg-white"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0 mt-1 mb-1">
                        <Scale @empty="showModal=true; message=messages.messageScaleEmpty;"
                               @finish="(value) => {updateState(25, value);}"></Scale>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Signature from "@/views/custom/signature.vue";
import Watch from "@/views/custom/watch.vue";
import Scale from "@/views/custom/scale.vue";
import Modal from "@/components/Modal.vue";
import Announcement from "@/views/custom/announcement.vue";
import Timer from "@/views/custom/timer.vue";
import axios from "axios";

export default {
    components: {
        Announcement,
        Modal,
        Signature,
        Watch,
        Scale,
        Timer
    },
    methods: {
        async updateState(state, value) {
            this.state = state;
            if (state === 1) {
                this.formData.append("signature", value);
                await this.startRecording();
                this.showButton = false;
                this.$refs.timer.resetTimer(180, 0);
                this.setTimes("start");
            } else if (state === 2) {
                this.setTimes("watch");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 3) {
                this.setTimes("questionOneThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(30, 15);
            } else if (state === 4) {
                this.setTimes("questionOneAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 5) {
                this.setTimes("questionTwoThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(30, 15);
            } else if (state === 6) {
                this.setTimes("questionTwoAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 7) {
                this.setTimes("questionThreeThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(30, 15);
            } else if (state === 8) {
                this.setTimes("questionThreeAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 9) {
                this.setTimes("questionFourThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(30, 15);
            } else if (state === 10) {
                this.setTimes("questionFourAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 11) {
                this.setTimes("questionFiveThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(30, 15);
            } else if (state === 12) {
                this.setTimes("questionFiveAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 13) {
                this.setTimes("rorschachAnnouncement");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 14) {
                this.setTimes("rorschachOneThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 15) {
                this.setTimes("rorschachOneAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(180, 90);
            } else if (state === 16) {
                this.setTimes("rorschachTwoThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(60,30);
            } else if (state === 17) {
                this.setTimes("rorschachTwoAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(180, 90);
            } else if (state === 18) {
                this.setTimes("rorschachThreeThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 19) {
                this.setTimes("rorschachThreeAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(180, 90);
            } else if (state === 20) {
                this.setTimes("rorschachFourThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 21) {
                this.setTimes("rorschachFourAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(180, 90);
            } else if (state === 22) {
                this.setTimes("rorschachFiveThink");
                this.showButton = false;
                this.$refs.timer.resetTimer(60, 30);
            } else if (state === 23) {
                this.setTimes("rorschachFiveAnswer");
                this.showButton = false;
                this.$refs.timer.resetTimer(180, 90);
            } else if (state === 24) {
                await this.stopRecording();
                this.showButton = true;
                this.setTimes("end");
                this.formData.append("times", this.timesCrate())
            } else if (state === 25) {
                if (value !== undefined) {
                    this.formData.append("answer", value);
                    await this.entryCreate();
                }
            }
        },
        updateButton() {
            if (this.state >= 1 && this.state <= 23) {
                this.showButton = true;
            }
        },
        setTimes(key) {
            if (key === "start") {
                this.time = new Date().getTime();
            }
            this.times[key] = new Date().getTime() - this.time;
        },
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
                    const file = new File([blob], "recording.webm", {type: "video/webm"});
                    this.formData.append("video", file);
                };

                this.mediaRecorder.start();
            } catch (error) {
                console.error("Error accessing media devices.", error);
            }
        },
        async stopRecording() {
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
            }
        },
        timesCrate() {
            let csv = "";
            for (const [key, time] of Object.entries(this.times)) {
                csv += `${key},${time}\n`;
            }
            return new File([csv], "times.csv", {type: "text/csv"});
        },
        async entryCreate() {
            try {
                await axios.post(
                    "/entry/create",
                    this.formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "access-token": `Bearer ${this.$store.state.accessToken}`
                        }
                    }
                ).then(
                    response => {
                        if (response.status === 200) {
                            this.showModal = true;
                            this.message = this.messages.messageScaleFinish;
                            setTimeout(() => {
                                this.$router.push("/");
                            }, 3000);
                        } else {
                            this.showModal = true;
                            this.message = this.messages.messageScaleError;
                        }
                    }
                )
            } catch (e) {
                this.showModal = true;
                this.message = e.response.data["detail"];
            }
        }
    },
    data() {
        return {
            state: 0,
            time: 0,
            times: {},
            formData: new FormData(),
            showModal: false,
            showButton: false,
            timer: {
                totalSeconds: 6000,
                middleSeconds: 3000,
            },
            message: "",
            messages: {
                messageSignatureEmpty: "请在下方区域内签名",
                messageScaleEmpty: "请确保所有问题都已回答，并且分数在1到5之间",
                messageScaleFinish: "恭喜你已完成本数据采集任务，非常感谢你的参与与配合，人格评测结果及志愿奖励将于审核通过后发放",
                messageScaleError: "提交失败，请重试"
            },
            mediaRecorder: null,
            recordedChunks: []
        };
    },
};
</script>
<style>
</style>
