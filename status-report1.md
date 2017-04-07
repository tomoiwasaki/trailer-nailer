Comp20 Status Report 1

Minh D. Nguyen, Huynh Tran, Tomo Iwasaki, Arpan Gurung, Georgios Frantzis Phylactopoulos

Project Title: Trailer Nailer

1. What was accomplished during the week
- Built the basic HTML pages such that the login screen and the game screen.
- For the game screen, display a sample video from YouTube in 10 random seconds using YouTube API and prevent the user from controlling the video.
- Built rudimentary answer choices and scoring system. However, they are far from being operable.

2. Challenges and issues team faced during the week
- YouTube API did not support link disablement, hence a simple HTML trick that uses a transparent "block" must be used to prevent users from accessing the source video through YouTube and getting its information.
- In the game screen, clicking on answers has not made changes we need in the video (It can stop the video, but fail to reload it or make it load a new video, simply because we only have one video in stock).
- When clicking the right answer, the score increases, however, it does not prevent the answer from being clicked again, which triggers the score to increase once more. Therefore, the score can be increased indefinitely.

3. Goals for the next week
- Build a database collections of multiple movie trailers of different categories.
- Build a choice system that interacts with the database (fetching answers for specific video, knowing which is the correct one), and is able to load new video from the database, without resetting the timer and allowing user to click multiple answers for one video.
- Build an index page that allows users to access the main menu to go to the game or to access their profile.
- Build a connection between the login page and index page.
