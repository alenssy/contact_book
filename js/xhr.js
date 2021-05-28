export class XHR{
	static async xhr(url, method=`GET`, data){
		let options = {
			method: method,
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}

		if(data)
			options.body = JSON.stringify(data);

		let request = await fetch(url,options),
			response = await request.json();

		return response;
	}
}