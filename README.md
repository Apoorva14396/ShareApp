# ShareApp

This app is all about sending friend requests, sharing files with your friends.


<h3> PreRequisites<br /></h3>
  
-VS Code<br />
-Angular CLI<br />
-NodeJs<br />
-MongoDB<br />

<h3> Getting Start with the Application<br /></h3>
  
-git clone this repository <br />
-npm install in both client and server directories.<br />
-client run ng s -o.<br />
-server run nodemon index.js.<br />

<h3> There are two types of users for this Application.<br /></h3>
-Admin (Controller)<br />
-Users (Users)<br />

<h3> Admin as a Controller<br /></h3>

As an admin is logged in he/she will land into the dashboard where analytics can be seen.<br />

-Admin is the overall controller of the application.<br />
-Admin can see registered Users in **Registered Users**.<br />
-Admin can block/Unblock registered Users in **Registered Users**.<br />

<h3> Users<br /></h3>
  
<h4>As a New User.<br /></h4>

-You need to Signup by clicking on signup. Once you have submit your details through nodemailer you'll get a mail to verify your token only if your email id is valid.Then you can login as Registered User.<br />

<h4>As a Registered User<br /></h4>

-As a Registered User is logged in he/she will land into the dashboard.<br />
-User can serach for a friend ,send them request , view friend list , user can upload files, view his uploaded files and can see files shared by him/her.<br />

<h3> ShareApp as Friend Module<br /></h3>

-After Logging in user is welcome to his/her dashboard, where in the side bar he can chooose any of the options available.<br />
-User can search for a friend  and send friend request to them in Friend Finder **Search Friend**.<br />
-User can see his/her notification in **Notifications**.<br />
-User can see his **Friend List**.<br />

<h3> ShareApp as Share-file Module<br /></h3>

-User can upload single or multiple files in **Upload File**.<br />
-User can see his uploaded files in **My Drive**.<br />
-User can see files share by him in **Shared Files**.<br />


TODO

Admin module- analytics left.

Share-file Module- sending file left.
