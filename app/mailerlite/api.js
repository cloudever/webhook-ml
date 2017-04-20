/* Internals */
const url = require("url")

/* Externals */
const request = require("request")

/* Constants */
const api_endpoint = 'https://api.mailerlite.com/api/v2/'

class API {
    
    constructor (params) {
        this.key = params.key
        
        this.request = request.defaults({
            headers: {
                'X-MailerLite-ApiKey': this.key
            },
            json: true
        })

    }
    
    call (path, method = 'get', body) {
        
        return new Promise ((resolve, reject) => {
            
            var options = {
                url: url.resolve (api_endpoint, path),
                method,
                body
            }
                    
            this.request[method](options, (err, res, body) => {
                if (err) {
                    return resolve ({ 
                        response: {
                            error: {
                                message: "Network error"
                            }
                        }, code: 0 })
                }
                
                return resolve ({ response: body, code: res.statusCode})
            })
        })
    }
    
    get groups () {
        return {
            subscribers: {
                add: async (id, params) => {
                    return await this.call(`groups/${id}/subscribers`, 'post', params)
                }
            }
        }
    }

}

module.exports = (params) => new API (params)
