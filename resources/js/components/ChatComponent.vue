<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        This is my 2nd home: I'm an example component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var Vue = require('vue');
    
    Vue.component('ChatComponent', {
        mounted() {
            console.log('Component mounted.')
        }
    });
</script>
