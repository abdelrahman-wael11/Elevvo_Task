
const posts = [
  { 
    title: "AI in 2025: What's Next?", 
    category: "Tech", 
    description: "Artificial Intelligence is evolving fast. Let's explore where it's heading in 2025.", 
    date: "2025-08-01", 
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800"
  },
  { 
    title: "My Journey in Japan", 
    category: "Travel", 
    description: "Tokyo, Kyoto, and Osaka were unforgettable experiences during my Japan trip.", 
    date: "2025-07-20", 
    image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800"
  },
  { 
    title: "Top 5 Pasta Recipes", 
    category: "Food", 
    description: "Easy-to-cook pasta recipes that are both healthy and delicious.", 
    date: "2025-07-10", 
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800"
  },
  { 
    title: "Web Development Trends", 
    category: "Tech", 
    description: "From AI integration to Web3, here are the top trends developers should know.", 
    date: "2025-07-05", 
    image: "https://images.unsplash.com/photo-1581091012184-5c2af37a3b25?w=800"
  },
  { 
    title: "Hiking the Swiss Alps", 
    category: "Travel", 
    description: "Exploring breathtaking mountains and lakes in Switzerland.", 
    date: "2025-06-29", 
    image: "https://images.unsplash.com/photo-1508264165352-258a6c9464c0?w=800"
  },
  { 
    title: "Healthy Smoothie Ideas", 
    category: "Food", 
    description: "Quick and tasty smoothie recipes for your daily energy boost.", 
    date: "2025-06-15", 
    image: "https://images.unsplash.com/photo-1572441710534-680d18df72cf?w=800"
  },
  { 
    title: "Building Apps with React", 
    category: "Tech", 
    description: "Why React is still dominating the web development scene.", 
    date: "2025-06-01", 
    image: "https://images.unsplash.com/photo-1584697964190-03c3a0e9b5b0?w=800"
  },
  { 
    title: "Exploring Egypt's Pyramids", 
    category: "Travel", 
    description: "A journey through history exploring the Great Pyramids of Giza.", 
    date: "2025-05-25", 
    image: "https://images.unsplash.com/photo-1603415526960-f8f0a84c14b0?w=800"
  },
];

let currentCategory = "all";
let currentPage = 1;
const postsPerPage = 4;

function displayPosts() {
  const postContainer = document.getElementById("posts");
  postContainer.innerHTML = "";


  let filteredPosts = currentCategory === "all" ? posts : posts.filter(p => p.category === currentCategory);


  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  filteredPosts = filteredPosts.filter(p => p.title.toLowerCase().includes(searchValue));


  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  const paginatedPosts = filteredPosts.slice(start, end);

  paginatedPosts.forEach(p => {
    const card = `
      <div class="post-card">
        <img src="${p.image}" alt="${p.title}">
        <div class="content">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <small>${p.date} | ${p.category}</small>
        </div>
      </div>
    `;
    postContainer.innerHTML += card;
  });

  displayPagination(filteredPosts.length);
}

function filterPosts(category) {
  currentCategory = category;
  currentPage = 1;
  displayPosts();
}

function searchPosts() {
  currentPage = 1;
  displayPosts();
}

function displayPagination(totalPosts) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.toggle("active", i === currentPage);
    btn.onclick = () => {
      currentPage = i;
      displayPosts();
    };
    pagination.appendChild(btn);
  }
}


function nextPage() {
  const totalPosts = (currentCategory === "all" ? posts : posts.filter(p => p.category === currentCategory))
    .filter(p => p.title.toLowerCase().includes(document.getElementById("searchInput").value.toLowerCase())).length;

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPosts();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
}


displayPosts();
