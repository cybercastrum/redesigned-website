import Vue from 'vue';
export const EventBus = new Vue();

EventBus.$on('component-open-menu', function(){
    this.$emit('bus-show-menu', true);
    this.$emit('bus-shrink-body', true);
});

EventBus.$on('component-close-menu', function(){
    this.$emit('bus-show-menu', false);
    setTimeout(() => {
        this.$emit('bus-shrink-body', false);    
    }, 600);
});

EventBus.$on('component-logo-animation-completed', function(){
    this.$emit('bus-show-menu-icon');
    setTimeout(() => {
        this.$emit('bus-show-body-content');
    }, 400);
});

EventBus.$on('component-click-menu-icon', function(){
    this.$emit('bus-click-menu-icon');
});

EventBus.$on('component-update-scroll', function(){
    this.$emit('bus-update-scroll');
});

EventBus.$on('component-route-fade-out', function(){
    this.$emit('bus-route-fade-out');
});

EventBus.$on('component-route-fade-in', function(){
    this.$emit('bus-route-fade-in');
});

EventBus.$on('component-scroll-to-element', function(element){
    this.$emit('bus-scroll-to-element', element);
});

EventBus.$on('component-scroll-page-to-top', function(){
    this.$emit('bus-scroll-page-to-top');
});