# Admin Frontend

Provides user interface for https://github.com/TaunoOtti/demo-app;


Project is created with Angular version 13.2.0 and build with Angular Material components https://material.angular.io/ 

## Run application
* Run `npm install` to install required packages.
* Run `ng serve` for a dev server. 
* Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Run application in Docker
* Navigate to project root directory
* Run `docker build . -t admin-frontend`
* After successful build image should appear to `docker images` list
* To start application run `docker run -d -p 4200:80 admin-frontend`
* Navigate to `http://0.0.0.0:4200/`
* TODO localhost:8080 backend not reachable
