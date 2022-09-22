# FrontendTask

This project was created as a work sample within ~10 hours.

## Description

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

This project uses Angular Material for styling and Bootstrap css for utility css classes and a responsive grid system.

The ```create-user``` and ```edit-user``` form are similar. They both use Angulars form-builder and a generalized sub form ```user-form```.

Email and URL (for profile picture) inputs are validated with a RegExp.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Known issues

Due to the usage of dummyjson.com there will be bugs regarding newly created users. The backend will respond with the
same ID and multiple users with the same ID will produce unintended behaviour.

Due to the lack of an image upload feature there is a temporary input field, which accepts URLs. Those URLs could
contain content other than images or could track users.

