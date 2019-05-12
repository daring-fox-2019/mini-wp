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
            ><i class="fas fa-dove" style="margin-right: 5px"></i> Miniwp</div>
            <div 
                class="btn 
                    btn-warning 
                    cursor-pointer" 
                style="margin-left: 2em"
                @click="toArticlePage"
            >
                <i class="fas fa-feather" style="margin-right: 11px;"></i>Write
            </div>
        </div>

        <div 
            id="navbarSupportedContent" 
            class="d-flex" 
            v-if="user.loggedIn"
            style="width: 26em;
                justify-content: flex-end;
        "
        >
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                <i class="far fa-user-circle color-grey4" style="margin-right:5px;"></i>
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                style="display:inline-block"
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