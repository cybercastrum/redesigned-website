import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Plans from './views/Plans.vue';
import Services from './views/Services.vue';
import Contact from './views/Contact.vue';
import {EventBus} from './event-bus.js';

Vue.use(Router)

var router = new Router({
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    }, {
        path: '/plans',
        name: 'plans',
        component: Plans
    }, {
        path: '/services',
        name: 'services',
        component: Services
    }, {
        path: '/contact',
        name: 'contact',
        component: Contact
        // eslint-disable-next-line
        // component: () => import(/* webpackChunkName: "about" */ './views/Contact.vue')
    }]
});

router.beforeEach((to, from, next) => {
    if (typeof shrinkBody !== 'undefined' && shrinkBody) {
        EventBus.$emit('component-click-menu-icon');
        EventBus.$emit('component-route-fade-out');
        setTimeout(() => {
            window.requestAnimationFrame(() => {
                EventBus.$emit('component-route-fade-in');
                next();
            });
        }, 100);
    } else {
        EventBus.$emit('component-route-fade-out');
        setTimeout(() => {
            window.requestAnimationFrame(() => {
                EventBus.$emit('component-route-fade-in');
                next();
            });
        }, 100);
    }
    
})

export default router;
