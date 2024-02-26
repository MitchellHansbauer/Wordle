export function addTogglefunction() {
    const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener(`click`, () => {
    const body = document.body;
    body.classList.toggle('light-mode');
    toggleButton.innerText = body.classList.contains
    ('light-mode') ? '🌙' : '☀️';
});
}