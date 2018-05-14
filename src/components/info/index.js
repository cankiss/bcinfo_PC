export default [{
        name: "info",
        path: "/info",
        component: () =>
            import ("./info.vue"),
        redirect: "/info/hotnews",
        children: [{
                name: "hotnews",
                path: "hotnews",
                component: () =>
                    import ("./hotnews")
            },
            {
                name: "masterView",
                path: "masterView",
                component: () =>
                    import ("./masterView")
            },
            {
                name: "policyLaws",
                path: "policyLaws",
                component: () =>
                    import ("./policyLaws")
            },
            {
                name: "flashList",
                path: "hotnews/flashList",
                component: () =>
                    import ("./flashList")
            }
        ]
    },
    {
        name: "article",
        path: "/article/:id",
        component: () =>
            import ("./article")
    }
]