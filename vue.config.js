module.exports =  {
    // publicPath:'/play-miao',
    devServer: {
        
         proxy : {
            '/api2': {
                target : 'http://localhost:3000',
                changeOrigin : true
            },
             '/api': {
                 target : 'http://39.97.33.178',
                 changeOrigin : true
             }
            

         }
    },
    // serve: {
    //     host: '192.168.0.4'
    //   }
}