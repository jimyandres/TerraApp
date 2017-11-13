export default {

  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.email === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../Fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  // register: ({user}) => {
  //   if (user === 'user') {
  //     return {
  //       ok: true
  //     }
  //   } else {
  //     return {
  //       ok: false,
  //       data: 'Invalid email'
  //     }
  //   }
  // },
  // forgotPassword: ({email}) => {
  //   if (email === 'valid@gmail.com') {
  //     return {
  //       ok: true
  //     }
  //   } else {
  //     return {
  //       ok: false,
  //       data: 'Invalid email'
  //     }
  //   }
  // },
  // getAccount: () => {
  //   return {
  //     ok: true,
  //     status: 200,
  //     data: require('../Fixtures/getAccount.json')
  //   }
  // },
  // updateAccount: () => {
  //   return {
  //     ok: true
  //   }
  // },
  // changePassword: ({password}) => {
  //   if (password === 'valid-password') {
  //     return {
  //       ok: true
  //     }
  //   } else {
  //     return {
  //       ok: false,
  //       data: 'Password error'
  //     }
  //   }
  // }


  // Functions return fixtures
  // getRoot: () => {
  //   return {
  //     ok: true,
  //     data: require('../Fixtures/root.json')
  //   }
  // },
  // getRate: () => {
  //   return {
  //     ok: true,
  //     data: require('../Fixtures/rateLimit.json')
  //   }
  // },
  // getUser: (username) => {
  //   // This fixture only supports gantman or else returns skellock
  //   const gantmanData = require('../Fixtures/gantman.json')
  //   const skellockData = require('../Fixtures/skellock.json')
  //   return {
  //     ok: true,
  //     data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
  //   }
  // }
}
