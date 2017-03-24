Vue.component('ccm-user-selector',{
    template: '<div @click="launchDialog" class="ccm-item-selector"><div class="ccm-item-selector-item-selected">' +
            '<div class="ccm-item-selector-item-selected-thumbnail" v-html="avatar"></div>' +
            '<a @click.stop="clearUser" v-show="username" href="#" class="ccm-item-selector-clear"><i class="fa fa-close"></i></a>' +
            '<div class="ccm-item-selector-item-selected-title">{{ username }} {{ prompt }}</div>' +
            '</div></div>',
    props: ['value','options'],
    data: function(){
        return {
            userId: 0,
            userObj: {},
            username: "",
            avatar: "",
            prompt: ccmi18n.chooseUser,
            dialogOpts: {}
        }
    },
    created: function () {
        var vm = this;
        this.updateUser(this.value);
    },
    methods: {
        launchDialog () {
            var vm = this;
            if (this.userId==0) {
                $.fn.dialog.open({
                    title: ccmi18n.chooseUser,
                    href: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/user/search',
                    width: '90%',
                    modal: true,
                    height: '70%'
                });
                ConcreteEvent.unsubscribe('UserSearchDialogSelectUser.core');
                ConcreteEvent.unsubscribe('UserSearchDialogAfterSelectUser.core');
                ConcreteEvent.subscribe('UserSearchDialogSelectUser.core', function(e, data) {
                    vm.updateUser(data.uID);
                });

                ConcreteEvent.subscribe('UserSearchDialogAfterSelectUser.core', function(e) {
                    jQuery.fn.dialog.closeTop();
                });
            }
        },
        clearUser () {
            this.prompt = ccmi18n.chooseUser;
            this.username = "";
            this.userId = 0;
            this.avatar = "";
            this.$emit('input',0);
        },
        updateUser(uID){
            var vm = this;
            this.userId = parseInt(uID);
            if (this.userId > 0) {
                this.prompt = "";
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: CCM_DISPATCHER_FILENAME + '/ccm/system/user/get_json',
                    data: {'uID': vm.userId},
                    error: function(r) {
                        ConcreteAlert.dialog('Error', r.responseText);
                    },
                    success: function(r) {
                        vm.userObj = r.users[0];
                        vm.username = vm.userObj.displayName;
                        vm.avatar = vm.userObj.avatar;
                    }
                });
            }
            this.$emit('input',this.userId);
        }
    }
});