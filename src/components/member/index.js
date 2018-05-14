export default [{
        name: "member",
        path: "/member",
        component: () =>
            import ("./member.vue")
    },
    {
      name: "otherMember",
        path: "/otherMember",
      component: () =>
      import ("./otherMember.vue")
      
    },
    {
        name: "sysNotice",
        path: "/sysNotice",
        component: () =>
            import ("./sysNotice.vue")
    }
]
