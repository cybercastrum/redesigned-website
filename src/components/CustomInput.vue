<template>
    <span 
        class="input"
        :class="{'modifier--focused': focused, 'modifier--filled': filled, 'modifier--select': type === 'select'}">
        <input 
            ref="input"
            :id="inputId"
            v-if="!type || type === 'text' || type === 'tel' || type === 'email' || type === 'password'"
            autocomplete="off"
            @focus="inputFocused"
            @blur="inputBlurred"
            v-model="inputVal"
            class="input--field" 
            :type="type" 
            :name="identifier" />

        <textarea 
            :id="inputId"
            ref="input"
            v-if="type === 'textarea'"
            autocomplete="off"
            @focus="inputFocused"
            @blur="inputBlurred"
            v-model="inputVal"
            class="input--field modifier--text-area" 
            type="text" 
            :name="identifier"/>

        <v-select 
            ref="input"
            :id="inputId"
            v-if="type === 'select'" 
            @search:focus="inputFocused"
            @search:blur="inputBlurred"
            :searchable="false"
            @input="inputChanged"
            :options="options"
            v-model="inputVal">
        </v-select>

        <label 
            class="input--label" 
            :for="identifier">
            <span class="input--label--content">{{labelText}}</span>
        </label>
        <svg class="graphic" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/>
        </svg>
        
        <button 
            v-if="inputVal && type !== 'select'"
            @click="clearInput"
            class="input--clear"
            type="button" 
            title="Clear Input" >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><path d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"></path></svg>
        </button>
    </span>
</template>

<script>
import vSelect from 'vue-select';

export default {
    name: 'CustomInput',
    props: ['identifier', 'labelText', 'type', 'options', 'defaultValue', 'inputId'],
    
    components: {
        vSelect
    },

    data(){
        return {
            focused: false,
            filled: false,
            inputVal: ''
        }
    },

    methods: {
        inputFocused(){
            this.focused = true;
        },

        inputBlurred(){
            this.focused = false
        },

        inputChanged(){
            this.$emit('input:changed', this.inputVal);
        },

        clearInput(){
            this.inputVal = '';
            this.inputChanged();
        }
    },

    computed: {
        hasValue(){
            return this.inputVal;
        }
    },

    watch: {
        inputVal: {
            immediate: true,
            handler(newVal){
                if (newVal) {
                    this.filled = true;
                } else {
                    this.filled = false;
                }
            }
        }
    },

    created(){
        if (this.defaultValue){
            this.inputVal = this.defaultValue;
        }
    }
}
</script>


<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@import "../styles/components/CustomInput.scss";
</style>
