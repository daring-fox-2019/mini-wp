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
                justify-content: flex-end;"
        >
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                
                <span 
                    id="navbarDropdown" 
                    class="nav-link dropdown-toggle color-grey4 cursor-pointer" 
                    style="display:inline-block"
                    role="button" 
                    data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"
                ><i class="far fa-user-circle color-grey4" style="margin-right:5px;"></i>{{user.name ? user.name : 'User'}}</span>

                <div 
                    class="dropdown-menu 
                        dropdown-menu-right" 
                    aria-labelledby="navbarDropdown"
                >
                    <span
                        class="dropdown-item 
                            cursor-pointer"
                        @click="clickLogout"
                    >Logout</span>
                </div>
                </li>
            </ul>
        </div>
    </header>
    </div>
    `
})