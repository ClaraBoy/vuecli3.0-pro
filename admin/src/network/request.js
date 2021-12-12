import axios from "axios";
export function oneEU (config){//没有Promise
  const a=axios.create({
    baseURL:"http://localhost:9000",
    timeout:5000
  })
  return  a(config); //因为它里面就包含了Promise 直接返回即可
}
export function Detailscount (config){//没有Promise
  const b=axios.create({
    baseURL:"http://localhost:9000",
    timeout:5000
  })
  return  b(config); //因为它里面就包含了Promise 直接返回即可
}
export function queryListsmenu (config){//没有Promise
  const c=axios.create({
    baseURL:"http://localhost:9000",
    timeout:5000
  })
  return  c(config); //因为它里面就包含了Promise 直接返回即可
}
export function deletesmenu (config){//没有Promise
  const d=axios.create({
    baseURL:"http://localhost:9000",
    timeout:5000
  })
  return  d(config); //因为它里面就包含了Promise 直接返回即可
}
export function comments (config) {//没有Promise
  const e = axios.create({
    baseURL: "http://localhost:9000",
    timeout: 5000
  })
  return e(config); //因为它里面就包含了Promise 直接返回即可
}
  export function deletecomments (config) {//没有Promise
    const f = axios.create({
      baseURL: "http://localhost:9000",
      timeout: 5000
    })
    return f(config); //因为它里面就包含了Promise 直接返回即可
  }
    export function queryMenu(config) {//没有Promise
      const g = axios.create({
        baseURL: "http://localhost:9000",
        timeout: 5000
      })
      return g(config); //因为它里面就包含了Promise 直接返回即可
  }
export function updateMenu(config) {//没有Promise
  const h = axios.create({
    baseURL: "http://localhost:9000",
    timeout: 5000
  })
  return h(config); //因为它里面就包含了Promise 直接返回即可
}
export function applicationCon (config){
  const s=axios.create({
    baseURL:"http://localhost:9000/applicationCon",
    timeout:100000,
  })
  return  s(config);
}

