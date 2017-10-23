/**
 * Created by joyer on 17/10/20.
 */

import Utl from '@hasaki-ui/hsk-braum';
import Main from '../../src/page/main/main.vue';

const Expect = chai.expect;

describe("/page/main",function(){
    let vm;
    afterEach(() => {
        Utl.destroyVueVM(vm);
    });
    it(":内容",function(){
        vm = Utl.createVueTest(Main, {}, true);
        Expect(vm.$el.textContent).to.be.eq('I am a blank template!');
    });
});

