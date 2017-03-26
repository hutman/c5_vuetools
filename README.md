# concrete5 Vue tools

This package includes some [Vue](https://vuejs.org/) components which wrapper some standard concrete5 dashboard form helpers.

## Installation

1. copy the vuetools folder into your packages folder

2. install the package

3. In your page controller include the required assets

```
<?php

namespace Application\Controller\SinglePage\Dashboard;

class Test extends \Concrete\Core\Page\Controller\DashboardPageController
{
    public function on_start(){
        $this->requireAsset('core/file-manager');
        $this->requireAsset('core/sitemap');
        $this->requireAsset('vuetools');
    }
}
```

4. Add your vue markup in your dashboard page

```
<?php
defined('C5_EXECUTE') or die("Access Denied.");
$view->inc('elements/header.php', array('bodyClass' => 'ccm-dashboard-desktop'));
?>
<div class="ccm-dashboard-desktop-grid <?php if (!$c->isEditMode()) { ?>ccm-dashboard-desktop-flex<?php }  ?>">

<h1>My Dashboard Page</h1>

<div id="app">
<label>Image</label>
<ccm-file-selector v-model="fID"></ccm-file-selector>
<label>Page</label>
<ccm-page-selector v-model="cID"></ccm-page-selector>
<label>User</label>
<ccm-user-selector v-model="uID"></ccm-user-selector>
<label>Content</label>
<ccm-editor v-model="content"></ccm-editor>
</div>

</div>
<?php $view->inc('elements/footer.php'); ?>
```

5. Add your vue javascript at the bottom of the page or wherever you like to put your javascript

```
<script>
var vm = new Vue({
    el: '#app',
    data: {
        fID: 0,
        cID: 0,
        uID: 0,
        content: '<p>I love concrete5</p>'
    }
});
</script>
```

## Todo

* add component for ckeditor
* update file selector to include file operation dialog (now it just picks a file and that's it)
* update file selector to allow clearing of a file


