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
                        <div class="text-center text-muted mb-4">
                            <small>使用身份注册</small>
                        </div>
                        <form role="form" @submit.prevent="registerUser()">
                            <base-input placeholder="用户名"
                                        addon-left-icon="fa fa-user" v-model="username">
                            </base-input>
                            <base-input type="password"
                                        placeholder="密码"
                                        addon-left-icon="fa fa-lock" v-model="password">
                            </base-input>
                            <base-input type="password"
                                        placeholder="确认密码"
                                        addon-left-icon="fa fa-lock" v-model="confirmPassword">
                            </base-input>
                            <base-input placeholder="学号"
                                        addon-left-icon="fa fa-id-card" v-model="sid">
                            </base-input>
                            <base-input placeholder="手机号码"
                                        addon-left-icon="fa fa-phone" v-model="phone">
                            </base-input>
                            <base-input addon-left-icon="fa fa-calendar">
                                <flat-picker :config="{allowInput: true}"
                                             class="form-control datepicker"
                                             placeholder="出生日期"
                                             v-model="birthday">
                                </flat-picker>
                            </base-input>
                            <div class="row justify-content-center mt-3 mb-3">
                                <span class="col-lg-4">性别</span>
                                <base-radio name="man" class="col-lg-4" v-model="gender">
                                    <span>男</span>
                                </base-radio>
                                <base-radio name="woman" class="col-lg-4" v-model="gender">
                                    <span>女</span>
                                </base-radio>
                            </div>
                            <div class="row justify-content-center mt-3 mb-3">
                                <span class="col-lg-4">教育程度</span>
                                <base-radio name="other" class="col-lg-4" v-model="educationLevel">
                                    <span>本科以下</span>
                                </base-radio>
                                <base-radio name="undergraduate" class="col-lg-4" v-model="educationLevel">
                                    <span>本科</span>
                                </base-radio>
                            </div>
                            <div class="row justify-content-center mt-3 mb-3">
                                <span class="col-lg-4"></span>
                                <base-radio name="master" class="col-lg-4" v-model="educationLevel">
                                    <span>硕士</span>
                                </base-radio>
                                <base-radio name="doctor" class="col-lg-4" v-model="educationLevel">
                                    <span>博士</span>
                                </base-radio>
                            </div>
                            <base-checkbox v-model="agreeToPrivacyPolicy">
                                <span>我同意<a href="#">隐私政策</a></span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4" @click="registerUser()">
                                    注册账号
                                </base-button>
                            </div>
                        </form>
                    </card>
                </div>
            </div>
        </div>
        <modal :show.sync="showModal">
            <h6 slot="header" class="modal-title" id="modal-title-default">提示</h6>
            <p>{{ message }}</p>
            <base-button type="info" @click="showModal=false">关闭</base-button>
        </modal>
    </section>
</template>
<script>
import Modal from "@/components/Modal.vue";
import axios from "axios";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
    components: {
        Modal,
        flatPicker
    },
    methods: {
        async registerUser() {
            if (!this.username || !this.password || !this.confirmPassword || !this.sid || !this.phone || !this.birthday || !this.educationLevel) {
                this.showModal = true;
                this.message = "请填写所有信息";
            } else if (!this.agreeToPrivacyPolicy) {
                this.showModal = true;
                this.message = "请同意隐私政策";
            } else if (this.password !== this.confirmPassword) {
                this.showModal = true;
                this.message = "请注意两次密码输入一致";
            } else {
                try {
                    await axios.post(
                        "/user/register",
                        {
                            username: this.username,
                            password: this.password,
                            sid: this.sid,
                            phone: this.phone,
                            birthday: this.birthday,
                            gender: this.gender,
                            education_level: this.educationLevel
                        }, {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    ).then(
                        response => {
                            if (response.status === 200) {
                                this.showModal = true;
                                this.message = "注册成功，三秒后跳转";
                                setTimeout(() => {
                                    this.$router.push("/login");
                                }, 3000);
                            } else {
                                this.showModal = true;
                                this.message = "注册失败";
                            }
                        }
                    )
                } catch (e) {
                    this.showModal = true;
                    this.message = e.response.data["detail"];
                }

            }
        }
    },
    data() {
        return {
            username: "",
            password: "",
            confirmPassword: "",
            sid: "",
            phone: "",
            birthday: "",
            gender: "",
            educationLevel: "",
            agreeToPrivacyPolicy: false,
            showModal: false,
            message: ""
        }
    }
};
</script>
<style>
</style>
