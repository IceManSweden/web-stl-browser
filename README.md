# Web STL Browser
It is a web server which displays an archive of 3d models.
It makes it easier to find a model you are looking for by using a search functionality, And a tagging system to group certain models.

## Prerequisites
- Node
- Docker (Running MongoDB)

## How To Install
- First a mongoDB server needs to be running. Which can be installed via their [Guide](https://www.mongodb.com/docs/manual/installation/)
-  Start by cloning the repo.
    ``git clone https://github.com/IceManSweden/web-stl-browser.git``

- Navigate to the project folder
- Add a new file in the project folder ``.env`` And enter the following and replace the tags.

    ```
    DB_CONNECTION="{MONGODB CONNECTION STRING}"
    MOUNT_DIR_IMAGES="{PATH TO IMAGES}"
    MOUNT_DIR_FILES="{PATH TO MODELS}"
    PORT="{PORT NUMBER}"
    ```
-  Run ``npm install`` to install all the dependencies.
-  Everything should be ready to start.
  
## How to run
-  Open a terminal and navigate to the project.
-  Then Enter ``npm test`` to start the project.
-  Then the page should run on [localhost:port]()