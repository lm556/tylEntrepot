import fetchJsonp from 'fetch-jsonp'

export function getData(type) {
    return fetchJsonp('https://3g.163.com/touch/reconstruct/article/list/' + type + '/0-10.html', {
        jsonpCallbackFunction: 'artiList'
    })

        .then(data => data.json())
        .then(data => {
            return data[type]
        })

}