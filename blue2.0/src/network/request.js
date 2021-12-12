//请求文件
import axios from "axios";
export function demos (config){
  const a=axios.create({
   // baseURL:"http://37icsp.natappfree.cc",
    baseURL:"http://localhost:9000",
    timeout:100000,
  })
 return  a(config);
}
export function demos1 (config){
  const b=axios.create({
    baseURL:"http://localhost:9000",
    timeout:100000,
  })
  return  b(config);
}
export function applicationCon (config){
  const c=axios.create({
    baseURL:"http://localhost:9000/applicationCon",
    timeout:100000,
  })
  return  c(config);
}
export const sp="localhost:9000";
export const uploadurl="http://localhost:9000/upload"
export const uploadurl1="http://localhost:9000/upload1"

