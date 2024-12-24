const Sequelize = require("sequelize");
// 使用连接的形式进行连接的话，注意将root: 后面的XXXX改成自己数据库的密码
// const Todolist = new Sequelize('mysql://root:"root"@localhost/todolist', {
//   define: {
//     timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
//   }
// })
const sequelize = new Sequelize(
  "pss", // 数据库名
  "root", // 用户名
  // '1qaz2wsx',   // 用户密码
  "1234", // 用户密码
  {
    dialect: "mysql", // 数据库使用mysql
    host: "127.0.0.1", // 数据库服务器ip
    port: 3306, // 数据库服务器端口
    define: {
      // 字段以下划线（_）来分割（默认是驼峰命名风格）
      underscored: true,
      timestamps: false,
    },
  }
);

module.exports = sequelize;
