<style lang="scss">
@import "./styles/global.scss";
</style>

<template>
    <div id="app" 
        :class="{'modifier--logo-animation-complete': canShowBody, 'modifier--is-touch-app': isMobile, 'modifier--menu-opened': menuOpened, 'modifier--hide-menu': hideMenuBar}">
        <div id="logo-wrapper">
            <Logo />
        </div>
        
        <div id="menu-wrapper">
            <Menu />
        </div>

        <transition name="fade">
            <perfect-scrollbar 
                :swipeEasing="true"
                :class="[{'modifier--shrink': shrinkBody, 'modifier--fade-out': routeFaded}, routeClass]"
                id="main"
                ref="main"
                @click="clickMenuClose"
                v-if="isMobile !== true && canShowBody">
                    <router-view 
                        class="router-view modifier--desktop-router-view" />
            </perfect-scrollbar>
        </transition>

        <transition name="fade">
            <router-view
                id="main"
                ref="main" 
                @click="clickMenuClose"
                :class="[{'modifier--shrink': shrinkBody, 'modifier--fade-out': routeFaded}, routeClass]"
                class="router-view modifier--mobile-router-view" 
                v-if="isMobile && canShowBody"/>
        </transition>
    </div>
</template>

<script>
    import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
    import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

    import {EventBus} from '@/event-bus';
    import Logo from "@/components/Logo";
    import Menu from "@/components/Menu";
    export default {
        name: 'app',
        
        components: {
            Logo,
            Menu,
            PerfectScrollbar
        },
        
        data(){
            return {
                canShowBody: false,
                shrinkBody: false,
                isMobile: true,
                routeClass: '',
                routeFaded: false,
                menuOpened: false,
                hideMenuBar: false
            }
        },

        methods: {
            fadeOutRoute() {
                this.routeFaded = true;
            },

            fadeInRoute(){
                this.routeFaded = false;
            },

            showBodyContent(){
                this.canShowBody = true;
                this.$nextTick(() => {
                    this.appendScrollEvents();
                });
            },

            changeBodySize(val){
                this.shrinkBody = val;
                window.shrinkBody = val;
            },

            clickMenuClose(){
                if (this.shrinkBody) {
                    EventBus.$emit('component-click-menu-icon');
                }
            },

            updateScroll(){
                try {
                    this.$refs.main.ps.update();
                } catch(e){
                    // eslint-disable-next-line
                    console.warn(e);
                }
            },

            appendScrollEvents(){
                const $main = this.$refs.main;
                var self = this;
                if (this.isMobile && $main) {
                    window.fancyScrollElement = $main.$el;
                    window.fancyScrollElement.addEventListener('wheel', function(event){
                        if (event.wheelDelta > 0) {
                            self.hideMenuBar = false;
                        } else {
                            self.hideMenuBar = true;
                        }
                    });
                } else {
                    if ($main && $main.$el) {
                        window.fancyScrollElement = $main.$el;
                        $main.$el.addEventListener('ps-scroll-down', () => {
                            self.hideMenuBar = true;
                        });

                        $main.$el.addEventListener('ps-scroll-up', () => {
                            self.hideMenuBar = false;
                        });
                    }
                }
            },

            scrollPageToTop(){
                if (this.$refs.main) {
                    this.$refs.main.$el.scrollTop = 0;
                }
            },

            menuToggled(isMenuCloseIcon){
                if (isMenuCloseIcon) {
                    this.menuOpened = true;
                } else {
                    this.menuOpened = false;
                }
            },

            scrollElementToView(element){
                element = element || window.fancyScrollElement;
                var duration = 400;
                
                if (!element) {
                    return;
                }

                var parentElem = this.isMobile ? document.getElementById('app') : element.offsetParent;
                var startingTop = parentElem.scrollTop;
                var elementTop = element.offsetTop;
                var dist = elementTop - startingTop;
                var start;

                window.requestAnimationFrame(function step(timestamp) {
                    if (!start)
                        start = timestamp;
                    var time = timestamp - start;
                    var percent = Math.min(time / duration, 1);
                    parentElem.scrollTo(0, startingTop + dist * percent);

                    // Proceed with animation as long as we wanted it to.
                    if (time < duration) {
                        window.requestAnimationFrame(step);
                    }
                })
            }
        },

        watch: {
            $route(to){
                try {
                    this.routeClass = 'route-' + to.name.split(' ').join('-');
                } catch(e){
                    this.routeClass = '';
                }
            }
        },

        created(){
            EventBus.$on('bus-show-body-content', this.showBodyContent);
            EventBus.$on('bus-shrink-body', this.changeBodySize);
            EventBus.$on('bus-update-scroll', this.updateScroll);
            EventBus.$on('bus-route-fade-out', this.fadeOutRoute);
            EventBus.$on('bus-route-fade-in', this.fadeInRoute);
            EventBus.$on('bus-scroll-to-element', this.scrollElementToView);
            EventBus.$on('bus-scroll-page-to-top', this.scrollPageToTop);
            EventBus.$on('bus-show-menu', this.menuToggled);

            this.isMobile = 'ontouchstart' in window;
            try {
                this.routeClass = 'route-' + this.$router.currentRoute.name;
            } catch(e){
                this.routeClass = '';
            }
        }
    }
</script>
