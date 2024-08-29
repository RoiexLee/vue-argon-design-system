<template>
    <section>
        <h1 class="text-center mt-3 mb-3">{{ this.title }}</h1>
        <p>{{ this.content }}</p>
        <div v-if="this.questionState===0">
            <p>现在你有30秒的时间可以思考。</p>
            <div class="text-center mt-3 mb-3">
                <Timer :total-seconds="30" :middle-seconds="20" :key="0" @middle="updateButton" @finish="updateQuestionState"></Timer>
                <base-button type="primary" @click="updateQuestionState" v-if="showButton1">结束思考</base-button>
            </div>
        </div>
        <div v-else-if="this.questionState===1">
            <p>现在你有180秒的时间可以回答。</p>
            <div class="text-center mt-3 mb-3">
                <Timer :total-seconds="180" :middle-seconds="120" :key="1" @middle="updateButton" @finish="updateQuestionState"></Timer>
                <base-button type="primary" @click="updateQuestionState" v-if="showButton2">结束回答</base-button>
            </div>
        </div>
    </section>
</template>
<script>

import Timer from "@/views/custom/timer.vue";

export default {
    name: "Question",
    components: {
        Timer
    },
    methods: {
        updateQuestionState() {
            if (this.questionState === 0) {
                this.questionState = 1;
            } else {
                this.$emit("finish");
            }
        },
        updateButton() {
            if (this.questionState === 0) {
                this.showButton1 = true;
            } else {
                this.showButton2 = true;
            }
        }
    },
    props: {
        title: {
            type: String,
            default: "问题"
        },
        content: {
            type: String,
            default: "问题详细描述"
        }
    },
    data() {
        return {
            questionState: 0,
            showButton1: false,
            showButton2: false
        }
    }
}
</script>
<style>

</style>