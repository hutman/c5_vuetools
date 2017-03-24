Vue.component('ccm-file-selector',{
    template: '<div @click="launchFileManager" class="ccm-file-selector">' +
        '<div class="ccm-file-selector-file-selected"><div class="ccm-file-selector-file-selected-thumbnail" v-html="thumbnail"></div>' +
        '<div class="ccm-file-selector-file-selected-title">{{ prompt }}<div>{{ filename }}</div>' +
        '</div><div class="clearfix"></div>' +
        '</div></div>',
    props: ['value','options'],
    data: function(){
        return {
            fileId: 0,
            fileObj: {},
            thumbnail: "",
            filename: "",
            prompt: "Select file",
            dialogOpts: {}
        }
    },
    created: function () {
        var vm = this;
        this.updateFile(this.value);
        if (this.options !== undefined && this.options.filters !== undefined) {
            this.dialogOpts.filters = this.options.filters;
        }
    },
    methods: {
        launchFileManager () {
            var vm = this;
            ConcreteFileManager.launchDialog(function(data) {
                vm.updateFile(data.fID);
            }, vm.dialogOpts);
        },
        clearFile () {
            this.fileId = 0;
            this.thumbnail = "";
            this.filename = "";
            this.prompt = "Select file";
            this.$emit('input',0);
        },
        updateFile(fID){
            var vm = this;
            this.fileId = parseInt(fID);
            if (fID > 0) {
                ConcreteFileManager.getFileDetails(this.fileId, function(r) {
                    vm.fileObj = r.files[0];
                    vm.thumbnail = vm.fileObj.resultsThumbnailImg;
                    vm.filename = vm.fileObj.fileName;
                    vm.prompt = "";
                });
            }
            this.$emit('input',this.fileId);
        }
    }
});