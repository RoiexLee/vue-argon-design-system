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
                <div class="col-lg-5">
                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>使用身份注册</small>
                            </div>
                            <form role="form" @submit.prevent="registerUser()">
                                <base-input class="mb-3"
                                            placeholder="用户名"
                                            addon-left-icon="ni ni-hat-3" v-model="username">
                                </base-input>
                                <base-input type="password"
                                            placeholder="密码"
                                            addon-left-icon="ni ni-lock-circle-open" v-model="password">
                                </base-input>
                                <base-checkbox v-model="agreeToPrivacyPolicy">
                                    <span>我同意<a href="#">隐私政策</a></span>
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="registerUser()">
                                        注册账号
                                    </base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
        <modal :show.sync="showModal1">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>请填写所有信息</p>
            <base-button type="info" @click="showModal1=false">关闭</base-button>
        </modal>
        <modal :show.sync="showModal2">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>请同意隐私政策</p>
            <base-button type="info" @click="showModal2=false">关闭</base-button>
        </modal>
        <modal :show.sync="showModal3">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>注册成功，三秒后跳转</p>
            <base-button type="info" @click="showModal3=false">关闭</base-button>
        </modal>
        <modal :show.sync="showModal4">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>注册失败</p>
            <base-button type="info" @click="showModal4=false">关闭</base-button>
        </modal>
    </section>
</template>
<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
import Store from "@/store";

export default {
    components: {Modal},
    methods: {
        async registerUser() {
            if (!this.username || !this.password) {
                this.showModal1 = true;
            } else if (!this.agreeToPrivacyPolicy) {
                this.showModal2 = true;
            } else {
                await axios.post(
                    "http://localhost:3000/users",
                    {
                        username: this.username,
                        password: this.password
                    }
                ).then(
                    response => {
                        if (response.data.code === 1) {
                            Store.commit("setToken", response.data.date);
                            this.showModal3 = true;
                            setTimeout(() => {
                                this.showModal3 = false;
                                this.$router.push("/");
                            }, 3000);
                        } else {
                            this.showModal4 = true;
                        }
                    }
                )
            }
        }
    },
    data() {
        return {
            username: "",
            email: "",
            password: "",
            agreeToPrivacyPolicy: false,
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false
        }
    }
};
</script>
<style>
</style>
