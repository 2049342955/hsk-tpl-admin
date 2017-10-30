/**
 * Created by joyer on 17/10/10.
 *
 * 客户化vue
 *
 */

import Vue from 'vue';
import {Loading,MessageBox,Notification,Message} from 'element-ui'
import {JxBaseMx,BaseMx} from 'mixin@';

Vue.config.productionTip = false;


// loadding
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// base mixins
Vue.mixin(JxBaseMx);
Vue.mixin(BaseMx);

export default {};
