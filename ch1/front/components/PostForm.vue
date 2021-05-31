<template>
    <v-card>
        <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-textarea
                    v-model="content"
                    outlined
                    auto-grow
                    clearable
                    label="어떤 신기한 일이 있었나요?"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    :rules="[v => !!v.trim() || '내용을 입력하세요.']"
                    @input="onChangeTextarea"
                />
                <v-btn type="submit" color="green" absolute right> 짹짹 </v-btn>
                <v-btn>이미지업로드</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'PostForm',

        data() {
            return {
                hideDetails: false,
                successMessages: '',
                success: false,
                content: '',
                valid: false,
            };
        },
        computed: {
            ...mapState('users', ['me']),
        },

        methods: {
            ...mapActions('posts', ['ADD']),
            onChangeTextarea() {
                this.hideDetails = true;
                this.success = false;
                this.successMessages = '';
            },
            onSubmitForm() {
                alert(1);
                console.log(this.$refs.form.validate());
                if (this.$refs.form.validate()) {
                    this.ADD({
                        content: this.content,
                        User: {
                            nickname: this.me.nickname,
                        },
                        Comments: [],
                        Images: [],
                        id: Date.now(),
                        createdAt: Date.now(),
                    }).then(() => {
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';
                    });
                }
            },
        },
    };
</script>

<style scoped></style>
