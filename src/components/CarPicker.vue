<template>
    <div  class="car-container">
        <span class="btn up-btn" @click="$emit('click','increment')">  </span>
        <span class="btn down-btn" @click="$emit('click','decrement')">  </span>
        <transition :name="currentTransition">
            <div :key="currentCar">
            <span>{{cars[currentCar].title}}</span>&nbsp<span class="grey-text">{{cars[currentCar].text}}</span>
            </div>
        </transition>
    </div>
</template>
<style scoped>

    .car-container {
        position: relative;
        border: 1px solid #DBE3EB;
        width: 100%;
        border-radius: 10px;
        margin-top: 20px;
        vertical-align: middle;
        padding-left: 52px;
        min-height: 70px;
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #1A3866;
        font-size: 18px;
        font-weight: 600;
    }
    .btn {
        position: absolute;
        background-color: #E1E6ED;
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background-repeat: no-repeat;
        background-size: 7px;
        background-size: 15px;
        background-position: center;
        cursor: pointer;
    }
    .up-btn {
        left: 6px;
        top: 6px;
        background-image: url("../img/btn-up.svg");
    }
    .up-btn:active {
        transform: translateY(5px);
        transition: .5s ease;
    }
    .down-btn:active {
        transform: translateY(-5px);
        transition: .5s ease;
    }
    .down-btn {
        left: 6px;
        bottom: 6px;
        background-image: url("../img/btn-down.svg");
    }
    .grey-text {
        opacity: .7;
    }

    .slide-up-enter-active {
        transition: all .5s ease;
        position: absolute;
    }
    .slide-up-leave-active {
        transition: all .5s ease;
        position: absolute;
    }
    .slide-up-enter {
        transform: translateY( -25px );
        opacity: 0;
    }
    .slide-up-leave-to {
        transform: translateY( 25px );
        opacity: 0;
    }

    .slide-down-enter-active {
        transition: all .5s ease;
        position: absolute;
    }
    .slide-down-leave-active {
        transition: all .5s ease;
        position: absolute;
    }
    .slide-down-enter {
        transform: translateY( 25px );
        opacity: 0;
    }
    .slide-down-leave-to {
        transform: translateY( -25px );
        opacity: 0;
    }
</style>
<script>
    export default {
        model: {
            event: 'click',
            prop: 'currentCar'
        },
        watch: {
            currentCar( current, prev ){
                if( (current - 1 === prev ) || ( prev === this.cars.length - 1  && current === 0)  ){
                    this.currentTransition =  'slide-up'
                } else this.currentTransition =  'slide-down'
            }
        },
        beforeCreate() {
            this.currentTransition = 'slide-up'
        },
        props: {
            cars: {
                type: Array,
                required: true
            },
            currentCar: {
                type: Number,
            },
        }
    }
</script>
