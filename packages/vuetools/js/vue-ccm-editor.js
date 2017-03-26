Vue.component('ccm-editor',{
    template: '<textarea v-model="content"></textarea>',
    props: ['value','options'],
    data: function(){
        return {
            content: 0,
            dialogOpts: {}
        }
    },
    mounted: function () {
        var vm = this;
        this.content = this.value;
        vue_editor(this.$el);
        $(this.$el).ckeditor(function(){
            this.on('change',function(e){
                vm.content = this.getData();
                vm.$emit('input',vm.content);
            });
        });
    }
});


