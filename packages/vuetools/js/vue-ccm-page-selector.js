Vue.component('ccm-page-selector',{
    template: '<div @click="launchSitemap" class="ccm-item-selector"><div class="ccm-item-selector-item-selected">' +
            '<a v-show="pagename" @click.stop="clearPage" href="#" class="ccm-item-selector-clear"><i class="fa fa-close"></i></a>' +
            '<div class="ccm-item-selector-item-selected-title">{{ pagename }} {{ prompt }}</div>' +
            '</div></div>',
    props: ['value','options'],
    data: function(){
        return {
            pageId: 0,
            pageObj: {},
            pagename: "",
            prompt: "Select page",
            dialogOpts: {}
        }
    },
    created: function () {
        var vm = this;
        this.updatePage(this.value);
    },
    methods: {
        launchSitemap () {
            var vm = this;
            if (this.pageId==0) {
                ConcretePageAjaxSearch.launchDialog(function(data) {
                    vm.updatePage(data.cID);
                }, vm.dialogOpts);
            }
        },
        clearPage () {
            this.prompt = "Select page";
            this.pagename = "";
            this.pageId = 0;
            this.$emit('input',0);
        },
        updatePage(cID){
            var vm = this;
            this.pageId = parseInt(cID);
            if (this.pageId > 0) {
                ConcretePageAjaxSearch.getPageDetails(this.pageId, function(r) {
                    vm.pageObj = r.pages[0];
                    vm.pagename = vm.pageObj.name;
                    vm.prompt = "";
                });
            }
            this.$emit('input',this.pageId);
        }
    }
});