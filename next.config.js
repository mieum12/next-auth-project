const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase) => {
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     env: {
  //       mongodb_username: 'qpdlqltb1215',
  //       mongodb_password: 'ADriB68N9I2u2KaY',
  //       mongodb_clustername: 'cluster0',
  //       mongodb_database: ''
  //     },
  //     SECRET: 'stfkPJYfJdoYZqnOSY5bDa0Un2yeG4immOLochhIGZE=\n',
  //     NEXTAUTH_URL: 'http://localhost:3000/'
  //
  //   }
  // }

  return {
    env: {
      mongodb_username: 'qpdlqltb1215',
      mongodb_password: 'ADriB68N9I2u2KaY',
      mongodb_clustername: 'cluster0',
      mongodb_database: ''
    },
    NEXTAUTH_SECRET: 'stfkPJYfJdoYZqnOSY5bDa0Un2yeG4immOLochhIGZE=\n',
    NEXTAUTH_URL: 'http://localhost:3000/'

}
}