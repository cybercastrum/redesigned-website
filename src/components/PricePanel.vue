<template>
    <div id="price-panel" class="price-panel">
        <div class="max-container">
            <div 
                v-if="common && common.length" 
                class="price-item--common">
                <div class="container">
                    <h3 class="brand-heading">Common</h3>
                    <p class="price-item--common--subheading">These are included in all plans</p>
                    <ul>
                        <li :key="index" v-for="(planItem, index) in plans.common">
                            <span>{{planItem.text}}</span>
                        </li>
                    </ul>
                </div>    
            </div>
            <div class="container">
                <h2 class="brand-heading modifier--page-section-heading">Available Plans</h2>
            </div>
            <div   
                v-if="categories && Object.keys(categories).length" 
                class="price-item--categories">
                <div 
                    class="price-item--category" 
                    :class="'modifier--' + getCategoryModifier(categoryName)"
                    :key="index" 
                    v-for="(planItems, categoryName, index) in categories">
                    <div class="container">
                        <h3 class="brand-heading">{{categoryName}}</h3>
                        <ul>
                            <li :key="index" v-for="(planItem, index) in planItems">
                                <span>{{planItem.text}}</span>
                            </li>
                        </ul>
                        <router-link 
                            class="price-item--cta fancy-brand-btn banner--btn"
                            :to="{path: '/contact', hash: '#' + categoryName}">Know more</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import plans from '@/assets/json/plans.json';
export default {
    name: 'PricePanel',
    
    data(){
        return {
            plans: []
        }
    },

    methods: {
        getCategoryModifier(categoryName){
            return categoryName.split(' ').join('-');
        }
    },

    computed: {
        common(){
            return this.plans && this.plans.common;
        },

        categories(){
            try {
                var categories = {};
                Object.keys(this.plans).forEach((categoryName) => {
                    if (categoryName !== 'common') {
                        if (this.plans[categoryName].length) {
                            categories[categoryName] = [].concat(this.plans[categoryName]);
                        }
                    }
                });
                return categories;
            } catch(e){
                return [];
            }
        }
    },

    created(){
        this.plans = plans;
    }
}
</script>


<style lang="scss">
@import "../styles/components/PricePanel.scss";
</style>
