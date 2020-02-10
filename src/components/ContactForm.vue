<template>
    <div id="contact-form" class="contact-form">
        <div class="container">
            <iframe 
                name="hidden_iframe" 
                id="hidden_iframe" 
                style="display:none;" 
                @load="formSubmitted"></iframe>

            <div 
                ref="successMsg"
                :class="{'modifier--show': showingSuccessMsg}"
                class="contact-form--msg modifier--success">
                <h2 class="modifier--success">
                    <span>Form Submitted!</span>
                </h2>
                <p>Our team will contact you shortly! Thanks!</p>
            </div>

            <div 
                ref="validationErrorMsg"
                :class="{'modifier--show': showingValidationErrorMsg}" 
                class="contact-form--msg modifier--error">
                <h2 class="modifier--error">
                    <span>Missing Fields!</span>
                </h2>
                <p>Either Phone/Email is a required field</p>
            </div>

            <div 
                ref="someThingWrongMsg"
                :class="{'modifier--show': showingSomeThingWrongErrorMsg}" 
                class="contact-form--msg modifier--error">
                <h2 class="modifier--error">
                    <span>Somthing Fishy!</span>
                </h2>
                <p>Something when wrong with the submission. Please try after sometime</p>
            </div>

            <form 
                @submit="formSubmitTriggered"
                method="post"
                target="hidden_iframe" 
                action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSdmfdNnW0m__bjuyDnDebKV1EH4q1TdfeHA80LhBDhDYw4iOw/formResponse">
                <CustomInput 
                    input-id="plan-dropdown"
                    identifier="plan"
                    label-text="plan Preference"
                    :default-value="selectedPlan"
                    @input:changed="planChanged"
                    type="select"
                    :options="planOptions"/>
                <input input-id="plan" :value="selectedPlan" type="hidden" name="entry.40066355">
                <CustomInput 
                    input-id="name"
                    identifier="entry.1618814294" 
                    type="text"
                    @input:changed="inputChanged"
                    label-text="name" />
                <CustomInput 
                    ref="email"
                    input-id="email"
                    identifier="entry.159179418" 
                    type="email"
                    @input:changed="inputChanged"
                    label-text="email*" />
                <CustomInput 
                    ref="tel"
                    input-id="tel"
                    identifier="entry.2012361406" 
                    type="tel"
                    @input:changed="inputChanged"
                    label-text="phone*" />
                <CustomInput 
                    input-id="query"
                    type="text"
                    identifier="entry.1119759918"
                    @input:changed="inputChanged" 
                    label-text="Any other query" />
                <button
                    ref="submitBtn" 
                    type="submit" 
                    class="fancy-brand-btn contact-form--submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import CustomInput from '@/components/CustomInput'
import {EventBus} from '@/event-bus'
export default {
    name: 'ContactForm',
    
    components: {
        CustomInput
    },

    data(){
        return {
            planOptions: ['basic', 'intermediate', 'advanced'],
            selectedPlan: '',
            showingSuccessMsg: false,
            showingValidationErrorMsg: false,
            showingSomeThingWrongErrorMsg: false
        }
    },

    created(){
        try {
            window.submitted = false;
            this.selectedPlan = decodeURI(this.$router.currentRoute.hash.replace('#', ''));
            if (this.selectedPlan) {
                this.$router.replace('/contact');
            }
            if (this.selectedPlan && this.planOptions.indexOf(this.selectedPlan) < 0) {
                this.planOptions = this.planOptions.concat([this.selectedPlan]);
            }
        } catch(e){
            this.selectedPlan = '';
        }
    },

    methods: {
        planChanged(value){
            this.selectedPlan = value;
        },

        inputChanged(){
            this.hideSuccessMsg();
            this.hideValidationErrorMsg();
            this.hideSomeThingWrongErrorMsg();
            window.submitted = false;
            this.$refs.submitBtn.blur();
        },

        formSubmitted(){
            if (window.submitted) {
                this.showSuccessMsg();
                this.$refs.submitBtn.blur();
            }
        },

        hideSuccessMsg(){
            this.showingSuccessMsg = false;
        },

        showSuccessMsg(){
            this.showingSuccessMsg = true;
            EventBus.$emit('component-scroll-to-element', this.$refs.successMsg)
            this.$refs.submitBtn.blur();

            setTimeout(() => {
                this.hideSuccessMsg();
            }, 4000);
        },

        hideValidationErrorMsg(){
            this.showingValidationErrorMsg = false;
        },

        showValidationErrorMsg(){
            this.showingValidationErrorMsg = true;
            EventBus.$emit('component-scroll-to-element', this.$refs.validationErrorMsg);
            this.$refs.submitBtn.blur();

            setTimeout(() => {
                this.hideValidationErrorMsg();
            }, 4000);
        },

        hideSomeThingWrongErrorMsg(){
            this.showingSomeThingWrongErrorMsg = false;
        },

        showSomeThingWrongErrorMsg(){
            this.showingSomeThingWrongErrorMsg = true;
            EventBus.$emit('component-scroll-to-element', this.$refs.someThingWrongMsg);
            this.$refs.submitBtn.blur();
            
            setTimeout(() => {
                this.hideSomeThingWrongErrorMsg();
            }, 4000);
        },

        formSubmitTriggered($event){
            try {
                var telVal = this.$refs.tel.$refs.input.value,
                    emailVal = this.$refs.email.$refs.input.value;

                telVal = telVal ? telVal.split(' ').join('') : '';
                emailVal = emailVal ? emailVal.split(' ').join('') : '';
                
                if (emailVal || telVal) {
                    window.submitted = true;
                } else {
                    $event.preventDefault();
                    window.submitted = false;
                    this.showValidationErrorMsg();
                }
            } catch(e){
                $event.preventDefault();
                this.showSomeThingWrongErrorMsg();
                window.submitted = false;
            }
        }
    }
}
</script>


<style lang="scss">
@import "../styles/components/ContactForm.scss";
</style>
