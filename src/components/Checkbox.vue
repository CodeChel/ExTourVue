<template>
    <div class="checkbox-container">
        <a :class="'icon ' + iconClass" v-if="windowWidth <= 768"></a>
        <label class="checkbox-container-label">
            <span class="checkbox-container-label__text">{{label}}</span>
            <input :id="id" :checked="shouldBeChecked" :value="value" @change="updateInput" type="checkbox" class="checkbox-container__checkbox-hidden">
            <span class="checkbox-container__checkmark"></span>
        </label>
    </div>
</template>
<style scoped>
    .district-icon {
        width: 100%;
        height: 100%;
    }
</style>
<script>
    export default {
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            value: {
                type: String,
            },
            modelValue: {
                default: false
            },
            label: {
                type: String,
                required: true
            },
            trueValue: {
                default: true
            },
            falseValue: {
                default: false
            },
            id: {
                type: String,
                default: null
            },
            href: {
                type: String,
                default: null
            },
            windowWidth: {
                type: Number
            },
            iconClass: {
                type: String,
                default:null
            }
        },
        computed: {
            shouldBeChecked() {
                if (this.modelValue instanceof Array) {
                    return this.modelValue.includes(this.value)
                }
                return this.modelValue === this.trueValue
            }
        },
        methods: {
            updateInput(event) {
                let isChecked = event.target.checked

                this.$emit( 'callback', this.value )

                if (this.modelValue instanceof Array) {
                    let newValue = [...this.modelValue]

                    if (isChecked) {
                        newValue.push(this.value)
                    } else {
                        newValue.splice(newValue.indexOf(this.value), 1)
                    }

                    this.$emit('change', newValue)
                } else {
                    this.$emit('change', isChecked ? this.trueValue : this.falseValue)
                }
            }
        }
    }
</script>