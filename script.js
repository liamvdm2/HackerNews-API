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

                    const storyDiv = document.createElement('div');
                    storyDiv.classList.add('story');

                    const title = document.createElement('h3');
                    title.innerText = story.title;

                    const urlButton = document.createElement('button');
                    urlButton.innerText = 'Go to Link';
                    urlButton.addEventListener('click', function () {
                        window.location.href = story.url;
                    });

                    storyDiv.appendChild(title);
                    storyDiv.appendChild(urlButton);

                    storiesContainer.appendChild(storyDiv);
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
