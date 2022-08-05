const {User,Finance} = require('../models');

const sequelize = require('../config/connection');

const UserData = [
  {
    id: 1,
    username: 'asdf',
    email: 'asdf@gmail.com',
    password: '1234'
  },
  {
    id: 2,
    username: 'asdf',
    email: 'qwer@gmail.com',
    password: '1234'
  },
];
const financedata =[
  {
    income:10,
    expense:9,
    user_id: 1,
  },
  {
    income:11,
    expense:10,
    user_id: 2,
  }
]

const seed = async() =>{
  await sequelize.sync({ force: true });
 await User.bulkCreate(UserData, {individualHooks: true});
  //Finance[0]
  await Finance.bulkCreate(financedata);
}
seed();
