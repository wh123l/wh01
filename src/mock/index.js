import Mock from 'mockjs'
import User from './data/user'
import Pics from './data/picture'

Mock.mock('/root/login/checkMemberLogin', 'post', () => {  // 此处会劫持/root/login/checkMemberLogin接口，并返回数据
  return User // 返回模拟数据
})
Mock.mock('/root/user/userslist', 'get', params => {

  // let info = JSON.parse(params.body).params
  // console.log(info)
  return User  // 返回模拟数据
})
Mock.mock('/root/user/userslist', 'put', params => {
  // let info = JSON.parse(params.body)
  // console.log(info.params.mg_state)
  return User  // 返回模拟数据
})
Mock.mock('/root/login/picsdata', 'get', params => {
  console.log(params)
  return Pics
})
