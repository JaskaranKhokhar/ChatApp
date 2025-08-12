\# Real Time Chat App With React JS and Appwrite



A chat app with real-time capabilities that utilizes Appwrite on the backend.



🎥 \[Tutorial Link](https://youtu.be/t7S0I78sloI?feature=shared)



<img src="images/demo.png"/>



\### Getting Started



After cloning the repo ensure you complete the necessary installations



```

$ npm install

$ npm run dev

```



Create a new `.env` folder and create the necessary variables based on the `src/appwriteConfig.js` file. Appwrite setup will be covered in the next step.



```js

//appwrite.Config.js

...

export const API\_ENDPOINT = import.meta.env.VITE\_API\_ENDPOINT

export const PROJECT\_ID = import.meta.env.VITE\_PROJECT\_ID

export const DATABASE\_ID = import.meta.env.VITE\_DATABASE\_ID

export const COLLECTION\_ID\_MESSAGES = import.meta.env.VITE\_COLLECTION\_ID\_MESSAGES



const client = new Client()

&nbsp;   .setEndpoint(API\_ENDPOINT)

&nbsp;   .setProject(PROJECT\_ID);

...

```



\*\*Setting Up Appwrite Account\*\*



Set up a local instance of Appwrite or create an account with Appwrite Cloud.



In your appwrite console create a project and database.



1\. Create a collection called "messages" and add the following attributes:

&nbsp;<table>

&nbsp;    <tr>

&nbsp;        <th>Atrtibute Name</th>

&nbsp;        <th>Type</th>

&nbsp;        <th>Size</th>

&nbsp;    </tr>

&nbsp;        <tr>

&nbsp;        <td>user\_id</td>

&nbsp;        <td>string</td>

&nbsp;        <td>50</td>

&nbsp;    </tr>

&nbsp;        </tr>

&nbsp;        <tr>

&nbsp;        <td>username</td>

&nbsp;        <td>string</td>

&nbsp;        <td>50</td>

&nbsp;    </tr>

&nbsp;        </tr>

&nbsp;        <tr>

&nbsp;        <td>body</td>

&nbsp;        <td>string</td>

&nbsp;        <td>250</td>

&nbsp;    </tr>

&nbsp;</table>

2\. From your `messages` collection, go to the "settings" --> "Update Permissions" --> "+ Add Role" and select "Any". Give this user type "Create", "Read", "Update" and "Delete" permissions.



Once you've set up your project you should be able to update all necessary env variables.

Run your development server to view the output.ssssssss



