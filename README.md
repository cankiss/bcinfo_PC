# vue-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## package localStorage & sessionStorage
// Store current user
this.$local.set('user', { name:'Marcus' })

// Get current user
this.$local.get('user')

// Remove current user
this.$local.remove('user')

// Clear all keys
this.$local.clearAll()

// Loop over all stored values
this.$local.each(function(value, key) {
	console.log(key, '==', value)
})


