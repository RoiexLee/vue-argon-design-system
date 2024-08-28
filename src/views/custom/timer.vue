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
                    this.remainingSeconds--;
                }, 1000);
            }
        },
        resetTimer() {
            clearInterval(this.interval);
            this.isRunning = false;
        }
    },
    props: {
        totalSeconds: {
            type: Number,
            default: 60
        }
    }
};
</script>

<style>
</style>
