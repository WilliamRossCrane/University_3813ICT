# 3813ICT Assignment, Angular Part 2

### My github link: https://github.com/wcran7/assignmentp2
## Version Control (Github)
Github is one of the largest communities that provides software development version control using Git.
This assignment applies git version control at the point where it has been implemented with creating new user, remove existing user. 
Along with 5 components: account, login, register, remove-user, channel-details and 2 services (login-service and socket-service).
The git repository contains README.md file and 1 folder which is angular project in order to prevent any naming convention error.
From then, each small changes will be committed into the repo to keep track of the project.

## Data structure
{ valid_user_list : [
                      username: "",
                      email: "",
                      password: "",
                      isGroupAdmin: false,
                      isSuperAdmin: true] }

{ group_list : [
                  group_name: "",
                  group_admin: "",
                  group_assist_1: "",
                  group_assist_2: ""
                  members: [],
                  channels : [
                                { channel_name: "",
                                  channel_members: [],
                                  channel_message: [ { 
                                                                    message: "",
                                                                    username: "",
                                                                    } ]
                             ]
                  ] }
                  
The 2 structures above are what have been implemented in this assignment. A user object which will contain all the detail of a user. A group object will contain the information in group also a list of channel within that group.

## Rest API (NodeJs and Angular)
The front-end Angular application communicates with NodeJs server through service which they pass specific parameters to the service which will then go to the server to execute the function based on the provided routes:

+ http://localhost:3000/api/auth (post): this route is to check the log in authentication where it has been defined in the server.js file with 2 parameters required (email and password) with POST method, the process of looping through the users array and return a boolean to indicate the authentication is success or denied. The parameters are passed through service and then log in component subscribes to that service and use the function to check user log in. And then store the email and type in local and session storage.
+ http://locahost:3000/api/create (post): this route is to create new user in the array where it has been defined in the server.js file with 2 parameters required (email and password) with POST method, the process is looping through the array and check whether the email are already exist in the array, if not then continue to store them into a dictionary and add to the array. The parameters are passed through service and then register component subscribes to that service and use the function to check user log in.
+ http://localhost:3000/api/delete (post): this route is to remove an existing user in the array where it has been defined in the server.js file with 1 parameter required (email) with POST method, however only the super admin can remove users. The process is find the index of the email in the array and remove it using splice(). The email is passed through service and then remove-user component subscribes to that service and use the function to check user log in.
+ http://localhost:3000/api/register: this route is to register a new user which receive user name, email, password and group admin value and super admin value. Then it check whether email and username is existed yet then create a new user.
+ http://localhost:3000/grandsuper: this route is to changes a user isSuperAdmin key so they will have others permission in the page.

+ http://localhost:3000/groups (get): This route is to retrieve all the available groups.
+ http://localhost:3000/getgroupbyname (post): This route is to retrieve a specific group with the group name is passed. The return value will be that group object
+ http://localhost:3000/removeuserchannel (post): This route is to remove a user from a channel. Group name, channel name and user name will be passed into the function.
+ http://localhost:3000/groups (post): This route is to create a new group which receive group name, group admin, group assist 1 and 2. The group name will be checked before created.
+ http://localhost:3000/addmember (post): This route is to add new member to a group. It accept 2 parameters: group name and user name and check for user whether they is already in the channel.
+ http://localhost:3000/removegroup (post): This route is to remove an existing group by getting the group name.
+ http://localhost:3000/removemember (post): This route is to remove an existing member in a group so its getting group name and user name then check for both index then use 'splice' to remove the user name in the members array.

+ http://localhost:3000/channels (post): This route is to create a new channel which needs to have channel name and group name to indicate it is in a specific group.
+ http://localhost:3000/channel (post): This route is to retrieve a specific channel with a group name and channel name will be passed into function in order to find the index and return a channel object
+ http://localhost:3000/addUserToChannel (post): This route is to add a non-existed user to a channel that is a group he/she is in. This function receives a group name, channel name and user name.
+ http://localhost:3000/removechannel (post): This route is to remove a channel which needs group name and channel name.
+ socket.on: This route is called when the message is received. The main function of this is to store the user message along with their name that they have sent. This data is stored in an object that include their username, message, through the message log.
+ socket.emit: This route is called in order to retrieve the message that has been sent after the message has been stored by using socket.on. This function will keep on looping in the component so that new message can be retrieve every time socket.on is called.
+ socket.join: This route is called in the group component when a user has entered a specific channel. The purpose of this route is to identify which channel the user is in therefore sending the corresponding message. This route is called when user has entered the channel in order to receive the message history.
+ socket.leave: This route is called in the chat channel component. The user will leave the channel by clicking the leave room. The socket.leave route is to indicate that user left the channel, which means they can no longer see the message that has been seen.

## Angular components architecture
In the assignment, there are 5 components at the moment (app, login, account, register, remove-user) and 1 service (login-service) and 1 server (server.js)
+ login component: handle log in authentication 
+ app component: checking user permission when they access the profile page
+ account component: retrieve session storage and display user email and type
+ register component: handle create user process by accept input from user and pass to server.js
+ remove-user component: handle delete user process by accessing a function in server.js through service
+ channel-details component: display a chatbox with messages and all the members inside the channel
+ login-service service: the middleware that passing parameters from a component to the NodeJs server side and allow a function to the re-usable.
+ server.js server: it contains the hard-code user array with 3 functions (logIn, createUser and removeUser) which will be called by the components.
+ socket.js: It contains all the route for using socket.io that has mainly 3 routes (socket.on, socket.emit, socket.join and socket.leave)

## Node server architecture
At first, there will 2 files called 'users.json' and 'groups.json' which contains the data structure above with 1 super user from the start of the project.
The file will keep changing in the node server side. When a function is called, the corresponding file will be read and transfer into the object and assign a variable at the end that variable will be write back to the file. 
I tried to avoid using a global variable (such as read file at first and assign it to a variable for global usage) because I have to control 2 different objects, 1 from the file and 1 which represents the file which will be very confusing and not effective

The node server will be using mongodb as its main database which will be used to store the information from angular side. It is starting with 1 super user from the start of the project.
The mongodb database will be keep updating in the node server side. When a function is called, the mongodb will be read using mongo query, the data is updated and some function will return an object that is a copy of mongo the database.

## State changes
**From client to server**: The variable is passed to the server and email. The way it happens is that in angular html, I defined [(ngModel]) in order to bind the variable with an client's input and then declare it in the component. With that, I will be able to use the variable in the component to subscribe to a service and pass to the server.js. 

**From server to client**: When calling a function in server, the code will create an object which is empty so that after processing the function, it will be attach a attribute called "valid" boolean to indicate whether the function is completed or failed. Along with that, the server can re-send that object to component in which component can subscribe to the service and retrieve the object for further interaction. Most of the time, the server will send back a boolean which indicate the operation is successfully or failed which angular component will subscribe to it and act upon the result.

