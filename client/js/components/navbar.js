Vue.component('navbar', {
    props: {
        page: String,
        isLogin: Boolean,
    },
    template: `
    <div class="ui borderless main menu">
        <div class="ui container">
            <div class="header item" id="logo" @click="$emit('show-home-page')">
                <img
                src="https://www.seaharvest.net.au/wp-content/themes/seaharvest/img/logo/logo_bold.svg"
                />
            </div>
            
            <a class="item" @click="$parent.page = 'article form'" v-if="isLogin">Write</a>
            <div class="right menu">
                <div class="item">
                    <div class="ui icon input">
                        <input
                          type="text"
                          placeholder="Search..."
                          v-model="$parent.search"
                          @keyup.enter.prevent="$emit('fetch-articles')"
                        />
                        <i class="search link icon"></i>
                    </div>
                </div>
                <a class="ui item" @click="$emit('logout')" v-if="isLogin">
                    Logout
                </a>
                <a class="ui item" @click="$parent.page = 'login form'" v-if="page !== 'login form' && page !== 'register form' && isLogin === false">
                    Login
                </a>
            </div>
        </div>
    </div>
    `
})