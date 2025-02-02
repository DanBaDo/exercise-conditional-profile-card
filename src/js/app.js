import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); //print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" alt="dragonfly"/></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";
  // reset the website body with the new html output
  let fullName = null;
  if (variables.name && variables.lastname)
    fullName = variables.name + " " + variables.lastname;
  else if (variables.name && !variables.lastname) fullName = variables.name;
  else fullName = "Provide at least a name...";
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" alt="Profile photo"/>
          <h1>${fullName}</h1>
          <h2>${variables.role ? variables.role : "Select your role..."}</h2>
          <h3>
            ${variables.city ? variables.city : "Select your city..."},
            ${variables.country ? variables.country : "Select your country..."}
          </h3>
          <ul class="${variables.socialMediaPosition}">
            <li>
            ${
              variables.twitter
                ? '<a href="https://twitter.com/' +
                  variables.twitter +
                  '"><img src="/public/assets/img/twitter.png" alt="twitter logo" class="fab fa-twitter"></i></a>'
                : ""
            }
            </li>
            <li>
            ${
              variables.github
                ? '<a href="https://github.com/' +
                  variables.github +
                  '"><img src="/public/assets/img/github.png" alt="github logo" class="fab fa-twitter"></i></a>'
                : ""
            }
            </li>
            <li>
            ${
              variables.linkedin
                ? '<a href="https://linkedin.com/' +
                  variables.linkedin +
                  '"><img src="/public/assets/img/linkedin.png" alt="linkedin logo" class="fab fa-twitter"></i></a>'
                : ""
            }
            </li>
            <li>
            ${
              variables.instagram
                ? '<a href="https://instagram.com/' +
                  variables.instagram +
                  '"><img src="/public/assets/img/instagram.png" alt="instagram logo" class="fab fa-twitter"></i></a>'
                : ""
            }
            </li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
