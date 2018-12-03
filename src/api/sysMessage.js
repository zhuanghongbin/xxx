// 获取列表数据
export function getList (query) {
  console.log(query, 'query')
  return new Promise((resolve, reject) => {
    resolve({
      data: [{
        id: 1,
        name: '消息标题1',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181121080000',
        sender: 'jim'
      },
      {
        id: 2,
        name: '消息标题2',
        readStatus: 'unread',
        imgSrc: '/static/images/logo.png',
        startTime: '20181121080000',
        sender: 'jim'
      },
      {
        id: 3,
        name: '消息标题3',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 4,
        name: '消息标题4',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 5,
        name: '消息标题5',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 6,
        name: '消息标题6',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 7,
        name: '消息标题7',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 8,
        name: '消息标题8',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 9,
        name: '消息标题9',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 10,
        name: '消息标题10',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 11,
        name: '消息标题11',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      }]
    })
  }).then(res => {
    return res
  }).catch(() => {})
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: query
  // })
}

// 更新列表
export function updateList (query) {
  return new Promise((resolve, reject) => {
    resolve({
      data: [{
        id: 1,
        name: '消息标题1-修改',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181121080000',
        sender: 'jim'
      },
      {
        id: 2,
        name: '消息标题2-修改',
        readStatus: 'unread',
        imgSrc: '/static/images/logo.png',
        startTime: '20181121080000',
        sender: 'jim'
      },
      {
        id: 3,
        name: '消息标题3-修改',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      }]
    })
  }).then(res => {
    return res
  }).catch(() => {})
}

// 创建列表
export function createList (data) {
  return new Promise((resolve, reject) => {
    resolve({
      data: [{
        id: 1,
        name: '消息标题1-修改',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181121080000',
        sender: 'jim'
      },
      {
        id: 2,
        name: '消息标题2-修改',
        readStatus: 'unread',
        imgSrc: '/static/images/logo.png',
        startTime: '20181121080000',
        sender: 'jim'
      },
      {
        id: 3,
        name: '消息标题3-修改',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      },
      {
        id: 4,
        name: '消息标题4-修改',
        readStatus: 'read',
        imgSrc: '/static/images/logo.png',
        startTime: '20181221185800',
        sender: 'system'
      }]
    })
  }).then(res => {
    return res
  }).catch(() => {})
}
