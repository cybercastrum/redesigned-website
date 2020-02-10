<template>
    <div 
        id="menu">
        <transition name="fade-right">
            <MenuIcon
                v-if="canShowMenuIcon" 
                class="menu--icon"/>
        </transition>
        
        <div 
            id="nav" 
            :class="{'modifier--menu-open': showNavigation}"
            class="nav">
            <div
                :key="menuItem.link" 
                v-for="menuItem in menuItems" 
                class="nav--link--wrapper">
                <transition name="show-navigation">
                    <router-link 
                        v-if="showNavigation"
                        :to="menuItem.link" 
                        class="nav--link">
                        <span class="nav--link--icon" :class="menuItem.icon"></span>
                        <span class="nav--link--text">{{menuItem.text}}</span>
                    </router-link>
                </transition>
            </div>
        </div>
        <transition name="fade">
            <div class="nav--footer" v-if="showNavigation">
                <a target="_blank" class="nav--footer--link" href="https://www.facebook.com">
                    <span class="icon-facebook"></span>
                </a>
                <a target="_blank" class="nav--footer--link" href="https://www.twitter.com">
                    <span class="icon-twitter"></span>
                </a>
                <a target="_blank" class="nav--footer--link" href="https://www.linkedin.com">
                    <span class="icon-linkedin"></span>
                </a>
                <a target="_blank" class="nav--footer--link" href="tel:1121231233">
                    <span class="icon-phone"></span>
                </a>
                <a target="_blank" class="nav--footer--link" href="mailto:hello@cybercastrum.com">
                    <span class="icon-mail"></span>
                </a>
            </div>
        </transition>
    </div>
</template>

<script>
import MenuIcon from '@/components/MenuIcon.vue'
import { EventBus } from '@/event-bus.js';
export default {
    name: 'Menu',
    components: {
        MenuIcon
    },
    
    data(){
        return {
            canShowMenuIcon: false,
            showNavigation: false,
            menuItems: [{
                icon: 'icon-home',
                text: 'home',
                link: '/'
            }, {
                icon: 'icon-about',
                text: 'plans',
                link: '/plans'
            }, {
                icon: 'icon-services',
                text: 'services',
                link: '/services'
            }, {
                icon: 'icon-contact',
                text: 'contact',
                link: '/contact'
            }]
        }
    },

    methods: {
        menuToggled(isMenuCloseIcon){
            if (isMenuCloseIcon) {
                this.showNavigation = true;
            } else {
                this.showNavigation = false;
            }
        },

        showMenuIcon() {
            this.canShowMenuIcon = true;
        }
    },

    created(){
        EventBus.$on('bus-show-menu', this.menuToggled);
        EventBus.$on('bus-show-menu-icon', this.showMenuIcon);
    }
}
</script>

<style lang="scss">
@import "../styles/components/Menu.scss";
</style>
