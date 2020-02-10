<template>
    <div 
        ref="wrapper"
        style="visibility: hidden">
        <svg width="1000px" height="1000px">
            <path id="pathA" ref="pathA" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
            <path id="pathB" ref="pathB" d="M 300 500 L 700 500"></path>
            <path id="pathC" ref="pathC" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
        </svg>
        <button 
            @click="toggleMenu"
            class="menu--icon--trigger"></button>
    </div>
</template>

<script>
import { easeElasticOut, easeBounceOut, easeElasticIn } from "d3-ease";
import Segment from "segment-js";
import { EventBus } from '@/event-bus.js';

export default {
    name: 'MenuIcon',
    data(){
        return {
            beginAC: 80,
            endAC: 320,
            beginB: 80,
            endB: 320,
            iconIsClose: false,
            segmentA: null,
            segmentB: null,
            segmentC: null,
            pathA: null,
            pathB: null,
            pathC: null,
            transitionInProgress: false
        }
    },
    methods: {
        inAC(s, endMenuAnimation) {
            var self = this;
            s.draw('80% - 240', '80%', 0.3, {
                delay: 0.1,
                callback: function() {
                    self.inAC2(s, endMenuAnimation)
                }
            });
        },

        inAC2(s, endMenuAnimation) {
            var self = this;
            s.draw('100% - 545', '100% - 305', 0.1, {
                easing: easeBounceOut(1, 0.3),
                callback: function(){
                    if (endMenuAnimation) {
                        self.transitionInProgress = false;
                    }
                }
            });
        },

        inB(s) {
            var self = this;
            s.draw(this.beginB - 60, this.endB + 60, 0.1, {
                callback: function() {
                    self.inB2(s)
                }
            });
        },

        inB2(s) {
            s.draw(this.beginB + 120, this.endB - 120, 0.3, {
                easing: easeBounceOut(1, 0.3)
            });
        },

        outAC(s, endMenuAnimation) {
            var self = this;
            s.draw('90% - 240', '90%', 0.1, {
                easing: easeElasticIn(1, 0.3),
                callback: function() {
                    self.outAC2(s, endMenuAnimation)
                }
            });
        },

        outAC2(s, endMenuAnimation) {
            var self = this;
            s.draw('20% - 240', '20%', 0.3, {
                callback: function() {
                    self.outAC3(s, endMenuAnimation)
                }
            });
        },

        outAC3(s, endMenuAnimation) {
            var self = this;
            s.draw(this.beginAC, this.endAC, 0.2, {
                easing: easeElasticOut(1, 0.3),
                callback: function(){
                    if (endMenuAnimation) {
                        self.transitionInProgress = false;
                    }
                }
            });
        },

        outB(s) {
            s.draw(this.beginB, this.endB, 0.3, {
                delay: 0.1,
                easing: easeElasticOut(2, 0.4)
            });
        },

        toggleMenu(){
            if (this.transitionInProgress) {
                return;
            }

            this.transitionInProgress = true;
            
            if (this.iconIsClose) {
                this.outAC(this.segmentA);
                this.outB(this.segmentB);
                this.outAC(this.segmentC, true);
            } else {
                this.inAC(this.segmentA);
                this.inB(this.segmentB);
                this.inAC(this.segmentC, true);
            }
            this.iconIsClose = this.iconIsClose ? false: true;

            if (this.iconIsClose) {
                EventBus.$emit('component-open-menu');
            } else {
                EventBus.$emit('component-close-menu');
            }
            
            
        }
    },

    mounted(){
        this.pathA = this.$refs.pathA;
        this.pathB = this.$refs.pathB;
        this.pathC = this.$refs.pathC;

		this.segmentA = new Segment(this.pathA, this.beginAC, this.endAC);
		this.segmentB = new Segment(this.pathB, this.beginB, this.endB);
        this.segmentC = new Segment(this.pathC, this.beginAC, this.endAC);
        
        
        this.$refs.wrapper.style.visibility = 'visible';
    },

    created(){
        EventBus.$on('bus-click-menu-icon', this.toggleMenu)
    }
}
</script>

<style lang="scss">
@import "../styles/components/MenuIcon.scss";
</style>
