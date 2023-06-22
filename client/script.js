
const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const main = document.querySelector('#main')
const textcontent = document.querySelector('#textcontent')

textcontent.style.opacity = '0'




btn.addEventListener('click', () => {
   
main.innerHTML = ''
textcontent.innerHTML = ''

const url = 'http://127.0.0.1:1337/'
const data = {
    text: input.value
};
const customHeaders = {
    "Content-Type": "application/json",
}

fetch(url,{
    method: "POST",
    headers: customHeaders,
    body: JSON.stringify(data),
})
.then(res => res.json())
.then(data => {
    data = data.links
    textcontent.style.opacity = '100'
    console.log(data)
        data.map(el => {
            const element = document.createElement('div')
            element.className = 'element'
            element.innerText = el[0]

            element.addEventListener('click', (e) => {
                const link = {
                    text: el[1]
                };
                const urlLinks = 'http://127.0.0.1:1337/links'
             
                fetch(urlLinks, {
                    method: "POST",
                    headers: customHeaders,
                    body: JSON.stringify(link),
                })
                .then(res => res.json())
                .then(data => {
                    data = data.result
                    localStorage.setItem('data', data)
                    textcontent.innerHTML = localStorage.getItem('data')
                })
    })
    main.appendChild(element)
    })
})
    
});
textcontent.innerText = localStorage.getItem('data')


