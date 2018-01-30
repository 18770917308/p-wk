import axios from 'axios'
export function fetch(config){
	return new Promise((resolve,reject)=>{
		//创建axios实例
		const instance = axios.create({
			//定义请求文件类型
			headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			},
			timeout:30000,
			baseURL:'http://apis.wkmill.com:8066'
		});
		//请求成功后执行回调
		instance(config).then(res=>{
			//console.log(res);
			resolve(res);
		}).catch(err=>{
			console.log(err);
			reject(err);
		})
	})
}