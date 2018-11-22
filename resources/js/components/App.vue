<template>
    <div>
        <b-navbar toggleable="md" type="dark" class="foxcolor-inverted" >
            <b-navbar-brand to="/">
                <img class="img-logo" src="/img/FoxdoxChat.png" />
            </b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item to="/">
                    <div class="foxcolor-pure"></div>
                </b-nav-item>
                <b-nav-item to="/" disabled>
                    <div class="foxcolor-pure">Disabled</div>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    
        <!-- <b-nav class="foxcolor">
                                    <b-nav-item class="logo"> 
                                        <router-link tag="li" to="/">
                                            <a><img  class="img-logo" src="/img/FoxdoxChat.png"/></a>
                                        </router-link>
                                    </b-nav-item>
                                    <div class="menuText">
                                        <b-nav-item>
                                            <router-link tag="li" to="/">
                                                <div class="menuText">Overview</div>
                                            </router-link>
                                        </b-nav-item>
                                    </div>
                                    <div class="menuText">
                                        <b-nav-item>
                                            <router-link tag="li" to="/2ndHome">
                                                <div class="menuText">2ndHome</div>
                                            </router-link>
                                        </b-nav-item>
                                    </div>
                                    <div class="menuText">
                                        <b-nav-item>
                                            <router-link tag="li" to="/login">
                                                <div class="menuText">/login</div>
                                            </router-link>
                                        </b-nav-item>
                                    </div>
                                    <b-nav-item class="float-right">
                                        <logout-component ></logout-component>
                                    </b-nav-item>
                                </b-nav> -->
        <router-view></router-view>
    </div>
</template>

<script>
    import LogoutComponent from "./LogoutComponent.vue";
    
    export default {
        components: {
            LogoutComponent
        }
    };
</script>