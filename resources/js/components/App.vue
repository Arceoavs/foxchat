<template>
    <div>
        <div>
            <b-nav class="foxcolor">
                <b-nav-item class="logo"> 
                    <router-link tag="li" to="/">
                        <a><img src="/img/FoxdoxChat.png"/></a>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link tag="li" to="/">
                        <a class="menuText">Overview</a>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link tag="li" to="/2ndHome">
                        <a  class="menuText">/2ndHome</a>
                    </router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link tag="li" to="/login">
                        <a  class="menuText">/login</a>
                    </router-link>
                </b-nav-item>
            </b-nav>
        </div>
        <router-view></router-view>
    </div>
</template>
<style>
    .menuText{
        color: white !important;
        font-weight: bold;
    }
    .logo{
        background-color: white;
    }
    img{
        max-height: 50px;
        padding: 5px;
    }
</style>

<script>
    export default {};
</script>