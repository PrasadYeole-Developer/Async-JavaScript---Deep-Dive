const searchBtn = document.querySelector(".search");
const input = document.querySelector(".usernameinp");
const card = document.querySelector(".card");
const skeleton = document.getElementById("skeleton");

const getProfileData = async (username) => {
  try {
    const res = await axios.get(`https://api.github.com/users/${username}`);
    return res.data;
  } catch (err) {
    throw new Error("User not found.");
  }
};

const decorateProfile = (details) => {
  const joinedDate = new Date(details.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const data = `
    <img src="${details.avatar_url}" alt="User avatar"
      class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-600 shadow-lg object-cover" />
    <div class="flex-1 w-full space-y-5">
      <div>
        <h2 class="text-3xl font-bold text-white">${details.name}</h2>
        <p class="text-gray-400 text-sm">@${details.login}</p>
      </div>
      <p class="text-gray-300 text-sm leading-relaxed">${details.bio || ""}</p>
      <div class="grid grid-cols-3 gap-4 text-center text-sm text-gray-200 bg-gray-800/60 p-4 rounded-xl">
        <div><p class="text-xl font-semibold text-white">${
          details.public_repos
        }</p><p>Repos</p></div>
        <div><p class="text-xl font-semibold text-white">${
          details.followers
        }</p><p>Followers</p></div>
        <div><p class="text-xl font-semibold text-white">${
          details.following
        }</p><p>Following</p></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-3 text-sm text-gray-400">
        <p>📍 <span class="text-gray-200">${
          details.location || "Unknown"
        }</span></p>
        <p>🏢 <a href="${
          details.html_url
        }" target="_blank" class="text-blue-400 hover:underline">${
    details.company || "GitHub Profile"
  }</a></p>
        <p>📅 <span class="text-gray-200">${joinedDate}</span></p>
      </div>
    </div>
  `;
  card.innerHTML = data;
};

searchBtn.addEventListener("click", async () => {
  const username = input.value.trim();

  if (!username) {
    alert("Enter correct username!");
    return;
  }

  card.classList.add("hidden");
  skeleton.classList.remove("hidden");

  try {
    const profile = await getProfileData(username);
    decorateProfile(profile);
    skeleton.classList.add("hidden");
    card.classList.remove("hidden");
  } catch (error) {
    skeleton.classList.add("hidden");
    alert(error.message);
  }
});

// const searchBtn = document.querySelector(".search");
// const input = document.querySelector(".usernameinp");
// const card = document.querySelector(".card");
// const skeleton = document.getElementById("skeleton");

// const getProfileData = (username) => {
//   return fetch(`https://api.github.com/users/${username}`).then((raw) => {
//     if (raw.ok) return raw.json();
//     else throw new Error("User not found.");
//   });
// };

// const getRepos = (username) => {
//   return fetch(
//     `https://api.github.com/users/${username}/repos?sort=updated`
//   ).then((raw) => {
//     if (raw.ok) return raw.json;
//     else throw new Error("User not found.");
//   });
// };

// const decorateProfile = (details) => {
//   let data = `<img
//     src="${details.avatar_url}"
//     alt="User avatar"
//     class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-blue-600 shadow-lg object-cover"
//   />

//   <div class="flex-1 w-full space-y-5">
//     <div>
//       <h2 class="text-3xl font-bold text-white">${details.name}</h2>
//       <p class="text-gray-400 text-sm">@${details.login}</p>
//     </div>

//     <p class="text-gray-300 text-sm leading-relaxed">
// ${details.bio ? details.bio : ""}    </p>

//     <div class="grid grid-cols-3 gap-4 text-center text-sm text-gray-200 bg-gray-800/60 p-4 rounded-xl">
//       <div>
//         <p class="text-xl font-semibold text-white">${details.public_repos}</p>
//         <p>Repos</p>
//       </div>
//       <div>
//         <p class="text-xl font-semibold text-white">${details.followers}</p>
//         <p>Followers</p>
//       </div>
//       <div>
//         <p class="text-xl font-semibold text-white">${details.following}</p>
//         <p>Following</p>
//       </div>
//     </div>

//     <div class="grid sm:grid-cols-2 gap-3 text-sm text-gray-400">
//       <p>📍 <span class="text-gray-200">${details.location}</span></p>
//       <p>🏢 <span class="text-gray-200">${details.html_url}</span></p>
//       <p>📅 <span class="text-gray-200">${details.created_at}</span></p>
//     </div>
//   </div>
// `;

//   card.innerHTML = data;
// };

// searchBtn.addEventListener("click", () => {
//   card.classList.add("hidden");
//   skeleton.classList.remove("hidden");

//   setTimeout(() => {
//     skeleton.classList.add("hidden");
//     card.classList.remove("hidden");
//   }, 2000);
//   let username = input.value.trim();
//   if (username.length > 0) {
//     getProfileData(username).then((data) => {
//       decorateProfile(data);
//     });
//   } else {
//     alert("Enter correct username!");
//   }
// });
