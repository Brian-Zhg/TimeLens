function randomLocked() {
  let images = ["https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3d2dXZzbDNseTZzbGJodno5NzlsbGZic2YzOGo5Nmt4NGoxbTNybiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/owBI2dHqoJqWkeuq00/200.webp",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3d2dXZzbDNseTZzbGJodno5NzlsbGZic2YzOGo5Nmt4NGoxbTNybiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YxvbcjLBzJdKs29Vp9/giphy.webp",
"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3d2dXZzbDNseTZzbGJodno5NzlsbGZic2YzOGo5Nmt4NGoxbTNybiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P3sHSRrzWOpJA8c2NQ/giphy.webp",
"https://media1.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MnVudjZibmpsOWVvOGxyZTZ6ZHgzYmhwNHZwZmczZ2d5anpzbWlucyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/U65ffZ4cHQNHlofiUm/giphy.webp",
"https://media1.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bjUweGFpamR5b3diYjQxc2ZwbjhxdjYzMW81bmd3Mmx3b25xOWQ2bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/WdzvUCFlavpb0t5hsI/giphy.webp",
"https://media3.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3bjUweGFpamR5b3diYjQxc2ZwbjhxdjYzMW81bmd3Mmx3b25xOWQ2bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4dEE65DLqje5Z3M8t7/giphy.webp",
"https://media1.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MThld2JyNTMxdXVkcGtuNjE0dGxleW5xa20xenNnaGlxem55cXhxMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/KxuPaUd1rdZK9LV5gD/giphy.webp",
"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3d2dXZzbDNseTZzbGJodno5NzlsbGZic2YzOGo5Nmt4NGoxbTNybiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JqNhxI8vX5COnaM9Bo/200.webp"];
  const icon = document.getElementById("lockedIn");
  icon.src = images[Math.floor(Math.random() * images.length)];
}

function unfocus()
{
  change("quiz", "quiz");
}

document.getElementById("unfocus").addEventListener("click", function() {unfocus()});

randomLocked();