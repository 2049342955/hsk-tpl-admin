let routerList = [];

// 默认
routerList.push({
  path: '*',
  name:'index',
  redirect: { name: 'main' }
});

export default routerList;
