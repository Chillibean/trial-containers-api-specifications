# **Trial Container API Specifications**

**Prerequisite**: Clone the API Documentation Generator from GitHub and follow the steps unless the repo for the API Specifications you want to edit doesn't already exist.

---

Welcome to the Trial Container API Specifications repository, the central hub for all specifications and documentation related to Trial Container API.

The most critical file here is **`/public/schema.json`**. This file serves as the backbone for our API documentation and specification.

## **Installation**

**Note:** If the API Specifications Generator repo doesn't exist, please follow the instructions in the API Specifications Generator readme.

**If the repo already exists, follow these steps:**

1. Clone the repository:
    
    ```bash
    git clone https://github.com/Chillibean/trial-container-api-specifications.git
    ```
    
2. Install all dependencies by running:
    
    ```bash
    npm install
    ```
    
3. Start the development environment:
    
    ```bash
    npm run dev
    ```
    
    This will initiate a development server running on port 5173. Follow the instructions in the terminal. Our setup uses Swagger UI to provide a user-friendly interface for your development needs.
    
4. Happy Hacking!

Before you start, it's crucial to understand our Versioning and Branches guidelines. We've also provided a Developing Workflow Example to help you understand the development process.

## **Versioning**

You can bump the versions in **`package.json`** and **`/public/schema.json`** by running:

```bash

npm version [<newversion> | major | minor | patch]

```

The version works as follows:

- **`major`**: A major release, which includes breaking changes. (example: removing an endpoint)
- **`minor`**: A minor release, which includes new features. (example: adding an endpoint)
- **`patch`**: A patch release, which includes bug fixes. (example: fixing an endpoint)

For a new alpha version, use **`npm version [version_number]-alpha.0`**. Setting an alpha version generates a pre-release that updates and publishes an alpha version of the Client SDK.

## **Branches**

- **`main`**: The default production branch.
- **Release branches**: These must be named after the release number (e.g., **`1.0.11`**, **`1.1.1`**, **`1.0.2`**).
- All other branches should originate from a release branch with a descriptive name.

## **Developing Workflow Example**

Here's an example of the development workflow:

1. **`main`** is the default production branch, with the current version as **`1.0.10`**.
2. You want to add a new endpoint.
3. Create a branch from **`main`** with a new release number, such as **`1.0.11`**.
4. **`1.0.11`** becomes the release branch.
5. Create another branch named **`task/add-users-endpoint`**.
6. Update **`/public/schema.json`** to include the new users' endpoint.
7. Run **`npm version 1.0.11-alpha.0`**.
8. Push to GitHub and create a pull request.
9. A pre-release is generated, the Client SDK is rebuilt, and the package is published.
10. Update your service with the new SDK to test the alpha version.
11. If everything works, get approval to merge your branch into the release branch **`1.0.11`**.
12. Once ready in **`1.0.11`**, get approval to merge into **`main`**.
13. Merging into **`main`** generates a release, updates the Client SDK, and publishes a release package.
14. Update your service with the new **`1.0.11`** version.
15. Repeat!

Remember to edit the **`/public/schema.json`** file as needed to reflect the correct updated API specs.

## **`/public/schema.json` - IMPORTANT**

This file is the cornerstone of our repository. It contains all the specs for the Trial Container API API.

Key elements within the JSON file:

- **`openapi`**: The version of the OpenAPI specification we are using.
- **`info`**: Information about the API, including its version, title, description, and contact details.
- **`tags`**: Groupings of API endpoints. More details can be found [**here**](https://swagger.io/docs/specification/grouping-operations-with-tags/).
- **`servers`**: Defines where the API endpoints can be tested, which is handy for integration with tools like Postman.
- **`paths`**: Each path should include:
    - **`summary`**: A brief description of the endpoint.
    - **`operationId`**: A unique identifier for the operation (e.g., **`getExample`**).
    - **`description`**: A more detailed explanation of the operation.
    - **`parameters`**: Lists all required parameters. You can find an example in the auto-generated file.
    - **`tags`**: An array of tags specified above, with each endpoint typically belonging to a single tag.
    - **`responses`**: Each endpoint should have responses defined for 200, 400, 401, 409, and 500 HTTP status codes. You can copy and paste error responses if needed.

## **GitHub Pages**

You can access the documentation at [**https://chillibean.github.io/trial-container-api](https://chillibean.github.io/%7B%7BapiPackageName%7D)}/**.

The OpenAPI JSON file is available at [**https://chillibean.github.io/trial-container-api](https://chillibean.github.io/%7B%7BapiPackageName%7D)}/schema.json**.

## **GitHub Workflows**

There are two workflows attached to this repository:

**`deploy.yml`**: This workflow handles any branch merged into **`main`**. It automatically triggers a new release with an artifact attached (**`/public/schema.json`**). It also updates and publishes the Client SDK with the latest release and updates GitHub Pages.

**`push-to-branch.yml`**: This workflow manages alpha releases. If a developer sets an alpha release version, it creates an alpha pre-release with an attached artifact (**`/public/schema.json`**). It then triggers the Client SDK to rebuild and publish with the updated alpha pre-release.

**`enforce-semantic-versioning.yml`**: This configuration file serves the purpose of enforcing strict adherence to semantic versioning rules within your project. It ensures that merging into the main branch is only possible when the release branch follows the correct formatting, which includes the major.minor.patch versioning scheme (e.g., 1.0.1, 1.0.2, 3.0.2).

## **Git Hooks**

The **`pre-commit`** file validates changes before committing. It checks:

- If the versions in **`package.json`** and **`/public/schema.json`** match.
- Linting in the **`/public/schema.json`** file.

## **Linting**

You can run **`npm run lint`** to check the contents of **`/public/schema.json`** for correctness.

## **Bundling**

You can run **`npm run bunlde`** to bundle the **`/public/schema.json`** file into the full schema that outputs to **`/public/fullSchema.json`**.

*Note: This check is automatically performed before each commit.*

## **File Contents**
- 📄 [README.md](plop-templates/api-specs/README.md)
- 📄 [bump\-alpha\-version.sh](plop-templates/api-specs/bump-alpha-version.sh)
- 📂 __config__
 - 📄 [redocly\-config.yml](plop-templates/api-specs/config/redocly-config.yml)
- 📄 [index.html](plop-templates/api-specs/index.html)
- 📄 [package.json](plop-templates/api-specs/package.json)
- 📂 __public__
 - 📄 [fullSchema.json](plop-templates/api-specs/public/fullSchema.json)
 - 📂 __refs__
   - 📂 __components__
     - 📂 __responses__
       - 📄 [BadRequest.json](plop-templates/api-specs/public/refs/components/responses/BadRequest.json)
       - 📄 [Conflict.json](plop-templates/api-specs/public/refs/components/responses/Conflict.json)
       - 📄 [InternalServerError.json](plop-templates/api-specs/public/refs/components/responses/InternalServerError.json)
       - 📄 [Unauthorized.json](plop-templates/api-specs/public/refs/components/responses/Unauthorized.json)
     - 📂 __schemas__
       - 📄 [Error.json](plop-templates/api-specs/public/refs/components/schemas/Error.json)
       - 📄 [ExampleResponse.json](plop-templates/api-specs/public/refs/components/schemas/ExampleResponse.json)
   - 📂 __paths__
     - 📄 [example.json](plop-templates/api-specs/public/refs/paths/example.json)
 - 📄 [schema.json](plop-templates/api-specs/public/schema.json)
- 📂 __src__
 - 📄 [App.jsx](plop-templates/api-specs/src/App.jsx)
 - 📄 [main.jsx](plop-templates/api-specs/src/main.jsx)
- 📄 [update\-openapi\-version.js](plop-templates/api-specs/update-openapi-version.js)
- 📄 [update\-version.sh](plop-templates/api-specs/update-version.sh)
- 📄 [vite.config.js](plop-templates/api-specs/vite.config.js)
     

You can include these file names and descriptions in your [README.md](http://readme.md/) section to provide an overview of the files in your repository.

## **GitHub Settings**

Make sure to enable these settings inside the repository:

### **Go to repo settings tab**

**General Tab**

- Default branch: **`main`**
- Enable "Automatically delete head branches."

**Branches Tab**

- Require a pull request before merging.
- Require approvals and set the required approvals to 1.

**Pages Tab**

- Set GitHub Pages visibility to public.
- Source: deploy from a branch.
- Branch: **`gh-pages`** from the root **`/`**.