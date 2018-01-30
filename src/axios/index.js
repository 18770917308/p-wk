import {fetch} from './fetch'
import qs from 'qs'
export function getJsonData(url,type,data){
	if(type===''){
		type = 'post';//默认post
	}
	return fetch({
		url:url,
		method:type,
		data:qs.stringify(data)
	})
}