<template>
    <v-card style="margin-bottom: 20px">
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

                <input ref="imageInput" type="file" multiple hidden @change="onChangeImages" />
                <v-btn type="button" @click="onClickImageUpload">이미지업로드</v-btn>
                <div>
                    <div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
                        <img :src="`http://localhost:3085/${p}`" :alt="p" style="width: 200px" />
                        <div>
                            <button type="button" @click="onRemoveImage(i)">제거</button>
                        </div>
                    </div>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
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
            ...mapState('posts', ['imagePaths']),
        },

        methods: {
            ...mapActions('posts', ['ADD', 'UPLOAD_IMAGES']),
            ...mapMutations('posts', ['REMOVE_IMAGE_PATH']),
            onChangeTextarea(value) {
                if (value.length) {
                    this.hideDetails = true;
                    this.success = false;
                    this.successMessages = '';
                }
            },

            onSubmitForm() {
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
                        this.content = '';
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';
                    });
                }
            },

            onClickImageUpload() {
                this.$refs.imageInput.click();
            },

            onChangeImages(e) {
                console.log(e.target.files);
                const imageFormData = new FormData();
                [].forEach.call(e.target.files, f => {
                    imageFormData.append('image', f);
                });
                this.UPLOAD_IMAGES(imageFormData);
            },

            onRemoveImage(index) {
                this.REMOVE_IMAGE_PATH(index);
            },
        },
    };
</script>

<style scoped></style>
