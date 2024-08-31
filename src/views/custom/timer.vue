<template>
    <section>
        <h1>{{ minutes }}:{{ seconds }}</h1>
    </section>
</template>

<script>
export default {
    data() {
        return {
            remainingSeconds: this.totalSeconds,
            interval: null,
            isRunning: false,
            middleTriggered: false
        };
    },
    mounted() {
        this.startTimer();
    },
    computed: {
        minutes() {
            return Math.floor(this.remainingSeconds / 60);
        },
        seconds() {
            return this.remainingSeconds % 60;
        }
    },
    methods: {
        startTimer() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.interval = setInterval(() => {
                    if (this.remainingSeconds <= 0) {
                        clearInterval(this.interval);
                        this.isRunning = false;
                        this.remainingSeconds = 0;
                        this.$emit("finish");
                        return;
                    }

                    if (!this.middleTriggered && this.remainingSeconds === this.remainingSeconds) {
                        this.$emit("middle");
                        this.middleTriggered = true;
                    }

                    this.remainingSeconds--;
                }, 1000);
            }
        }
    },
    props: {
        totalSeconds: {
            type: Number,
            default: 60
        },
        middleSeconds: {
            type: Number,
            default: 30
        }
    }
};
</script>

<style>
</style>
