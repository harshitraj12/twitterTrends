const country_btn = document.querySelectorAll('.country_cat')
const country_name = document.getElementById("country")
const get_news_btn = document.getElementById("get_news")

const loader = document.getElementById("loader")
const carousel_content = document.getElementById('carousel_content')
const prev_btn=document.getElementById('prev_btn')
const next_btn=document.getElementById('next_btn')
const main_box = document.getElementById('main_box')

const date_time = document.getElementById('date_time')
setInterval(updateTime, 1000);

function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}

function updateTime() {
    var now = new Date();
    var strDateTime = [[AddZero(now.getDate()), 
        AddZero(now.getMonth() + 1), 
        now.getFullYear()].join("/"), 
        [AddZero(now.getHours()), 
        AddZero(now.getMinutes())].join(":"), 
        now.getHours() >= 12 ? "PM" : "AM"].join(" ");

        date_time.innerText = strDateTime;
    }


main_box.style.display='none'
carousel_content.style.display ='none'
prev_btn.style.display='none'
    next_btn.style.display='none'
loader.style.display='none'
var country = 23424848



country_btn[0].addEventListener('click',function btn8(){
    country_name.innerText = 'World Wide'
    country=1
    loading()
})
country_btn[1].addEventListener('click',function btn8(){
    country=23424848
    country_name.innerText = 'India'
    loading()

})
country_btn[2].addEventListener('click',function btn10(){
    country=23424977
    country_name.innerText = 'United States'
    loading()


})
country_btn[3].addEventListener('click',function btn11(){
    country=23424975
    country_name.innerText = 'Great Britain'
    loading()


})
country_btn[4].addEventListener('click',function btn12(){
    country=23424748
    country_name.innerText = 'Australia'
    loading()


})


function delete_div(){
    var already_carousel_item = document.getElementsByClassName('carousel-item')
        if (already_carousel_item){
            while(already_carousel_item.length > 0){
                already_carousel_item[0].remove()
            }
        }
}

var count=0

async function loading(){
    count+=1
    if (count>1)
    {
        delete_div();
    }
    main_box.style.display='block'
    carousel_content.style.display ='none'
    prev_btn.style.display='none'
    next_btn.style.display='none'
    loader.style.display='block';
    const res = await fetch("/trends",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            country
        }),
    });
        const data = await res.json()
        
        function myFunction() {
            myVar = setTimeout(fetchnews, 1000);
        }
    console.log(data)
    myFunction()
    function fetchnews()
    {   
        loader.style.display='none';
        carousel_content.style.display='block'
        prev_btn.style.display='block'
        next_btn.style.display='block'
        
        for (var i=0;i<28;i++)
        {
            var carousel_item = document.createElement('div')
            if (i==0)
            {
                carousel_item.className='carousel-item active'
            }
            else{
                carousel_item.className='carousel-item'
            }
            for(var j=1;j<2;j++)
            {
                var carousel_caption = document.createElement('div')
                carousel_caption.className='carousel-caption'
                var a = document.createElement('a')
                a.href=data[0].trends[i].url;
                a.innerText=data[0].trends[i].name
                a.target='_blank'
                a.className='anchor'
                carousel_caption.appendChild(a)
                var p = document.createElement('p')
                p.className='tweet_volume'
                if (data[0].trends[i].tweet_volume!=null)
                {
                    p.innerText=data[0].trends[i].tweet_volume/1000+'K';
                }
                var p2=document.createElement('p')
                p2.className='number'
                p2.innerText=i+1
                carousel_caption.appendChild(p)
                carousel_caption.appendChild(p2)
                carousel_item.appendChild(carousel_caption)
            }

            carousel_content.appendChild(carousel_item)
        }
        // document.getElementById("code").innerText = carousel_content.innerHTML;
    }
}

