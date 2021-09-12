# Savetheplace
**Savetheplace** is my PWA project for the module "Aktuelle Trends der Informations- und Kommunikationstechnik" at HTW Berlin

## Usage
 - Users can "save" the place which they find interesting and beautiful, this includes saving an uploaded given picture from user's photo library or (if allowed) a picture taken from user's camera, place name, city and the location.
 - The website will ask users for their permissions to access their locations and in the end, save it into the respective post (with name of the place and the city - these fields need to be added manually by users).
 - When users click on "Go To Map", they will be linked to a Google Map site.

## Try it yourself:
Link to **Savetheplace**:

## Sites
### Landing page
![image](https://user-images.githubusercontent.com/57114344/132533151-9efcae2f-7134-46b3-9747-08ee9d1d4b1c.png)

## Add Side-form

| When camera access is not allowed | When camera access is allowed  |
|--|--|
| ![image](https://user-images.githubusercontent.com/57114344/132742013-79deaa9c-d7f6-489b-bbe8-184d9a56a2f4.png) | ![image](https://user-images.githubusercontent.com/57114344/132742298-659cd62b-c7c1-4ec7-a6ad-9c0f35cc507f.png) |

## Install Button
After users clicks on the install button, the web app will be installed on users's desktop or home screen and the button will disappear. 
Gif


## Used technologies 

- Frontend: HTML & CSS with [Materialize](https://materializecss.com/): A modern responsive CSS framework based on Material Design by Google.
- Backend: [Firebase](https://firebase.google.com/): A Backend-as-a-Service (BaaS) app development platform developed by Google that provides hosted backend services. **Savetheplace** uses its NoSQL cloud storage, and hosting static files services. 

## About Progessive Web App

Progressive Web Apps are web applications that have been designed so they are **capable, reliable, and installable**
- **Capable**: **Savetheplace** can access user file system, geolocation and camera. It can also can synchronize data in the background. 
- **Reliable** means that the web app works fast and dependable regardless of the network (Or in another word: Scrolling and animation should feel smooth, the website works on every browsers and even is offline usable)
- **Installable**: **Savetheplace** can run in a standalone window instead of a browser tab. It is launchable from on the user's home screen, dock, taskbar, or shelf. It's possible to search for them on a device and jump between them with the app switcher, making them feel like part of the device they're installed on.


