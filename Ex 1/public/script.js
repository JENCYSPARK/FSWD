async function fetchAbout() {
    const response = await fetch('http://localhost:5000/api/about');
    const data = await response.json();

    document.getElementById('name').innerText = data.name;
    document.getElementById('profession').innerText = data.profession;
    document.getElementById('bio').innerText = data.bio;
    document.getElementById('contact').innerText = data.contact;

    const skillsList = document.getElementById('skills');
    data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.innerText = skill;
        skillsList.appendChild(li);
    });
}

fetchAbout();
