// interface UserType {
//   id: number;
//   name: string;
//   email: string;
//   website: string;
// }

// const users: UserType[] = [];
// for (let i = 0; i < 100; i++) {
//   let obj = {
//     id: i,
//     name: `张三${i}`,
//     email: `zhangsan${i}@qq.com`,
//     website: `xx${i}.com`
//   }
//   users.push(obj)
// }

// export default {
//    //查询所有用户
//    'GET /api/users': (req: any, res: any) => {
//     // 获取参数信息
//     let current = +req.query.current || 1;
//     let pageSize = +req.query.pageSize || 5;
//     let filterUsers = users.slice((current - 1) * pageSize, pageSize + (current - 1) * pageSize);
//     let data = { list: filterUsers, total: 100, current: current, time: new Date().toLocaleString() };
//     setTimeout(() => {
//       res.json({
//         code: 100,
//         success: "成功",
//         data
//       });
//     }, 1000);
//   },

//   // GET POST 可省略
//   '/api/users/:id': (req: any, res: any) => {
//     const id = parseInt(req.params.id);
//     // eslint-disable-next-line array-callback-return
//     const u = users.find((item) => {
//       if (item.id === id) {
//         return item;
//       }
//     });
//     setTimeout(() => {
//       res.json({
//         code: 100,
//         success: "成功",
//         data: u
//       });
//     }, 1000);

//   },

//   //根据id删除用户
//   '/api/users/delete/:id': (req: any, res: any) => {
//     const id = parseInt(req.params.id);
//     const current = +req.query.current;
//     const pageSize = +req.query.pageSize;
//     // eslint-disable-next-line array-callback-return
//     const index = users.findIndex((item) => {
//       if (item.id === id) {
//         return true;
//       }
//     });
//     users.splice(index, 1);
//     let filterUsers = users.slice((current - 1) * pageSize, pageSize + (current - 1) * pageSize);
//     let data = { list: filterUsers, total: users.length, current: current, time: new Date().toLocaleString() };
//     setTimeout(() => {
//       res.json({
//         code: 100,
//         success: "删除成功",
//         data
//       });
//     }, 1000);

//   },

//   'POST /api/users/create': (req: any, res: any) => {
//     setTimeout(() => {
//       res.json({
//         code: 100,
//         success: "成功",
//         data: {
//           message: req.body
//         }
//       });
//     }, 1000);
//   },
// };
