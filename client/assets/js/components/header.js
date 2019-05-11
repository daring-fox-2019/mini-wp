Vue.component('myheader', {
    props: ['user'],
    methods: {
        clickMenuToggle() {
            this.$emit('menu-toggle')
        },
        clickLogout() {
            this.$emit('logout')
        },
        toArticlePage() {
            this.$emit('go-to-article-page')
        }
    },
    template: 
    `<div>

    <header 
        id="header" 
        class="my-nav 
            my-nav--fixed 
            white 
            border-bottom"
            style="justify-content: space-between;
                height: 3.9em;"
        v-show="user.loggedIn"
    >
        <div class="d-flex">
            <div>
                <button
                    id="menu-toggle"
                    @click="clickMenuToggle"
                    class="btn btn-link
                        cursor-pointer" 
                ><i class="fas fa-bars color-grey4"></i></button>
            </div>
            <div 
                class="color-grey4" 
                style="margin-left: 35px;
                    margin-top: 6px;"
            > Miniwp</div>
        </div>

        <div 
            id="navbarSupportedContent" 
            class="d-flex" 
            v-if="user.loggedIn"
            style="width: 10em;
                justify-content: space-around;"
        >
            <div 
                class="btn 
                    btn-light 
                    color-grey4 
                    cursor-pointer" 
                @click="toArticlePage"
            >
                <i class="fas fa-feather" style="margin-right: 11px;"></i>Write
            </div>
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