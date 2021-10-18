import Vue from 'vue';


Vue.component('checkbox-component', require('./components/Checkbox').default);
Vue.component('car-picker', require('./components/CarPicker').default);
Vue.component('button-component', require('./components/Button').default);

new Vue({
    el: '#app',
    methods: {
        onClickCars( type ){
            if( type === 'increment') {
                this.currentCar = this.currentCar === this.cars.length-1 ? 0 : this.currentCar + 1
            }
            if( type === 'decrement' ) {
                this.currentCar = this.currentCar === 0 ? this.cars.length-1 : this.currentCar - 1
            }
        },
        nextStep( event, step ){
            event.preventDefault()
        },
        selectDistrict( district ){
            const map = document.getElementById('map')
            const svgDoc = map.contentDocument
            const currentDistrict = svgDoc.getElementById( district )
            currentDistrict.classList.toggle('district-selected')
        },
        onResize() {
            this.windowWidth = window.innerWidth
        },

    },
    data: {
        districts: [],
        cars: [
            {title: '1 car', text: '(up to 4 persons)'},
            {title: '2 cars', text: '(up to 10 persons)'},
            {title: '3 cars', text: '(up to 15 persons)'},
        ],
        currentCar: 0,
        windowWidth: window.innerWidth
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },

    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    },
    template: `<form class="form-container content__form-container">
       <div class="form-container-row">
            <checkbox-component iconClass="old-town-icon" :windowWidth="windowWidth" href="#" @callback="selectDistrict" id="old-town-checkbox" v-model="districts" value="old-town" label="Old Town"></checkbox-component> 
            <checkbox-component iconClass="kazimierz-icon" :windowWidth="windowWidth"  href="#" @callback="selectDistrict" id="kazimierz-checkbox" v-model="districts" value="kazimierz" label="Kazimierz"></checkbox-component> 
            <checkbox-component iconClass="ghetto-icon" :windowWidth="windowWidth" href="#" @callback="selectDistrict" id="ghetto-checkbox" v-model="districts" value="ghetto" label="Ghetto"></checkbox-component>
       </div>
        <div class="form-container-row">
            <car-picker v-on:click="onClickCars" :currentCar="currentCar"  :cars="cars"></car-picker>
        </div>
        <div class="form-container-row">
            <button-component v-on:click="nextStep" title="Continue"></button-component>
        </div>
    </form>`
});

