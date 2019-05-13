Vue.component('ImageInput', {

    template: `
    <div class="image-input"
    :style="{ 'background-image': \`${url(imageData)}\` }"
    @click="chooseImage" >
        <span v-if="!imageData"  class="placeholder" >
        Choose an Image
        </span>
        <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
    </div>
    `,

    data() {
        return {
            imageData: null
        }
    },

    methods: {
        chooseImage() {
            this.$refs.fileInput.click()
        },

        onSelectFile() {
            const input = this.$refs.fileInput
            const files = input.files
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                    this.imageData = e.target.result
                }

                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
        }
    }
})
