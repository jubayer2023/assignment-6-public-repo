
const loadYoutubeData = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const categories = data.data;


    const tabContainer = document.getElementById("tab-container");

    categories.forEach((category) => {
        const childDiv = document.createElement("div");
        childDiv.innerHTML = `
            <a onclick = "loadCategoryId('${category?.category_id}')" class="tab bg-neutral-300 text-gray-500 font-semibold hover:bg-[#FF1F3D] hover:text-white rounded">
            ${category.category}
            </a>
        `;
        tabContainer.appendChild(childDiv);
    })

    // console.log(categories);
}

const loadCategoryId = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const videos = data.data;

    displayVideos(videos);

    handleSortBtn = () => {
        const sortVideo = videos.sort((a, b) => {
            const viewsA = parseInt(a.others.views.replace('K', '000'));
            const viewsB = parseInt(b.others.views.replace('K', '000'));
            
            return viewsB - viewsA;
          });

       displayVideos(sortVideo); 
    //    console.log(sortVideo) 
    }

}

const displayVideos = (videos) => {
    // console.log(videos);

    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";

    const videosEmptyContainer = document.getElementById("videos-empty-container");

    if(videos.length === 0){
        videosEmptyContainer.classList.remove("hidden")
        videosEmptyContainer.innerHTML = '';
        const warningDiv = document.createElement("div");
        warningDiv.innerHTML = `
        <div class="text-center">
            <img src="./images/Icon.png" alt="warning" class="mx-auto">
            <h3 class="text-black text-xl md:text-3xl font-bold mt-5">
                Oops!! Sorry, There is no <br>
                content here
            </h3>
        </div>
        `;
        videosEmptyContainer.appendChild(warningDiv);
    }
    else{
        videosEmptyContainer.classList.add("hidden");

        videos?.forEach((video) => {

            const childDiv = document.createElement("div");
            childDiv.innerHTML = `
                <div class="bg-base-100 shadow-xl p-2  overflow-auto">
                    <figure class="relative">
                        <img class="rounded-lg mb-4 w-full h-[160px]" src=${video?.thumbnail} alt="Shoes" />
                        ${video?.others?.posted_date
                            ? `
                                <small class="absolute bottom-2 right-2 bg-black text-neutral-100 px-2 py-1 text-[10px] rounded">
                                    ${(() => {
                                        const publishedTime = new Date(0);
                                        publishedTime.setUTCSeconds(video?.others?.posted_date);
                                        const hours = publishedTime.getUTCHours();
                                        const minutes = publishedTime.getUTCMinutes();
                                        return `${hours} hrs ${minutes} min ago`;
                                    })()}
                                </small> 

                                `
                            : ''
                        }       
                    </figure>
                    <div class="flex">
                        <div class="left-div">
                            <img class="w-[40px] h-[40px] rounded-full" src=${video?.authors[0]?.profile_picture} alt="">
                        </div>
                        <div class="right-div ml-2">
                            <h3 class="title text-lg text-black font-bold pb-1">
                                ${video?.title}    
                            </h3>
                            <p class="owner-name text-gray-500 text-sm pb-1 flex gap-2"> 
                                ${video?.authors[0]?.profile_name}
                                <span>
                                    ${video?.authors[0]?.verified ? '<img class="rounded-full" src="./images/verified.png" alt="">' : ''}
                                </span>
                            </p>
                            <p class="views-number text-gray-500 text-sm">
                                ${video?.others?.views} <span>views</span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
    
    
            // console.log(video?.authors[0].verified)
            videosContainer.appendChild(childDiv);
    
        });
    

    }
}

loadCategoryId("1000")

loadYoutubeData();
