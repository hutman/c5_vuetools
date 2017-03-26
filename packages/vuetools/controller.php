<?php
namespace Concrete\Package\Vuetools;

use Concrete\Core\Asset\AssetList;



class Controller extends \Concrete\Core\Package\Package
{
    protected $pkgHandle = 'vuetools';
    protected $appVersionRequired = '5.8.1';
    protected $pkgVersion = '0.0.2';

    public function getPackageDescription()
    {
        return t('concrete5 VueJS tools .');
    }

    public function getPackageName()
    {
        return t('Vue Tools');
    }

    public function install()
    {
        $pkg = parent::install();

    }

    public function on_start()
    {
        $al = AssetList::getInstance();
        $al->register('javascript', 'vue', 'js/vue.min.js', array(), 'vuetools');
        $al->register('javascript', 'vue-ccm-file-selector', 'js/vue-ccm-file-selector.js', array(), 'vuetools');
        $al->register('javascript', 'vue-ccm-page-selector', 'js/vue-ccm-page-selector.js', array(), 'vuetools');
        $al->register('javascript', 'vue-ccm-user-selector', 'js/vue-ccm-user-selector.js', array(), 'vuetools');
        $al->register('javascript', 'vue-ccm-editor', 'js/vue-ccm-editor.js', array(), 'vuetools');

        $al->registerGroup('vuetools', array(
            array('javascript', 'vue'),
            array('javascript', 'vue-ccm-file-selector'),
            array('javascript', 'vue-ccm-page-selector'),
            array('javascript', 'vue-ccm-user-selector'),
            array('javascript', 'vue-ccm-editor'),

        ));

        $editor = \Core::make('editor');
        $js = "<script>var vue_editor = " . $editor->getEditorInitJSFunction() . "</script>";
        $v = \View::getRequestInstance();
        $v->addHeaderItem($js);
    }
}
