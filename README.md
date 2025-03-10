# **Trial Containers API Specifications**

**Prerequisite**: Clone the API Documentation Generator from GitHub and follow the steps unless the repo for the API Specifications you want to edit doesn't already exist.

---

Welcome to the Trial Containers API Specifications repository, the central hub for all specifications and documentation related to Trial Containers API.

The most critical file here is **`/public/schema.json`**. This file serves as the backbone for our API documentation and specification.

## **Installation**

**Note:** If the API Specifications Generator repo doesn't exist, please follow the instructions in the API Specifications Generator readme.

**If the repo already exists, follow these steps:**

1. Clone the repository:

```bash
git clone https://github.com/Chillibean/trial-containers-api-specifications.git
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

## **Branches**

- **`main`**: The default production/release branch.
- **Development branches**: These must be named after the release number (e.g., **`development-v1.0.11`**, **`development-v1.1.1`**, **`development-v1.0.2`**).
- All other branches should originate from a development branch with a descriptive name.

## **Developing Workflow Example**

Here's an example of the development workflow:

1. **`main`** is the default production branch, with the current version as **`1.0.10`**.
2. You want to add a new endpoint.
3. Create a branch from **`main`** with a new release number, such as **`development-v1.0.11`** (if it doesn't exist yet). This number has to be assigned to specific Chillipharm platform release.
4. **`development-v1.0.11`** becomes the development branch.
5. Create another branch named **`task/CP-1000-add-users-endpoint`**.
6. Update **`/public/schema.json`** to include the new users' endpoint.
7. Push to GitHub and create a Pull Request pointing to development branch, eg. **`development-v1.0.11`**.
8. Once Pull Request is in ready to review state, a pre-release is generated and `trial-containers-api-client-sdk` repository is tiggered to generate a new SDK package. Package version follows development branch version number + build run number, eg. **`1.0.11-dev.5`**.
9. Update your service with the new SDK to test the pre-release version.
10. If everything works, get approval to merge your branch into the development branch **`development-v1.0.11`**.
11. Once ready in **`development-v1.0.11`**, get approval to merge into **`main`**.
12. Merging into **`main`** generates a release, triggers the Client SDK generation and publishes a release package **`1.0.11`**.
13. Update your service with the new **`1.0.11`** version.
14. Repeat!

Remember to edit the **`/public/schema.json`** file as needed to reflect the correct updated API specs.

## **`/public/schema.json` - IMPORTANT**

This file is the cornerstone of our repository. It contains all the specs for the Trial Containers API API.

Key elements within the JSON file:

- **`openapi`**: The version of the OpenAPI specification we are using.
- **`info`**: Information about the API, including its version, title, description, and contact details.
- **`tags`**: Groupings of API endpoints. More details can be found [**here**](https://swagger.io/docs/specification/grouping-operations-with-tags/).
- **`servers`**: Defines where the API endpoints can be tested, which is handy for integration with tools like Postman.
- **`paths`**: Each path should include:
  - **`summary`**: A brief description of the endpoint.
  - **`description`**: A more detailed explanation of the operation.
  - **`operationId`**: A unique identifier for the operation (e.g., **`getExample`**). This name will be used in the generated SDK to make a request.
  - **`tags`**: An array of tags specified above, with each endpoint typically belonging to a single tag.
  - **`parameters`**: Lists all required parameters. You can find an example in the auto-generated file.
  - **`responses`**: Each endpoint should have responses defined for 200, 400, 401, 409, and 500 HTTP status codes. You can copy and paste error responses if needed. Additonal status codes can be added as needed.

## **GitHub Pages**

You can access the documentation at [https://chillibean.github.io/trial-containers-api-specifications](https://chillibean.github.io/trial-containers-api-specifications).

The OpenAPI JSON file is available at [https://chillibean.github.io/trial-containers-api-specifications/fullSchema.json](https://chillibean.github.io/trial-containers-api-specifications/fullSchema.json).

## **GitHub Workflows**

There are two workflows attached to this repository:

**`pre-release.yml`**: This workflow manages pre-releases. It executes when there is an open Pull Request in ready to review state. It creates a pre-release with an attached artifact (**`/public/fullSchema.json`**). It then triggers the Client SDK to rebuild and publish with the updated pre-release version.

**`release.yml`**: This workflow handles any branch merged into **`main`**. It automatically triggers a new release with an artifact attached (**`/public/fullSchema.json`**). It also updates and publishes the Client SDK with the given release and updates GitHub Pages / SwaggerHub.

## **Git Hooks**

The **`pre-commit`** file validates changes before committing. It checks:

- If the versions in **`package.json`** and **`/public/schema.json`** match.
- Linting in the **`/public/schema.json`** file.

## **Linting**

You can run **`npm run lint`** to check the contents of **`/public/schema.json`** for correctness.

## **Bundling**

You can run **`npm run bunlde`** to bundle the **`/public/schema.json`** file into the full schema that outputs to **`/public/fullSchema.json`**.

_Note: This check is automatically performed before each commit._

## **File Contents**

- 📂 **.github**
  - 📂 **workflows**
    - 📄 [pre-release.yml](.github/workflows/pre-release.yml)
    - 📄 [release.yml](.github/workflows/release.yml)
  - 📄 [pull_request_template.md](.github/pull_request_template.md)
  - 📄 [secrets.json](.github/secrets.json)
- 📂 **.hooks**
  - 📄 [pre-commit](.hooks/pre-commit)
- 📂 **config**
  - 📄 [redocly-config.yml](config/redocly-config.yml)
- 📂 **public**
  - 📂 **refs**
    - 📂 **components**
      - 📂 **responses**
        - 📄 [BadRequest.json](public/refs/components/responses/BadRequest.json)
        - 📄 [Conflict.json](public/refs/components/responses/Conflict.json)
        - 📄 [InternalServerError.json](public/refs/components/responses/InternalServerError.json)
        - 📄 [Unauthorized.json](public/refs/components/responses/Unauthorized.json)
      - 📂 **schemas**
        - 📄 [AuthenticityToken.json](public/refs/components/schemas/AuthenticityToken.json)
        - 📄 [Error.json](public/refs/components/schemas/Error.json)
        - 📄 [ExampleResponse.json](public/refs/components/schemas/ExampleResponse.json)
    - 📂 **paths**
      - 📄 [example.json](public/refs/paths/example.json)
  - 📄 [fullSchema.json](public/fullSchema.json)
  - 📄 [schema.json](public/schema.json)
- 📂 **src**
  - 📄 [App.jsx](src/App.jsx)
  - 📄 [main.jsx](src/main.jsx)
- 📄 [.estlintrc.cjs](.estlintrc.cjs)
- 📄 [.gitignore](.gitignore)
- 📄 [index.html](index.html)
- 📄 [package-lock.json](package-lock.json)
- 📄 [package.json](package.json)
- 📄 [README.md](README.md)
- 📄 [update-openapi-version.js](update-openapi-version.js)
- 📄 [update-version.sh](update-version.sh)
- 📄 [vite.config.js](vite.config.js)

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
