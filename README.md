# comp20-s2017-team21
by: Minh D. Nguyen,

1.	Project title: MV Master? Music Expert? Recognisong? 

2.	Problem statement:
•	Create a website that allows user to play a song recognition game. In each play, user will watch a short part of a music video and identify the music video.
•	The website will allow the user to choose to do quiz on songs of the same artist, same genre, or just random songs.
•	The website will allow users to challenge each other to find the “true” fan of a band or an artist!

3.	How to solve the problem:
•	Use YouTube API to get MVs from YouTube and the information of each song.
•	Use server-side database to store user’s information such as authentication information and high scores, and song’s information such as URL, song name, artist name, and popularity.
•	Use client-side storage to retain user’s login information.
•	Send email/SMS and push notification whenever someone receives a challenge from others.

4.	Features that we will implement:
•	Server side framework.
•	Client side framwork.
•	Front-end framework.
•	Send emails, SMSs, and push notifications.

5.	Data the prototype will be collecting:
•	Song’s information from YouTube.
•	User’s email and phone number (optional).

6.	Algorithms or special technique:
•	Selection algorithm to select songs based on current location and user preferences. (e.g. genre, local bands only, etc.)
•	Randomized algorithm to choose a random part of the MV to play and to randomized a playlist.
