Vue.component('myheader', {
    props: ['user'],
    methods: {
        clickMenuToggle() {
            this.$emit('menu-toggle')
        },
        clickLogout() {
            this.$emit('logout')
        }
    },
    template: 
    `<div>

    <header 
        id="header" 
        class="my-nav 
            my-nav--fixed 
            black 
            border-bottom"
            style="justify-content: space-between;"
        v-show="user.loggedIn"
    >
        <div class="d-flex">
            <div>
                <button
                    id="menu-toggle"
                    @click="clickMenuToggle"
                    class="btn btn-link
                        cursor-pointer" 
                ><i class="fas fa-bars color-white"></i></button>
            </div>
            <div 
                class="color-white" 
                style="margin-left: 35px;
                    margin-top: 6px;"
            ><i class="fas fa-feather"></i> Miniwp</div>
        </div>

        <div id="navbarSupportedContent" v-if="user.loggedIn">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    {{user.name ? user.name : 'User'}}
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">Edit Profile</a>
                    <div class="dropdown-divider"></div>
                    <a 
                        class="dropdown-item" 
                        @click="clickLogout"  
                    >Logout</a>
                </div>
                </li>
            </ul>
        </div>
    </header>
    </div>
    `
})