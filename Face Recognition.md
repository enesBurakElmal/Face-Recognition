The project can be accessed here: <a href="https://smartbrainv1.herokuapp.com/" target="_blank">Introduction</a>
The API itself can be accessed here: <a href="https://github.com/eneselmal/Face-Recognition-Api" target="_blank">Smart Brain API</a>

This project uses HTML, CSS, and Javascript + React for the front-end and a NodeJs/Express + PostgreSQL server and database configuration for the back-end. It pings the <a href="https://www.clarifai.com/" target="_blank">Clarifai</a> API for face detection in photographs and displays the image with a bounding box around the faces that it detects.

This repository contains the front-end portion of the application while the back-end portion is contained in the repository <a href="https://github.com/eneselmal/Face-Recognition-Api" target="_blank">smart-brain-api</a>

<h1> Front-End </h1>

The front-end login page of the application looks like this:

![image](https://user-images.githubusercontent.com/92387865/155529977-3d400a7d-4e7a-4639-ab78-b3f569e1041f.png)


There are also registration capabilities so that users can sign up.

![image](https://user-images.githubusercontent.com/92387865/155530054-663ea14a-c70b-4766-bf3b-7f0b9e2a6d2f.png)

Once the user is signed in, the following view is shown:

![image](https://user-images.githubusercontent.com/92387865/155530245-f6d51fd5-fa1c-46c8-a69b-b00a4c358733.png)

The front-end application is written in React and consists of a main App container which renders all other components. This App container has access to a state which contains input (for the search box), imageUrl(the URL entered into the searchbox), bounding box coordinates, the name of the current view page, the sign in status of a user, and the user currently signed in with information such as id, name, email, number of photos detected, and the date joined.

Additionally, the Signin and Register components are also containers which contain states for their text inputs such as name, email, and password for the Register form, and email and password for the Signin form. These pass state in the form of update functions which detect what the inputs are in the textbox and render the respective Signin and Register form components into the App container. When the user is signed in, the user state is set to the current user and all of their information is fed to the various components to display all of the personalized data such as their image count, their name, and a "Sign Out" link instead of a "Sign In" or "Register" link.

The App component contains several functions that set the state of different parts of the application. The main routing function dictates which components are displayed. For example, if the routing state is set to 'home', the navigation bar, image search box/button, image search rank, and face recognition components are displayed. if the routing state is set to 'signin', the signin form component is displayed.

When a user inputs a URL into the search field and presses "Detect", the image shows up below the search field and a blue bounding box is calculated based on data returned from the face detection API.

![image](https://user-images.githubusercontent.com/92387865/155530627-658a0502-5e32-4dd9-ab4b-1676fca927b3.png)

This button of the ImageSearch component has an attached function which stores the image URL and sends this in a request to the Clarifai API. The result is a set of four coordinates of a bounding box which are used to calculate the boundaries of the face on the actual image, thus displaying the FaceRecognition component which consists of an image and the blue bounding box.



