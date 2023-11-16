document.addEventListener('DOMContentLoaded', function () {
    const storiesContainer = document.getElementById('stories');
    const moreButton = document.getElementById('moreButton');
    let displayedStoryCount = 10;
    const storiesPerPage = 10;
    let topStoryIds = [];

    function loadMoreStories() {
        console.log('Loading more stories...');

        fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(response => response.json())
            .then(data => {
                topStoryIds = data;

                const storyPromises = topStoryIds.slice(displayedStoryCount, displayedStoryCount + storiesPerPage).map(storyId =>
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                        .then(response => response.json())
                );

                return Promise.all(storyPromises);
            })
            .then(topStories => {
                console.log('Top stories length:', topStories.length);

                topStories.forEach(story => {
                    console.log('Adding story:', story.title);

                    const storyBox = document.createElement('div');
                    storyBox.classList.add('story-box'); // Voeg een nieuwe klasse toe voor de box

                    const title = document.createElement('h3');
                    title.innerText = story.title;

                    const urlButton = document.createElement('button');
                    urlButton.innerText = 'Go to Link';
                    urlButton.addEventListener('click', function () {
                        window.open(story.url, '_blank');
                    });

                    storyBox.appendChild(title);
                    storyBox.appendChild(urlButton);

                    storiesContainer.appendChild(storyBox);
                });

                displayedStoryCount += storiesPerPage;

                if (displayedStoryCount >= topStoryIds.length) {
                    moreButton.style.display = 'none';
                } else {
                    moreButton.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error during fetch operation:', error);
            });
    }

    // Laad de eerste set verhalen bij het initialiseren van de pagina
    loadMoreStories();

    // Voeg een eventlistener toe aan de "More" button
    moreButton.addEventListener('click', loadMoreStories);
});


// LOGIN

function submitForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform client-side validation
    if (username && password) {
        // For a real application, you would make an AJAX request to the server here
        // and handle the response accordingly. For simplicity, we'll just display a message.
        const loginMessage = document.getElementById('loginMessage');
        loginMessage.textContent = `Logged in as ${username}`;
        loginMessage.style.color = 'green';
    } else {
        const loginMessage = document.getElementById('loginMessage');
        loginMessage.textContent = 'Please enter both username and password.';
        loginMessage.style.color = 'red';
    }
}
