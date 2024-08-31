<template>
    <section>
        <slot name="title"></slot>
        <slot name="content"></slot>
        <slot name="prompt"></slot>
        <div class="text-center mt-1 mb-1">
            <Timer :totalSeconds="totalSeconds" :middleSeconds="middleSeconds" @middle="updateButton"
                   @finish="$emit('finish')"></Timer>
            <base-button type="primary" @click="$emit('finish')" v-if="showButton">
                <slot name="end"></slot>
            </base-button>
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
        updateButton() {
            this.showButton = true;
        }
    },
    props: {
        totalSeconds: {
            type: Number,
            default: 60
        },
        middleSeconds: {
            type: Number,
            default: 40
        }
    },
    data() {
        return {
            showButton: false
        }
    }
}
</script>
<style>

</style>