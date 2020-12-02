1. 复习
    1. 路由
        1. react开发的项目是单页面应用(spa) , 使用路由进行切换页面展示的内容
        2. 安装路由 : npm i -S react-router-dom
        3. 创建路由配置
            import { HashRouter, BowserRouter, Route, Switch , Redirect , Link , NavLink } from 'react-router-dom'
            <HashRouter>
                <Switch>
                    <Route 
                        component={}
                        path='/' 
                        exact
                        replace
                        render={()=>()}
                    >
                </Switch>
            </HashRouter>
        4. 导航功能
            1. 标签导航 Link , NavLink
                import { Link , NavLink } from 'react-router-dom'
                <Link to='' exact></Link>
                <NavLink to='' exact={true} activeClass='highLight' activeStyle={{color:'red',fontSize:'20px'}}></NavLink>
            2. 编程式导航
                使用的是history提供的功能
                1. 通过Route标签加载组件，这类组件可以直接通过this.props访问到history对象
                2. 非Route 标签加载的组件，这类组件this.props上没有history对象，这时如果想使用编程式导航就需要额外的处理
                    1. props传递：看看当前组件的父级或祖先级组件是否有history对象，如果有可以通过props或者context传递下来
                    2. 使用 withRouter() 高阶组件来处理当前组件
                        1. import { withRouter } from 'react-router-dom' / 'react-router'
                        2. 处理当前组件：let NewComp = withRouter(Comp)
                        3. 最后导出新生成的组件
                    3. 使用原生的history
            3. 注意：导航标签不能在 导航容器标签(HashRouter,BroswerRouter)外部使用
    
        5. 嵌套路由
            1. 语法
                第一层路由需要把组件名称作为路由标签(上面有一个path)，第二层路由使用Route正常的定义
                第一层路由的组件中需要预留展示子级路由页面的位置(this.props.children)
                从第三层路由开始，需要把定义路由的位置放在组件中

                <Wendang path='/wendang'>
                    <Route path='/wendang/kaishi' component={Kaishi} />
                </Wendang>
            2. 访问嵌套路由
                <Link to='/wendang/kaishi'></Link>
        
        6. 路由参数(动态路由)
            1. 定义
                <Route path='/details/:id' component={Details} />
            2. 访问路径
                <Link to={'/details/'+itme.id}></Link>
            3. 获取参数
                在跳转后的页面中进行获取数据，通过 this.props.match.params
    
    2. antd
        1. 是一个组件库，主要是要会用
        2. 安装： npm i antd -S
        3. 引入样式文件
            1. 全部引入： import 'antd/dist/antd.css'
            2. 按需引入： 需要使用插件 craco 库
                1. 下载插件： npm i -D @craco/craco @craco/craco-antd 
                2. 在项目的根目录下创建配置文件 craco.config.js
                3. 配置
        4. 组件的使用
            1. 查找需要使用的组件
            2. 引入到页面中
            3. 需要查找用法，查看代码
            4. 要看api

2. jwt 验证
    1. JWT长什么样
        JWT是由三段信息构成的，将这三段信息文本用.链接一起就构成了Jwt字符串
        第一部分我们称它为头部（header),第二部分我们称其为载荷（payload, 类似于飞机上承载的物品)，第三部分是签证（signature).
    2. jwt的头部承载两部分信息：
        声明类型，这里是jwt
        声明加密的算法 通常直接使用 HMAC SHA256
    3. playload
        载荷就是存放有效信息的地方
    4. signature
        jwt的第三部分是一个签证信息(加盐)
    5. jsonwebtoken插件使用
        1. 下载： npm i -S jsonwebtoken
        2. 引入： let jwt = require('jsonwebtoken')
        3. 生成jwt字符串的方法
            jwt.sign(payload,secret,[options,callback])
        4. 验证方法
            jwt.verify(token,secret)
            使用验证方法时需要放在try{}catch(err){}里面
        5. 解密方法
            jwt.decode(token)
3. 项目
    1. 接口地址: https://3g.163.com/touch/reconstruct/article/list/'+type+'/0-10.html
        type 可选值
        export const junshi = 'BAI67OGGwangning';
        export const yaowen = 'BBM54PGAwangning';

        export const guonei = 'BA8FF5PRwangning';
        export const guoji = 'BAI6I0O5wangning';

        export const caijing = 'BA8EE5GMwangning';
        export const keji = 'BA8D4A3Rwangning';

        export const yule = 'BA8F6ICNwangning'; // 时尚
        
    2. 会使用的东西
        antd
        fetch( fetch-jsonp )
        react-router-dom

        express
        mysql
        jsonwebtoken
        
    3. 需要解决跨域
        1. package.json中配置
        2. 使用 http-proxy-middleware 中间件
    4. antd 的 css 按需加载
        1. 把webpack的配置显示出来
            npm run eject
        2. 下载插件 : npm i babel-plugin-import -S
        3. 添加配置，把babel-plugin-import 插件配置到babel中
            1. 在package.json中查找 babel 字段
            2. 把package.json中的 babel 删除了，然后在项目根目录下创建 .babelrc 文件
                在这个文件中写配置
            
            {
                "presets":["react-app"],
                "plugins":[
                    ["import", {
                        "libraryName": "antd",
                        "libraryDirectory": "es",
                        "style": "css" // `style: true` 会加载 less 文件
                    }]
                ]
            }
    
    5. 配置支持less
        1. 显示webpack配置文件
        2. 下载 less 和 less-loader
            cnpm i less less-loader -S
        3. 修改webpack的配置文件
            参考sass的配置，配置less


    6. 准备数据库
        