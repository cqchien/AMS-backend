### #Attendance Management System (AMS) Basic documentations.
mind mind
---
### #KEEP IN MIND
- services, repositories... may copied from different module so if you are editing any (or u r going to), remember to check others (if existed)
- development variable need to put into `.development.env`
---

### 1. Setup this repo to start development

Before start:
- make sure docker was install
- make sure Make was install
- this project using node v12.16.3

To setting up your environment, run below lines:
- Run `docker-compose up -d` (for the first time setup)
- Run `npm install`
- RUN `yarn migration:run`
- RUN `yarn start`
- Happy coding :tada:

### 2. Coding Guideline

We follow the structure of Nestjs boilerplate   
[https://narhakobyan.github.io/awesome-nest-boilerplate/docs/architecture.html#src](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/architecture.html#src)

#### 2.1. Overall structure
- https://collab.geekup.vn/books/talaria-20200424/page/coding-guideline/edit?editor=markdown

- the source code will be push in `\src` folder
    - `src/common` - some common code like constants, error definition...
    - `src/decorators` - decorators
    - `src/exceptions` - going to remove, using `src/common/error` instead
    - `src/filters` - going to remove, using `src/common` instead
    - `src/guards` - guards class
    - `src/interceptors` - interceptors class
    - `src/interfaces` - interfaces class
    - `src/middlewares` - middlewares class
    - `src/migrations` - 
    - src/modules
    - src/providers
    - src/shared
    - src/templates
    - src/transformers
NestJS Concept Refs:
- [Provider](https://docs.nestjs.com/providers)
- [Decorator](https://docs.nestjs.com/decorators)
- [Guard](https://docs.nestjs.com/guards)
- [Exception filters](https://docs.nestjs.com/exception-filters#exception-filters)
- [Middleware](https://docs.nestjs.com/middleware)
- [Interceptors](https://docs.nestjs.com/interceptors)
