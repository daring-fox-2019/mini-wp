Vue.component('publish-form', {
    props: ['onEditor'],
    methods: {
        uploadPicture() {
            console.log('haha')
        }
    },
    template: `
    <div class="row d-flex justify-content-center" style="width:100%;">
    <!-- submit form here -->
        <b-col cols="5" class="border">
            <b-row class="pt-4">
                <b-col>
                    <h3>Story Preview</h3>
                </b-col>
            </b-row style="width:100%;">
            <b-row style="height: 300px;" class="p-3">
                <b-col style="background-color:lightgrey;">
                    <img src="" alt="">
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                <b-form-file
                    v-model="file"
                    @change="uploadPicture"
                    :state="Boolean(file)"
                    placeholder="Choose a file..."
                    drop-placeholder="Drop file here..."
                ></b-form-file>
                </b-col>
            </b-row>
        </b-col>
        <b-col cols="5" class="border">
            <b-row class="pt-4">
                <b-col>
                    <b-form style="width:100%;">
                        <b-form-group id="input-group-4" label="Title:" label-for="title">
                            <b-form-input
                                type="text"
                                id="title"
                                required
                                placeholder="Input Title"
                                v-model="onEditor.title"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-4" label="Subtitle:" label-for="subtitle"
                            description="Subtitle will be shown under the title.">
                            <b-form-input
                                type="text"
                                id="subtitle"
                                required
                                placeholder="Input Subtitle"
                                v-model="onEditor.subtitle"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="tag-label" label="Tags" label-for="input-tags"
                            description="Tap enter after typing a tag.">
                            <div>
                                <vue-tags-input
                                    v-model="tag"
                                    :tags="tags"
                                    @tags-changed="newTags => tags = newTags"/>
                            </div>
                            <!-- <b-form-input id="input-tags" type="text" required placeholder="Enter tags"> -->
                            </b-form-input>
                        </b-form-group>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button variant="outline-success">Publish now</b-button>
                    <b-button variant="outline-dark">Publish for later</b-button>
                </b-col>
            </b-row>
            <!--<b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">test dimasukin { form } nanti</pre>
            </b-card>-->
        </b-col>
    </div>
    `
    ,
    data() {
        return {
            file: '',
            tag: '',
            tags: [],
        };
    }
})