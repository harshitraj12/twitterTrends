const submitBtn = document.getElementById('submitBtn')
const user = document.getElementById('userName')
const description = document.querySelectorAll('.description')
const title = document.querySelectorAll('.title')
const row1 = document.getElementById('b1')
const row2 = document.getElementById('b2')
const row3 = document.getElementById('b3')
const Location = document.querySelectorAll('.Location')
const Followers = document.querySelectorAll('.Followers')
const latestTweet = document.querySelectorAll('.latestTweet')
const profileImage = document.querySelectorAll('.profileImage')
const tweetOn = document.querySelectorAll('.tweetOn')
const loader = document.getElementById("loader")
const profileVerified = document.querySelectorAll('.verified')
const screenName = document.querySelectorAll('.screenName')

loader.style.display='none'
row1.style.display='none'
row2.style.display='none'
row3.style.display='none'

function millionCheck(followers_count){
    if (followers_count<1000)
    {
        return 'Followers: '+followers_count
    }
    followers_count=followers_count/1000
    followers_count_before=followers_count.toString().split(".")[0]
    followers_count_after=followers_count.toString().split(".")[1]
    if (followers_count_before>=1000)
    {
        return 'Followers: '+followers_count_before/1000 + ' M'
    }
    else
    {
        return 'Followers: '+followers_count + ' K'
    }
}

function profileVerifiedCheck(value)
{
    if (value==true)
        return "images/twitter_verified.svg"
    return "images/dot.png"
}

function row1_func(data){
    profileVerified[0].src = profileVerifiedCheck(data[0].verified)
    profileImage[0].src=data[0].profile_image_url
    title[0].innerText=data[0].name
    screenName[0].innerText='@'+data[0].screen_name
    description[0].innerText=data[0].description
    Location[0].innerText=data[0].location
    Followers[0].innerText=millionCheck(data[0].followers_count)
    try{
        tweetOn[0].innerHTML = '<p style= "color:rgb(40, 0, 104)">Latest Tweet: <br>On:- '+data[0].status.created_at+'<br></p>'
        latestTweet[0].innerText =  data[0].status.text
        latestTweet[0].href=data[0].status.entities.media[0].expanded_url
    }
    catch(err)
    {
        latestTweet[0].style.pointerEvents="none"
        latestTweet[0].style.cursor="default"
        latestTweet[0].href=''
    }

}

function row2_func(data){
    profileVerified[1].src = profileVerifiedCheck(data[1].verified)
    profileImage[1].src=data[1].profile_image_url
    title[1].innerText=data[1].name
    screenName[1].innerText='@'+data[1].screen_name
    description[1].innerText=data[1].description
    Location[1].innerText=data[1].location
    Followers[1].innerText=millionCheck(data[1].followers_count)
    try{
        tweetOn[1].innerHTML = '<p style= "color:rgb(40, 0, 104)">Latest Tweet: <br>On:- '+data[1].status.created_at+'<br></p>'
        latestTweet[1].innerHTML = data[1].status.text
        latestTweet[1].href=data[1].status.entities.media[0].expanded_url
    }
    catch(err)
    {
        latestTweet[1].style.pointerEvents="none"
        latestTweet[1].style.cursor="default"
        latestTweet[1].href=""
    }
}

function row3_func(data){
    profileVerified[2].src = profileVerifiedCheck(data[2].verified)
    profileImage[2].src=data[2].profile_image_url
    title[2].innerText=data[2].name
    screenName[2].innerText='@'+data[2].screen_name
    description[2].innerText=data[2].description
    Location[2].innerText=data[2].location
    Followers[2].innerText=millionCheck(data[2].followers_count)
    try{
        tweetOn[2].innerHTML = '<p style= "color:rgb(40, 0, 104)">Latest Tweet: <br>On:- '+data[2].status.created_at+'<br></p>'
        latestTweet[2].innerHTML =  data[2].status.text
        latestTweet[2].href=data[2].status.entities.media[0].expanded_url
    }
    catch(err)
    {
        latestTweet[2].style.pointerEvents="none"
        latestTweet[2].style.cursor="default"
        latestTweet[2].href=''
    }
}

submitBtn.addEventListener('click',async function submit(e){
    e.preventDefault()
    row1.style.display='none'
    row2.style.display='none'
    row3.style.display='none'
    let userName = user.value
    if (userName==="")
    alert("Please fill the input properly")
    else{
        loader.style.display='block'
        const res = await fetch("/searches",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                userName
            }),
        });
        const data = await res.json()
        function myFunction() {
            myVar = setTimeout(fetchUser, 20);
        }
      
        myFunction()
        function fetchUser()
        {
            loader.style.display='none';
            data.sort(function (a, b) {
                return b.followers_count-a.followers_count;
            });
            if (data.length>3){
                row1.style.display='block'
                row2.style.display='block'
                row3.style.display='block'
                latestTweet[0].style.pointerEvents="auto"
                latestTweet[0].style.cursor="pointer"
                latestTweet[1].style.pointerEvents="auto"
                latestTweet[1].style.cursor="pointer"
                latestTweet[2].style.pointerEvents="auto"
                latestTweet[2].style.cursor="pointer"
                

                row1_func(data)
                row2_func(data)
                row3_func(data)
               
    
                
            }
            else if(data.length==2)
            {
                row1.style.display='block'
                row3.style.display='block'
                
                row1_func(data)
                profileVerified[2].src = profileVerifiedCheck(data[1].verified)
                profileImage[2].src=data[1].profile_image_url
                title[2].innerText=data[1].name
                screenName[2].innerText='@'+data[1].screen_name
                description[2].innerText=data[1].description
                Location[2].innerText=data[1].location
                Followers[2].innerText=millionCheck(data[1].followers_count)
                try{
                    tweetOn[2].innerHTML = '<p style= "color:rgb(40, 0, 104)">Latest Tweet: <br>On:- '+data[1].status.created_at+'<br></p>'
                    latestTweet[2].innerHTML = data[1].status.text
                    latestTweet[2].href=data[1].status.entities.media[0].expanded_url
                }
                catch(err)
                {
                    latestTweet[2].style.pointerEvents="none"
                    latestTweet[2].style.cursor="default"
                    latestTweet[2].href=""
                }
    
            }

            else if(data.length==1)
            {
                row2.style.display='block'
                profileVerified[1].src = profileVerifiedCheck(data[0].verified)
                profileImage[1].src=data[0].profile_image_url
                title[1].innerText=data[0].name
                screenName[1].innerText='@'+data[0].screen_name
                description[1].innerText=data[0].description
                Location[1].innerText=data[0].location
                Followers[1].innerText=millionCheck(data[0].followers_count)
                try{
                    tweetOn[1].innerHTML = '<p style= "color:rgb(40, 0, 104)">Latest Tweet: <br>On:- '+data[0].status.created_at+'<br></p>'
                    latestTweet[1].innerHTML = data[0].status.text
                    latestTweet[1].href=data[0].status.entities.media[0].expanded_url
                }
                catch(err)
                {
                    latestTweet[1].style.pointerEvents="none"
                    latestTweet[1].style.cursor="default"
                    latestTweet[1].href=""
                }

            }

            else{
                alert("Profile Not Found")
            }
        }
            
            
    }
})