export default [{
  path: '/market',
  component: () =>
    import ('./market')
}, {
  path: '/market/:symbol',
    component: () =>
  import ('./marketDetail')
}]
